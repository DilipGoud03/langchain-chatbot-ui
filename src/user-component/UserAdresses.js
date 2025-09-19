import React from "react";
import { Button } from '@themesberg/react-bootstrap';

import { UserAddressTable } from "../components/Tables";
import { Link, useParams } from "react-router-dom";
import { Routes } from "../routes";

export default () => {
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = id && id !== "undefined" ? id : loggedInUser.id;
  console.log("UserId", userId);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>User Addresses</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="mt-3">
          <Button as={Link} variant="primary" to={Routes.AddUser.path} >Add New</Button>
        </div>
      </div>
      <UserAddressTable id={userId} />
    </>
  );
};
