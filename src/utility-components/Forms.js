
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import api from '../axios'


export const NewEmployeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const onSubmit = async (data) => {
    try {
      await api.post(`/employee/signup`, data)
      setMessage("Employee added successfully.")
      reset();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to Add Employee. Please try again.");
    }
    finally {
      setTimeout(() => {
        setError('');
        setMessage('');
      }, 3000);
    }
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Employee information</h5>
        {error && <div className="alert alert-danger" style={{ color: "red" }}>{error}</div >}
        {message && <div className="alert alert-info" style={{ color: "info" }}>{message}</div >}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control required type="text" placeholder="John Doe"
                  {...register("name", { required: false })}
                />
                {errors.name && (
                  <div
                    style={{ color: "red" }}
                    className="form-text"
                  >
                    *Name* is mandatory
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="role">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  defaultValue='employee'
                  {...register("employee_type", { required: true })}
                >
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email"
                  {...register("email", { required: true })}
                  placeholder="abc@example.com"
                />
                {errors.email && (
                  <div
                    style={{ color: "red" }}
                    className="form-text"
                  >
                    *Email* is mandatory
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password1!"
                  {...register("password", { required: false })}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Save</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const GeneralInfoForm = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const loggedInEmployee = JSON.parse(localStorage.getItem("employee") || "{}");
  const [employee, setUser] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const isAdmin = loggedInEmployee.employee_type === "admin";
  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  const fetchUser = async (id) => {
    try {
      const response = await api.get(`/employee/${id}`);
      setUser(response.data);
      reset(response.data);
    } catch (error) {
      console.error("Error fetching Employee data:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.put(`/employee/${employee.id}`, data);
      setUser(response.data);
      if (response.data.id === loggedInEmployee.id) {
        localStorage.setItem("employee", JSON.stringify(response.data));
        window.location.reload()
      }
      setMessage('Employee updated sucessfully.')
    } catch (err) {
      setError(err.response?.data?.detail || "Update failed. Please try again.");
    } finally {
      setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">
          {employee.id === loggedInEmployee.id ? "Profile" : "Employee Information"}
        </h5>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-info">{message}</div>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <div style={{ color: "red" }} className="form-text">
                    *Name* is mandatory
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          {
            loggedInEmployee.employee_type === 'admin' &&
            <Row className="align-items-center">
              <Col md={6} className="mb-3">
                <Form.Group id="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    {...register("employee_type", { required: true })}
                  >
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          }

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <div style={{ color: "red" }} className="form-text">
                    *Email* is mandatory
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password1!"
                  {...register("password")}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};


export const NewAddressForm = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    try {
      await api.post(`/employee/address`, data)
      reset();
    } catch (err) {
      setError(err.response?.data?.detail || "New address create failed. Please try again.");
    }
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="my-4">Address</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <div style={{ color: "red" }} className="form-text">
                    *Address* is mandatory
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="isdefault">
                <Form.Label>Default</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address"
                  {...register("isdefault", { required: true })}
                />
                {errors.name && (
                  <div style={{ color: "red" }} className="form-text">
                    *Name* is mandatory
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <div style={{ color: "red" }} className="form-text">
                    *Name* is mandatory
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="state">
                <Form.Label>State</Form.Label>
                <Form.Control required type="text" placeholder="State"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <div style={{ color: "red" }} className="form-text">
                    *Name* is mandatory
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="text" placeholder="ZIP"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <div style={{ color: "red" }} className="form-text">
                    *Name* is mandatory
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};


export const DocumentUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [inputType, setInputType] = useState(""); // initially nothing selected

  const onSubmit = async (data) => {
    try {
      if (inputType === "file" && data.file?.[0]) {
        const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("type", data.type);

        await api.post("/doc/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Document Uploaded Successfully.");

      } else if (inputType === "url" && data.url) {
        await api.post("/doc/url/upload", {
          url: data.url,
          type: data.type,
        });
        setMessage("URL Uploaded Successfully.");
      } else {
        throw new Error("Please select File or URL and provide input");
      }

      reset();
      setInputType("");
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed. Please try again.");
    } finally {
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Documents information</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Select Input Type */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="inputType">
                <Form.Label>Select Your Input</Form.Label>
                <Form.Select
                  value={inputType}
                  onChange={(e) => setInputType(e.target.value)}
                >
                  <option value="">-- Select Input Type --</option>
                  <option value="file">Document</option>
                  <option value="url">URL</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {inputType && (
            <>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <Form.Group controlId="type">
                    {inputType === 'file' ? (
                      <>
                        <Form.Label>Document Type</Form.Label>
                      </>
                    ) : (<>
                      <Form.Label>URL Type</Form.Label>
                    </>)}
                    <Form.Select
                      defaultValue="public"
                      {...register("type", { required: true })}
                    >
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                    </Form.Select>
                    {errors.type && (
                      <div style={{ color: "red" }} className="form-text">
                        *Type* is mandatory
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          {/* Step 2: Show corresponding input */}
          {inputType === "file" && (
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="file">
                  <Form.Label>Document</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf,.docx,.csv,.txt"
                    {...register("file", {
                      required: "File is required",
                    })}
                  />
                  {errors.file && (
                    <div style={{ color: "red" }} className="form-text">
                      {errors.file.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          )}

          {inputType === "url" && (
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="url">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://example.com"
                    {...register("url", {
                      required: "URL is required",
                    })}
                  />
                  {errors.url && (
                    <div style={{ color: "red" }} className="form-text">
                      {errors.url.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          )}

          {/* Step 3: Show Type + Save only if something is selected */}
          {inputType && (
            <>
              <div className="mt-3">
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </div>
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};