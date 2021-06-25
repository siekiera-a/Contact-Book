import { Box, FormControl, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { useRef } from 'react';

const useStyles = makeStyles({
  formControl: {
    '& > *': {
      marginBottom: '15px',
    },
    '& > *:last-child': {
      marginBottom: '0',
    },
  },
  paddingVertical: {
    padding: '15px 0',
  },
});

interface IProps {
  email: string | null;
  phone: string | null;
  name: string;
  className?: string;
  nameRef: React.MutableRefObject<HTMLInputElement | undefined>;
  emailRef: React.MutableRefObject<HTMLInputElement | undefined>;
  phoneRef: React.MutableRefObject<HTMLInputElement | undefined>;
}

export function ContactEdit({
  email,
  phone,
  name,
  className,
  nameRef,
  emailRef,
  phoneRef,
}: IProps) {
  const classes = useStyles();

  return (
    <Box className={[className || '', classes.paddingVertical].join(' ')}>
      <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          label="Name"
          value={name}
          inputRef={nameRef}
        />
        <TextField
          variant="outlined"
          label="Email"
          value={email || ''}
          inputRef={emailRef}
        />
        <TextField
          variant="outlined"
          label="Phone"
          value={phone || ''}
          inputRef={phoneRef}
        />
      </FormControl>
    </Box>
  );
}
