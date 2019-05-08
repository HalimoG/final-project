import React, { Component } from "react";
import "../messages.css";
import { Form, Row, Col, Container } from "react-bootstrap";
import Navigation from "./Navbar.js";

function Chat(props) {
  const { type } = props.user;
  if (type === "influencer") {
    return (
      <div>
        <div className="influencer-section">
          <h4 className="message-photographer">Start chatting with Joe!</h4>
        </div>
        <div className="photographer-section" />
      </div>
    );
  } else {
    return (
      <div>
        <div className="influencer-section">
          <h4 className="message-influencer">Start chatting with Eloise</h4>
        </div>
        <div className="photographer-section" />
      </div>
    );
  }
}

export default class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: null
    };
  }
  componentDidMount() {
    const { type, id } = this.props.user;
    if (type === "influencer") {
      const url = "/" + id + "/influencerrequest";
      fetch(url)
        .then(results => {
          return results.json();
        })
        .then(data => {
          this.setState({ messages: data });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      const url = "/" + id + "/photographerrequest";
      fetch(url)
        .then(results => {
          return results.json();
        })
        .then(data => {
          this.setState({ messages: data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  render() {
    const { messages } = this.state;
    const { user } = this.props;
    let message = messages.map(function(message) {
      return (
        <div className="message-request">
          <img className="message-photo" src={message.profilepic} />
          <h4 className="message-name">{message.name}</h4>
        </div>
      );
    });

    return (
      <div>
        <Navigation user={user} />
        <Container>
          <Row>
            <Col sm={4} className="messages-left">
              <h4 className="your-connections">
                Your <span className="connections">Connections</span>
              </h4>

              {message}
            </Col>
            <Col sm={8} className="messages-right">
              <Chat user={user} />

              <div className="textarea">
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      placeholder="Type your message here"
                    />
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
