export interface BoardItemDialogProps {
  type: string;
  prohibitedNames?: string[];
  newNameChanged?: (name) => void;
  saveNewName: (name: string) => void;
}

export interface BoardItemDialogState {
  showInput: boolean;
  name: string;
}
