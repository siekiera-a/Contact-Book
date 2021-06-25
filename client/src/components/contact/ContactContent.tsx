import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles({
  contactItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
  },
});

interface IProps {
  email: string | null;
  phone: string | null;
  className?: string;
}

export function ContactContent({ email, phone, className }: IProps) {
  const classes = useStyles();

  return (
    <Box className={className}>
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
  );
}
