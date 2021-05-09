import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import Tokenprovider from "../components/Context/Auth";

function MyApp({ Component, pageProps }) {
  return (
    <Tokenprovider>
      <Header />
      <Component {...pageProps} />
    </Tokenprovider>
  );
}

export default MyApp;
