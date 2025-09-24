import React from "react";
import { Col, Row } from '@themesberg/react-bootstrap';
import { NewEmployeeForm } from "../components/Forms";

export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      </div>
      <Row>
        <Col xs={12}>
          <NewEmployeeForm />
        </Col>
      </Row>
    </>
  );
};
