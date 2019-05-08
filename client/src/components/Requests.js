import React, { Component } from "react";
import "../requests.css";
import requestBackground from "../collabrequests.jpg";
import { Row, Col, Container, Button } from "react-bootstrap";
import Navigation from "./Navbar.js";

export default class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestmade: null
    };
  }
  componentDidMount() {
    var id = this.props.user.id;
    var url = "/" + id + "/photographerrequest";
    fetch(url)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ requestmade: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { requestmade } = this.state;
    const { connected, deleted } = this.props;
    let request = requestmade.map((request, i) => {
      if (connected) {
        return (
          <div className="request-box">
            <img className="request-photo" src={request.profilepic} />
            <h4 className="request-name">{request.name}</h4>
            <span className="request-buttons">
              <span>Connected!</span>
            </span>
          </div>
        );
      } else if (deleted) {
        return (
          <div>
            <h1>No Pending Messages</h1>
          </div>
        );
      } else {
        return (
          <div className="request-box">
            <img className="request-photo" src={request.profilepic} />
            <h4 className="request-name">{request.name}</h4>
            <span className="request-buttons">
              <Button
                onClick={this.props.accept}
                className="request-accept"
                variant="success"
              >
                Accept
              </Button>
              <Button
                onClick={this.props.delete.bind(this, request.id)}
                className="request-decline"
                variant="outline-danger"
              >
                Decline
              </Button>
            </span>
          </div>
        );
      }
    });
    return (
      <div>
        <Navigation user={this.props.user} />

        <Container>
          <Row>
            <Col sm={8}>
              <h1 className="pending-requests">
                Pending <span className="cursive-requests">Requests</span>
              </h1>
              {request}
            </Col>
            <Col sm={4}>
              <img className="background-requests" src={requestBackground} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
