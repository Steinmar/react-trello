export function wasTouched(value, defaultValue) {
  return value !== defaultValue;
}

export function createTouchCheckingFn(defaultValue) {
  return value => wasTouched(value, defaultValue);
}
