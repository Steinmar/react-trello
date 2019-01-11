export interface SignupFormValue {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupFormErrors {
  email: {
    pattern: boolean;
  };
  password: {
    length: boolean;
    confirmationLength: boolean;
    match: boolean;
  };
  userName: {
    length: boolean;
  };
}

export interface SignupFormState {
  value: SignupFormValue;
  errors: SignupFormErrors;
}

export interface SignupFormProps {
  formValue: SignupFormValue;
  formErrors: SignupFormErrors;
  onFormChange: (
    name: string
  ) => ((event: React.ChangeEvent<HTMLInputElement>) => void);
  onFormSubmit: (event) => void;
}
