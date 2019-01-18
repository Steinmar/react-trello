import * as React from 'react';

// import pageStyles from 'src/styles/page';
import { ShortTaskProps } from '../models/BoardDetails.model';

// const styles = pageStyles;

class ShortTask extends React.Component<ShortTaskProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <div>Short task</div>;
  }
}

export default ShortTask;
