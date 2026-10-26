import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../store/store";
import TeamForm from "./TeamForm";
import "./team.css";
export default function TeamPage() {
  const members = useSelector((state: RootState) => state.team.members);
  return (
    <div className="team-page">
      <header className="team-header">
        <div><span className="team-eyebrow">სტუდენტი 3</span><h1>გუნდის მართვა</h1><p>დაამატე გუნდის წევრი და გახსენი მისი დეტალური გვერდი.</p></div>
        <span className="team-counter">{members.length} წევრი</span>
      </header>
      <section className="team-panel">
        <h2>ახალი წევრის დამატება</h2>
        <TeamForm />
      </section>
      <section className="team-list-section">
        <h2>გუნდის წევრები</h2>
        <div className="team-list">
          {members.map(member => (
            <article key={member.id} className="team-member-card">
              <div className="team-avatar" aria-hidden="true">{member.name.trim().charAt(0)}</div>
              <div className="team-member-summary"><h3>{member.name}</h3><p>{member.position}</p><span>{member.email}</span></div>
              <Link className="team-detail-link" to={`/team/${member.id}`}>დეტალები</Link>
            </article>
          ))}
          {members.length === 0 && <p>ჯერჯერობით გუნდის წევრები არ არიან.</p>}
        </div>
      </section>
    </div>
  );
}
