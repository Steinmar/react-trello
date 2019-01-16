import * as React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import pageStyles from 'src/styles/page';
import { css } from 'aphrodite';

const styles = pageStyles;

class Board extends React.Component<{}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className={css(styles.paper)}>
        <Paper className={css(styles.paper)}>
          <Typography variant="h6" color="inherit">
            Board name
          </Typography>
          <Grid container={true} spacing={24}>
            <Grid item={true} xs={12}>
              Column list
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Board;
