import {
  AppBar,
  Box,
  Button,
  Fab,
  IconButton,
  Input,
  makeStyles,
  Modal,
  Toolbar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useCallback, useContext, useState } from 'react';
import { importContactsApi } from '../../api/contact';
import { IContactRequest } from '../../api/types';
import { appContext } from '../../AppContext';
import { ContactCreator } from './ContactCreator';
import { ContactsList } from './ContactsList';

const white = '#ddd';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    right: '30px',
    bottom: '30px',
  },
  logoutButton: {
    position: 'fixed',
    right: '30px',
    top: '30px',
  },
  spacer: {
    flex: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  white: {
    color: white,
  },
  input: {
    display: 'none',
  },
}));

export function ContactBook() {
  const classes = useStyles();
  const [creatorOpened, setCreatorOpened] = useState(false);
  const { signOut, contacts, setContacts, httpClient } = useContext(appContext);

  const toggleContactCreator = useCallback(() => {
    setCreatorOpened((v) => !v);
  }, [setCreatorOpened]);

  const exportContacts = useCallback(() => {
    if (contacts.length > 0) {
      const link = document.createElement('a');
      const blob = new Blob(
        [
          JSON.stringify(
            contacts.map((c) => {
              const { name, phone, email } = c;
              return { name, phone, email };
            })
          ),
        ],
        { type: 'text/plain' }
      );
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = new Date().toLocaleDateString() + '-contacts.json';
      link.click();
    } else {
      alert('No contacts to export!');
    }
  }, [contacts]);

  const importContacts = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileReader = new FileReader();
      const files = e.target.files;
      if (files) {
        fileReader.onload = (e) => {
          const data = e.target?.result;
          if (typeof data === 'string') {
            const contacts: IContactRequest[] = JSON.parse(data);
            importContactsApi(httpClient, contacts)
              .then((x) => {
                setContacts(x.contacts);
              })
              .catch(() => console.log(e));
          }
        };
        fileReader.readAsText(files[0], 'text/plain');
      }
    },
    [httpClient, setContacts]
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            startIcon={<CloudUploadIcon htmlColor={white} />}
            className={[classes.button, classes.white].join(' ')}
          >
            <label>
              Import
              <Input
                type="file"
                name="file"
                onChange={importContacts}
                className={classes.input}
              />
            </label>
          </Button>
          <Button
            startIcon={<CloudDownloadIcon htmlColor={white} />}
            className={classes.white}
            onClick={exportContacts}
          >
            Export
          </Button>
          <div className={classes.spacer} />
          <IconButton onClick={signOut} edge="end">
            <ExitToAppIcon className={classes.white} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ContactsList />
      <Modal open={creatorOpened} onClose={toggleContactCreator}>
        <Box>
          <ContactCreator close={toggleContactCreator} />
        </Box>
      </Modal>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={toggleContactCreator}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
