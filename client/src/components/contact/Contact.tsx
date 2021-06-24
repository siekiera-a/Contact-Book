import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';
import { IContact } from '../../api/types';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '400px',
    display: 'flex',
    flexDirection: 'row',
    margin: '5px',
  },
  contactItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  avatar: {
    width: '60px',
    height: '60px',
    backgroundColor: theme.palette.primary.main,
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

export function Contact({ name, email, phone }: IContact) {
  const classes = useStyles();
  const upperCaseName = name.toUpperCase();

  let avatarTitle = '';
  const words = upperCaseName.split(' ');

  if (words.length > 1) {
    avatarTitle = `${words[0].charAt(0)}${words[1].charAt(1)}`;
  } else {
    avatarTitle =
      upperCaseName.length > 1 ? upperCaseName.substr(0, 2) : upperCaseName;
  }

  return (
    <Paper className={classes.container}>
      <Box className={classes.avatarContainer}>
        <Avatar className={classes.avatar}>{avatarTitle}</Avatar>
      </Box>
      <Box className={classes.contentBox}>
        <Typography variant="h5" className={classes.title}>
          {name}
        </Typography>
        <Box className={classes.info}>
          {email && (
            <Box className={classes.contactItem}>
              <EmailIcon className={classes.icon} />
              <Typography variant="h6">{email}</Typography>
            </Box>
          )}
          {phone && (
            <Box className={classes.contactItem}>
              <PhoneIcon className={classes.icon} />
              <Typography variant="h6">{phone}</Typography>
            </Box>
          )}
        </Box>
        <Box className={[classes.actionBar].join(' ')}>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
