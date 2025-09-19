import React from "react";
import { Col, Row} from '@themesberg/react-bootstrap';
import { GeneralInfoForm } from "../components/Forms";
import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = id && id !== "undefined" ? id : loggedInUser.id;
  return (
    <>
      <Row>
        <Col xs={12}>
          <GeneralInfoForm id={userId} />
        </Col>
      </Row>
    </>
  );
};
