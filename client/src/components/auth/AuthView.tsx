import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { Register } from './Register';
import { Login } from './Login';

const useStyles = makeStyles({
  boxContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b8b8ff',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow: '0 0 20px 0px #555',
  },
  box: {
    flex: 1,
    padding: '40px',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  authSlider: {
    width: 'calc(200% + 80px)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    transition: 'transform .25s ease-in-out',
    overflow: 'hidden',
  },
  move: {
    transform: 'translateX(calc(-50% - 40px))',
  },
  item: {
    width: 'calc(100% - 40px)',
    padding: '5px 0',
  },
  space: {
    width: '160px',
  },
  boxImage: {
    backgroundColor: '#3f37c9',
    display: 'flex',
  },

  image: {
    width: '70%',
    margin: 'auto',
    display: 'block',
    animation: '$growAnimation 2s linear infinite alternate',
  },
  '@keyframes growAnimation': {
    from: {
      transform: 'scale(1)',
    },
    to: {
      transform: 'scale(1.2)',
    },
  },
});

export function AuthView() {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(true);

  const toggleLogin = useCallback(() => {
    setLoginOpen((v) => !v);
  }, [setLoginOpen]);

  return (
    <Box className={classes.boxContainer}>
      <Container maxWidth="md" className={classes.container}>
        <Box className={classes.box}>
          <Box
            className={`${classes.authSlider} ${loginOpen ? '' : classes.move}`}
          >
            <Login className={classes.item} redirectWindow={toggleLogin} />
            <div className={classes.space} />
            <Register className={classes.item} redirectWindow={toggleLogin} />
          </Box>
        </Box>
        <Box className={[classes.box, classes.boxImage].join(' ')}>
          <img
            src="http://webwork360.com/wp-content/uploads/2017/07/if_contacts_1055082.png"
            className={classes.image}
            alt="Logo"
          />
        </Box>
      </Container>
    </Box>
  );
}
