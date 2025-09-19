import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Nav, Navbar, Container, NavLink } from '@themesberg/react-bootstrap';
import { Link } from "react-router-dom";
import { Routes } from "../routes";

const Navbars = () => {
  const loggedInUser = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        {loggedInUser && user ? (
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex align-items-center">
              <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                <FontAwesomeIcon icon={faUser} />
                <span className="mb-0 font-small fw-bold"><b> {user.name}</b></span>
                <span className="mb-0 font-small fw-bold"><b> ({user.user_type})</b></span>
              </div>
            </div>
            <Nav className="align-items-center">
              <NavLink as={Link} className="fw-bold" to={Routes.SignOut.path}>
                <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
              </NavLink>
            </Nav>
          </div>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  );
};


export default Navbars;