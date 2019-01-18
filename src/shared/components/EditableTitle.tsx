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
  }
});

class EditableTitle extends React.Component<
  EditableTitleProps,
  EditableTitleState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      newTitle: '',
      saveIsDisabled: false
    };

    this.editTitle = this.editTitle.bind(this);
    this.newTitleChange = this.newTitleChange.bind(this);
  }

  public render() {
    return (
      <Grid container={true}>
        <Grid item={true} xs={12}>
          {this.state.newTitle ? (
            <Grid container={true} alignItems="center">
              <Grid item={true} xs={10} className={css(styles.input)}>
                <TextField
                  type="text"
                  value={this.state.newTitle}
                  onChange={this.newTitleChange}
                  margin="none"
                />
              </Grid>
              <Grid item={true} xs={2}>
                <IconButton
                  aria-label="Save"
                  onClick={this.editTitle}
                  disabled={this.state.saveIsDisabled}
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
              <Grid item={true} xs={2}>
                <IconButton aria-label="Rename" onClick={this.editTitle}>
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
    this.setState(state => {
      const hasNewTitle = !!state.newTitle;
      if (hasNewTitle) {
        this.props.editTitle({
          id: this.props.id,
          name: state.newTitle
        });
      }
      const newTitle = !hasNewTitle ? this.props.title : '';
      return {
        newTitle,
        saveIsDisabled: this.isSavingDisabled(newTitle)
      };
    });
  }

  private isSavingDisabled(newName: string) {
    return (
      !!this.props.prohibitedNames &&
      this.props.prohibitedNames.includes(newName)
    );
  }
}

export default EditableTitle;
