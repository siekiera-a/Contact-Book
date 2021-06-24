import { Button, FormControl, makeStyles, TextField } from '@material-ui/core';
import React from 'react';

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

export function Register({ className, redirectWindow }: IProps) {
  const classes = useStyles();

  return (
    <form className={className}>
      <FormControl fullWidth className={classes.formControl}>
        <TextField label="Login" variant="outlined" />
        <TextField label="Email" variant="outlined" />
        <TextField label="Password" variant="outlined" type="password" />
        <TextField label="Retype password" variant="outlined" type="password" />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
        <Button variant="outlined" onClick={redirectWindow}>
          Log in
        </Button>
      </FormControl>
    </form>
  );
}
