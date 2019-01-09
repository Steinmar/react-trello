import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { ISignupFormProps } from '../models';

const styles = StyleSheet.create({
  formRow: {
    width: '100%'
  },
  formContainer: {
    maxWidth: '500px',
    display: 'flex',
    margin: 'auto'
  },
  fullWidth: {
    width: '100%'
  },
  'form-error__message': {
    color: 'red'
  }
});

class SignupForm extends React.Component<ISignupFormProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className={css(styles.formContainer)}>
        <form onSubmit={this.handleSubmit}>
          <div className={css(styles.formRow)}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={this.props.formValue.userName}
                onChange={this.props.onFormChange('userName')}
                className={css(styles.fullWidth)}
              />
            </label>
            <span className={css(styles['form-error__message'])}>
              Name length should be from 4 to 16 symbols
            </span>
          </div>
          <div className={css(styles.formRow)}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={this.props.formValue.email}
                onChange={this.props.onFormChange('email')}
                className={css(styles.fullWidth)}
              />
            </label>
          </div>
          <div className={css(styles.formRow)}>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={this.props.formValue.password}
                onChange={this.props.onFormChange('password')}
                className={css(styles.fullWidth)}
              />
            </label>
          </div>
          <div className={css(styles.formRow)}>
            <label>
              Confirm password:
              <input
                type="password"
                name="passwordConfirmation"
                value={this.props.formValue.passwordConfirmation}
                onChange={this.props.onFormChange('passwordConfirmation')}
                className={css(styles.fullWidth)}
              />
            </label>
          </div>
          <div className={css(styles.formRow)}>
            <input type="submit" value="SignUp" />
          </div>
        </form>
      </div>
    );
  }

  private handleSubmit(event: any) {
    event.preventDefault();
  }
}

export default SignupForm;
