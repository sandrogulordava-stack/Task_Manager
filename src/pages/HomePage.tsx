import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store/store";

export default function HomePage() {
  // იგივე გლობალური მონაცემები გამოიყენება სხვა კომპონენტშიც
  const count = useSelector((s: RootState) => s.projects.items.length);
  return (
    <div>
      <h1>დავალებების მართვის სისტემა</h1>
      <p>სულ პროექტების რაოდენობა: <strong>{count}</strong></p>
      <Link to="/projects">პროექტების ნახვა →</Link>
    </div>
  );
}
