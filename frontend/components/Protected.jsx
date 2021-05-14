import Router from "next/router";
import { useContext } from "react";
import { tokencontext } from "../components/Context/Auth";

export default function Protected(props) {
  const tokwnCont = useContext(tokencontext);
  if (typeof window !== "undefined") {
    console.log(tokwnCont.token, tokwnCont.token === null);
    if (tokwnCont.token === null) {
      console.log("redirecting");
      Router.replace("/signin");
      return null;
    }
    return props.children;
  }
  return null;
}

export async function getStaticProps() {
  const tokwnCont = useContext(tokencontext);
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  tokwnCont.setToken(userToken);
}
