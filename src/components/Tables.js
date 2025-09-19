
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faTrashAlt, faEdit, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Table, Dropdown, Pagination, Spinner, ButtonGroup, Button } from '@themesberg/react-bootstrap';
import api from "./../axios";
import { Link, useHistory } from "react-router-dom";
import { Routes } from "../routes";
import Profile from "../user-component/Profile";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};


export const DocumentsTable = () => {
  const [total, setTotal] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

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
  const handleDelete = async (userId) => {
    try {
      await api.delete(`/user/${userId}`);
      setMessage("User deleted successfully.");
      setDocuments((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Error deleting User:", err);
      setError(err.response?.data?.detail || "Failed to delete User.");
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
      : role === "public" ? "danger" : "primary";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{document.original_path}</td>
        <td className={`fw-normal text-${statusVariant}`} >{document.type}</td>
        <td>{document.created_at}</td>
        <td>
          {loggedInUser.user_type === "admin" && document.user_type !== "admin" && (
            <Dropdown.Item className="text-danger" onClick={() => handleDelete(document.id)}>
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
            </Dropdown.Item>
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

export const UsersTable = () => {
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
  const history = useHistory()
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(`/user/list?page=${page}`);
        setTotal(res.data.meta.total_items || 0)
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  // Delete handler
  const handleDelete = async (userId) => {
    try {
      await api.delete(`/user/${userId}`);
      setMessage("User deleted successfully.");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Error deleting User:", err);
      setError(err.response?.data?.detail || "Failed to delete User.");
    } finally {
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    }
  };


  const handleEdit = (id) => {
    history.push(`/edit-user/${id}`);
  };

  const TableRow = ({ user, index }) => {
    const role = user.user_type;
    const statusVariant = role === "admin" ? "success"
      : role === "employee" ? "warning"
        : role === "user" ? "danger" : "primary";

    const defaultAddress = user.addresses?.find((addr) => addr.is_default);

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td className={`fw-normal text-${statusVariant}`} >{user.user_type}</td>
        {defaultAddress ? (
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
        )}
        <td>
          {loggedInUser.user_type === "admin" && user.user_type !== "admin" && (
            <>
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                  <span className="icon icon-sm">
                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEdit(user.id)}>
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                  </Dropdown.Item>
                  <Dropdown.Item className="text-danger" onClick={() => handleDelete(user.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>ZipCode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <TableRow key={`user-${user.id}`} user={user} index={idx} />
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No users available
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
              <Pagination.Next onClick={() => setPage((p) => p + 1)} disabled={users.length === 0}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            <b>{users.length}</b> out of <b>{total}</b>
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};