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
import "./App.css";
import "../src/styles/Antd.css";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import ClaimsSearchDashboard from "./components/ClaimsSearch/ClaimsSearchDashboard";
import ListUsers from "./components/ListUser/ListUser";

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
class SessionTimeout extends Component {
  constructor(props) {
    super(props);
    // init config based on development or production
    Config.init();
    this.state = {
      redirect: false,
      timeout: 1000 * 600 * 1,
      showModal: false,
      userLoggedIn: false,
      isTimedOut: false,
    };

    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // this.handleLogout = this.logout.bind(this);
  }
  _onAction(e) {
    this.setState({ isTimedOut: false });
  }

  _onActive(e) {
    this.setState({ isTimedOut: false });
  }

  _onIdle(e) {
    console.log("user is idle", e);
    const isTimedOut = this.state.isTimedOut;
    if (isTimedOut) {
      window.location.pathname = "/";
    } else {
      this.setState({ showModal: true });
      this.idleTimer.reset();

      this.setState({ isTimedOut: true });
      sessionStorage.setItem("origin", window.location.href);
    }
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

  // logout = () => {
  //   sessionStorage.setItem("userData", "");
  //   sessionStorage.clear();
  //   this.setState({ redirect: true });
  //   Swal.fire({
  //     text: "Please Login again",
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     confirmButtonText: "OK",
  //     confirmButtonColor: "#2a3ba4",
  //   }).then(() => {
  //     window.location.pathname = "/login";
  //   });
  // };

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
          {/* <Switch>
            <PrivateRoute
              path="/Search_member"
              exact
              component={SearchMember}
            ></PrivateRoute>
            <PrivateRoute
              path="/dashboard"
              exact
              component={Dashboard}
            ></PrivateRoute>
            <PrivateRoute
              path="/ClaimsTable"
              exact
              component={ClaimsTable}
            ></PrivateRoute>
            <PrivateRoute
              path="/EligibilityCheck"
              exact
              component={EligibilityCheckPage}
            ></PrivateRoute>
            <PrivateRoute
              path="/Profile"
              exact
              component={Profile}
            ></PrivateRoute>
            <PrivateRoute
              path="/AddUser"
              exact
              component={AddUser}
            ></PrivateRoute>
            <PrivateRoute
              path="/userDetails"
              exact
              component={UserDetails}
            ></PrivateRoute>
          </Switch> */}
          <Switch>
            <Route path="/setpassword" exact component={ResetPassword}></Route>
            <Route
              path="/changeforgotpassword"
              exact
              component={ResetPassword}
            ></Route>

            <Route path="/Search_member" exact component={SearchMember}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
            <Route path="/ClaimsTable" exact component={ClaimsTable}></Route>
            <Route
              path="/EligibilityCheck"
              exact
              component={EligibilityCheckPage}
            ></Route>
            <Route path="/Profile" exact component={Profile}></Route>
            <Route path="/AddUser" exact component={AddUser}></Route>
            <Route path="/userDetails" exact component={UserDetails}></Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default SessionTimeout;

// ..............Dashboard Route.............
class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showEpisode: false,
    // };
  }

  render() {
    return (
      <div className="app-parent">
        <div className="app-side-bar-container">
          <Sidebar />
        </div>
        <div className="app-body-container">
          <Homepage />
        </div>
      </div>
    );
  }
}

// ..............Profile  Route...............

class Profile extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showEpisode: false,
    // };
  }

  render() {
    return (
      <div className="app-parent">
        <div className="app-side-bar-container">
          <Sidebar />
        </div>
        <div className="app-body-container">
          <ProfilePage />
        </div>
      </div>
    );
  }
}

// ..............Table Route...............

class SearchMember extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-parent">
        <div className="app-side-bar-container">
          <Sidebar />
        </div>
        <div className="app-body-table-container">
          <Searchdashboard />
        </div>
      </div>
    );
  }
}

class ClaimsTable extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showEpisode: false,
    // };
  }

  render() {
    return (
      <div className="app-parent">
        <div className="app-side-bar-container">
          <Sidebar />
        </div>
        <div className="app-body-table-container">
          <ClaimsSearchDashboard />
        </div>
      </div>
    );
  }
}

class EligibilityCheckPage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showEpisode: false,
    // };
  }

  render() {
    return (
      <div className="app-parent">
        <div className="app-side-bar-container">
          <Sidebar />
        </div>
        {/* <div className="app-body-table-container">
          <TabNew />
        </div> */}
        <div className="app-body-table-container">
          {/* <EligibilityCheck /> */}
          <EligibilitySearchdashboard />
        </div>
      </div>
    );
  }
}

// ................... Add User ..............................

class AddUser extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showEpisode: false,
    // };
  }

  render() {
    return (
      <div className="app-parent">
        <div className="app-side-bar-container">
          <Sidebar />
        </div>
        <div className="app-body-container">
          <AddUserRegistation />
        </div>
      </div>
    );
  }
}

class UserDetails extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showEpisode: false,
    // };
  }

  render() {
    return (
      <div className="app-parent">
        <div className="app-side-bar-container">
          <Sidebar />
        </div>
        <div className="app-body-container">
          <ListUsers />
        </div>
      </div>
    );
  }
}
