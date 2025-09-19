import React from "react";
import { Col, Row} from '@themesberg/react-bootstrap';
import { NewUserForm } from "../components/Forms";

export default () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <NewUserForm />
        </Col>
      </Row>
    </>
  );
};
