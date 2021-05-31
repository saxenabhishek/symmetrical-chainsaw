import Protected from "../components/Protected";
import { useEffect, useState } from "react";
import Card from "../components/prodCard";
import api from "../components/api";
import Loader from "../components/loader";
import { useAuth } from "../components/Context/Auth";

export default function Products(props) {
  let [prd, setPrd] = useState([]);
  let [page, setPage] = useState(1);
  const t = useAuth();
  useEffect(() => {
    (async () => {
      try {
        console.log(page);
        const a = await api.get("/products/products-api?page=2", {
          params: {
            page: page,
          },
        });
        setPrd(prd.concat(a.data.result));
        console.log(prd);
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status == 401) {
          t.logout();
        }
      }
    })();
  }, [page]);
  console.log(prd.length);
  const RenderProducts = () => {
    return prd.map((p, i) => {
      let na = p.name;
      let smart = na.substring(1, na.length - 1).split(",");
      return (
        <Card
          key={i}
          title={smart[1]}
          subtitle={smart[0]}
          src={p.img_src}
          price={p.price}
        />
      );
    });
  };
  if (prd.length == 0) {
    return <Loader />;
  }
  return (
    <Protected>
      {prd ? (
        <section className="text-white body-font bg-gray-900">
          <div className="container px-5 py-10 mx-auto">
            <div className="  grid gap-5 grid-flow-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
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
      )}{" "}
    </Protected>
  );
}
