import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { appContext } from '../../AppContext';
import { Contact } from './Contact';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export function ContactsList() {
  const { contacts } = useContext(appContext);
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      {contacts.length > 0 ? (
        contacts.map((c) => <Contact key={c.id} {...c} />)
      ) : (
        <Typography align="center">No contacts</Typography>
      )}
    </Container>
  );
}
