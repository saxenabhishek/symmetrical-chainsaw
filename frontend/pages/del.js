import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import Router from "next/router";
import FormField from "../components/formField";
import { useContext } from "react";
import { useAuth } from "../components/Context/Auth";

export default function signin() {
  let [text, settext] = useState("");
  let t = useAuth();
  return (
    <section className="text-gray-400 bg-gray-900 body-font h-full md:h-screen">
      <div className="container px-5 py-24 mx-auto items-center">
        <h1 className="text-2xl font-bold">Remove user account</h1>
        <p>Enter your details to confirm</p>
        <br />
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            for (const [key, value] of Object.entries(values)) {
              if (!value) {
                errors[key] = "Required";
              }
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            settext("Sending...");
            let status = t.deluser(values);
            if (status == 200) {
              settext("User account deleted");
              console.log("Del done");
              Router.replace("/");
            } else {
              settext("Sorry try again :p");
              Router.replace("/del_user");
            }
          }}
        >
          {({ isSubmitting }) => (
            //   username
            <Form className="max-w-lg bg-gray-800 bg-opacity-50 rounded-lg ring ring-indigo-400 p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
              {text && <p className="text-indigo-500">{text}</p>}
              <FormField name="email" type="email" />
              <FormField name="password" type="password" />
              <button
                className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                type="submit"
                disabled={isSubmitting}
              >
                Remove
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
