import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';
import ErrorMessage from './ErrorMessage';
import { ISignupFormProps, ISignupFormValue } from '../models';
import { VALIDATION_CONSTANTS } from '../CONSTANTS';
import { formIsInvalid } from 'src/utils';

const formWidth = '280px'; // TODO move from aphrodite and change it to nested css styles

const styles = StyleSheet.create({
  formRow: {
    width: '100%',
    display: 'flex',
    'flex-flow': 'column',
    padding: '10px 0'
  },
  formSubmitRow: {
    display: 'flex',
    'justify-content': 'flex-end',
    'flex-flow': 'row'
  },
  formContainer: {
    width: formWidth,
    display: 'flex',
    margin: 'auto'
  },
  form: {
    width: formWidth
  },
  input: {
    width: '100%',
    'box-sizing': 'border-box'
  },
  errorInput: {
    'border-bottom': '1px solid red'
  },
  submitButton: {
    height: '24px',
    background: 'initial'
  },
  disabledSubmitButton: {
    background: '#9e9e9e87',
    color: '#fff'
  }
});

const USER_NAME_LENGTH = {
  MIN: VALIDATION_CONSTANTS.NAME_LENGTH.MIN,
  MAX: VALIDATION_CONSTANTS.NAME_LENGTH.MAX
};

const PASSWORD_LENGTH = {
  MIN: VALIDATION_CONSTANTS.PASSWORD_LENGTH.MIN,
  MAX: VALIDATION_CONSTANTS.PASSWORD_LENGTH.MAX
};

class SignupForm extends React.Component<
  ISignupFormProps,
  { submitButton: any }
> {
  private submitButton;

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className={css(styles.formContainer)}>
        <form className={css(styles.form)} onSubmit={this.props.onFormSubmit}>
          <div className={css(styles.formRow)}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={this.props.formValue.userName}
                onChange={this.props.onFormChange('userName')}
                className={css(
                  styles.input,
                  this.props.formErrors.userName.length && styles.errorInput
                )}
              />
            </label>
            <ErrorMessage
              condition={this.props.formErrors.userName.length}
              text={`Name length should be from ${USER_NAME_LENGTH.MIN} to ${
                USER_NAME_LENGTH.MAX
              } symbols`}
            />
          </div>
          <div className={css(styles.formRow)}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={this.props.formValue.email}
                onChange={this.props.onFormChange('email')}
                className={css(
                  styles.input,
                  this.props.formErrors.email.pattern && styles.errorInput
                )}
              />
            </label>
            <ErrorMessage
              condition={this.props.formErrors.email.pattern}
              text={'Email should be valid'}
            />
          </div>
          <div className={css(styles.formRow)}>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={this.props.formValue.password}
                onChange={this.props.onFormChange('password')}
                className={css(
                  styles.input,
                  this.props.formErrors.password.length && styles.errorInput
                )}
              />
            </label>

            <ErrorMessage
              condition={this.props.formErrors.password.length}
              text={`Password length should be from ${PASSWORD_LENGTH.MIN} to ${
                PASSWORD_LENGTH.MAX
              } symbols`}
            />
          </div>
          <div className={css(styles.formRow)}>
            <label>
              Confirm password:
              <input
                type="password"
                name="passwordConfirmation"
                value={this.props.formValue.passwordConfirmation}
                onChange={this.props.onFormChange('passwordConfirmation')}
                className={css(
                  styles.input,
                  (this.props.formErrors.password.confirmationLength ||
                    this.props.formErrors.password.match) &&
                    styles.errorInput
                )}
              />
            </label>
            <ErrorMessage
              condition={this.props.formErrors.password.confirmationLength}
              text={`Password length should be from ${PASSWORD_LENGTH.MIN} to ${
                PASSWORD_LENGTH.MAX
              } symbols`}
            />
            <ErrorMessage
              condition={this.props.formErrors.password.match}
              text={"Passwords didn't match!"}
            />
          </div>
          <div className={css(styles.formSubmitRow)}>
            <input
              className={css(
                styles.submitButton,
                this.submitButtonIsDisabled(this.props) &&
                  styles.disabledSubmitButton
              )}
              ref={this.submitButton}
              disabled={this.submitButtonIsDisabled(this.props)}
              type="submit"
              value="Sign up"
            />
          </div>
        </form>
      </div>
    );
  }

  private formValueWasNotSet(value: ISignupFormValue) {
    const toArray = Object.values(value);
    return toArray.includes('');
  }

  private submitButtonIsDisabled(props) {
    return (
      formIsInvalid(props.formErrors) ||
      this.formValueWasNotSet(props.formValue)
    );
  }
}

export default SignupForm;
