import { Button, FormControl, makeStyles, TextField } from '@material-ui/core';
import React, { useCallback, useRef } from 'react';

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
});

export function Login({ className, redirectWindow }: IProps) {
  const classes = useStyles();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const login = loginRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    if (loginRef.current) {
      loginRef.current.value = '';
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className={className}>
      <FormControl fullWidth className={classes.formControl}>
        <TextField label="Login" variant="outlined" inputRef={loginRef} />
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
      </FormControl>
    </form>
  );
}
