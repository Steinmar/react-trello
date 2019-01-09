import * as React from 'react';
import SignupForm from '../components/SignupForm';
import { ISignupFormState } from '../models';

class Signup extends React.Component<{}, ISignupFormState> {
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
          length: false,
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
  }

  public render() {
    return (
      <SignupForm
        formValue={this.state.value}
        formErrors={this.state.errors}
        onFormChange={this.handleFormChange}
      />
    );
  }

  private handleFormChange(prop: any) {
    return (event: any) => {
      const value = event.target.value;
      this.setState(state => {
        return {
          ...state,
          value: {
            ...state.value,
            [prop]: value
          }
        };
      });
    };
  }
}

export default Signup;
