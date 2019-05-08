import React from "react";
import "../user.css";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "./Navbar.js";

function userPortfolio(prop) {
  return (
    <div>
      <Col sm>
        <img className="portfolio" src={prop.user.urls.full} />
      </Col>
    </div>
  );
}

export default class user extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }
  componentDidMount() {
    const { unsplashAPI } = this.props.user;

    const url = unsplashAPI;
    fetch(url)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ user: data });
        console.log(data);
      });
  }
  render() {
    const { user } = this.state;
    const { profilepic, bio } = this.props.user;
    let client = user.map(user => {
      return <userPortfolio user={user} />;
    });
    if (user) {
      return (
        <div>
          <Navigation user={this.props.user} />
          <div className="user-profile">
            <img className="profile-photo" src={profilepic} />
            <h1 className="user-name">{user[0].user.name}</h1>
            <h2 className="user-location">
              {" "}
              📍 <span className="location">Toronto</span>
            </h2>
            <h2 className="user-bio">{bio}</h2>
          </div>
          <Container>
            <Row>{client}</Row>
          </Container>
        </div>
      );
    } else {
      return false;
    }
  }
}
