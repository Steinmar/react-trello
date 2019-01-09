import * as React from 'react';
import SignupForm from '../components/SignupForm';
import * as types from '../store/types';
import {
  ISignupFormState,
  ISignupFormErrors,
  ISignupFormValue
} from '../models';
import { VALIDATION_CONSTANTS } from '../CONSTANTS';
import { createTouchCheckingFn } from 'src/utils';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  formSubmit: payload =>
    dispatch({ type: types.SignUpStateActionTypes.FETCH_REQUEST, payload })
});

class Signup extends React.Component<
  { formSubmit: (agruments) => any },
  ISignupFormState
> {
  private formControlWasTouched = createTouchCheckingFn('');

  constructor(props: any) {
    super(props);

    this.state = {
      value: {
        userName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {
        email: {
          pattern: false
        },
        password: {
          length: false,
          confirmationLength: false,
          match: false
        },
        userName: {
          length: false
        }
      }
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  public render() {
    return (
      <SignupForm
        formValue={this.state.value}
        formErrors={this.state.errors}
        onFormChange={this.handleFormChange}
        onFormSubmit={this.handleFormSubmit}
      />
    );
  }

  private handleFormChange(prop: any) {
    return (event: any) => {
      const value = event.target.value;
      this.setState(state => {
        const newState = {
          ...state,
          value: {
            ...state.value,
            [prop]: value
          }
        };
        const errors = this.checkAndToggleErrors(newState.value);
        return { ...newState, errors };
      });
    };
  }

  private handleFormSubmit(event) {
    event.preventDefault();
    // this.handlers.click(this.state.value);
    this.props.formSubmit(this.state.value);
    console.log(this.state);
  }

  private checkAndToggleErrors(value: ISignupFormValue): ISignupFormErrors {
    const { userName, email, password, passwordConfirmation } = value;

    const errors = {
      email: {
        pattern:
          this.formControlWasTouched(email) &&
          !email.match(VALIDATION_CONSTANTS.EMAIL.PATTERN)
      },
      password: {
        length:
          (this.formControlWasTouched(password) &&
            password.length < VALIDATION_CONSTANTS.PASSWORD_LENGTH.MIN) ||
          password.length > VALIDATION_CONSTANTS.PASSWORD_LENGTH.MAX,
        confirmationLength:
          (this.formControlWasTouched(passwordConfirmation) &&
            passwordConfirmation.length <
              VALIDATION_CONSTANTS.PASSWORD_LENGTH.MIN) ||
          passwordConfirmation.length >
            VALIDATION_CONSTANTS.PASSWORD_LENGTH.MAX,
        match:
          this.formControlWasTouched(password) &&
          this.formControlWasTouched(passwordConfirmation) &&
          password !== passwordConfirmation
      },
      userName: {
        length:
          (this.formControlWasTouched(userName) &&
            userName.length < VALIDATION_CONSTANTS.NAME_LENGTH.MIN) ||
          userName.length > VALIDATION_CONSTANTS.NAME_LENGTH.MAX
      }
    };
    return errors;
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(Signup);
