import React from "react";
import { Button } from '@themesberg/react-bootstrap';

import { EmployeesTable } from "../utility-components/Tables";
import { Link } from "react-router-dom";
import { Routes } from "../routes";

export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Employees</h4>
        </div>
        <div className="mt-3">
          <Button as={Link} variant="primary" to={Routes.AddEmployee.path} >Add New</Button>
        </div>
      </div>
      <EmployeesTable />
    </>
  );
};
