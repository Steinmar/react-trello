export interface TaskDetailsBodyData {
  description?: string | undefined;
  name?: string;
  status?: string;
}

export interface TaskDetailsBodyProps extends TaskDetailsBodyData {
  availableStatuses: string[];
  dataChanged: (data: TaskDetailsBodyData) => void;
  deleteTask: () => void;
}

export interface TaskDetailsBodyState extends TaskDetailsBodyData {
  status: string;
  isEditableDisabled: boolean;
}
