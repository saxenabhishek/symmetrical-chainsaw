import { useState } from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import Router from "next/router";
import FormField from "../components/formField";

export default function signin() {
  let [text, settext] = useState("");
  return (
    <section className="text-gray-400 bg-gray-900 body-font h-full md:h-screen">
      <div className="container px-5 py-24 mx-auto items-center">
        <Formik
          initialValues={{ email: "", password: "", username: "" }}
          validate={(values) => {
            const errors = {};
            for (const [key, value] of Object.entries(values)) {
              if (!value) {
                errors[key] = "Required";
              }
            }
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            settext("Sending...");
            let x = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            };
            console.log(x);
            fetch("http://localhost:8000/apis/register", x)
              .then((res) => {
                if (res.status == 201) {
                  settext("User account registered");
                  console.log("Created :)))))");
                  Router.replace("/sign");
                } else {
                  settext("Sorry try again :p");
                  Router.replace("/signup");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {({ isSubmitting }) => (
            //   username
            <Form className="max-w-lg bg-gray-800 bg-opacity-50 rounded-lg ring ring-indigo-400 p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
              {text && <p className="text-indigo-500">{text}</p>}
              <FormField name="username" type="name" />
              <FormField name="password" type="password" />
              <FormField name="email" type="email" />
              <button
                className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                type="submit"
                disabled={isSubmitting}
              >
                Sign in
              </button>
              <Link href="/signin">
                <p className="text-xs mt-3 text-white">
                  Already have a account?
                </p>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
