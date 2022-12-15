import React from "react";
import "./App.css";


const CLIENT_ID = "553563f04f1015b9f426";

const App = () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");
  console.log("codeParam : ", codeParam);


  // async function getUserData (){
  //   await fetch("https://api.github.com/user",{
  //     method: "GET",
  //     // headers: {
  //     //   "Authorization": "Bearer"+localStorage.getItem("accessToken")
  //     // }

  //   })
  //   .then((response)=> {
  //     return response.json();

  //   })
  //   .then((data)=> {
  //     console.log("data test : ",data);
  //   })
  // }



 

  // const loginWithGitHub = () => {
  //   window.location.assign(
  //     "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
  //   );
  // };

  return (
    <div className="App">
      <div className="App-header">
        {/* <button onClick={loginWithGitHub}>Login with GitHub</button> */}
      </div>
    </div>
  );
};

export default App;
