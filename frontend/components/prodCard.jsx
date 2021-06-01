import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./Context/Cart";

export default function Card({ alt, src, title, subtitle, price, p }) {
  const cart = useCart();
  const [taken, setTaken] = useState(false);
  useEffect(() => {
    for (let i = 0; i < cart.cart.length; i++) {
      if (p.img_src == cart.cart[i].img_src) {
        setTaken(true);
        break;
      }
    }
  }, []);

  let na = p.name;
  let names = na.substring(1, na.length - 1).split(",");
  let smart = names.map((n, i) => {
    return n.substring(1, n.length - 1);
  });
  return (
    <div className="Container flex-auto m-5">
      <div
        className={
          (taken ? "filter blur-sm " : " ") +
          "p-4 w-full bg-gray-800 border-r-2 border-green-700 rounded-xl rounded-b-none"
        }
      >
        <a className="block relative h-48 bg-white rounded overflow-hidden">
          <Image
            alt={smart[0]}
            className="object-contain object-center md:object-scale-down  w-full h-full block"
            src={p.img_src}
            //   height={421}
            //   width={262}
            layout="fill"
          />
        </a>
        <div className="mt-4">
          <h3 className="text-white text-xs tracking-widest title-font mb-1">
            {smart[0]}
          </h3>
          <h2 className="text-white title-font text-lg font-medium">
            {smart[1].length > 30 ? smart[1].substring(0, 30) + ".." : smart[1]}
          </h2>
          <p className="mt-1 text-green-400">Price: ₹{p.price}</p>
        </div>
      </div>
      <div
        onClick={() => {
          console.log("click");
          if (taken) {
            setTaken(false);
            cart.removeItem(p);
          } else {
            setTaken(true);

            cart.addItem(p);
          }
          console.log(taken);
        }}
        className={
          (taken
            ? "bg-red-800 hover:bg-red-400"
            : "bg-green-400 hover:bg-green-800") +
          " " +
          "font-semibold w-full font-sans text-center px-2 py-3 text-white rounded-xl rounded-t-none"
        }
      >
        {taken ? "Remove" : "Add"}
      </div>
    </div>
  );
}
