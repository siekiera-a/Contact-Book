import { Box, FormControl, makeStyles, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';

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
  email?: string | null;
  phone?: string | null;
  name?: string;
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
  const [namePlaceholder, setNamePlaceholder] = useState(name || '');
  const [emailPlaceholder, setEmailPlaceholder] = useState(email || '');
  const [phonePlaceholder, setPhonePlaceholder] = useState(phone || '');

  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNamePlaceholder(e.target.value);
    },
    [setNamePlaceholder]
  );

  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmailPlaceholder(e.target.value);
    },
    [setEmailPlaceholder]
  );

  const onPhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhonePlaceholder(e.target.value);
    },
    [setPhonePlaceholder]
  );

  return (
    <Box className={[className || '', classes.paddingVertical].join(' ')}>
      <FormControl className={classes.formControl}>
        <TextField
          variant="outlined"
          label="Name"
          value={namePlaceholder}
          inputRef={nameRef}
          onChange={onNameChange}
        />
        <TextField
          variant="outlined"
          label="Email"
          value={emailPlaceholder}
          inputRef={emailRef}
          onChange={onEmailChange}
        />
        <TextField
          variant="outlined"
          label="Phone"
          value={phonePlaceholder}
          inputRef={phoneRef}
          onChange={onPhoneChange}
        />
      </FormControl>
    </Box>
  );
}
