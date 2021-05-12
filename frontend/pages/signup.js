import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import FormField from "../components/formField";

export default function signin() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font h-full md:h-screen">
      <div className="container px-5 py-24 mx-auto items-center">
        <Formik
          initialValues={{ Email: "", Password: "", Username: "", Phone: "" }}
          //   validate={(values) => {
          //     console.log(values);
          //     const errors = {};
          //     for (const [key, value] of Object.entries(values)) {
          //       if (!value) {
          //         errors[key] = "Required";
          //       }
          //     }
          //     if (
          //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //     ) {
          //       errors.Email = "Invalid email address";
          //     }
          //     console.log(errors);
          //     return errors;
          //   }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            //   username
            <Form className="max-w-lg bg-gray-800 bg-opacity-50 rounded-lg ring ring-indigo-400 p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
              <FormField name="Username" type="name" />
              <FormField name="Password" type="password" />
              <FormField name="Email" type="email" />
              <FormField name="Phone" type="Phone" />
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
                {/* <p className="text-blue-500">No?</p> */}
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
