import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../../src/store/store";
import { addMember } from "./teamSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("სახელი სავალდებულოა"),
  position: Yup.string().required("პოზიცია სავალდებულოა"),
  email: Yup.string().email("შეიყვანეთ სწორი ელფოსტა").required("ელფოსტა სავალდებულოა"),
});
export default function TeamForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: "", position: "", email: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addMember({ name: values.name.trim(), position: values.position.trim(), email: values.email.trim() }));
      resetForm();
      navigate("/team");
    },
  });
  return (
    <form className="team-form" onSubmit={formik.handleSubmit} noValidate>
      <div className="team-field">
        <label htmlFor="team-name">სახელი</label>
        <input id="team-name" type="text" {...formik.getFieldProps("name")} />
        {formik.touched.name && formik.errors.name && <span className="team-error">{formik.errors.name}</span>}
      </div>
      <div className="team-field">
        <label htmlFor="team-position">პოზიცია</label>
        <input id="team-position" type="text" {...formik.getFieldProps("position")} />
        {formik.touched.position && formik.errors.position && <span className="team-error">{formik.errors.position}</span>}
      </div>
      <div className="team-field">
        <label htmlFor="team-email">ელფოსტა</label>
        <input id="team-email" type="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email && <span className="team-error">{formik.errors.email}</span>}
      </div>
      <button type="submit" className="team-primary">წევრის დამატება</button>
    </form>
  );
}
