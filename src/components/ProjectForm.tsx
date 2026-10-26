import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../store/projectsSlice";
import type { AppDispatch } from "../store/store";

// ვალიდაციის სქემა
const validationSchema = Yup.object({
  name: Yup.string()
    .required("პროექტის სახელი სავალდებულოა")
    .min(3, "სახელი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან"),
  budget: Yup.number()
    .typeError("ბიუჯეტი უნდა იყოს რიცხვი")
    .required("ბიუჯეტი სავალდებულოა")
    .min(100, "მინიმალური ბიუჯეტია 100"),
  managerEmail: Yup.string()
    .email("არასწორი ელ-ფოსტის ფორმატი")
    .required("მენეჯერის ელ-ფოსტა სავალდებულოა"),
});

export default function ProjectForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // ფორმებთან სამუშაო Hook
  const formik = useFormik({
    initialValues: { name: "", budget: "", managerEmail: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Formik-ის მონაცემების დამუშავება და Redux-ში გაგზავნა
      dispatch(
        addProject({
          name: values.name.trim(),
          budget: Number(values.budget),
          managerEmail: values.managerEmail,
        })
      );
      resetForm();
      navigate("/projects");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="form">
      <div className="field">
        <label htmlFor="name">პროექტის სახელი</label>
        {/* getFieldProps აკავშირებს name/value/onChange/onBlur-ს */}
        <input id="name" type="text" {...formik.getFieldProps("name")} />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}
      </div>

      <div className="field">
        <label htmlFor="budget">ბიუჯეტი</label>
        <input id="budget" type="number" {...formik.getFieldProps("budget")} />
        {formik.touched.budget && formik.errors.budget && (
          <div className="error">{formik.errors.budget}</div>
        )}
      </div>

      <div className="field">
        <label htmlFor="managerEmail">მენეჯერის ელ-ფოსტა</label>
        <input id="managerEmail" type="email" {...formik.getFieldProps("managerEmail")} />
        {formik.touched.managerEmail && formik.errors.managerEmail && (
          <div className="error">{formik.errors.managerEmail}</div>
        )}
      </div>

      <button type="submit" disabled={formik.isSubmitting}>პროექტის შექმნა</button>
    </form>
  );
}
