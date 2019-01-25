import * as React from 'react';
import { IconButton, TextField, Grid } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { css, StyleSheet } from 'aphrodite';
import {
  EditableTitleProps,
  EditableTitleState
} from 'src/core/models/EditableTitle';

const styles = StyleSheet.create({
  boardLink: {
    color: '#2200ED'
  },
  input: {
    'align-items': 'center',
    display: 'flex'
  },
  controlButtons: {
    'align-items': 'center',
    display: 'flex',
    'justify-content': 'flex-end'
  },
  controlButtonItem: {
    width: '48px'
  }
});

class EditableTitle extends React.Component<
  EditableTitleProps,
  EditableTitleState
> {
  constructor(props: EditableTitleProps) {
    super(props);

    this.state = {
      newTitle: null,
      oldTitle: props.title,
      saveIsDisabled: false
    };

    this.editTitle = this.editTitle.bind(this);
    this.onUndoEditTitle = this.onUndoEditTitle.bind(this);
    this.newTitleChange = this.newTitleChange.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
  }

  public render() {
    return (
      <Grid container={true}>
        <Grid item={true} xs={12}>
          {this.state.newTitle !== null ? (
            <Grid container={true} alignItems="center">
              <Grid item={true} xs={8} className={css(styles.input)}>
                <TextField
                  placeholder={this.props.placeholder || 'Title'}
                  multiline={!!this.props.rowsMax}
                  rows={this.props.rowsMax || 1}
                  rowsMax={this.props.rowsMax || 1}
                  type="text"
                  value={this.state.newTitle}
                  onChange={this.newTitleChange}
                  onKeyDown={this.onKeyDownHandler}
                  margin="none"
                />
              </Grid>
              <Grid item={true} xs={4} className={css(styles.controlButtons)}>
                <IconButton
                  aria-label="Undo"
                  onClick={this.onUndoEditTitle}
                  className={css(styles.controlButtonItem)}
                >
                  <Icon>undo</Icon>
                </IconButton>
                <IconButton
                  aria-label="Save"
                  onClick={this.editTitle}
                  disabled={this.state.saveIsDisabled}
                  className={css(styles.controlButtonItem)}
                >
                  <Icon>save</Icon>
                </IconButton>
              </Grid>
            </Grid>
          ) : (
            <Grid container={true} alignItems="center">
              <Grid item={true} xs={10}>
                {this.props.children}
              </Grid>
              <Grid item={true} xs={2} className={css(styles.controlButtons)}>
                <IconButton
                  aria-label="Rename"
                  onClick={this.editTitle}
                  className={css(styles.controlButtonItem)}
                >
                  <Icon>create</Icon>
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }

  private newTitleChange(event) {
    const newTitle = event.target.value;
    this.setState(_ => ({
      newTitle,
      saveIsDisabled: this.isSavingDisabled(newTitle)
    }));
  }

  private editTitle() {
    if (this.state.saveIsDisabled) {
      return;
    }
    this.setState(state => {
      const hasNewTitle = !!state.newTitle;
      if (hasNewTitle) {
        this.props.editTitle({
          id: this.props.id,
          name: state.newTitle
        });
      }
      const newTitle = !hasNewTitle ? this.props.title : null;
      return {
        newTitle,
        saveIsDisabled: this.isSavingDisabled(newTitle)
      };
    });
  }

  private isSavingDisabled(newName: string | null) {
    const nameIsntAllowed =
      newName !== null &&
      !!this.props.prohibitedNames &&
      this.props.prohibitedNames.includes(newName);

    const emptyIsntAllowed =
      newName !== null && newName.length === 0 && !this.props.emptyIsAllowed;

    return nameIsntAllowed || emptyIsntAllowed;
  }

  private onKeyDownHandler(event) {
    const enterWasPressed = event.key === 'Enter';

    if (
      (!this.props.rowsMax && enterWasPressed) ||
      (!!this.props.rowsMax && event.ctrlKey && enterWasPressed)
    ) {
      this.editTitle();
    }
  }

  private onUndoEditTitle() {
    this.setState(_ => ({
      newTitle: null,
      saveIsDisabled: this.isSavingDisabled(null)
    }));
  }
}

export default EditableTitle;
