import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { deleteContactApi, editContactApi } from '../../api/contact';
import { IContact } from '../../api/types';
import { appContext } from '../../AppContext';
import { ContactContent } from './ContactContent';
import { ContactEdit } from './ContactEdit';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '400px',
    display: 'flex',
    flexDirection: 'row',
    margin: '5px',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  avatar: {
    width: '60px',
    height: '60px',
    backgroundColor: theme.palette.error.dark,
  },
  avatarContainer: {
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
  },
  contentBox: {
    padding: '20px 20px 20px 0',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
}));

export function Contact({ id, name, phone, email }: IContact) {
  const classes = useStyles();
  const upperCaseName = name.toUpperCase();
  const [editable, setEditable] = useState(false);
  const { httpClient, deleteContact, updateContact } = useContext(appContext);

  let avatarTitle = '';
  const words = upperCaseName.split(' ');

  if (words.length > 1) {
    avatarTitle = `${words[0].charAt(0)}${words[1].charAt(1)}`;
  } else {
    avatarTitle =
      upperCaseName.length > 1 ? upperCaseName.substr(0, 2) : upperCaseName;
  }

  const toggleEditing = useCallback(() => {
    setEditable((v) => !v);
  }, [setEditable]);

  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();

  const editContact = useCallback(() => {
    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const phone = phoneRef.current?.value || '';

    if (name === '' || (email === '' && phone === '')) {
      return;
    }

    editContactApi(httpClient, { name, email, phone }, id).then((x) => {
      if (x.success) {
        updateContact({ name, email, phone, id });
        setEditable(false);
      }
    });
  }, [id, httpClient, setEditable, updateContact]);

  const removeContact = useCallback(() => {
    deleteContactApi(httpClient, id).then((x) => {
      if (x.success) {
        deleteContact(id);
      }
    });
  }, [id, httpClient, deleteContact]);

  return (
    <Paper className={classes.container} elevation={7}>
      <Box className={classes.avatarContainer}>
        <Avatar className={classes.avatar}>{avatarTitle}</Avatar>
      </Box>
      <Box className={classes.contentBox}>
        <Typography variant="h5" className={classes.title}>
          {name}
        </Typography>
        {editable ? (
          <ContactEdit
            email={email}
            phone={phone}
            name={name}
            className={classes.info}
            nameRef={nameRef}
            emailRef={emailRef}
            phoneRef={phoneRef}
          />
        ) : (
          <ContactContent
            email={email}
            phone={phone}
            className={classes.info}
          />
        )}

        <Box className={[classes.actionBar].join(' ')}>
          <IconButton onClick={toggleEditing}>
            {editable ? <CloseIcon /> : <EditIcon />}
          </IconButton>
          {editable && (
            <IconButton onClick={editContact}>
              <CheckIcon />
            </IconButton>
          )}
          <IconButton onClick={removeContact}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
