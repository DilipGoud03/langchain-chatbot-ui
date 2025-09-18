// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Pages (replace with actual paths)
import SignIn from "./auth-components/SignIn";
import SignUp from "./auth-components/SignUp";
import SignOut from "./auth-components/SignOut";
import Dashboard from "./dashboard/Dashboard";
import Documents from "./pages/Documents";
import Upgrade from "./pages/Upgrade";
import BootstrapTables from "./pages/tables/BootstrapTables";
import NotFoundPage from "./pages/errors/NotFound";
import ServerError from "./pages/errors/ServerError";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Users from "./pages/Users";
import User from "./pages/User";

const isAuthenticated = () => !!localStorage.getItem("token");

const LayoutWithSidebar = ({ Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(() => {
    return localStorage.getItem("settingsVisible") !== "false";
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      <Preloader show={!loaded} />
      <Sidebar />
      <main className="content">
        <Navbar />
        <Component {...rest} />
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
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
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        {/* Public Routes */}
        <PublicRoute exact path="/sign-in" component={SignIn} restricted />
        <PublicRoute exact path="/sign-up" component={SignUp} restricted />

        {/* Protected Routes with Sidebar */}
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/documents" component={Documents} />
        <ProtectedRoute exact path="/users" component={Users} />
        <ProtectedRoute exact path="/user" component={User} />
        <ProtectedRoute exact path="/upgrade" component={Upgrade} />
        <ProtectedRoute exact path="/bootstrap-tables" component={BootstrapTables} />
        <ProtectedRoute exact path="/sign-out" component={SignOut} />

        {/* Error pages */}
        <Route exact path="/500" component={ServerError} />
        <Route exact path="/404" component={NotFoundPage} />

        {/* Catch-all */}
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
