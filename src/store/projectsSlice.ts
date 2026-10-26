import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  id: string;
  name: string;
  budget: number;
  managerEmail: string;
}

interface ProjectsState {
  items: Project[];
}

// საწყისი (გლობალური) მონაცემები
const initialState: ProjectsState = {
  items: [
    { id: "1", name: "ვებ-გვერდის რედიზაინი", budget: 5000, managerEmail: "nino@example.com" },
    { id: "2", name: "მობილური აპლიკაცია", budget: 12000, managerEmail: "giorgi@example.com" },
  ],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // ახალი პროექტის დამატება (ინფორმაციის განახლება)
    addProject: {
      reducer(state, action: PayloadAction<Project>) {
        state.items.push(action.payload);
      },
      prepare(data: Omit<Project, "id">) {
        return { payload: { id: nanoid(), ...data } };
      },
    },
  },
});

export const { addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
