import { getPrimitivesArrayFromNestedCollection } from './index';

export interface FormValue {
  [x: string]: string;
}

export function wasTouched(value, defaultValue) {
  return value !== defaultValue;
}

export function createTouchCheckingFn(defaultValue) {
  return value => wasTouched(value, defaultValue);
}

export function formIsValid(formErrors) {
  const errors = getPrimitivesArrayFromNestedCollection(formErrors, 'boolean');
  return !errors.includes(true);
}

export function formIsInvalid(formErrors) {
  return !formIsValid(formErrors);
}

export function formValueWasNotSet(value: FormValue) {
  const toArray = Object.values(value);
  return toArray.includes('');
}

export function submitButtonIsDisabled(props) {
  return formIsInvalid(props.formErrors) || formValueWasNotSet(props.formValue);
}
