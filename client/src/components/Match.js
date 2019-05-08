import React, { Component } from "react";
import "../user.css";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Navigation from "./Navbar.js";

export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: null
    };
  }

  componentDidMount() {
    const { unsplashApi } = this.props.photographerMatch;
    const url = unsplashApi;
    fetch(url)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ match: data });
      });
  }

  render() {
    const { match } = this.state;
    const { connected, user, photographerMatch, onClickMessage } = this.props;
    let photographr = match.map(photographer => {
      return (
        <Col sm>
          <img className="portfolio" src={photographer.urls.full} />
        </Col>
      );
    });
    if (!match) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return (
        <div>
          <Navigation user={user} />
          <div className="photographer-profile">
            <img
              className="profile-photo"
              src={photographerMatch.profilePhoto}
            />
            <h1 className="photographer-name">{match[0].user.name}</h1>
            <h2 className="photographer-location">
              {" "}
              📍 <span className="location">Toronto</span>
            </h2>
            <h2 className="photographer-bio">{photographerMatch.bio}</h2>i
            {!connected && (
              <Button
                variant="success"
                onClick={onClickMessage}
                className="collab-button"
              >
                Send A Request!
              </Button>
            )}
            {connected && <span>Request Sent!</span>}
          </div>
          <Container>
            <Row>{photographr}</Row>
          </Container>
        </div>
      );
    }
  }
}
