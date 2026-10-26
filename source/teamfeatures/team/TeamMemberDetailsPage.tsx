import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../src/store/store";
import { removeMember } from "./teamSlice";
import "./team.css";
export default function TeamMemberDetailsPage() {
  const { memberId } = useParams<{ memberId: string }>();
  const member = useSelector((state: RootState) => state.team.members.find(item => item.id === memberId));
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  if (!member) return <section className="team-page"><h1>წევრი ვერ მოიძებნა</h1><Link to="/team">← გუნდში დაბრუნება</Link></section>;
  return (
    <section className="team-page team-details">
      <Link className="team-back" to="/team">← გუნდში დაბრუნება</Link>
      <article className="team-panel">
        <span className="team-eyebrow">გუნდის წევრის დეტალები</span>
        <h1>{member.name}</h1>
        <dl className="team-details-grid">
          <div><dt>პოზიცია</dt><dd>{member.position}</dd></div>
          <div><dt>ელფოსტა</dt><dd>{member.email}</dd></div>
          <div><dt>ID</dt><dd>{member.id}</dd></div>
        </dl>
        <button type="button" className="team-danger" onClick={() => { dispatch(removeMember(member.id)); navigate("/team"); }}>წევრის წაშლა</button>
      </article>
    </section>
  );
}
