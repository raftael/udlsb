import React, { Component } from 'react';
import style from '../style';
import Button from 'react-bootstrap/lib/Button';
//import FormControl from 'react-bootstrap/lib/FormControl';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
    this.handleDeletePostsSubmit = this.handleDeletePostsSubmit.bind(this);
  }
  
  handleDeletePostsSubmit(e) {
    e.preventDefault();
    //this.props.onPostDelete({ title: title });
    //this.setState({ title: '' });
  }
  render() {
    return (
      <form style={ style.serviceForm } onSubmit={ this.handleDeletePostsSubmit }>
        <h2>Borrar posts del mes: </h2>

        <Button bsStyle="primary" bsSize="large" type="submit">Borrar Posts</Button>

      </form>
    )
  }
}

export default PostForm;
