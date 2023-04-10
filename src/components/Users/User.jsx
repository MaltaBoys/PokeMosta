import React, { useState, useEffect } from "react";

const User = () => {
  const [userData, setUserData] = useState({});
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/user/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("userToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(window.localStorage.getItem("userToken"));
        console.log("received data from server:", data);
        if (data.data && data.data.userType === "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);
        console.log("userData state after setting:", userData);

        if (data.message === "Token expired") {
          // checking for the message property
          alert("Token expired, please log in again");
          window.localStorage.clear();
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error fetching user data");
      });
  }, []);

  const logOut = () => {
    window.localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  // Render your component here
  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div>
            Email <h1>{userData.email}</h1>
            <br />
            <button onClick={logOut} className="btn btn-primary">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
