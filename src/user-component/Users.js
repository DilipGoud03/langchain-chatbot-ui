import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { UsersTable } from "../components/Tables";
import { Link } from "react-router-dom";
import { Routes } from "../routes";

export default () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Users</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="mt-3">
          <Button as={Link} variant="primary" to={Routes.AddUser.path} >Add New</Button>
        </div>
      </div>
      <UsersTable />
    </>
  );
};
