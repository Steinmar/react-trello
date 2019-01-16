import * as React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Column from './Column';
import pageStyles from 'src/styles/page';
import { css, StyleSheet } from 'aphrodite';
import { BoardProps } from '../models/BoardDetails.model';
import NewBoardItemDialog from './NewBoardItemDialog';

const styles = pageStyles;
const customStyles = StyleSheet.create({
  columnWrapper: {
    'flex-wrap': 'inherit'
  },
  infiniteInternalWidth: {
    'overflow-x': 'auto'
  }
});

class Board extends React.Component<BoardProps> {
  constructor(props: any) {
    super(props);

    this.addNewColumnHandler = this.addNewColumnHandler.bind(this);
  }

  public render() {
    const columnList = this.props.columns.map(column => (
      <Grid item={true} key={column.id} xs={5} lg={3} md={4} sm={5}>
        <Column
          id={column.id}
          boardId={column.boardId}
          name={column.name}
          order={column.order}
          tasks={column.tasks}
          addNewTask={this.props.addNewTask}
          renameColumn={this.props.renameColumn}
          columnProhibitedNames={this.props.columnProhibitedNames}
        />
      </Grid>
    ));
    return (
      <div className={css(styles.paper, customStyles.infiniteInternalWidth)}>
        <Typography variant="h6" color="inherit">
          {this.props.name}
        </Typography>
        <Grid
          container={true}
          spacing={24}
          direction="row"
          className={css(customStyles.columnWrapper)}
        >
          {columnList}

          <Grid item={true} xs={1} sm={2}>
            <NewBoardItemDialog
              type={'column'}
              saveNewName={this.addNewColumnHandler}
              prohibitedNames={this.props.columnProhibitedNames}
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  private addNewColumnHandler(name: string) {
    this.props.addNewColumn({ name, boardId: this.props.id });
  }
}

export default Board;
