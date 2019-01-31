import * as React from 'react';
import { Grid, ListItem } from '@material-ui/core';
import { Link as MaterialLink } from '@material-ui/core';
import EditableTitle from 'src/shared/components/EditableTitle';
import DeleteIconButton from 'src/shared/components/DeleteIconButton';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { ROUTES } from 'src/core/Routes';
import { BoardListItemProps } from '../../models';

const styles = StyleSheet.create({
  boardLink: {
    color: '#2200ED'
  }
});

class BoardListItem extends React.Component<BoardListItemProps> {
  constructor(props: BoardListItemProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <ListItem>
          <Grid item={true} xs={6}>
            <EditableTitle
              editTitle={this.props.updateBoard}
              title={this.props.name}
              id={this.props.id}
            >
              <Link
                className={css(styles.boardLink)}
                to={ROUTES.BOARDS.SELECTED_ITEM(this.props.id)}
              >
                <MaterialLink component="button" variant="body1">
                  {this.props.name}
                </MaterialLink>
              </Link>
            </EditableTitle>
          </Grid>
          <Grid item={true} xs={1}>
            <DeleteIconButton
              id={this.props.id}
              deleteFunction={this.props.deleteBoard}
            />
          </Grid>
        </ListItem>
      </div>
    );
  }
}

export default BoardListItem;
