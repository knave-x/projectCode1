import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom";

import NavbarC from "./pages/navbarC";
import Home from "./routes/Home";

const CLIENT_ID = "553563f04f1015b9f426";

const App = () => {
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
    }
  }, [token]);

  async function getToken(code) {
    const response = await fetch("http://localhost:4000/getToken?" + "code=" + code, {
      method: "GET",
      // headers: {
      //   "Authorization": "Bearer"+localStorage.getItem("accessToken")
      // }
    });
    const jsonToken = await response.json();
    const token = jsonToken.token;
    localStorage.setItem("accessToken", token);
    console.log("token test : ", token);
    setToken(token);
  }
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log("codeParam : ", codeParam);
    if (codeParam) {
      getToken(codeParam);
    }
  }, []);

  let url = "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID;

  // const loginWithGitHub = () => {
  //   window.open(
  //     "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
  //   );
  // };

  return (
    <div>
      <NavbarC url={url} />

      <Routes>
        <Route path="/" element={<Home token={token} />} />
      </Routes>
    </div>
  );
};

export default App;
