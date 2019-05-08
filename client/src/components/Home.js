import React, { Component } from "react";
import "../home.css";
import { Redirect } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import backgroundHome from "../collabhomepageanimated.gif";

export default class Home extends Component {
  render() {
    const { fireRedirect } = this.props.user;
    if (fireRedirect) {
      return <Redirect to="/user" />;
    }
    return (
      <div>
        <Container>
          <Row>
            <Col sm={4}>
              <h1 className="title">Collab&#174;</h1>
              <h2 className="subtitle">Collaborate for the sake of art</h2>

              <Form onSubmit={this.props.onLogin}>
                <Form.Group as={Row} controlId="username">
                  <Col>
                    <Form.Control
                      type="username"
                      defaultValue={this.props.username}
                      onChange={this.props.handleChange}
                      plaintext
                      placeholder="Enter your username"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Col>
                    <Form.Control type="password" placeholder="Password" />
                  </Col>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-success"
                  size="lg"
                  className="loginButton"
                >
                  Login
                </Button>
              </Form>
            </Col>

            <Col sm={8}>
              <img className="homePhoto" src={backgroundHome} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
