import { Formik, Form } from "formik";
import Link from "next/link";
import FormField from "../components/formField";
import { useContext } from "react";
import { tokencontext } from "../components/Context/Auth";
import Router from "next/router";

export default function Auth(props) {
  let t = useContext(tokencontext);
  return (
    <section className="text-gray-400 bg-gray-900 body-font h-full md:h-screen">
      <div className="container px-5 py-24 mx-auto max-w-5xl flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white">
            Some smart sounding long lines of bs.
          </h1>
          <p className="leading-relaxed mt-4">
            More bs to support the bs above
          </p>
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
            console.log("bs");
            let x = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            };
            console.log(x);
            fetch("http://localhost:8000/apis/login", x)
              .then((res) => {
                if (res.status == 200) {
                  // settext("User account found");
                  console.log("Created :)))))");
                  res.json().then((data) => {
                    t.setToken(data.access_token);
                    console.log(data);
                    Router.replace("/prd");
                  });
                } else {
                  // settext("Sorry try again :p");
                  console.log("dkjfjnsd");
                  // Router.replace("/signin");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {(props) => (
            <Form
              // onSubmit={() => console.log("trying to submit")}
              className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg ring ring-indigo-400 p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
            >
              <FormField name="email" type="email" />
              <FormField name="password" type="password" />
              <button
                className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                type="submit"
                disabled={props.isSubmitting}
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
