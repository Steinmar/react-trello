import * as React from 'react';
import { BoardListProps } from '../../models';
import { Typography, Button, List, Grid } from '@material-ui/core';
import BoardListItem from './BoardListItem';

class BoardList extends React.Component<BoardListProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const boardList = this.props.list
      ? this.props.list.map(item => (
          <BoardListItem
            key={item.id}
            id={item.id}
            name={item.name}
            deleteBoard={this.props.deleteBoard}
            updateBoard={this.props.updateBoard}
          />
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
