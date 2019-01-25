import * as React from 'react';

class Timer extends React.Component<any, any> {
  constructor(props) {
    super(props);

    const intervalID = setInterval(_ => {
      const newValue = this.state.value - 1;
      this.setState({
        value: newValue
      });
      if (!newValue) {
        clearInterval(this.state.intervalID);
        this.setState({ intervalID: null });
      }
    }, 1000);

    this.state = {
      value: props.time,
      intervalID
    };
  }

  public componentWillUnmount() {
    if (this.state.intervalID) {
      clearInterval(this.state.intervalID);
    }
  }

  public render() {
    return <span>{this.state.value} sec</span>;
  }
}

export default Timer;
