export interface EditableTitleProps {
  children?: React.ReactNode;
  title: string;
  id: string;
  prohibitedNames?: string[];
  editTitle: (event) => void;
}

export interface EditableTitleState {
  newTitle: string;
  saveIsDisabled: boolean;
}

export interface EditableTitleResult {
  id: string;
  name: string;
}
