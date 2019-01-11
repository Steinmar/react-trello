import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';

export enum InfoMessageType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success'
}
export interface InfoMessageProps {
  text: string;
  type?: InfoMessageType;
}

const styles = StyleSheet.create({
  message: {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'min-height': '40px',
    'max-width': '300px',
    margin: 'auto',
    border: '1px solid',
    'border-radius': '4px'
  },
  error: {
    'border-color': '#b90000',
    background: '#ffdede'
  },
  warning: {
    background: '#ffedb8',
    'border-color': '#d09c00'
  },
  success: {
    background: '#149e140a',
    'border-color': '#007700'
  }
});

function InfoMessage(props: InfoMessageProps) {
  const type = props.type || InfoMessageType.WARNING;
  return (
    <div>
      <span className={css(styles.message, styles[type])}>{props.text}</span>
    </div>
  );
}

export default InfoMessage;
