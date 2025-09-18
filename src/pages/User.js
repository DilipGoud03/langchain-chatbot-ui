import React from "react";
import { Col, Row} from '@themesberg/react-bootstrap';
import { GeneralInfoForm } from "../components/Forms";

export default () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <GeneralInfoForm />
        </Col>
      </Row>
    </>
  );
};
