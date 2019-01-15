import * as React from 'react';
import { Icon } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';

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
    height: '100%'
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
  }
});

function Spinner() {
  return (
    <div className={css(styles.spinnerContainer)}>
      <div className={css(styles.spinnerWrapper)}>
        <Icon className={css(styles.spinner)}>update</Icon>
      </div>
    </div>
  );
}

export default Spinner;
