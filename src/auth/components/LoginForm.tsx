import * as React from 'react';
import { css } from 'aphrodite';
import { LoginFormProps } from '../models';
import { VALIDATION_CONSTANTS } from '../CONSTANTS';
import { submitButtonIsDisabled } from 'src/utils';
import formStyles from 'src/styles/forms';
import { TextField, Button, CardHeader, Typography } from '@material-ui/core';
import { ROUTES } from 'src/core/Routes';
import { Link } from 'react-router-dom';

const styles = formStyles;
const PASSWORD_LENGTH = {
  MIN: VALIDATION_CONSTANTS.PASSWORD_LENGTH.MIN,
  MAX: VALIDATION_CONSTANTS.PASSWORD_LENGTH.MAX
};

const INPUT_MARGIN = 'none';

class LoginForm extends React.Component<LoginFormProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className={css(styles.formContainer)}>
        <form className={css(styles.form)} onSubmit={this.props.onFormSubmit}>
          <CardHeader className={css(styles.header)} title="Login" />
          <div className={css(styles.formRow)}>
            <TextField
              label={
                this.props.formErrors.email.pattern
                  ? 'Email should be valid'
                  : 'Email'
              }
              error={this.props.formErrors.email.pattern}
              value={this.props.formValue.email}
              onChange={this.props.onFormChange('email')}
              margin={INPUT_MARGIN}
            />
            <TextField
              error={this.props.formErrors.password.length}
              label={
                this.props.formErrors.password.length
                  ? `Password length should be from ${PASSWORD_LENGTH.MIN} to ${
                      PASSWORD_LENGTH.MAX
                    } symbols`
                  : 'Password'
              }
              type="password"
              value={this.props.formValue.password}
              onChange={this.props.onFormChange('password')}
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
              Login
            </Button>
          </div>
          <div className={css(styles.linkToRedirectContainer)}>
            <Typography component="p">
              Don't have an account? You can&nbsp;
              <Link to={ROUTES.AUTH.SIGN_UP}>Sign up</Link>!
            </Typography>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
