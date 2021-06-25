import { Typography } from '@material-ui/core';
import { Box, Button, makeStyles, Paper } from '@material-ui/core';
import React, { useRef } from 'react';
import { ContactEdit } from './ContactEdit';

const useStyles = makeStyles({
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    maxWidth: '800px',
    width: '90%',
    padding: '20px 30px',
    boxSizing: 'border-box',
    flexDirection: 'column',
    alignSelf: 'center',
    margin: '50px auto',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    width: '150px',
    margin: 'auto',
  },
});

interface IProps {
  close(): void;
}

export function ContactCreator() {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" align="center">
        Create contact
      </Typography>
      <ContactEdit
        nameRef={nameRef}
        emailRef={emailRef}
        phoneRef={phoneRef}
        className={classes.info}
      />
      <Button variant="contained" className={classes.button} color="primary">
        Add
      </Button>
    </Paper>
  );
}
