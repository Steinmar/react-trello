export interface DeleteTaskDialogProps {
  dialogActivated: (isActive: boolean) => void;
  deleteTask: () => void;
  taskName: string;
}

export interface DeleteTaskDialogState {
  taskName: string;
  showDialog: boolean;
  nameMatchingError: boolean;
}
