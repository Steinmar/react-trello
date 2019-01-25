import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

export enum InfoMessageType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success'
}
export interface InfoMessageProps {
  text: string | string[];
  children?: React.ReactNode;
  type?: InfoMessageType;
}

const styles = StyleSheet.create({
  wrapper: {
    margin: '10px'
  },
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
  },
  cardContent: {
    padding: '10px'
  }
});

function InfoMessage(props: InfoMessageProps) {
  const type = props.type || InfoMessageType.WARNING;
  const preparedText =
    typeof props.text === 'string'
      ? props.text
      : props.text.map(item => <div key={item}>{item}</div>);
  return (
    <div className={css(styles.wrapper)}>
      <Card className={css(styles.message, styles[type])}>
        <CardContent className={css(styles.cardContent)}>
          <Typography component="div" color="textPrimary">
            {preparedText}
            {props.children}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoMessage;
