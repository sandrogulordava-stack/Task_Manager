import { NavLink } from "react-router-dom";

export default function Navbar() {
  // NavLink ავტომატურად ამატებს "active" კლასს აქტიურ ბმულს
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <span className="brand">Task Manager</span>
      <NavLink to="/team" className={linkClass}>
  გუნდი
</NavLink>
      <NavLink to="/" end className={linkClass}>მთავარი</NavLink>
      <NavLink to="/projects" end className={linkClass}>პროექტები</NavLink>
      <NavLink to="/projects/new" className={linkClass}>ახალი პროექტი</NavLink>
      <NavLink to="/tasks" className={linkClass}>
  დავალებები
</NavLink>
<NavLink to="/team" className={linkClass}>
  გუნდი
</NavLink>
    </nav>
  );
}
