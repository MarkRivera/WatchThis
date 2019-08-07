import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/Router/PrivateRoute";
import Landing from "./components/layout/Landing/Landing";
import Login from "./components/layout/Login/Login";
import Navbar from "./components/layout/Navbar/Navbar";
import Register from "./components/layout/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import ProfileDisplay from "./components/Profile/ProfileDisplay";
import GenresScreen from "./components/GenreScreen/GenresScreen";
import Slideshow from "./components/Slideshow/Slideshow";
import { Provider } from "react-redux";
import store from "./store.js";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import { getGenres } from "./actions/genres";
import { getConfigLink } from "./actions/getConfigLink";
import setAuthToken from "./utils/setAuthToken";
import history from "./components/history";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getGenres());
    store.dispatch(getConfigLink());
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <div className="background">
            <Navbar />
            <main className="app-container">
              <Alert />
              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Landing} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/profile" component={ProfileDisplay} />
                <PrivateRoute path="/genres" component={GenresScreen} />
                <PrivateRoute path="/movies" component={Slideshow} />
              </Switch>
            </main>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
