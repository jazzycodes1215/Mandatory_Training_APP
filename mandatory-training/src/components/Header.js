import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App'
import '../stylesheets/global.css'

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useUserCheck from '../hooks/useUserCheck'

export default function Header() {
  const {setUser, setToken, setFirstName, setLastName} = useContext(AppContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  const handleLogout = () => {
    setToken(null);
    sessionStorage.clear();
    alert('You are logged out');
    navigate('/login');
  }

  const {validToken, validatedUserType} = useUserCheck()

  return (
    <HeaderBar className="muiIsWeird">
      <AppBar id="head1" position="sticky" sx={{top: '0'}}>
        <Container id="head" maxWidth="100%">
          <Toolbar disableGutters sx={{ py: 2 }}>
            <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <span className='logo'>UTM<span className='black'>Tool</span>.</span>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={() => navigate('/required-training')}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 400,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              UTM Tool
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  id='dash-btn'
                  onClick={() => navigate('/required-training')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  disableRipple='true'
                >
                  Dashboard
                </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon sx={{color: 'White'}} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
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

                {validToken ?
                <MenuItem onClick={() => {validToken ? navigate('/account') : navigate('/login'); handleCloseUserMenu()}}>
                  <Typography  textAlign="center">Account</Typography>
                </MenuItem> : []}
                {validatedUserType === 4 ?
                <MenuItem onClick={()=>{navigate('/administrator'); handleCloseUserMenu()}}>
                  <Typography textAlign="center">Admin View</Typography>
                </MenuItem> : []/*It doesn't take react fragments... */}
                {validatedUserType >= 3 ?
                <MenuItem onClick={()=>{navigate('/unit-training-manager'); handleCloseUserMenu()}}>
                  <Typography textAlign="center">UTM View</Typography>
                </MenuItem> : []}
                {validToken ?
                  <MenuItem onClick={() => {handleLogout(); handleCloseUserMenu()}}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                  :
                  <MenuItem onClick={() => {navigate('/login'); handleCloseUserMenu()}}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                }
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HeaderBar>
  );
};

const HeaderBar = styled.div`
margin-bottom: 5em
`