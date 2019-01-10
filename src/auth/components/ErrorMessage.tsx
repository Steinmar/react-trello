import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';

export interface ErrorMessageProps {
  condition: boolean;
  text: string;
}

const styles = StyleSheet.create({
  'form-error__message': {
    color: 'red'
  }
});

function ErrorMessage(props: ErrorMessageProps) {
  return props.condition ? (
    <span className={css(styles['form-error__message'])}>{props.text}</span>
  ) : null;
}

export default ErrorMessage;
