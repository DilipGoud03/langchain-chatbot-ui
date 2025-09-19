import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faHandHoldingUsd, faSignOutAlt, faUser, faUsers, faTimes, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button,  Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const isLoggedInUser = localStorage.getItem("token");
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  const onCollapse = () => setShow(!show);

  const NavItem = (props) => {
    const { title, link, external, target, icon, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand as={Link} to={Routes.Dashboard.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>

      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            {isLoggedInUser ? (
              <>
                <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                  <div className="d-flex align-items-center">
                    <div className="user-avatar lg-avatar me-4">
                      <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                    </div>
                    <div className="d-block">
                      <Button as={Link} variant="secondary" size="xs" to={Routes.SignIn.path} className="text-dark">
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                      </Button>
                    </div>
                  </div>
                  <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                    <FontAwesomeIcon icon={faTimes} />
                  </Nav.Link>
                </div>

                <Nav className="flex-column pt-3 pt-md-0">
                  <NavItem title="profile" icon={faUser} link={Routes.Profile.path} />
                  <NavItem title="Dashboard" link={Routes.Dashboard.path} icon={faChartPie} />
                  <NavItem title="Documents" icon={faHandHoldingUsd} link={Routes.Documents.path} />
                  {loggedInUser.user_type === 'admin' &&
                    <NavItem title="Users" icon={faUsers} link={Routes.Users.path} />
                  }
                </Nav>
              </>
            ) : (
              <Nav className="flex-column pt-3 pt-md-0">
                <NavItem title="Home" link="/" icon={faRocket} />
                <NavItem title="Sign In" link='sign-in' icon={faSignOutAlt} />
              </Nav>
            )}
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
