import * as React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Column from './Column';
import pageStyles from 'src/styles/page';
import { css } from 'aphrodite';
import { BoardProps } from '../models/BoardDetails.model';
import NewBoardItemDialog from './NewBoardItemDialog';

const styles = pageStyles;

class Board extends React.Component<BoardProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const columnList = [
      <Column
        key={1}
        boardId={this.props.id}
        name={''}
        order={0}
        tasks={[]}
        addNewTask={this.props.addNewTask}
      />
    ];
    return (
      <div className={css(styles.paper)}>
        <Typography variant="h6" color="inherit">
          {this.props.name}
        </Typography>
        <Grid container={true} spacing={24}>
          <Grid item={true} xs={5} lg={3} md={4} sm={5}>
            {columnList}
          </Grid>
          <Grid item={true} xs={1} sm={2}>
            <NewBoardItemDialog
              type={'column'}
              saveNewName={this.props.addNewColumn}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Board;
