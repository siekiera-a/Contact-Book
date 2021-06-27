import {
  AppBar,
  Box,
  Button,
  Fab,
  IconButton,
  makeStyles,
  Modal,
  Toolbar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useCallback, useContext, useState } from 'react';
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
}));

export function ContactBook() {
  const classes = useStyles();
  const [creatorOpened, setCreatorOpened] = useState(false);
  const { signOut, contacts } = useContext(appContext);

  const toggleContactCreator = useCallback(() => {
    setCreatorOpened((v) => !v);
  }, [setCreatorOpened]);

  const exportContacts = useCallback(() => {
    if (contacts.length > 0) {
      const link = document.createElement('a');
      const blob = new Blob([JSON.stringify(contacts)], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'contacts.json';
      link.click();
    } else {
      alert('No contacts to export!');
    }
  }, [contacts]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            startIcon={<CloudUploadIcon htmlColor={white} />}
            className={[classes.button, classes.white].join(' ')}
          >
            Import
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
