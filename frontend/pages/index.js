import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font h-full">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <Image
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="/landing.svg"
          width="600"
          height="400"
        ></Image>
        {/* <img src="./landing.svg"></img> */}
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Big Text like quotes and stuff
          </h1>
          <p className="leading-relaxed mb-8">
            smal text to convince user to sign in or sign up smal text to
            convince user to sign in or sign up smal text to convince user to
            sign in or sign up
          </p>
          <div className="flex-row md:inline-flex">
            <button className="m-5 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
              Sign in
            </button>
            <button
              className=" m-5 max-w-md
             text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
