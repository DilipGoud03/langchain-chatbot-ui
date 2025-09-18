
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';


export const GeneralInfoForm = () => {
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your first name" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="role">
                <Form.Label>Role</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="1">Admin</option>
                  <option value="0">User</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="name@company.com" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password1!" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Save All</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const NewAddressForm = () => {
  
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="my-4">Address</h5>
        <Row>
          <Col sm={9} className="mb-3">
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control required type="text" placeholder="Enter your home address" />
            </Form.Group>
          </Col>
          <Col sm={3} className="mb-3">
            <Form.Group id="isdefault">
              <Form.Label>Default</Form.Label>
              <Form.Control required type="text" placeholder="Enter your home address" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4} className="mb-3">
            <Form.Group id="city">
              <Form.Label>City</Form.Label>
              <Form.Control required type="text" placeholder="City" />
            </Form.Group>
          </Col>
          <Col sm={4} className="mb-3">
            <Form.Group id="state">
              <Form.Label>State</Form.Label>
              <Form.Control required type="text" placeholder="State" />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group id="zip">
              <Form.Label>ZIP</Form.Label>
              <Form.Control required type="tel" placeholder="ZIP" />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};


export const EditAddressForm = () => {
  return (
    <Card></Card>
  );
};