import Link from "next/link";
import { useAuth } from "../components/Context/Auth";
import { useCart } from "../components/Context/Cart";

export default function Header(prop) {
  const t = useAuth();
  const cart = useCart();
  return (
    <header className="sticky top-0 w-full bg-gray-800 bg-opacity-80 text-gray-300 backdrop-filter backdrop-blur-lg body-font z-10">
      <div className="container mx-auto flex p-5 flex-row justify-between">
        <Link href="/">
          <a className="title-font font-medium items-center text-white mb-0">
            <span className="md:ml-3  text-xl">Ecomm</span>
          </a>
        </Link>
        {t.isAuthenticated && (
          <>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex-col md:flex-row items-center text-base justify-self-center">
              <span className="mr-5 hover:text-white">
                <Link href="/prd">Products</Link>
              </span>
              <span className="mr-5 hover:text-white">
                <Link href="/del">Leave</Link>
              </span>
            </nav>
            <span className=" font-semibold mr-5 hover:text-">
              Hello, {t.user}
            </span>
            <span className="mr-5 hover:text-white">
              <Link href="/cart">{"Cart: " + cart.count}</Link>
            </span>
            <button
              onClick={t.logout}
              className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-500 hover:text-gray-50 rounded mt-0"
            >
              Sign out
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
