import React from "react";
import { Col, Row} from '@themesberg/react-bootstrap';
import { NewAddressForm } from "../components/Forms";
import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = id && id !== "undefined" ? id : loggedInUser.id;
  return (
    <>
      <Row>
        <Col xs={12}>
          <NewAddressForm id={userId} />
        </Col>
      </Row>
    </>
  );
};
