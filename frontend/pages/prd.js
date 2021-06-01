import Protected from "../components/Protected";
import { useEffect, useState } from "react";
import Card from "../components/prodCard";
import api from "../components/api";
import Loader from "../components/loader";
import { useAuth } from "../components/Context/Auth";

export default function Products(props) {
  let [prd, setPrd] = useState([]);
  let [page, setPage] = useState(5);
  const t = useAuth();
  useEffect(() => {
    console.log(page);
    api
      .get("/products/products-api", {
        params: {
          page: page,
        },
      })
      .then((a) => {
        setPrd(prd.concat(a.data.result));
        console.log(prd);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.data.code == "token_not_valid") t.logout();
      });
  }, [page, t.loading]);
  console.log(prd.length);
  const RenderProducts = () => {
    return prd.map((p, i) => {
      return <Card p={p} key={i} />;
    });
  };
  return (
    <Protected>
      {prd.length != 0 ? (
        <section className="text-white body-font bg-gray-900">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap justify-around items-end">
              {/* { alt, src, title, subtitle, price } */}
              <RenderProducts />
            </div>
          </div>
          <div className="p-10 text-center">
            <button
              onClick={() => setPage(page + 1)}
              className="transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-120 max-w-40 ring-4 bg-indigo-600 p-2 rounded-sm hover:"
            >
              Load more
            </button>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </Protected>
  );
}
