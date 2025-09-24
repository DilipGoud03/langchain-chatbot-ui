import React from "react";
import { Col, Row } from '@themesberg/react-bootstrap';
import { GeneralInfoForm } from "../utility-components/Forms";
import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  const loggedInEmployee = JSON.parse(localStorage.getItem('employee') || '{}');
  let employeeId = id && id !== "undefined" ? id : loggedInEmployee.id;
  if (loggedInEmployee.employee_type !== 'admin') {
    employeeId = loggedInEmployee.id
  }
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      </div>
      <Row>
        <Col xs={12}>
          <GeneralInfoForm id={employeeId} />
        </Col>
      </Row>
    </>
  );
};
