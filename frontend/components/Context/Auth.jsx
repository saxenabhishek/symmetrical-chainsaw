import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../api";

const tokencontext = createContext();

export const useAuth = () => useContext(tokencontext);

export const Tokenprovider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      const cookie = Cookies.get("token");
      if (cookie) {
        const token = JSON.parse(cookie);
        console.log("Got a token in the cookies, let's see if it is valid");
        api.defaults.headers.Authorization = `Bearer ${token.access_token}`;
        const data = parseJwt(token.access_token);
        console.log(data);
        // const { data: user } = await api.post("apis/verify/token",);
        setUser(data.user_id);
      }
      setLoading(false);
      console.log(user);
    }
    loadUserFromCookies();
  }, []);

  const deluser = async (values) => {
    try {
      const { status, data } = await api.delete("apis/flush", {
        data: values,
      });
      if (data) {
        console.log("got response");
        logout();
      }
      return status;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status;
    }
  };

  const signup = async (values) => {
    try {
      const { status, data } = await api.post("/apis/register", values);
      if (data) {
        console.log("got response", data, status);
      }
      return status;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status;
    }

    return status;
  };

  const login = async (values) => {
    try {
      const { status, data } = await api.post("apis/login", values);
      if (data) {
        console.log("Got token", data);
        Cookies.set("token", data, { expires: 60 });
        api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
        setUser(data.user_id);
        console.log("Got user", user);
      }
      return status;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete api.defaults.headers.Authorization;
    window.location.pathname = "/signin";
  };
  // const saveToken = (userToken) => {
  //   sessionStorage.setItem("token", JSON.stringify(userToken));
  //   console.log(userToken);
  //   setToken(userToken);
  // };
  return (
    <tokencontext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        signup,
        deluser,
        logout,
        loading,
      }}
    >
      {props.children}
    </tokencontext.Provider>
  );
};
