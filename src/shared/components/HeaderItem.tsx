import * as React from 'react';

function HeaderItem(props: any) {
  return (
    <div>
      User: {props.name} <button onClick={props.logoutHandler}>Logout</button>
    </div>
  );
}

export default HeaderItem;
