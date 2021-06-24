import {
  Button,
  CircularProgress,
  FormControl,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { signUpApi } from '../../api/auth';
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

export function Register({ className, redirectWindow }: IProps) {
  const classes = useStyles();

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatedPasswordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>();

  const { httpClient, signIn } = useContext(appContext);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email = emailRef.current?.value || '';
      const name = nameRef.current?.value || '';
      const password = passwordRef.current?.value || '';
      const repeatedPassword = repeatedPasswordRef.current?.value || '';

      console.log(email, name, password, repeatedPassword);

      if (email.length === 0) {
        setMessage('Email can not be empty!');
        return;
      }

      if (name.length === 0) {
        setMessage('Name can not be empty!');
        return;
      }

      if (password.length === 0) {
        setMessage('Password can not be empty!');
        return;
      }

      if (repeatedPassword !== password) {
        setMessage('Passwords are different!');
        return;
      }

      setMessage(undefined);
      setLoading(true);

      const credentials = { email, name, password };

      signUpApi(httpClient, credentials)
        .then((x) => signIn(x, credentials))
        .catch(() => {
          setLoading(false);
          setMessage('Registration failed!');
        });
    },
    [httpClient, setMessage, setLoading, signIn]
  );

  return (
    <form className={className} onSubmit={handleSubmit}>
      <FormControl fullWidth className={classes.formControl}>
        <TextField label="Name" variant="outlined" inputRef={nameRef} />
        <TextField label="Email" variant="outlined" inputRef={emailRef} />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          inputRef={passwordRef}
        />
        <TextField
          label="Repeat password"
          variant="outlined"
          type="password"
          inputRef={repeatedPasswordRef}
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
        <Button variant="outlined" onClick={redirectWindow}>
          Log in
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
