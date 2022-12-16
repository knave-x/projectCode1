import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate, Route, Routes,Link } from "react-router-dom";
import SuccesPage from "./pages/succes";
import HomePage from "./pages/HomePage";
const CLIENT_ID = "553563f04f1015b9f426";

const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      console.log("testing : ");
      getUserData();
      navigateSuccessPage();
    }
  }, [token]);

  async function getUserData() {
    await fetch("https://api.github.com/user", {
      method: "get",

      headers: {
        Authorization: "token " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        console.log("response. ", response);
        return response.json();
      })
      .then((data) => {
        console.log("data test : ", data);
        // userDataInfo
        setUserData(data);
      });
  }
  async function getToken(code) {
    const response = await fetch(
      "http://localhost:4000/getToken?" + "code=" + code,
      {
        method: "GET",
        // headers: {
        //   "Authorization": "Bearer"+localStorage.getItem("accessToken")
        // }
      }
    );
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

  const navigateSuccessPage = () => {
    // 👇️ navigate to /
    navigate("/succes");
  };

  let url = "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID;

  // const loginWithGitHub = () => {
  //   window.open(
  //     "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
  //   );
  // };

  return (
    <div className="App">
      <div className="App-header">
        {/* <button onClick={loginWithGitHub}>Login with GitHub</button> */}
        {/* <a onClick='https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}' > Github Login</a> */}

        <a href={url}>github Testt</a>

        {/* {userData && userData.avatar_url} */}

       
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/succes" element={<SuccesPage />} />
          </Routes>
        
      </div>
    </div>
  );
};

export default App;
