import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import NewProjectPage from "./pages/NewProjectPage";
import NotFoundPage from "./pages/NotFoundPage";
import TasksPage from "./features/tasks/pages/TasksPage";
import TaskDetailsPage from "./features/tasks/pages/TaskDetailsPage";
import TeamPage from "./features/team/pages/TeamPage";
import TeamDetailsPage from "./features/team/pages/TeamDetailsPage";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
          {/* დინამიური მარშრუტი */}
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/tasks" element={<TasksPage />} />
<Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
<Route path="/team" element={<TeamPage />} />
<Route path="/team/:memberId" element={<TeamDetailsPage />} />
        </Routes>
      </main>
    </>
  );
}
