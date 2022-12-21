import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./Home.css";
const Home = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  useEffect(() => {
    if (userData) {
      getUserRepos();
    }
  }, [userData]);

  async function getUserRepos() {
    fetch(userData.repos_url, {
      method: "get",
      headers: {
        Authorization: "token " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data repos : ", data);
        // userDataInfo
        setRepos(data);
      });
  }

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
        console.log("data user : ", data);
        // userDataInfo
        setUserData(data);
      });
  }

  return (
    <div className="container">
      {userData && (
        <img
          width="100px"
          height="100px"
          src={userData && userData.avatar_url}
        />
      )}
      <h2>
        {userData ? "Welcome : " + userData.name : "Please sign in with GitHub"}
      </h2>
      <div className="infos">
        <a> {userData ? "Followers: " + userData.followers : " "}</a>
        <br />
        <a> {userData ? "Following: " + userData.following : " "}</a>
        <br />
        <a> {userData ? "Email: " + userData.email : " "}</a>
      </div>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {userData && (
                <th>
                  Repositories:
                  {userData && userData.public_repos}
                </th>
              )}
              {userData && <th>Public/Private</th>}
              {userData && <th>Language</th>}
            </tr>
          </thead>
          <tbody>
            {repos &&
              repos.map((reposInfo, i) => {
                return (
                  <tr key={i}>
                    <td>{reposInfo && reposInfo.name}</td>
                    <td>{reposInfo && reposInfo.visibility}</td>
                    <td>{reposInfo && reposInfo.language}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
