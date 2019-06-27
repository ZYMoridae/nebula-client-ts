import * as React from "react";
import ReactDOM from 'react-dom';
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

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

const styles = (theme: Theme) => createStyles({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing(1),
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
    marginTop: '250px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  registerContainer: {
    padding: theme.spacing(3),
    backgroundColor: 'white',
    borderRadius: '5px'
  },
  submitButton: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5)
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
    marginTop: '150px',
    width: '100%'
  },
  backgroundImage: {
    position: 'absolute',
    top: isMobile ? '-8vh' : '0',
    left: '0',
    zIndex: -999,
    height: '100vh',
    width: '100%',
    objectFit: 'cover'
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1)
  }
});

type MyState = {
  username: string,
  password: string,
  gender: string,
  labelWidth: number,
  email: string,
  password2: string,
  firstname: string,
  lastname: string,
  address1: string,
  address2: string,
  telephone: string,
  error: any
};


type MyProps = {
  dispatch: any,
  isCreatinguser: boolean,
  classes: any,
  info: any,
  createUser: (data: any) => void
};

const fieldsNames = ['username', 'password', 'gender', 'gender', 'email', 'password2', 'firstname', 'lastname', 'address1', 'address2'];


class Register extends React.Component<MyProps, MyState> {
  private InputLabelRef: React.ReactInstance;

  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      labelWidth: 0,
      gender: 'M',
      email: '',
      password2: '',
      firstname: '',
      lastname: '',
      address1: '',
      address2: '',
      telephone: '',
      error: {
        username: false,
        password: false,
        email: false,
        password2: false,
        firstname: false,
        lastname: false,
        address1: false,
        address2: false,
        telephone: false,
      }
    };
  }

  setValidationError = (fieldName: string) => {
    let newState = this.state.error;
    newState[fieldName] = true;
    this.setState({
      error: newState
    });
  };

  // TODO: Validation
  validateFieldValue = () => {
    let isValid: boolean = true;

    if (this.state.username == '') {
      isValid = isValid && false;
      this.setValidationError('username');
    }

    if (this.state.email == '') {
      isValid = isValid && false;
      this.setValidationError('email');
    }

    if (this.state.firstname == '') {
      isValid = isValid && false;
      this.setValidationError('firstname');
    }

    if (this.state.lastname == '') {
      isValid = isValid && false;
      this.setValidationError('lastname');
    }

    if (this.state.lastname == '') {
      isValid = isValid && false;
      this.setValidationError('lastname');
    }

    if (this.state.lastname == '') {
      isValid = isValid && false;
      this.setValidationError('lastname');
    }

    if (this.state.password == '') {
      isValid = isValid && false;
      this.setValidationError('password');
    }

    if (this.state.password2 == '') {
      isValid = isValid && false;
      this.setValidationError('password2');
    }

    if (this.state.password !== this.state.password2) {
      isValid = isValid && false;
      this.setValidationError('password');
      this.setValidationError('password2');
    }

    return isValid;
  };


  componentDidMount() {
    // const {info} = this.props;


    this.setState({
      labelWidth: (ReactDOM.findDOMNode(this.InputLabelRef) as HTMLInputElement).offsetWidth,
    });
  }

  // TODO: Add validation
  handleSubmit = (event: any) => {
    event.preventDefault();
    if (this.validateFieldValue()) {
      this.props.createUser({
        password: this.state.password,
        role_id: "2",
        telephone: this.state.telephone,
        address1: this.state.address1,
        address2: this.state.address2,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        gender: this.state.gender.toLowerCase(),
        email: this.state.email,
        username: this.state.username
      });
    }
  }

  onChange = (event: any) => {
    const { target: { name, value } } = event;
    // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
    this.setState({ [name]: value } as Pick<MyState, keyof MyState>);
  }

  render() {
    const { classes, info } = this.props;

    // if (sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != 'undefined') {
    //   location.href = '/';
    // }

    // if (isFetchedAuth && this.props.info.token != undefined) {
    //   sessionStorage.setItem('token', this.props.info.token);
    //   location.href = '/';
    // }

    let genderArray = ['M', 'F'];

    return (

      <div className={classes.containerBg}>

        <img className={classes.backgroundImage} src="https://thewallpaper.co//wp-content/uploads/2016/02/cat-piano-hd-cat-wallpapers-kittens-widescreen-pussycats-high-resolution-pet-photos-baby-cat-desktop-images-cat-wallpapers-for-mac-windows-wallpapers-of-cats-1805x1015.jpg" />

        <HeaderBarContainer />
        {/* <Snackbar
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
        </Snackbar> */}


        <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>

          <Grid container>

            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
              <Grid container className={classes.registerContainer} spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h5" gutterBottom className={classes.signInCaption}>
                    <AccountCircleIcon fontSize="large" className={classes.accountIcon} />
                    New User
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-name"
                    label="Name"
                    name="username"
                    className={classes.textField}
                    variant="outlined"
                    fullWidth={true}
                    required
                    onChange={(e) => { this.onChange(e) }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-email"
                    label="Email"
                    name="email"
                    className={classes.textField}
                    variant="outlined"
                    type="email"
                    fullWidth={true}
                    required
                    onChange={(e) => { this.onChange(e) }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-password"
                    label="Password"
                    name="password"
                    className={classes.textField}
                    variant="outlined"
                    type="password"
                    fullWidth={true}
                    required
                    onChange={(e) => { this.onChange(e) }}
                  />
                </Grid>


                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-password2"
                    label="Confirm Password"
                    name="password2"
                    className={classes.textField}
                    variant="outlined"
                    type="password"
                    fullWidth={true}
                    required
                    onChange={(e) => { this.onChange(e) }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-firstname"
                    label="First Name"
                    name="firstname"
                    className={classes.textField}
                    variant="outlined"
                    fullWidth={true}
                    required
                    onChange={(e) => { this.onChange(e) }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-lastname"
                    label="Last Name"
                    name="lastname"
                    className={classes.textField}
                    variant="outlined"
                    fullWidth={true}
                    required
                    onChange={(e) => { this.onChange(e) }}
                  />
                </Grid>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={(ref: any) => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-gender"
                  >
                    Gender
                  </InputLabel>

                  <Select
                    value={this.state.gender}
                    onChange={(e) => { this.onChange(e) }}
                    required
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="gender"
                        id="outlined-gender"
                      />
                    }
                  >
                    {
                      genderArray.map((item, index) =>
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                      )
                    }
                  </Select>
                </FormControl>

                <Grid item xs={12}>
                  <TextField
                    id="outlined-telephone"
                    label="Telehpone"
                    name="telephone"
                    className={classes.textField}
                    variant="outlined"
                    fullWidth={true}
                    required
                    onChange={(e) => { this.onChange(e) }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="outlined-address1"
                    label="Address 1"
                    name="address1"
                    className={classes.textField}
                    variant="outlined"
                    type="address1"
                    fullWidth={true}
                    required
                    onChange={(e) => { this.onChange(e) }}
                  />
                </Grid>


                <Grid item xs={12}>
                  <TextField
                    id="outlined-address2"
                    label="Address 2"
                    name="address2"
                    className={classes.textField}
                    variant="outlined"
                    type="address2"
                    fullWidth={true}
                    required
                    onChange={(e) => { this.onChange(e) }}
                  />
                </Grid>



                <Grid item xs={12}>
                  <Button variant="contained" color="primary" size="large" fullWidth={true} className={classes.submitButton} type="submit">
                    Submit
                </Button>
                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12} md={2}></Grid>


            {/* <Paper className={classes.loginContainer}> */}

            {/* <Grid>
                <div className={classes.newUserButton}>
                  <Typography variant="caption" gutterBottom>
                    No account? <a href='/'>Create one!</a>
                  </Typography>
                </div>
              </Grid> */}
            {/* </Paper> */}
          </Grid>

        </form>


        {/* <div className={classes.footerContainer}>
          <Footer />
        </div> */}
      </div>
    )
  }
}


export default withStyles(styles)(Register);