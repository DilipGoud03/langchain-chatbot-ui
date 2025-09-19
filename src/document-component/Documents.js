import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { DocumentsTable } from "../components/Tables";
import { Routes } from "../routes";
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Documents</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="mt-3">
          <Button as={Link} variant="primary" to={Routes.DocumentUpload.path} >Add New</Button>
        </div>
      </div>
      <DocumentsTable />
    </>
  );
};
