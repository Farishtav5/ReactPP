import React, { Component } from "react";

// import { Route, BrowserRouter,Redirect as Router } from "react-router-dom";
import {
  Route,
  Redirect,
  Switch,
  withRouter,
  BrowserRouter as Router,
} from "react-router-dom";
// import { Redirect } from "react-router-dom";
import IdleTimer from "react-idle-timer";
// import { IdleTimeOutModal } from "./modal/IdleModal";
import { IdleTimeOutModal } from "./components/Pages/IdleTimeOutModal";
import Login from "./components/Pages/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Config from "./config";
import Homepage from "./components/HomePage/HomePage";
// import EligibilityCheck from "./components/EligibilityCheck/EligibilityCheck";
import EligibilitySearchdashboard from "./components/EligibilityCheck/EligibilitySearchdashboard";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import TabNew from "./components/TabNew/TabNew";
import AddUserRegistation from "./components/UserRegistration/AddUser";
import Providertable from "./components/ClaimsSearch/ClaimsTable";
import Searchdashboard from "./components/memberSearch/Searchdashboard";
import ResetPassword from "./components/Pages/RestPassword";
import TestParent from "./components/Pages/TestParent";
import "./App.css";
import "../src/styles/Antd.css";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import ClaimsSearchDashboard from "./components/ClaimsSearch/ClaimsSearchDashboard";
import ListUsers from "./components/ListUser/ListUser";
import SessionTimeout from "./SessionTimeout";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem("userEmail") !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
class App extends Component {
  constructor(props) {
    super(props);

    Config.init();
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    console.log(sessionStorage.getItem("origin") === window.location.href);
    if (window.location.href === sessionStorage.getItem("origin")) {
      console.log(sessionStorage.getItem("origin") === window.location.href);
      window.location.pathname = "/login";
      sessionStorage.clear();
    }
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleLogout() {
    this.setState({ showModal: false });

    sessionStorage.clear();
    window.location.pathname = "/";
  }

  render() {
    return (
      <>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={this.state.timeout}
        />
        <IdleTimeOutModal
          showModal={this.state.showModal}
          handleClose={this.handleClose}
          handleLogout={this.handleLogout}
        />

        <Router>
          <Switch>
            <Route path="/setpassword" exact component={ResetPassword}></Route>
            <Route path="/test-parent" exact component={TestParent}></Route>
            <Route
              path="/changeforgotpassword"
              exact
              component={ResetPassword}
            ></Route>
            <Route path="/" exact component={Login}></Route>
            <Route path="/login" exact component={Login}></Route>
              <Route path="/setpassword" exact component={ResetPassword}></Route>
            <Route
              path="/changeforgotpassword"
              exact
              component={ResetPassword}
            ></Route>
            <Route path="/" render={(props) => <SessionTimeout {...props} />} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
