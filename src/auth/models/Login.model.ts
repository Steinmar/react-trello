export interface LoginFormValue {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email: {
    pattern: boolean;
  };
  password: {
    length: boolean;
  };
}

export interface LoginFormState {
  value: LoginFormValue;
  errors: LoginFormErrors;
}

export interface LoginFormProps {
  formValue: LoginFormValue;
  formErrors: LoginFormErrors;
  onFormChange: (
    name: string
  ) => ((event: React.ChangeEvent<HTMLInputElement>) => void);
  onFormSubmit: (event) => void;
}
