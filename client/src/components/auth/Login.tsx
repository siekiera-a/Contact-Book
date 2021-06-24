import { Typography } from '@material-ui/core';
import {
  Button,
  CircularProgress,
  FormControl,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import { useContext } from 'react';
import { signInApi } from '../../api/auth';
import { appContext } from '../../AppContext';

interface IProps {
  className?: string;
  redirectWindow?: () => void;
}

const useStyles = makeStyles({
  formControl: {
    '& > *': {
      marginBottom: '15px',
    },
    '& > *:last-child': {
      marginBottom: '0',
    },
  },
  spinner: {
    margin: '15px auto',
  },
});

export function Login({ className, redirectWindow }: IProps) {
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>();

  const { signIn, httpClient } = useContext(appContext);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email = emailRef.current?.value || '';
      const password = passwordRef.current?.value || '';

      if (email.length === 0) {
        setMessage('Email can not be empty!');
        return;
      }

      if (password.length === 0) {
        setMessage('Password can not be empty!');
        return;
      }

      setLoading(true);
      setMessage(undefined);

      const credentials = { email, password };

      signInApi(httpClient, credentials)
        .then((x) => signIn(x, credentials))
        .catch(() => {
          setLoading(false);
          setMessage('Login failed!');
        });
    },
    [httpClient, setLoading, signIn, setMessage]
  );

  return (
    <form onSubmit={handleSubmit} className={className}>
      <FormControl fullWidth className={classes.formControl}>
        <TextField label="Email" variant="outlined" inputRef={emailRef} />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          inputRef={passwordRef}
        />
        <Button variant="contained" color="primary" type="submit">
          Log in
        </Button>
        <Button variant="outlined" onClick={redirectWindow}>
          Register
        </Button>
        {message && (
          <Typography align="center" color="error">
            {message}
          </Typography>
        )}
        {loading && <CircularProgress className={classes.spinner} />}
      </FormControl>
    </form>
  );
}
