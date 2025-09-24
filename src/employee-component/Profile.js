import React from "react";
import { Col, Row } from '@themesberg/react-bootstrap';
import { GeneralInfoForm } from "../components/Forms";
import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  let userId = id && id !== "undefined" ? id : loggedInUser.id;
  if (loggedInUser.user_type !== 'admin') {
    userId = loggedInUser.id
  }
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      </div>
      <Row>
        <Col xs={12}>
          <GeneralInfoForm id={userId} />
        </Col>
      </Row>
    </>
  );
};
