import * as React from 'react';
import { css } from 'aphrodite';
import { SignupFormProps } from '../models';
import { VALIDATION_CONSTANTS } from '../CONSTANTS';
import { submitButtonIsDisabled } from 'src/utils';
import formStyles from 'src/styles/forms';
import { TextField, Button, CardHeader, Typography } from '@material-ui/core';
import { ROUTES } from 'src/core/Routes';
import { Link } from 'react-router-dom';

const styles = formStyles;

const USER_NAME_LENGTH = {
  MIN: VALIDATION_CONSTANTS.NAME_LENGTH.MIN,
  MAX: VALIDATION_CONSTANTS.NAME_LENGTH.MAX
};

const PASSWORD_LENGTH = {
  MIN: VALIDATION_CONSTANTS.PASSWORD_LENGTH.MIN,
  MAX: VALIDATION_CONSTANTS.PASSWORD_LENGTH.MAX
};

const INPUT_MARGIN = 'none';

class SignupForm extends React.Component<SignupFormProps> {
  constructor(props: SignupFormProps) {
    super(props);
  }

  public render() {
    return (
      <div className={css(styles.formContainer)}>
        <form className={css(styles.form)} onSubmit={this.props.onFormSubmit}>
          <CardHeader className={css(styles.header)} title="Sign up" />
          <div className={css(styles.formRow)}>
            <TextField
              name="name"
              label={
                this.props.formErrors.userName.length
                  ? `Name length should be from ${USER_NAME_LENGTH.MIN} to ${
                      USER_NAME_LENGTH.MAX
                    } symbols`
                  : 'Name'
              }
              error={this.props.formErrors.userName.length}
              value={this.props.formValue.userName}
              onChange={this.props.onFormChange('userName')}
              margin={INPUT_MARGIN}
            />
          </div>
          <div className={css(styles.formRow)}>
            <TextField
              type="email"
              name="email"
              value={this.props.formValue.email}
              onChange={this.props.onFormChange('email')}
              label={
                this.props.formErrors.email.pattern
                  ? 'Email should be valid'
                  : 'Email'
              }
              error={this.props.formErrors.email.pattern}
              margin={INPUT_MARGIN}
            />
          </div>
          <div className={css(styles.formRow)}>
            <TextField
              type="password"
              name="password"
              value={this.props.formValue.password}
              onChange={this.props.onFormChange('password')}
              label={
                this.props.formErrors.password.length
                  ? `Password length should be from ${PASSWORD_LENGTH.MIN} to ${
                      PASSWORD_LENGTH.MAX
                    } symbols`
                  : 'Password'
              }
              error={this.props.formErrors.password.length}
              margin={INPUT_MARGIN}
            />
          </div>
          <div className={css(styles.formRow)}>
            <TextField
              type="password"
              name="passwordConfirmation"
              value={this.props.formValue.passwordConfirmation}
              onChange={this.props.onFormChange('passwordConfirmation')}
              label={
                (this.props.formErrors.password.confirmationLength &&
                  `Password length should be from ${PASSWORD_LENGTH.MIN} to ${
                    PASSWORD_LENGTH.MAX
                  } symbols`) ||
                (this.props.formErrors.password.match &&
                  "Passwords didn't match!") ||
                'Confirm password'
              }
              error={
                this.props.formErrors.password.length ||
                this.props.formErrors.password.match
              }
              margin={INPUT_MARGIN}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={css(formStyles.button)}
              disabled={submitButtonIsDisabled(this.props)}
            >
              Sign up
            </Button>
          </div>
          <div className={css(styles.linkToRedirectContainer)}>
            <Typography component="p">
              Already have an account? You can&nbsp;
              <Link to={ROUTES.AUTH.LOGIN}>Login</Link>!
            </Typography>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
