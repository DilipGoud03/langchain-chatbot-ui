import React from "react";
import { Button, } from '@themesberg/react-bootstrap';

import { DocumentsTable } from "../components/Tables";
import { Routes } from "../routes";
import { Link } from "react-router-dom";

export default () => {
  const loggedInUser = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Documents</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        {loggedInUser && user.user_type === 'admin' &&
          <div className="mt-3">
            <Button as={Link} variant="primary" to={Routes.DocumentUpload.path} >Add New</Button>
          </div>
        }
      </div>
      <DocumentsTable />
    </>
  );
};
