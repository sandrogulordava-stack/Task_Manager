import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { addTask, updateTask, type Task } from "./tasksSlice";

const validationSchema = Yup.object({
  title: Yup.string().required("დავალების სათაური სავალდებულოა"),
  deadlineDays: Yup.number()
    .typeError("შესრულების ვადა უნდა იყოს რიცხვი")
    .required("შესრულების ვადა სავალდებულოა")
    .max(30, "შესრულების ვადა მაქსიმუმ 30 დღეა"),
  assigneeEmail: Yup.string()
    .email("ელ-ფოსტის ფორმატი არასწორია")
    .required("პასუხისმგებლის ელ-ფოსტა სავალდებულოა"),
});

type TaskFormProps = {
  task?: Task;
};

export default function TaskForm({ task }: TaskFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isEditing = Boolean(task);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: task?.title ?? "",
      deadlineDays: task ? String(task.deadlineDays) : "",
      assigneeEmail: task?.assigneeEmail ?? "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = {
        title: values.title.trim(),
        deadlineDays: Number(values.deadlineDays),
        assigneeEmail: values.assigneeEmail.trim(),
      };

      if (task) {
        dispatch(updateTask({ id: task.id, ...formData }));
        return;
      }

      const action = addTask(formData);
      dispatch(action);
      resetForm();

      // მოთხოვნის მიხედვით, დავალების შექმნის შემდეგ useNavigate-ით გადავდივართ დინამიურ გვერდზე.
      navigate(`/tasks/${action.payload.id}`);
    },
  });

  return (
    <form className="task-form" onSubmit={formik.handleSubmit} noValidate>
      <div className="task-field">
        <label htmlFor={isEditing ? "edit-title" : "new-title"}>დავალების სათაური</label>
        <input
          id={isEditing ? "edit-title" : "new-title"}
          type="text"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && (
          <span className="task-error">{formik.errors.title}</span>
        )}
      </div>

      <div className="task-field">
        <label htmlFor={isEditing ? "edit-deadline" : "new-deadline"}>
          შესრულების ვადა დღეებში
        </label>
        <input
          id={isEditing ? "edit-deadline" : "new-deadline"}
          type="number"
          {...formik.getFieldProps("deadlineDays")}
        />
        {formik.touched.deadlineDays && formik.errors.deadlineDays && (
          <span className="task-error">{formik.errors.deadlineDays}</span>
        )}
      </div>

      <div className="task-field">
        <label htmlFor={isEditing ? "edit-email" : "new-email"}>
          პასუხისმგებლის ელ-ფოსტა
        </label>
        <input
          id={isEditing ? "edit-email" : "new-email"}
          type="email"
          {...formik.getFieldProps("assigneeEmail")}
        />
        {formik.touched.assigneeEmail && formik.errors.assigneeEmail && (
          <span className="task-error">{formik.errors.assigneeEmail}</span>
        )}
      </div>

      <button className="task-primary-button" type="submit">
        {isEditing ? "ცვლილებების შენახვა" : "დავალების შექმნა"}
      </button>
    </form>
  );
}
