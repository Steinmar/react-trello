import * as React from 'react';
import { BoardListProps } from '../models/BoardList.model';
import { Typography, Button, List, Grid, ListItem } from '@material-ui/core';
import { Link as MaterialLink } from '@material-ui/core';
import EditableTitle from 'src/shared/components/EditableTitle';
import DeleteIconButton from 'src/shared/components/DeleteIconButton';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { ROUTES } from 'src/core/Routes';

const styles = StyleSheet.create({
  boardLink: {
    color: '#2200ED'
  }
});

class BoardList extends React.Component<BoardListProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const boardList = this.props.list
      ? this.props.list.map((item, index) => (
          <ListItem key={item.id}>
            <Grid item={true} xs={3}>
              <EditableTitle
                editTitle={this.props.updateBoard}
                title={item.name}
                id={item.id}
              >
                <Link
                  className={css(styles.boardLink)}
                  to={ROUTES.BOARDS.SELECTED_ITEM(item.id)}
                >
                  <MaterialLink component="button" variant="body1">
                    {item.name}
                  </MaterialLink>
                </Link>
              </EditableTitle>
            </Grid>
            <Grid item={true} xs={1}>
              <DeleteIconButton
                id={item.id}
                deleteFunction={this.props.deleteBoard}
              />
            </Grid>
          </ListItem>
        ))
      : [];
    return (
      <div>
        {boardList.length === 0 ? (
          <Typography component="span">
            There is no boards. Please create board to start work
          </Typography>
        ) : (
          <List>{boardList}</List>
        )}
        <br />
        <Grid container={true} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.addBoard}
          >
            Create new
          </Button>
        </Grid>
      </div>
    );
  }
}

export default BoardList;
