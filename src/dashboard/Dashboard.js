
import React from "react";
export default () => {
  const loggedInUser = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <>
    </>
  );
};
