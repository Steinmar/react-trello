import * as React from 'react';
import InfoMessage, {
  InfoMessageType
} from 'src/shared/components/InfoMessage';
import * as types from '../store/types';
import { LoginFormState, LoginFormValue, LoginFormErrors } from '../models';
import { VALIDATION_CONSTANTS, UI_CONSTANTS } from '../CONSTANTS';
import { createTouchCheckingFn } from 'src/utils';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';

const mapDispatchToProps = dispatch => ({
  formSubmit: payload =>
    dispatch({ type: types.LoginStateActionTypes.FETCH_REQUEST, payload }),
  hideLoginInfoSuccessMessage: () =>
    dispatch({ type: types.LoginStateActionTypes.HIDE_INFO_SUCCESS_MESSAGE })
});

class Login extends React.Component<
  {
    formSubmit: (agruments) => any;
    hideLoginInfoSuccessMessage: () => any;
    login: types.LoginState;
  },
  LoginFormState
> {
  private formControlWasTouched = createTouchCheckingFn('');

  constructor(props: any) {
    super(props);

    this.state = {
      value: {
        email: '',
        password: ''
      },
      errors: {
        email: {
          pattern: false
        },
        password: {
          length: false
        }
      }
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  public render() {
    return (
      <div>
        {this.props.login.data.showSuccessMessage && (
          <InfoMessage
            text={
              'You was successfully signed up. Please use your credentials to login'
            }
            type={InfoMessageType.SUCCESS}
          />
        )}
        {this.props.login.error && (
          <InfoMessage
            text={this.props.login.error as string}
            type={InfoMessageType.ERROR}
          />
        )}
        <LoginForm
          formValue={this.state.value}
          formErrors={this.state.errors}
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleFormSubmit}
        />
      </div>
    );
  }

  public componentDidMount() {
    setTimeout(_ => {
      this.props.hideLoginInfoSuccessMessage();
    }, UI_CONSTANTS.SHOW_SUCCESS_MESSAGE_TIME);
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
    this.props.formSubmit(this.state.value);
  }

  private checkAndToggleErrors(value: LoginFormValue): LoginFormErrors {
    const { email, password } = value;

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
          password.length > VALIDATION_CONSTANTS.PASSWORD_LENGTH.MAX
      }
    };

    return errors;
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(Login);
