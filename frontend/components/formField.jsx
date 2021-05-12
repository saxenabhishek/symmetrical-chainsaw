import { Field, ErrorMessage } from "formik";
export default function FormField(props) {
  return (
    <div className="relative mb-4">
      <label className="leading-7 text-sm text-gray-400">{props.name}</label>
      <Field
        className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type={props.type}
        name={props.name}
      />{" "}
      <ErrorMessage name="username" component="div" />
    </div>
  );
}
