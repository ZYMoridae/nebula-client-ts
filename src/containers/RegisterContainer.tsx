import { connect } from 'react-redux';
import {
  createUser
} from '../actions';
import Register from '../components/Register';

const mapStateToProps = (state: any) => {
  return {
    info: state.UserReducer.info,
    isCreatinguser: state.LoginReducer.isCreatinguser,
    isCreateduser: state.LoginReducer.isCreateduser,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    createUser: (data: any) => {
      dispatch(createUser(data));
    }
  }
}

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;