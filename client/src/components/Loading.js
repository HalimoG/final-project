import React, { Component } from "react";
import "../loading.css";
import { Spinner } from "react-bootstrap";
import backgroundLoading from "../collabloading.jpg";
import { withRouter } from "react-router-dom";

class Loading extends Component {
  render() {
    const { labels } = this.props;
    labels.pop();
    const keyword = labels.map(word => {
      return <h4 className="keywordDetected">{word}</h4>;
    });
    return (
      <div>
        <img className="loadingBackground" src={backgroundLoading} />

        <div className="keywordSection">
          <h2 className="keywordTitle">Keywords </h2>
          <div className="dots">
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="success" />
          </div>
          {keyword}
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
export default withRouter(Loading);
