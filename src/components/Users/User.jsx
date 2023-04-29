import React, { useState, useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";

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
          //alert("Token expired, please log in again");
          window.localStorage.clear();
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.log(error);
        //alert("Error fetching user data");
      });
  }, [userData]);

  const logOut = () => {
    window.localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  // Render your component here
  return (
    <div className="mx-2 grid grid-cols-6 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl col-span-2">
        <div className="w-full relative">
          <img
            src={userData.bannerPic}
            alt="User Banner"
            className="rounded-lg"
          />
          <div className="absolute flex items-center justify-center left-2/4 -ml-16 -bottom-14 w-32 h-32 rounded-full border-8 dark:border-gray-800">
            <img
              className="w-full h-full rounded-full"
              src={userData.profilePic}
              alt="User Profile"
            />
            <div className="absolute flex items-center justify-center w-full h-full rounded-full hover:bg-gray-600">
              <BsFillPencilFill className="text-white w-full h-full opacity-0 hover:opacity-100" />
            </div>
          </div>
        </div>
        <h2 className="mt-16 font-medium text-xl text-gray-900 dark:text-white">
          {userData.username}
        </h2>
        <div className="mt-8">
          <button
            onClick={logOut}
            className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl col-span-4">
        <h2 className="mb-6 font-semibold text-3xl text-gray-900 dark:text-white">
          User details
        </h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              name="nickName"
              value={userData.username}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
