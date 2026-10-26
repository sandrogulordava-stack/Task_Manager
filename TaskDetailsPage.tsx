import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import TaskForm from "./TaskForm";
import { markTaskDone } from "./tasksSlice";
import "./tasks.css";

export default function TaskDetailsPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const task = useSelector((state: RootState) =>
    state.tasks.items.find((item) => item.id === taskId)
  );

  if (!task) {
    return (
      <div className="tasks-page">
        <section className="task-details-card">
          <h1>დავალება ვერ მოიძებნა</h1>
          <p>ID: {taskId}</p>
          <Link className="task-secondary-link" to="/tasks">← დავალებების დაფა</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <Link className="task-back-link" to="/tasks">← დავალებების დაფა</Link>

      <section className="task-details-card">
        <div className="task-details-title-row">
          <div>
            <span className="tasks-kicker">დავალების დინამიური გვერდი</span>
            <h1>{task.title}</h1>
          </div>
          <span className={`task-status task-status-${task.status === "Done" ? "done" : "todo"}`}>
            {task.status}
          </span>
        </div>

        <div className="task-details-grid">
          <div>
            <span>ID</span>
            <strong>{task.id}</strong>
          </div>
          <div>
            <span>ვადა</span>
            <strong>{task.deadlineDays} დღე</strong>
          </div>
          <div>
            <span>პასუხისმგებელი</span>
            <strong>{task.assigneeEmail}</strong>
          </div>
        </div>

        {task.status === "To Do" && (
          <button
            className="task-done-button"
            type="button"
            onClick={() => dispatch(markTaskDone(task.id))}
          >
            სტატუსის შეცვლა: To Do → Done
          </button>
        )}
      </section>

      <section className="tasks-edit-panel">
        <h2>დავალების რედაქტირება</h2>
        <TaskForm task={task} />
      </section>
    </div>
  );
}
