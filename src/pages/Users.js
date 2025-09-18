import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import {UsersTable } from "../components/Tables";

export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Users</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
      </div>
      <UsersTable />
    </>
  );
};
