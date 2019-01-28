import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Button, Grid, IconButton, Icon } from '@material-ui/core';

const buttonIndent = '5px';

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    'background-color': 'rgba(0,0,0, 0.5)'
  },
  popupInner: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    top: '25%',
    bottom: '25%',
    margin: 'auto',
    background: 'white',
    padding: '10px',
    'border-radius': '2px',
    '@media (max-width: 600px)': {
      left: '0',
      right: '0',
      top: '0',
      bottom: '0'
    }
  },
  button: {
    ':first-child': {
      marginRight: buttonIndent
    },
    ':last-child': {
      marginLeft: buttonIndent
    }
  },
  justifyFlexEnd: {
    display: 'flex',
    justify: 'flex-end'
  },
  closeButton: {
    position: 'absolute',
    right: '1px',
    top: '1px'
  },
  popupContent: {
    'margin-right': '48px'
  }
});

export interface PopupButton {
  title?: string;
  handler: () => void;
}

export interface PopupSubmitButton extends PopupButton {
  disabled?: boolean;
}

export interface PopupProps {
  children?: React.ReactNode;
  simpleText?: string;
  cancelButton?: { title: string };
  submitButton?: PopupSubmitButton;
  closeHandler: () => void;
}

class Popup extends React.Component<PopupProps> {
  private overlayRef: React.RefObject<HTMLDivElement>;

  constructor(props: PopupProps) {
    super(props);
    this.overlayRef = React.createRef();
    this.overlayClickHandler = this.overlayClickHandler.bind(this);
  }

  public render() {
    const cancelButton = this.props.cancelButton ? (
      <Button
        variant="contained"
        color="default"
        className={css(styles.button)}
        onClick={this.props.closeHandler}
      >
        {(this.props.cancelButton && this.props.cancelButton.title) || 'Cancel'}
      </Button>
    ) : null;
    const submitButton = this.props.submitButton ? (
      <Button
        variant="contained"
        color="primary"
        className={css(styles.button)}
        disabled={this.props.submitButton.disabled}
        onClick={this.props.submitButton.handler}
      >
        {this.props.submitButton.title || 'Ok'}
      </Button>
    ) : null;

    const popupButtons =
      cancelButton || submitButton ? (
        <Grid item={true} xs={12} className={css(styles.justifyFlexEnd)}>
          {cancelButton}
          {submitButton}
        </Grid>
      ) : null;

    const closeButton = !this.props.cancelButton ? (
      <IconButton
        aria-label="Close"
        className={css(styles.closeButton)}
        onClick={this.props.closeHandler}
      >
        <Icon>close</Icon>
      </IconButton>
    ) : null;

    return (
      <div
        className={css(styles.popup)}
        ref={this.overlayRef}
        onClick={this.overlayClickHandler}
      >
        <div className={css(styles.popupInner)}>
          <Grid container={true}>
            <Grid item={true} xs={12}>
              {closeButton}
              <div className={!!closeButton ? css(styles.popupContent) : ''}>
                {this.props.children || this.props.simpleText}
              </div>
            </Grid>
            {popupButtons}
          </Grid>
        </div>
      </div>
    );
  }

  private overlayClickHandler(event) {
    if (this.overlayRef.current === event.target) {
      this.props.closeHandler();
    }
  }
}

export default Popup;
