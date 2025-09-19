
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";
import { useHistory } from "react-router-dom";
import api from './../axios'

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const base_url = "http://localhost:8080";
  const navigate = useHistory();
  const onSubmit = async (data) => {
    try {
      console.log(data)
      const res = await api.post("/user/signup", data);
      setError("");
      setMessage("Registration completed");
      navigate.push('/sign-in');
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    }
    finally {
      reset();
      setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);

    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                  {error && <div className="alert alert-danger" style={{ color: "red" }}>{error}</div >}
                  {message && <div className="alert alert-success" style={{ color: "blue" }}>{message}</div >}
                </div>
                <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group id="name" className="mb-4">
                    <Form.Label>Your Full Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="name" placeholder="john due"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <div
                          style={{ color: "red" }}
                          className="form-text"
                        >
                          *Name* is mandatory
                        </div>
                      )}
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <div
                          style={{ color: "red" }}
                          id="emailHelp"
                          className="form-text"
                        >
                          *Email* is mandatory
                        </div>
                      )}
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password"
                        {...register("password", { required: true })}
                      />
                      {errors.password && (
                        <span style={{ color: "red" }}>*Password* is mandatory</span>
                      )}
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign up
                  </Button>
                </Form>

                <div className="mt-3 text-center">
                  <span className="fw-normal">or</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to='sign-in' className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
