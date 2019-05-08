import React, { Component } from "react";
import "../select.css";
import {
  Row,
  Col,
  Button,
  Container,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import selectPhotographer from "../photog.jpg";
import selectInfluencer from "../influencer.jpg";

export default class Select extends Component {
  render() {
    return (
      <div>
        <ButtonToolbar>
          {["top", "right", "bottom", "left"].map(placement => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  Tooltip on <strong>{placement}</strong>.
                </Tooltip>
              }
            >
              <Button variant="secondary">Tooltip on {placement}</Button>
            </OverlayTrigger>
          ))}
        </ButtonToolbar>
        ;{/* **** */}
        <h1 className="begin-journey">
          Begin Your <span className="journey">Journey</span>
        </h1>
        <Container>
          <Row>
            <Col xs={6}>
              <img className="select-influencer" src={selectInfluencer} />
              <h4 className="description-influencer">Influencer</h4>
            </Col>
            <Col xs={6}>
              <img className="select-photographer" src={selectPhotographer} />
              <h4 className="description-photographer">Photographer</h4>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
