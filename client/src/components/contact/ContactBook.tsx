import { Box, Fab, makeStyles, Modal } from '@material-ui/core';
import React from 'react';
import { ContactsList } from './ContactsList';
import AddIcon from '@material-ui/icons/Add';
import { useCallback } from 'react';
import { useState } from 'react';
import { ContactEdit } from './ContactEdit';
import { ContactCreator } from './ContactCreator';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    right: '30px',
    bottom: '30px',
  },
});

export function ContactBook() {
  const classes = useStyles();
  const [creatorOpened, setCreatorOpened] = useState(false);

  const toggleContactCreator = useCallback(() => {
    setCreatorOpened((v) => !v);
  }, [setCreatorOpened]);

  return (
    <>
      <ContactsList />
      <Modal open={creatorOpened} onClose={toggleContactCreator}>
        <ContactCreator />
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
