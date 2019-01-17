export interface BoardItemDialogProps {
  type: string;
  bookedNames?: string[];
  newNameChanged?: (name) => void;
  saveNewName: () => void;
}

export interface BoardItemDialogState {
  showInput: boolean;
  name: string;
}
