import * as React from 'react';
import { Typography, Card, CardContent, CardActions } from '@material-ui/core';
import { ColumnProps } from '../models/BoardDetails.model';
import ShortTask from './ShortTask';
import NewBoardItemDialog from './NewBoardItemDialog';
import EditableTitle from 'src/shared/components/EditableTitle';
import { EditableTitleResult } from 'src/core/models/EditableTitle';

class Column extends React.Component<ColumnProps> {
  constructor(props: ColumnProps) {
    super(props);

    this.renameColumnHandler = this.renameColumnHandler.bind(this);
  }

  public render() {
    return (
      <div>
        <Card>
          <CardContent>
            <EditableTitle
              id={this.props.id}
              title={this.props.name}
              editTitle={this.renameColumnHandler}
              prohibitedNames={this.props.columnProhibitedNames}
            >
              <Typography variant="h6">{this.props.name}</Typography>
            </EditableTitle>
            <Typography component="div">
              <ShortTask boardId={'1'} name={'Lorem ipsum'} order={0} />
            </Typography>
          </CardContent>
          <CardActions>
            <NewBoardItemDialog
              type={'task'}
              saveNewName={this.props.addNewTask}
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
}

export default Column;
