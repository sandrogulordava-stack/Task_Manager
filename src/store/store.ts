import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";

import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import tasksReducer from "../features/tasks/store/tasksSlice";
import teamReducer from "../features/team/store/teamSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
