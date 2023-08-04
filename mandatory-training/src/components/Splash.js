import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Splash.css'
import SchoolIcon from '@mui/icons-material/School';
import { Typography } from '@mui/material';
import '../stylesheets/global.css'

const Splash = () => {
  const history = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Replace '/destination' with the path of the component you want to navigate to
      history('/login');
    }, 5000); // 5000 milliseconds (5 seconds)

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [history]);

  return (
<section id="splash">
    <div className='logo-div'>
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
              <span className='logo'>UTM<span className='blacky'>Tool</span>.</span>
            </Typography>
    </div>
 </section>);
};

export default Splash;