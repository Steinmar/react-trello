import { StyleSheet } from 'aphrodite';

const formWidth = '280px';
const formStyles = StyleSheet.create({
  formRow: {
    width: '100%',
    display: 'flex',
    'flex-flow': 'column',
    padding: '10px 0'
  },
  formSubmitRow: {
    display: 'flex',
    'justify-content': 'flex-end',
    'flex-flow': 'row'
  },
  formContainer: {
    width: formWidth,
    display: 'flex',
    margin: 'auto'
  },
  form: {
    width: formWidth
  },
  input: {
    width: '100%',
    'box-sizing': 'border-box'
  },
  errorInput: {
    'border-bottom': '1px solid red'
  },
  submitButton: {
    height: '24px',
    background: 'initial'
  },
  disabledSubmitButton: {
    background: '#9e9e9e87',
    color: '#fff'
  }
});

export default formStyles;
