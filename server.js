const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.set("view engine", "ejs");
var access_token = "";

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("App listening on port " + port));

const axios = require("axios");

const CLIENT_ID = "553563f04f1015b9f426";
const CLIENT_SECRET = "1e22d017fdddb49147365c8cff1e8f68abcd9b5d";

app.get("/getToken", (req, res) => {
  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    console.log("response : ", response.data);
    res.json({
      token: response.data.access_token,
    });
   
    
  });
  
});


// app.get("/success", function (req, res) {
//   axios({
//     method: "get",
//     url: `https://api.github.com/user`,
//     headers: {
//       Authorization: "token " + access_token,
//     },
//   }).then((response) => {
//     res.render("pages/success", { userData: response.data });
//   });
// });