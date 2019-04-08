import React, {Component} from 'react';
import '../pending.css';
import requestBackground from '../collabrequestsphotog.jpg';
import {Row, Col, Container, Button, Card} from 'react-bootstrap';
import Navigation from './Navbar.js'
const axios = require("axios");

class Pending extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state={
  //     requestmade:[]
  //   }
  // }
  // componentDidMount () {
  //   var id = this.props.user.id
  //   var url = '/'+id+'/Influencerrequest'

  //   axios.get(url)
  //   .then(function (response) {
  //    this.setState({requestmade:response.data})
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  //   }

  render(){

  return (
  <div>
  {/* <Navigation/> */}

  <Container>
    <Row>
      <Col sm={8}>
      <h1 className="pending-requests">Pending <span className="cursive-requests">Connections</span></h1>
         <div className="request-box">
          <img className="request-photo" src="https://images.unsplash.com/profile-1541499455668-3a19737a038c?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff" />
          <h4 className="request-name">Amelia Clarke</h4>
            <span className="pending-buttons">
          <Button className="request-pending" variant="success" disabled>Pending</Button>
            </span>
        </div>

        <div className="request-box">
          <img className="request-photo" src="https://images.unsplash.com/profile-1541499455668-3a19737a038c?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff" />
          <h4 className="request-name">Angela Yang</h4>
            <span className="pending-buttons">
          <Button className="request-message" variant="success">Message</Button>
            </span>
        </div>
      </Col>


      <Col sm={4}>
      <img className="background-requests" src={requestBackground} />
      </Col>
    </Row>
  </Container>



  </div>
  );
};
}
export default Pending;