import "../styles/globals.css";
import Header from "../components/Header";
import { Tokenprovider } from "../components/Context/Auth";
import { Cartprovider } from "../components/Context/Cart";

function MyApp({ Component, pageProps }) {
  return (
    <Tokenprovider>
      <Cartprovider>
        <Header />
        <Component {...pageProps} />
      </Cartprovider>
    </Tokenprovider>
  );
}

export default MyApp;
