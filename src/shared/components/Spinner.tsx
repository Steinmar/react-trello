import * as React from 'react';
import { Icon } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';
import { SpinnerProps, SpinnerState, TimerID } from 'src/core/models';

// TODO run it once and store cache in the store
function madeTranslateKeyframes() {
  const step = 100;
  const maxPercentage = 100;
  const maxDegree = 360;
  const percentStep = maxPercentage / step;
  const translateStyles = 'translate(-50%, -50%)';
  const res = {};

  for (let i = 0; i <= maxPercentage; i += percentStep) {
    res[i + '%'] = {
      transform: `${translateStyles} rotate(${(maxDegree / 100) * i}deg);`
    };
  }
  return res;
}

const translateKeyframes = madeTranslateKeyframes();

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: 1000000
  },
  spinnerWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  spinner: {
    'font-size': '172px',
    color: '#68aeea',
    height: 'auto',
    width: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animationName: [translateKeyframes],
    animationDuration: '3s, 1200ms',
    animationIterationCount: 'infinite'
  },
  overlay: {
    'background-color': 'rgba(0, 0, 0, 0.5)'
  }
});

export class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  constructor(props: SpinnerProps) {
    let timerID: TimerID = null;

    super(props);

    if (this.props.startDelay) {
      timerID = setTimeout(() => {
        this.setState({ delayTimerStartID: null });
      }, this.props.startDelay);
    }

    this.state = {
      delayTimerStartID: timerID
    };
  }

  public componentWillUnmount() {
    if (this.state.delayTimerStartID) {
      clearTimeout(this.state.delayTimerStartID);
    }
  }

  public render() {
    return this.state.delayTimerStartID ? null : (
      <div className={css(styles.spinnerContainer)}>
        <div
          className={css(
            styles.spinnerWrapper,
            this.props.hasOverlay && styles.overlay
          )}
        >
          <Icon className={css(styles.spinner)}>update</Icon>
        </div>
      </div>
    );
  }
}

export default Spinner;
