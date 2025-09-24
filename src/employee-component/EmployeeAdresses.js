import React from "react";
import { Button } from '@themesberg/react-bootstrap';

import { EmployeeAddressTable } from "../components/Tables";
import { Link, useParams } from "react-router-dom";
import { Routes } from "../routes";

export default () => {
  const { id } = useParams();
  const loggedInEmployee = JSON.parse(localStorage.getItem('employee') || '{}');
  const employeeId = id && id !== "undefined" ? id : loggedInEmployee.id;
  console.log("UserId", employeeId);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>User Addresses</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="mt-3">
          <Button as={Link} variant="primary" to={Routes.AddEmployee.path} >Add New</Button>
        </div>
      </div>
      <EmployeeAddressTable id={employeeId} />
    </>
  );
};
