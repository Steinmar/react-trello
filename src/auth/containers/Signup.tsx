import * as React from 'react';
import SignupForm from '../components/SignupForm';
import InfoMessage, {
  InfoMessageType
} from 'src/shared/components/InfoMessage';
import * as types from '../store/types';
import { SignupFormState, SignupFormErrors, SignupFormValue } from '../models';
import { VALIDATION_CONSTANTS } from '../CONSTANTS';
import { createTouchCheckingFn } from 'src/utils';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ROUTES } from 'src/core/Routes';

const mapDispatchToProps = dispatch => ({
  formSubmit: payload =>
    dispatch({ type: types.SignUpStateActionTypes.FETCH_REQUEST, payload }),
  clearRedirectFlag: () =>
    dispatch({ type: types.SignUpStateActionTypes.CLEAR_REDIRECT_FLAG }),
  showLoginInfoSuccessMessage: () =>
    dispatch({ type: types.LoginStateActionTypes.SHOW_INFO_SUCCESS_MESSAGE })
});

class Signup extends React.Component<
  {
    formSubmit: (agruments) => any;
    clearRedirectFlag: () => any;
    showLoginInfoSuccessMessage: () => any;
    signUp: types.SignUpState;
  },
  SignupFormState
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
    if (this.props.signUp.data.redirectToLogin) {
      return <Redirect to={ROUTES.AUTH.LOGIN} />;
    }
    return (
      <div>
        {this.props.signUp.error && (
          <InfoMessage
            text={this.props.signUp.error as string}
            type={InfoMessageType.ERROR}
          />
        )}
        <SignupForm
          formValue={this.state.value}
          formErrors={this.state.errors}
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleFormSubmit}
        />
      </div>
    );
  }

  public componentWillUnmount() {
    this.props.clearRedirectFlag();
    this.props.showLoginInfoSuccessMessage();
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
    this.props.formSubmit(this.mapStateToRequest(this.state.value));
  }

  private checkAndToggleErrors(value: SignupFormValue): SignupFormErrors {
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

  private mapStateToRequest(value: SignupFormValue) {
    const { email, password } = value;
    return {
      name: value.userName,
      email,
      password
    };
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(Signup);
