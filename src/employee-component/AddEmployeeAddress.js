import React from "react";
import { Col, Row} from '@themesberg/react-bootstrap';
import { NewAddressForm } from "../components/Forms";
import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  const loggedInEmployee = JSON.parse(localStorage.getItem('employee') || '{}');
  const EmployeeId = id && id !== "undefined" ? id : loggedInEmployee.id;
  return (
    <>
     <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      </div>
      <Row>
        <Col xs={12}>
          <NewAddressForm id={EmployeeId} />
        </Col>
      </Row>
    </>
  );
};
