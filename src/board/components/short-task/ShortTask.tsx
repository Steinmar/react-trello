import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { Typography } from '@material-ui/core';
import { ShortTaskProps } from 'src/task-card/models';

const styles = StyleSheet.create({
  inner: {
    'border-radius': '2px',
    cursor: 'pointer',
    ':hover': {
      'background-color': '#cfe3f5'
    }
  }
});

class ShortTask extends React.Component<ShortTaskProps> {
  constructor(props: ShortTaskProps) {
    super(props);

    this.selectTaskHandler = this.selectTaskHandler.bind(this);
  }

  public render() {
    return (
      <Typography
        variant="body2"
        className={css(styles.inner)}
        onClick={this.selectTaskHandler}
      >
        {this.props.name}
      </Typography>
    );
  }

  private selectTaskHandler() {
    this.props.selectTask({
      taskId: this.props.id,
      columnId: this.props.columnId,
      boardId: this.props.boardId
    });
  }
}

export default ShortTask;
