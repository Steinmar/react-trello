import { getPrimitivesArrayFromNestedCollection } from './index';

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
