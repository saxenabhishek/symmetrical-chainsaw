import { createContext, useState, useEffect } from "react";

export const tokencontext = createContext();

export default function Tokenprovider(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    setToken(userToken);
  }, []);

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    console.log(userToken);
    setToken(userToken);
  };

  return (
    <tokencontext.Provider value={{ token, setToken: saveToken }}>
      {props.children}
    </tokencontext.Provider>
  );
}
