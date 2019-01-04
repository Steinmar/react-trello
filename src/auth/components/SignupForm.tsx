import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';

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
  }
});

interface ISignupFormState {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

class SignupForm extends React.Component<{}, ISignupFormState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
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
                value={this.state.userName}
                onChange={this.handleChange('userName')}
                className={css(styles.fullWidth)}
              />
            </label>
          </div>
          <div className={css(styles.formRow)}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
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
                value={this.state.password}
                onChange={this.handleChange('password')}
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
                value={this.state.passwordConfirmation}
                onChange={this.handleChange('passwordConfirmation')}
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

  private handleChange(prop: any) {
    return (event: any) => {
      const value = event.target.value;
      this.setState(state => {
        return { ...state, [prop]: value };
      });
    };
  }

  private handleSubmit(event: any) {
    event.preventDefault();
  }
}

export default SignupForm;
