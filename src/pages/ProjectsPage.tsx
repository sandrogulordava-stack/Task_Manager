import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store/store";

export default function ProjectsPage() {
  const projects = useSelector((s: RootState) => s.projects.items);

  return (
    <div>
      <h1>პროექტების სია</h1>
      {projects.length === 0 && <p>პროექტები ჯერ არ არის დამატებული.</p>}
      <ul className="list">
        {projects.map((p) => (
          <li key={p.id} className="card">
            <Link to={`/projects/${p.id}`}>{p.name}</Link>
            <span>{p.budget.toLocaleString()} ₾</span>
          </li>
        ))}
      </ul>
      <Link to="/projects/new" className="btn">+ ახალი პროექტი</Link>
    </div>
  );
}
