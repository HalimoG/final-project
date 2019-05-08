import React, { Component } from "react";
import "../navbar.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    const type = this.props.user;
    return (
      <div>
        <Navbar className="nav-bar">
          <Navbar.Brand className="brand">Collab</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <span className="icons">
                <Link to="/user">
                  <i class="fas fa-user" title="PROFILE" />
                </Link>
              </span>
              {type === "influencer" && (
                <span className="icons">
                  <Link to="/upload">
                    <i class="fab fa-searchengin" title="UPLOAD" />
                  </Link>
                </span>
              )}

              <span className="icons">
                <Link to="/pending">
                  <i class="fas fa-users" title="CONNECTION" />
                </Link>
              </span>
              <span className="icons">
                <Link to="/messages">
                  <i class="fas fa-envelope" title="MESSAGE" />
                </Link>
              </span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
