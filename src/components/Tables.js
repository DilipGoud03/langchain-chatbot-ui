
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEllipsisH, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Table, Dropdown, Pagination, Spinner, ButtonGroup, Button } from '@themesberg/react-bootstrap';
import api from "./../axios";
import { Link, useHistory } from "react-router-dom";


export const DocumentsTable = () => {
  const [total, setTotal] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const loggedInEmployee = JSON.parse(localStorage.getItem("employee") || "{}");

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await api.get(`/doc/list?page=${page}`);
        setTotal(res.data.meta.total_items || 0)
        setDocuments(res.data.documents || []);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [page]);

  // Delete handler
  const handleDelete = async (employeeId) => {
    try {
      await api.delete(`/doc/${employeeId}`);
      setMessage("Document deleted successfully.");
      setDocuments((prev) => prev.filter((u) => u.id !== employeeId));
    } catch (err) {
      console.error("Error deleting Document:", err);
      setError(err.response?.data?.detail || "Failed to delete Document.");
    } finally {
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    }
  };

  const TableRow = ({ document, index }) => {
    const role = document.type;
    const statusVariant = role === "private" ? "success"
      : role === "public" ? "info" : "primary";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{document.original_path}</td>
        <td className={`fw-normal text-${statusVariant}`} >{document.type}</td>
        <td>{document.created_at}</td>
        <td>
          {loggedInEmployee.employee_type === "admin" && document.employee_type !== "admin" && (
            <span
                role="button"
                onClick={() => handleDelete(document.id)}
                className="text-danger"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
              </span>
          )}
        </td>
      </tr>
    );
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <Table hover className="document-table align-items-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Uploaded At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((document, idx) => (
                <TableRow key={`document-${document.id}`} document={document} index={idx} />
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No documents available
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={() => setPage((p) => p + 1)} disabled={documents.length === 0}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            <b>{documents.length}</b> out of <b>{total}</b>
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const EmployeesTable = () => {
  const [total, setTotal] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const loggedInEmployee = JSON.parse(localStorage.getItem("employee") || "{}");
  const history = useHistory()
  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get(`/employee/list?page=${page}`);
        setTotal(res.data.meta.total_items || 0)
        setEmployees(res.data.employees || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [page]);

  // Delete handler
  const handleDelete = async (employeeId) => {
    try {
      await api.delete(`/employee/${employeeId}`);
      setMessage("Employee deleted successfully.");
      setEmployees((prev) => prev.filter((u) => u.id !== employeeId));
    } catch (err) {
      console.error("Error deleting Employee:", err);
      setError(err.response?.data?.detail || "Failed to delete Employee.");
    } finally {
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    }
  };


  const handleEdit = (id) => {
    history.push(`/edit-employee/${id}`);
  };

  const ViewAddresses = (id) => {
    console.log("ViewAddresses");
    history.push(`/employee-addresses/${id}`);
  };

  const TableRow = ({ employee, index }) => {
    const role = employee.employee_type;
    const statusVariant = role === "admin" ? "success"
      : role === "employee" ? "info" : "primary";

    // const defaultAddress = employee.addresses?.find((addr) => addr.is_default);

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td className={`fw-normal text-${statusVariant}`} >{employee.employee_type}</td>
        {/* {defaultAddress ? (
          <>
            <td>{defaultAddress.address}</td>
            <td>{defaultAddress.city}</td>
            <td>{defaultAddress.state}</td>
            <td>{defaultAddress.zip_code}</td>
          </>
        ) : (
          <td colSpan="4" className="text-center text-muted">
            No Default Address
          </td>
        )} */}
        <td>
          {loggedInEmployee.employee_type === "admin" && employee.employee_type !== "admin" && (
            <>
              <span
                role="button"
                onClick={() => handleEdit(employee.id)}
                className="text-primary me-2"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </span>

              <span
                role="button"
                onClick={() => handleDelete(employee.id)}
                className="text-danger"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
              </span>
              {/* <Dropdown.Item onClick={() => ViewAddresses(employee.id)}>
                    <FontAwesomeIcon icon={faAddressBook} className="me-2" /> View Addresses
                  </Dropdown.Item> */}
              {/* <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                  <span className="icon icon-sm">
                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  
                </Dropdown.Menu>
              </Dropdown> */}
            </>
          )}
        </td>
      </tr>
    );
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <Table hover className="employee-table align-items-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {/* <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>ZipCode</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, idx) => (
                <TableRow key={`employee-${employee.id}`} employee={employee} index={idx} />
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No employees available
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={() => setPage((p) => p + 1)} disabled={employees.length === 0}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            <b>{employees.length}</b> out of <b>{total}</b>
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const EmployeeAddressTable = (useId) => {
  const [total, setTotal] = useState(0);
  const [addresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const loggedInEmployee = JSON.parse(localStorage.getItem("employee") || "{}");
  const history = useHistory()
  // Fetch addresses
  useEffect(() => {
    const fetchEmployeeAddresses = async () => {
      try {
        const res = await api.get(`/employee/${useId}/address/list`);
        setTotal(res.data.meta.total_items || 0)
        setUserAddresses(res.data.addresses || []);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setUserAddresses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeAddresses();
  }, [useId, page]);

  // Delete handler
  const handleDelete = async (employeeId) => {
    try {
      await api.delete(`/employee/${employeeId}`);
      setMessage("Address deleted successfully.");
      setUserAddresses((prev) => prev.filter((u) => u.id !== employeeId));
    } catch (err) {
      console.error("Error deleting address:", err);
      setError(err.response?.data?.detail || "Failed to delete address.");
    } finally {
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    }
  };

  const handleEdit = (id) => {
    history.push(`/edit-employee-address/${id}`);
  };

  const TableRow = ({ address, index }) => {
    const role = address.employee_type;
    const statusVariant = role === "admin" ? "success"
      : role === "employee" ? "warning"
        : role === "employee" ? "danger" : "primary";

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{address.address}</td>
        <td>{address.city}</td>
        <td>{address.state}</td>
        <td>{address.zip_code}</td>
        <td className={`fw-normal text-${statusVariant}`} >{address.employee_type}</td>
        <td>
          <>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleEdit(address.id)}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={() => handleDelete(address.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        </td>
      </tr>
    );
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <Table hover className="employee-table align-items-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>ZipCode</th>
              <th>Default</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {addresses.length > 0 ? (
              addresses.map((address, idx) => (
                <TableRow key={`address-${address.id}`} address={address} index={idx} />
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No addresses available
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={() => setPage((p) => p + 1)} disabled={addresses.length === 0}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            <b>{addresses.length}</b> out of <b>{total}</b>
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};