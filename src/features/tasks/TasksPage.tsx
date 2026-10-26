import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import TaskForm from "./TaskForm";
import { markTaskDone, type Task } from "./tasksSlice";
import "./tasks.css";

function TaskCard({ task }: { task: Task }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <article className="task-card">
      <div className="task-card-topline">
        <span className={`task-status task-status-${task.status === "Done" ? "done" : "todo"}`}>
          {task.status}
        </span>
        <span className="task-deadline">{task.deadlineDays} დღე</span>
      </div>

      <h3>{task.title}</h3>
      <p>{task.assigneeEmail}</p>

      <div className="task-actions">
        <Link className="task-secondary-link" to={`/tasks/${task.id}`}>
          დეტალები
        </Link>
        {task.status === "To Do" && (
          <button
            className="task-done-button"
            type="button"
            onClick={() => dispatch(markTaskDone(task.id))}
          >
            მონიშნე Done
          </button>
        )}
      </div>
    </article>
  );
}

export default function TasksPage() {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <div className="tasks-page">
      <header className="tasks-page-header">
        <div>
          <span className="tasks-kicker">სტუდენტი 2</span>
          <h1>დავალებების დაფა</h1>
          <p>შექმენი დავალება, გახსენი მისი დინამიური გვერდი და შეცვალე სტატუსი.</p>
        </div>
      </header>

      <section className="tasks-create-panel">
        <div className="tasks-section-heading">
          <h2>ახალი დავალება</h2>
          <span>{tasks.length} სულ</span>
        </div>
        <TaskForm />
      </section>

      <div className="tasks-board">
        <section className="tasks-column">
          <div className="tasks-column-heading">
            <h2>To Do</h2>
            <span>{todoTasks.length}</span>
          </div>
          <div className="tasks-column-content">
            {todoTasks.map((task) => <TaskCard key={task.id} task={task} />)}
            {todoTasks.length === 0 && <p className="tasks-empty">To Do დავალებები აღარ არის.</p>}
          </div>
        </section>

        <section className="tasks-column">
          <div className="tasks-column-heading">
            <h2>Done</h2>
            <span>{doneTasks.length}</span>
          </div>
          <div className="tasks-column-content">
            {doneTasks.map((task) => <TaskCard key={task.id} task={task} />)}
            {doneTasks.length === 0 && <p className="tasks-empty">ჯერ არაფერი დასრულებულა.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
