import React from "react";
import { Col, Row} from '@themesberg/react-bootstrap';
import { DocumentUploadForm } from "../components/Forms";

export default () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <DocumentUploadForm/>
        </Col>
      </Row>
    </>
  );
};
