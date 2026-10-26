import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "To Do" | "Done";

export interface Task {
  id: string;
  title: string;
  deadlineDays: number;
  assigneeEmail: string;
  status: TaskStatus;
}

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: [
    {
      id: "task-1",
      title: "მთავარი გვერდის ტექსტების შემოწმება",
      deadlineDays: 4,
      assigneeEmail: "ana@example.com",
      status: "To Do",
    },
    {
      id: "task-2",
      title: "პროექტის პრეზენტაციის მომზადება",
      deadlineDays: 10,
      assigneeEmail: "nika@example.com",
      status: "To Do",
    },
    {
      id: "task-3",
      title: "დასრულებული სამუშაოს გადამოწმება",
      deadlineDays: 2,
      assigneeEmail: "mari@example.com",
      status: "Done",
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.items.push(action.payload);
      },
      prepare(data: Omit<Task, "id" | "status">) {
        return {
          payload: {
            id: nanoid(),
            status: "To Do" as TaskStatus,
            ...data,
          },
        };
      },
    },
    updateTask(
      state,
      action: PayloadAction<Omit<Task, "status">>
    ) {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (!task) return;

      task.title = action.payload.title;
      task.deadlineDays = action.payload.deadlineDays;
      task.assigneeEmail = action.payload.assigneeEmail;
    },
    markTaskDone(state, action: PayloadAction<string>) {
      const task = state.items.find((item) => item.id === action.payload);
      if (task && task.status === "To Do") {
        task.status = "Done";
      }
    },
  },
});

export const { addTask, updateTask, markTaskDone } = tasksSlice.actions;
export default tasksSlice.reducer;
