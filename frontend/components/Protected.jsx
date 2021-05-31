import Loader from "../components/loader";
import { useAuth } from "../components/Context/Auth";
import Router from "next/router";
import { route } from "next/dist/next-server/server/router";

export default function Protected(props) {
  const t = useAuth();
  if (t.loading) {
    return <Loader />;
  }
  if (t.isAuthenticated) {
    return props.children;
  } else {
    window.location.pathname = "/signin";
    return null;
  }
}
