import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { addContactApi } from '../../api/contact';
import { IError } from '../../api/error';
import { appContext } from '../../AppContext';
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
  message: {
    marginTop: '15px',
  },
});

interface IProps {
  close(): void;
}

export function ContactCreator({ close }: IProps) {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();

  const [message, setMessage] = useState<string>();

  const classes = useStyles();

  const { httpClient, setContacts } = useContext(appContext);

  const addContact = useCallback(() => {
    const name = (nameRef.current?.value || '').trim();
    const email = (emailRef.current?.value || '').trim();
    const phone = (phoneRef.current?.value || '').trim();

    if (name === '' || (email === '' && phone === '')) {
      return;
    }

    setMessage(undefined);

    addContactApi(httpClient, {
      name,
      email: email !== '' ? email : undefined,
      phone: phone !== '' ? phone : undefined,
    })
      .then((x) => {
        setContacts(x);
        close();

        if (nameRef.current) {
          nameRef.current.value = '';
        }
        if (emailRef.current) {
          emailRef.current.value = '';
        }
        if (phoneRef.current) {
          phoneRef.current.value = '';
        }
      })
      .catch((e: IError) => {
        let message =
          e.status === 400
            ? 'Name can not be blank'
            : 'Contact with given name already exists!';
        setMessage(message);
      });
  }, [httpClient, close, setContacts, setMessage]);

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
      <Button
        variant="contained"
        className={classes.button}
        color="primary"
        onClick={addContact}
      >
        Add
      </Button>
      {message && (
        <Typography color="error" align="center" className={classes.message}>
          {message}
        </Typography>
      )}
    </Paper>
  );
}
