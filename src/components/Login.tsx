import * as React from "react";
import {
  fetchAuthInfo
} from '../actions';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  Redirect
} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContent from './MySnackbarContent';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import HeaderBarContainer from '../containers/HeaderBarContainer';

import Footer from './Footer';
import { isMobile } from 'react-device-detect';

import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: 200
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  loginContainer: {
    padding: theme.spacing(3),
    marginTop: isMobile ? '20vh' : '25vh',
    display: 'flex',
    flexWrap: 'wrap',
    width: 350,
    marginLeft: isMobile ? theme.spacing(2) : '-40vw',
    marginRight: theme.spacing(2)
  },
  loginButton: {
    marginTop: theme.spacing(2)
  },
  newUserButton: {
    marginTop: theme.spacing(2)
  },
  accountIcon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main
  },
  signInCaption: {
    color: theme.palette.primary.main
  },
  containerBg: {
    // backgroundColor: '#ffe5d9',
    // backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'64\' height=\'64\' viewBox=\'0 0 64 64\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z\' fill=\'%23ff5500\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    // background: 'url(https://thewallpaper.co//wp-content/uploads/2016/02/cat-piano-hd-cat-wallpapers-kittens-widescreen-pussycats-high-resolution-pet-photos-baby-cat-desktop-images-cat-wallpapers-for-mac-windows-wallpapers-of-cats-1805x1015.jpg) no-repeat',
    // backgroundSize: 'cover',
    // backgroundPositionY: isMobile ? '-50px' : 'center',
    // backgroundPositionX: 'center',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%'
  },
  footerContainer: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100%'
  },
  backgroundImage: {
    position: 'absolute',
    top: isMobile ? '-8vh' : '0',
    left: '0',
    zIndex: -999,
    height: '100vh',
    width: '100vw',
    objectFit: 'cover'
  }
});

type MyState = {
  username: string,
  password: string
};


type MyProps = {
  dispatch: any,
  isFetchedAuth: boolean,
  classes: any,
  info: any,
  hideLoginError: any,
  isShowLoginError: boolean
};

class Login extends React.Component<MyProps, MyState> {
  componentDidMount() {
    // const {info} = this.props;
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.dispatch(fetchAuthInfo({
      headers: {
        Authorization: `Basic ${btoa(`${this.state.username}:${this.state.password}`)}`
      }
    }));
  }

  onChange = (event: any) => {
    const { target: { name, value } } = event;
    // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
    this.setState({ [name]: value } as Pick<MyState, keyof MyState>);
  }

  render() {
    const { isFetchedAuth, classes, info, hideLoginError, isShowLoginError } = this.props;

    if (sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != 'undefined') {
      location.href = '/';
    }

    if (isFetchedAuth && this.props.info.token != undefined) {
      sessionStorage.setItem('token', this.props.info.token);
      location.href = '/';
    }

    return (

      <div className={classes.containerBg}>

        <img className={classes.backgroundImage} src="https://thewallpaper.co//wp-content/uploads/2016/02/cat-piano-hd-cat-wallpapers-kittens-widescreen-pussycats-high-resolution-pet-photos-baby-cat-desktop-images-cat-wallpapers-for-mac-windows-wallpapers-of-cats-1805x1015.jpg" />

        <HeaderBarContainer />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isShowLoginError}
          autoHideDuration={1500}
          onClose={hideLoginError}
        >
          <MySnackbarContent
            onClose={hideLoginError}
            variant="error"
            message="Login Failed!"
          />
        </Snackbar>


        <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>

          <Grid container alignItems="center" justify="center" direction="row">
            <Paper className={classes.loginContainer}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom className={classes.signInCaption}>
                  <AccountCircleIcon fontSize="large" className={classes.accountIcon} />
                  Sign In
                  </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Name"
                  name="username"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth={true}
                  onChange={(e) => { this.onChange(e) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-password"
                  label="Password"
                  name="password"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  type="password"
                  fullWidth={true}
                  onChange={(e) => { this.onChange(e) }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large" fullWidth={true} className={classes.loginButton} type="submit">
                  Login
                  </Button>
              </Grid>
              <Grid>
                <div className={classes.newUserButton}>
                  <Typography variant="caption" gutterBottom>
                    No account? <a href='/'>Create one!</a>
                  </Typography>
                </div>
              </Grid>
            </Paper>
          </Grid>

        </form>


        <div className={classes.footerContainer}>
          <Footer />
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(Login);