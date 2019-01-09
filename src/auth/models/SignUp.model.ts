export interface ISignupFormValue {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ISignupFormErrors {
  email: {
    length: boolean;
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

export interface ISignupFormState {
  value: ISignupFormValue;
  errors: ISignupFormErrors;
}

export interface ISignupFormProps {
  formValue: ISignupFormValue;
  formErrors: ISignupFormErrors;
  onFormChange: (
    name: string
  ) => ((event: React.ChangeEvent<HTMLInputElement>) => void);
}
