import * as React from 'react';
import { css } from 'aphrodite';
import ErrorMessage from './ErrorMessage';
import { LoginFormProps } from '../models';
import { VALIDATION_CONSTANTS } from '../CONSTANTS';
import { submitButtonIsDisabled } from 'src/utils';
import formStyles from 'src/styles/forms';

const styles = formStyles;

const PASSWORD_LENGTH = {
  MIN: VALIDATION_CONSTANTS.PASSWORD_LENGTH.MIN,
  MAX: VALIDATION_CONSTANTS.PASSWORD_LENGTH.MAX
};

class LoginForm extends React.Component<LoginFormProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className={css(styles.formContainer)}>
        <form className={css(styles.form)} onSubmit={this.props.onFormSubmit}>
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
          <div className={css(styles.formSubmitRow)}>
            <input
              className={css(
                styles.submitButton,
                submitButtonIsDisabled(this.props) &&
                  styles.disabledSubmitButton
              )}
              disabled={submitButtonIsDisabled(this.props)}
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
