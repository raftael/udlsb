import React, { Component } from 'react';
import style from '../style';
import marked from 'marked';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state= { 
      name: this.props.name, 
      level: this.props.level, 
      persons: this.props.persons, 
      gender: this.props.gender, 
      mail: this.props.mail,
      date: this.props.date,
    };
    //binding all our functions to this class
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onServiceDelete(id);
    console.log('oops deleted');
  }

  render() {
    return (
      <div style={ style.service }>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={12}><h3>{this.props.name}</h3></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12}><p>{this.props.level}</p></Col>
            <Col xs={12} md={12}><p>{this.props.persons}</p></Col>
            <Col xs={12} md={12}><p>{this.props.gender}</p></Col>
            <Col xs={12} md={12}><p>{this.props.mail}</p></Col>
            <Col xs={12} md={12}><p>{this.props.date}</p></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <Button bsStyle="danger" bsSize="small" onClick={ this.deletePost }>Borrar</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Post;
