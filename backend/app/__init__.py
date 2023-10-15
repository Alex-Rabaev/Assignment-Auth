from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config import Config
from flask_migrate import Migrate


# create the app
app = Flask(__name__)

# from config file
app.config.from_object(Config)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"]
app.config["JWT_SECRET_KEY"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]

db = SQLAlchemy(app)

migrate = Migrate(app, db)

jwt = JWTManager(app)

from app import routes
