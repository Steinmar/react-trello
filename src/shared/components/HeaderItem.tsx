import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = StyleSheet.create({
  toolbar: {
    'justify-content': 'space-between'
  },
  name: {
    'text-transform': 'capitalize'
  }
});

export interface HeaderItemProps {
  name: string;
  logout: () => void;
}

function HeaderItem(props: any) {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar className={css(styles.toolbar)}>
          {/* <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" color="inherit">
            Welcome <span className={css(styles.name)}>{props.name}</span>!
          </Typography>
          <Button color="inherit" onClick={props.logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderItem;
