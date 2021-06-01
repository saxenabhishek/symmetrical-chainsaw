import { Formik, Form } from "formik";
import { useState } from "react";
import Link from "next/link";
import FormField from "../components/formField";
import Router from "next/router";
import { useAuth } from "../components/Context/Auth";

export default function Auth(props) {
  let t = useAuth();
  let [text, settext] = useState("");
  return (
    <section className="text-gray-400 bg-gray-900 body-font h-full md:h-screen">
      <div className="container px-5 py-24 mx-auto max-w-5xl flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white">
            Sign in to reach our products
          </h1>
          <p className="leading-relaxed mt-4 italic">it's really simple :))</p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            console.log(errors);
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            settext("loading...");
            t.login(values).then((status) => {
              console.log(status);
              if (status == 200) {
                settext("Hi, User account found");
                console.log("Created :)))))");
                Router.replace("/prd");
              } else {
                settext("Sorry try again :p");
                console.log("dkjfjnsd");
                Router.replace("/signin");
              }
            });
          }}
        >
          {(props) => (
            <Form
              // onSubmit={() => console.log("trying to submit")}
              className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg ring ring-indigo-400 p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
            >
              {text && <p className="text-indigo-500">{text}</p>}
              <FormField name="email" type="email" />
              <FormField name="password" type="password" />
              <button
                className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                type="submit"
                // disabled={props.isSubmitting}
              >
                Sign in
              </button>
              <Link href="/signup">
                <p className="text-xs mt-3 text-white">
                  You have a account right? No?
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
