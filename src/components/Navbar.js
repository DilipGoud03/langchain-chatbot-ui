
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, NavLink } from '@themesberg/react-bootstrap';

import NOTIFICATIONS_DATA from "../data/notifications";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { Link } from "react-router-dom";
import { Routes } from "../routes";

export default () => {
  const loggedInUser = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        {loggedInUser && (
          <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
              <span className="mb-0 font-small fw-bold">{user.name}</span>
            </div>
          </div>
          <Nav className="align-items-center">
            <NavLink as={Link} className="fw-bold" to = {Routes.SignOut.path}>
              <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
            </NavLink>
          </Nav>
        </div>
        )}
      </Container>
    </Navbar>
  );
};
