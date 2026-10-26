import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - გვერდი ვერ მოიძებნა</h1>
      <Link to="/">მთავარზე დაბრუნება</Link>
    </div>
  );
}
