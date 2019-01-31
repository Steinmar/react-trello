import * as React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Column from '../column/Column';
import pageStyles from 'src/styles/page';
import { css, StyleSheet } from 'aphrodite';
import { BoardProps } from '../../models';
import NewBoardItemDialog from './NewBoardItemDialog';
import ColumnDropTarget from '../column/ColumnDropTarget';

const styles = pageStyles;
const customStyles = StyleSheet.create({
  columnWrapper: {
    'flex-wrap': 'inherit'
  },
  infiniteInternalWidth: {
    'overflow-x': 'auto',
    'min-height': '90vh'
  },
  newDialog: {
    width: '167px'
  },
  columnSize: {
    'max-width': '340px',
    'min-width': '340px'
  }
});

class Board extends React.Component<BoardProps> {
  constructor(props: BoardProps) {
    super(props);

    this.addNewColumnHandler = this.addNewColumnHandler.bind(this);
  }

  public render() {
    const columnList = this.props.columns.map(column => (
      <Grid
        item={true}
        key={column.id}
        xs={12}
        className={css(customStyles.columnSize)}
      >
        <ColumnDropTarget boardId={column.boardId} id={column.id}>
          <Column
            id={column.id}
            boardId={column.boardId}
            name={column.name}
            order={column.order}
            tasks={column.tasks}
            addNewTask={this.props.addNewTask}
            renameColumn={this.props.renameColumn}
            deleteColumn={this.props.deleteColumn}
            columnProhibitedNames={this.props.columnProhibitedNames}
            selectTask={this.props.selectTask}
            changeTaskColumn={this.props.changeTaskColumn}
          />
        </ColumnDropTarget>
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

          <Grid item={true} xs={4} sm={4}>
            <div className={css(customStyles.newDialog)}>
              <NewBoardItemDialog
                type={'column'}
                saveNewName={this.addNewColumnHandler}
                prohibitedNames={this.props.columnProhibitedNames}
              />
            </div>
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
