import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function ProjectDetailsPage() {
  // URL-იდან ID-ის წაკითხვა
  const { projectId } = useParams<{ projectId: string }>();
  const project = useSelector((s: RootState) =>
    s.projects.items.find((p) => p.id === projectId)
  );

  if (!project) {
    return (
      <div>
        <h1>პროექტი ვერ მოიძებნა</h1>
        <p>ID: {projectId}</p>
        <Link to="/projects">← უკან სიაში</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p><strong>ID:</strong> {project.id}</p>
      <p><strong>ბიუჯეტი:</strong> {project.budget.toLocaleString()} ₾</p>
      <p><strong>მენეჯერი:</strong> {project.managerEmail}</p>
      <Link to="/projects">← უკან სიაში</Link>
    </div>
  );
}
