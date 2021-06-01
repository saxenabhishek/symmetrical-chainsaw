import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../components/Context/Cart";
import Protected from "../components/Protected";

export default function cart(props) {
  const c = useCart();
  let [cost, setCost] = useState(0);
  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < c.cart.length; i++) {
      temp += parseInt(c.cart[i].price.replace(",", ""));
    }
    setCost(temp);
  }, [c.cart]);
  const Prods = (props) => {
    return c.cart.map((p, i) => {
      let na = p.name;
      let names = na.substring(1, na.length - 1).split(",");
      let smart = names.map((n, i) => {
        return n.substring(1, n.length - 1);
      });
      return (
        <div className="border-white border-2 p-2 mx-4 my-1" key={i}>
          <div className="block float-right relative h-20 w-20 bg-white rounded overflow-hidden">
            <Image
              alt={smart[0]}
              className="object-contain"
              src={p.img_src}
              layout="fill"
            />
          </div>
          <p className="float-right m-4 text-green-400">₹ {p.price}</p>
          <h4 className="text-white">{smart[0]}</h4>
          <h3>{smart[1]}</h3>
          <br />
          <button
            className="ring-1 border-dotted rounded-sm border-2 p-1"
            onClick={() => c.removeItem(p)}
          >
            Remove
          </button>
        </div>
      );
    });
  };
  return (
    <Protected>
      <section className="containter p-5 text-gray-400 bg-gray-900 body-font min-h-screen">
        {c.cart.length == 0 ? (
          <div className="px-4 text mx-auto text-center">
            <Image src="/box.svg" height="400" width="600"></Image>
            <div>
              Icons made by{" "}
              <a href="https://www.freepik.com" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col max-w-lg mx-auto">
            <Prods />
            <div className="border-white text-green-400 border-t-4 p-2 mx-4 my-1 text-right">
              <p className="float-left">Item Total:</p>
              <p>₹ {cost.toFixed(2)}</p>
              <p className="float-left">Taxes :</p>
              <p>₹ {(cost * 0.18).toFixed(2)}</p>
              <p className="font-semibold float-left">Grand Total:</p>
              <p>₹ {(cost + cost * 0.18).toFixed(2)}</p>
            </div>
          </div>
        )}
      </section>
    </Protected>
  );
}
