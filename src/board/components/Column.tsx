import * as React from 'react';
import { Typography, Card, CardContent, CardActions } from '@material-ui/core';
// import pageStyles from 'src/styles/page';
import { ColumnProps } from '../models/BoardDetails.model';
import ShortTask from './ShortTask';
import NewBoardItemDialog from './NewBoardItemDialog';

// const styles = pageStyles;

class Column extends React.Component<ColumnProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h6">Lorem ipsum</Typography>
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
}

export default Column;
