// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Routes } from "./routes";

// Pages (replace with actual paths)
import SignIn from "./auth-components/SignIn";
import SignUp from "./auth-components/SignUp";
import SignOut from "./auth-components/SignOut";
import Documents from "./document-component/Documents";
import Users from "./user-component/Users";
import User from "./user-component/Profile";
import AddUser from "./user-component/AddUser"
import NotFoundPage from "./pages/errors/NotFound";
import ServerError from "./pages/errors/ServerError";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import DocumentUpload from "./document-component/DocumentUpload";
import UserAddresses from "./user-component/UserAdresses";
;

const isAuthenticated = () => !!localStorage.getItem("token");

const LayoutWithSidebar = ({ Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [showChatbot, setShowChatbot] = useState(() => {
    return localStorage.getItem("chatbotVisible") !== "false";
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    localStorage.setItem("chatbotVisible", !showChatbot);
  };

  return (
    <>
      <Preloader show={!loaded} />
      <Sidebar />
      <main className="content">
        <Navbar />
        <Component {...rest} />
        <Footer toggleChatbot={toggleChatbot} showChatbot={showChatbot} />
      </main>
    </>
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <LayoutWithSidebar Component={Component} {...props} />
        ) : (
          <Redirect to={Routes.SignIn.path} />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [showChatbot, setShowChatbot] = useState(() => {
    return localStorage.getItem("chatbotVisible") !== "false";
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    localStorage.setItem("chatbotVisible", !showChatbot);
  };
  return (
    <Route

      {...rest}
      render={(props) =>
        isAuthenticated() && restricted ? (
          <Redirect to={Routes.Dashboard.path} />
        ) : (
          <>
            <Preloader show={!loaded} />
            <Component {...props} />
            <Footer toggleChatbot={toggleChatbot} showChatbot={showChatbot} />

          </>
        )
      }
    />
  );
};

const App = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <Router>
      <Switch>
        {/* Public Routes */}
        <PublicRoute exact path={Routes.SignIn.path} component={SignIn} restricted />
        <PublicRoute exact path={Routes.SignUp.path} component={SignUp} restricted />

        {/* Protected Routes with Sidebar */}
        <ProtectedRoute exact path={Routes.Dashboard.path} component={Documents} />
        <ProtectedRoute exact path={Routes.SignOut.path} component={SignOut} />
        <ProtectedRoute exact path={Routes.Profile.path} component={User} />
        <ProtectedRoute exact path={Routes.UserAddresses.path} component={UserAddresses} />
        {
          loggedInUser && loggedInUser.user_type === 'admin' &&
          <>
            <ProtectedRoute exact path={Routes.Users.path} component={Users} />
            <ProtectedRoute exact path={Routes.AddUser.path} component={AddUser} />
            <ProtectedRoute exact path={Routes.EditUser.path} component={User} />
            <ProtectedRoute exact path={Routes.DocumentUpload.path} component={DocumentUpload} />
          </>
        }

        {/* Error pages */}
        <Route exact path={Routes.ServerError.path} component={ServerError} />
        <Route exact path={Routes.NotFound.path} component={NotFoundPage} />

        {/* Catch-all */}
        <Redirect to={Routes.NotFound.path} />
      </Switch>
    </Router>
  );
};

export default App;
