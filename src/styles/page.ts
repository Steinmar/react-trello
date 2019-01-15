import { StyleSheet } from 'aphrodite';

const pageStyles = StyleSheet.create({
  containerWrapper: {
    width: '100%',
    height: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '800px',
    margin: 'auto'
  },
  paper: {
    padding: '10px'
  }
});

export default pageStyles;
