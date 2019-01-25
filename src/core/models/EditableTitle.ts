import { CustomInput } from 'src/core/models';

export interface EditableTitleProps extends CustomInput {
  prohibitedNames?: string[];
  placeholder?: string;
  rowsMax?: number;
  children?: React.ReactNode;
  emptyIsAllowed?: boolean;
  id: string;
  title: string;
  editTitle: (event) => void;
}

export interface EditableTitleState {
  newTitle: string | null;
  oldTitle: string;
  saveIsDisabled: boolean;
}

export interface EditableTitleResult {
  id: string;
  name: string;
}
