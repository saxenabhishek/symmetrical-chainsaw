import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const Cartprovider = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cookie = Cookies.get("cart");
    if (cookie) {
      const data = JSON.parse(cookie);
      setCart(data);
      console.log(data);
    }
  }, []);

  const addItem = async (item) => {
    setCart(cart.concat(item));
    Cookies.set("cart", cart, { expires: 60 });
  };

  const removeItem = async (item) => {
    console.log(cart.length);
    if (cart.length == 1) {
      setCart([]);
      Cookies.remove("cart");
    } else {
      setCart(cart.filter((p) => p.img_src != item.img_src));
      Cookies.set("cart", cart, { expires: 60 });
    }
  };

  let count = cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        count,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
