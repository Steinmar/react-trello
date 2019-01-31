import * as React from 'react';
import { TextField, Typography } from '@material-ui/core';
import Popup from 'src/shared/components/Popup';
import { DeleteColumnPopupProps, DeleteColumnPopupState } from '../../models';

class DeleteColumnPopup extends React.Component<
  DeleteColumnPopupProps,
  DeleteColumnPopupState
> {
  constructor(props: DeleteColumnPopupProps) {
    super(props);

    this.state = {
      val1: Math.round(Math.random() * 10),
      val2: Math.round(Math.random() * 10),
      userAnswer: ''
    };

    this.closeHander = this.closeHander.bind(this);
    this.submitHander = this.submitHander.bind(this);
    this.onAnswerChangeHandler = this.onAnswerChangeHandler.bind(this);
  }

  public render() {
    return (
      <Popup
        closeHandler={this.closeHander}
        cancelButton={{ title: 'Cancel' }}
        submitButton={{ title: 'Ok', handler: this.submitHander }}
      >
        <Typography variant="h5">
          Are you sure you want to delete column?
        </Typography>
        <Typography component="p">
          For confirming your choice please enter answer of next expression.
        </Typography>
        <Typography component="p">
          {this.state.val1} + {this.state.val2} = ?
        </Typography>
        <TextField
          placeholder="Answer"
          type="number"
          value={this.state.userAnswer}
          onChange={this.onAnswerChangeHandler}
        />
      </Popup>
    );
  }

  private closeHander() {
    this.props.close(false);
  }

  private submitHander() {
    const isAnswerCorrect =
      this.state.val1 + this.state.val2 === +this.state.userAnswer;
    this.props.close(isAnswerCorrect);
  }

  private onAnswerChangeHandler(event) {
    this.setState({ userAnswer: event.target.value });
  }
}

export default DeleteColumnPopup;
