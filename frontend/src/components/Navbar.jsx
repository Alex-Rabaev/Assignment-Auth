import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const pages = [
    { label: 'Organizations', path: '/user-orgs' },
    { label: 'Create organizations', path: '/create-org' },
  ];

  const settings = [
    { label: 'Profile', path: '/' },
    { label: 'Logout', action: handleLogout },
  ];

  function handleLogout() {
    localStorage.removeItem('access_token');
    navigate('/entrance');
    window.location.reload();
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.action) {
      item.action();
    }
    handleCloseNavMenu();
    handleCloseUserMenu();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 5 }}>

        <IconButton
          size="large"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          style={{ order: 1 }}
          >
          <MenuIcon />
        </IconButton>
            </Box>

        <Box sx={{ flexGrow: 5 }}>
          <img
            src="/ai-bot.svg"
            alt="Application Logo"
            style={{
              cursor: 'pointer',
              margin: '5px',
              width: '60px',
            }}
          />
        </Box>
        
        <Box sx={{ flexGrow: 0 }}>
        <IconButton
          aria-label="user"
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleOpenUserMenu}
          color="inherit"
          style={{ marginRight: "0px", order: 3 }}
          >
          <Avatar alt="User Avatar" src="/avatar.svg" />
        </IconButton>
        </Box>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {pages.map((page) => (
            <MenuItem key={page.label} onClick={() => handleMenuItemClick(page)}>
              {page.label}
            </MenuItem>
          ))}
        </Menu>

        <Menu
          id="user-menu"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting.label}
              onClick={() => handleMenuItemClick(setting)}
            >
              {setting.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;