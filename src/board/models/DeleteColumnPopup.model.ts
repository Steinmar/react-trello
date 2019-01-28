export interface DeleteColumnPopupProps {
  close: (deletionApproved: boolean) => void;
}

export interface DeleteColumnPopupState {
  val1: number;
  val2: number;
  userAnswer: string;
}
