from app import app, db
from flask import jsonify, request
from app.models import User, Organization, Membership
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import re


# User signup endpoint
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data["email"]
    hashed_password = generate_password_hash(
        data["password"], method="scrypt", salt_length=16
    )

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"msg": "Invalid email format"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 400

    new_user = User(email=data["email"], password=hashed_password)  # Modified here
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created!"}), 201


# User login endpoint
@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()  # Modified here
    # tests log
    # print("Req data =>", data)
    # print("DB query user", user)

    if not user or not check_password_hash(user.password, data["password"]):
        return (
            jsonify({"msg": "Invalid credentials!"}),
            401,
        )  # Invalid email or password

    access_token = create_access_token(
        identity=user.email, expires_delta=timedelta(minutes=15)
    )  # Use email as identity. I set expire time as 15 minutes
    return jsonify({"access_token": access_token}), 200


# Create organization endpoint
@app.route("/create-org", methods=["POST"])
@jwt_required()
def create_org():
    data = request.get_json()
    org_name = data["name"]
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if Organization.query.filter_by(name=org_name).first():
        return jsonify({"msg": "Organization already exists"}), 400

    new_organization = Organization(name=org_name, owner_id=user.id)
    db.session.add(new_organization)
    db.session.commit()
    org = Organization.query.filter_by(name=org_name).first()
    membership = Membership(user_id=user.id, organization_id=org.id)
    db.session.add(membership)
    db.session.commit()

    return jsonify({"msg": "Organization created successfully"}), 201


# Add user to organization
@app.route("/add-user-to-org", methods=["POST"])
@jwt_required()
def add_user_to_org():
    data = request.get_json()
    email = data["email"]
    org_name = data["org_name"]
    org = Organization.query.filter_by(name=org_name).first()
    user = User.query.filter_by(email=email).first()

    if not org or not user:
        return jsonify({"msg": "Invalid organization or user"}), 400

    existing_membership = Membership.query.filter_by(
        user_id=user.id, organization_id=org.id
    ).first()
    if existing_membership:
        return (
            jsonify({"msg": "This user is already a member of this organization"}),
            400,
        )

    membership = Membership(user_id=user.id, organization_id=org.id)
    db.session.add(membership)
    db.session.commit()

    return jsonify({"msg": "User added to organization successfully"}), 201


# List all users of an organization
@app.route("/list-users-of-org", methods=["GET"])
@jwt_required()
def list_users_of_org():
    org_name = request.args.get("org_name")
    org = Organization.query.filter_by(name=org_name).first()

    if not org:
        return jsonify({"msg": "Invalid organization"}), 400

    memberships = Membership.query.filter_by(organization_id=org.id).all()
    user_emails = [
        User.query.get(membership.user_id).email for membership in memberships
    ]

    return jsonify({"users": user_emails})


# List all organizations
@app.route("/list-all-orgs", methods=["GET"])
@jwt_required()
def list_all_orgs():
    orgs = Organization.query.all()

    orgs_list = [org.name for org in orgs]

    return jsonify({"orgs": orgs_list})


# List all organizations where user is a member
@app.route("/list-orgs-of-user", methods=["GET"])
@jwt_required()
def list_orgs_of_user():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    memberships = Membership.query.filter_by(user_id=user.id).all()
    orgs = [
        Organization.query.filter_by(id=membership.organization_id).first()
        for membership in memberships
    ]
    print(orgs)

    orgs_list = [org.name for org in orgs]

    if not orgs_list:
        return jsonify({"msg": "User is not a member of any organization"}), 400

    return jsonify({"orgs": orgs_list})
