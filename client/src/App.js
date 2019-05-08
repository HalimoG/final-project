import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Upload from "./components/Upload";
import Error from "./components/Error";
import User from "./components/User";
import Results from "./components/Results";
import Requests from "./components/Requests";
import Pending from "./components/Pending";
import Select from "./components/Select.js";
import Messages from "./components/Messages.js";
import Match from "./components/Match";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      match: [],
      labels: [],
      username: null,
      fireRedirect: false,
      photographerMatch: null,
      connected: false,
      deleted: false
    };
  }

  setRedirectUpload = (labels, match) => {
    this.setState({
      labels: labels,
      match: match,
      fireRedirect: false
    });
  };
  onClickMatch = (photographer, e) => {
    this.setState({ photographerMatch: photographer });
  };

  handleChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  onLogin = e => {
    e.preventDefault();
    var username = this.state.username;
    axios
      .post("/login", {
        username: username.trim()
      })
      .then(response => {
        this.setState({ user: response.data[0], fireRedirect: true });
      });
  };
  onClickMessage = () => {
    this.setState({
      fireRedirect: true,
      connected: true
    });

    axios
      .post("/collab", {
        photographer: this.state.photographerMatch.id,
        influencer: this.state.user.id
      })
      .then(response => {
        console.log(response.data);
      });
  };

  accept = () => {
    this.setState({
      connected: true
    });
  };

  delete = (request, e) => {
    this.setState({
      fireRedirect: true,
      deleted: true
    });

    axios
      .post("/decline", {
        influencer: request,
        photographer: this.state.user.id
      })
      .then(response => {
        console.log(response.data);
      });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            render={props => (
              <Home
                handleChange={this.handleChange}
                onLogin={this.onLogin}
                fireRedirect={this.state.fireRedirect}
                user={this.state.user}
              />
            )}
            exact
          />
          <Route path="/select" component={Select} />
          <Route
            path="/match"
            render={props => (
              <Match
                connected={this.state.connected}
                onClickMessage={this.onClickMessage}
                fireRedirect={this.state.fireRedirect}
                user={this.state.user}
                photographerMatch={this.state.photographerMatch}
              />
            )}
          />
          <Route
            path="/upload"
            render={props => (
              <Upload
                setRedirectUpload={this.setRedirectUpload}
                user={this.state.user}
                match={this.state.match}
                labels={this.state.labels}
                fireRedirect={this.state.fireRedirect}
              />
            )}
          />
          <Route
            path="/user"
            render={props => <User user={this.state.user} />}
          />
          <Route
            path="/results"
            render={props => (
              <Results
                connected={this.state.connected}
                onClickMessage={this.onClickMessage}
                user={this.state.user}
                photographerMatch={this.state.photographerMatch}
                onClickMatch={this.onClickMatch}
              />
            )}
          />
          <Route
            path="/requests"
            render={props => (
              <Requests
                del={this.state.del}
                onClickMessage={this.onClickMessage}
                accept={this.accept}
                delete={this.delete}
                user={this.state.user}
                connected={this.state.connected}
              />
            )}
          />
          <Route
            path="/pending"
            render={props => <Pending user={this.state.user} />}
          />
          <Route
            path="/messages"
            render={props => <Messages user={this.state.user} />}
          />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}
