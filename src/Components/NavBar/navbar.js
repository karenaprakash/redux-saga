import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withTheme } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  WhiteColor : {
   color : '#fff'
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Link to='/' className={classes.WhiteColor}> Notifier  </Link>
          </Typography>
          <Link to='/admin/signup'>
            <Button color="inherit">
              <label className={classes.WhiteColor} >Signup</label>
            </Button>
          </Link>
          <Link to='/admin/login'>
            <Button color="inherit">
              <label className={classes.WhiteColor} >Login</label>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}