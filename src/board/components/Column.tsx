import * as React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Icon,
  Grid
} from '@material-ui/core';
import { ColumnProps } from '../models/Column.model';
import ShortTask from './ShortTask';
import NewBoardItemDialog from './NewBoardItemDialog';
import EditableTitle from 'src/shared/components/EditableTitle';
import { EditableTitleResult } from 'src/core/models/EditableTitle';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  deleteContainer: {
    display: 'flex',
    'justify-content': 'flex-end'
  }
});

class Column extends React.Component<ColumnProps> {
  constructor(props: ColumnProps) {
    super(props);

    this.renameColumnHandler = this.renameColumnHandler.bind(this);
    this.deleteColumnHandler = this.deleteColumnHandler.bind(this);
    this.addNewTaskHandler = this.addNewTaskHandler.bind(this);
  }

  public render() {
    const taskList = this.props.tasks.map(task => (
      <ShortTask
        key={task.id}
        id={task.id}
        boardId={this.props.boardId}
        columnId={this.props.id}
        name={task.name}
        order={task.order}
        selectTask={this.props.selectTask}
      />
    ));
    return (
      <div>
        <Card>
          <CardContent>
            <Grid container={true} direction="row">
              <Grid item={true} xs={10}>
                <EditableTitle
                  id={this.props.id}
                  title={this.props.name}
                  editTitle={this.renameColumnHandler}
                  prohibitedNames={this.props.columnProhibitedNames}
                >
                  <Typography variant="h6">{this.props.name}</Typography>
                </EditableTitle>
              </Grid>
              <Grid item={true} xs={2} className={css(styles.deleteContainer)}>
                <IconButton onClick={this.deleteColumnHandler}>
                  <Icon>delete_forever</Icon>
                </IconButton>
              </Grid>
            </Grid>
            <Typography component="div">{taskList}</Typography>
          </CardContent>
          <CardActions>
            <NewBoardItemDialog
              type={'task'}
              saveNewName={this.addNewTaskHandler}
            />
          </CardActions>
        </Card>
      </div>
    );
  }

  private renameColumnHandler(data: EditableTitleResult) {
    this.props.renameColumn({
      boardId: this.props.boardId,
      order: this.props.order,
      tasks: this.props.tasks,
      id: data.id,
      name: data.name
    });
  }

  private deleteColumnHandler() {
    this.props.deleteColumn({
      boardId: this.props.boardId,
      order: this.props.order,
      tasks: this.props.tasks,
      id: this.props.id,
      name: this.props.name
    });
  }

  private addNewTaskHandler(name: string) {
    this.props.addNewTask({
      name,
      columnId: this.props.id,
      boardId: this.props.boardId
    });
  }
}

export default Column;
