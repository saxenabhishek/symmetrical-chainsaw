import Router from "next/router";
import { useContext } from "react";
import { tokencontext } from "../components/Context/Auth";

export default function Protected(props) {
  const tokwnCont = useContext(tokencontext);
  if (typeof window !== "undefined") {
    if (tokwnCont.token == null) {
      Router.replace("/auth");
      return null;
    }
    return props.children;
  }
  return null;
}
