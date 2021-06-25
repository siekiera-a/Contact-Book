import { Box, Fab, makeStyles, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useCallback, useState } from 'react';
import { ContactCreator } from './ContactCreator';
import { ContactsList } from './ContactsList';

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
