import * as React from 'react';
import {
  BoardListItemProps,
  BoardListItemState
} from '../models/BoardList.model';
import { ListItem, IconButton, TextField, Grid } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { css, StyleSheet } from 'aphrodite';
import { Link } from 'react-router-dom';
import { Link as MaterialLink } from '@material-ui/core';
import { ROUTES } from 'src/core/Routes';

const styles = StyleSheet.create({
  boardLink: {
    color: '#2200ED'
  },
  renameInput: {
    'align-items': 'center',
    display: 'flex'
  }
});

class BoardListItem extends React.Component<
  BoardListItemProps,
  BoardListItemState
> {
  constructor(props: BoardListItemProps) {
    super(props);

    this.state = {
      newName: ''
    };

    this.renameBoard = this.renameBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.newNameChange = this.newNameChange.bind(this);
  }

  public render() {
    return (
      <ListItem>
        <Grid container={true}>
          <Grid item={true} xs={4}>
            {this.state.newName ? (
              <Grid container={true} alignItems="center">
                <Grid item={true} xs={10} className={css(styles.renameInput)}>
                  <TextField
                    type="text"
                    value={this.state.newName}
                    onChange={this.newNameChange}
                    margin="none"
                  />
                </Grid>
                <Grid item={true} xs={2}>
                  <IconButton aria-label="Save" onClick={this.renameBoard}>
                    <Icon>save</Icon>
                  </IconButton>
                </Grid>
              </Grid>
            ) : (
              <Grid container={true} alignItems="center">
                <Grid item={true} xs={10}>
                  <Link
                    className={css(styles.boardLink)}
                    to={ROUTES.BOARDS.SELECTED_ITEM(this.props.id)}
                  >
                    <MaterialLink>{this.props.name}</MaterialLink>
                  </Link>
                </Grid>
                <Grid item={true} xs={2}>
                  <IconButton aria-label="Rename" onClick={this.renameBoard}>
                    <Icon>create</Icon>
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item={true} xs={1}>
            <IconButton aria-label="Rename" onClick={this.deleteBoard}>
              <Icon>delete</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    );
  }

  private newNameChange(event) {
    const newName = event.target.value;
    this.setState(_ => ({
      newName
    }));
  }

  private deleteBoard() {
    this.props.deleteBoard(this.props.id);
  }

  private renameBoard() {
    this.setState(state => {
      const hasNewName = !!state.newName;
      if (hasNewName) {
        this.props.renameBoard({
          id: this.props.id,
          name: state.newName
        });
      }
      return { newName: !hasNewName ? this.props.name : '' };
    });
  }
}

export default BoardListItem;
