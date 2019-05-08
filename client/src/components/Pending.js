import React, { Component } from "react";
import "../pending.css";
import requestBackground from "../collabrequestsphotog.jpg";
import { Row, Col, Container, Button } from "react-bootstrap";
import Navigation from "./Navbar.js";

export default class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestmade: null,
      unsplashApi: null
    };
  }
  componentDidMount() {
    const { id } = this.props.user;
    const url = "/" + id + "/influencerrequest";
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
    const { user } = this.props;
    let request = requestmade.map((request, i) => {
      return (
        <div className="request-box">
          <img className="request-photo" src={request.profilepic} />
          <h4 className="request-name">{request.name}</h4>
          <h2 className="user-bio">{request.bio}</h2>
          <span className="pending-buttons">
            <Button className="request-pending" variant="success" disabled>
              Pending
            </Button>
          </span>
        </div>
      );
    });

    return (
      <div>
        <Navigation user={user} />

        <Container>
          <Row>
            <Col sm={8}>
              <h1 className="pending-requests">
                Pending <span className="cursive-requests">Connections</span>
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
