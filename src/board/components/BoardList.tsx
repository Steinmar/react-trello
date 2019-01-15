import * as React from 'react';
import BoardListItem from './BoardListItem';
import { BoardListProps } from '../models/BoardList.model';
import { Typography, Button, List, Grid } from '@material-ui/core';

class BoardList extends React.Component<BoardListProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const boardList = this.props.list
      ? this.props.list.map((item, index) => (
          <BoardListItem
            name={item.name}
            id={item.id}
            key={index}
            deleteBoard={this.props.deleteBoard}
            renameBoard={this.props.updateBoard}
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
          {/* <Grid item={true}> */}
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.addBoard}
          >
            Create new
          </Button>
        </Grid>
        {/* </Grid> */}
      </div>
    );
  }
}

export default BoardList;
