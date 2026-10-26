import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export interface TeamMember { id: string; name: string; position: string; email: string; }
interface TeamState { members: TeamMember[]; }
const initialState: TeamState = {
  members: [
    { id: "member-1", name: "ანა მაისურაძე", position: "Front-end Developer", email: "ana@example.com" },
    { id: "member-2", name: "ნიკა გიორგაძე", position: "UI Designer", email: "nika@example.com" },
    { id: "member-3", name: "მარიამ აბაშიძე", position: "Project Manager", email: "mari@example.com" },
  ],
};
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addMember: {
      reducer(state, action: PayloadAction<TeamMember>) { state.members.push(action.payload); },
      prepare(member: Omit<TeamMember, "id">) { return { payload: { ...member, id: nanoid() } }; },
    },
    removeMember(state, action: PayloadAction<string>) {
      state.members = state.members.filter(member => member.id !== action.payload);
    },
  },
});
export const { addMember, removeMember } = teamSlice.actions;
export default teamSlice.reducer;
