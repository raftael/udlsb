import React, { Component } from 'react';
import axios from 'axios';
import PostList from './PostList';
import PostForm from './PostForm';
import style from '../style';

class PostBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadPostsFromServer = this.loadPostsFromServer.bind(this);
    this.handlePostDelete = this.handlePostDelete.bind(this);
  }

  loadPostsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  handlePostDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('post deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleDeletePostsSubmit(service) {
      alert('borrar posts');
    // let services = this.state.data;
    // service.id = Date.now();
    // let newServices = services.concat([service]);
    // this.setState({ data: newServices });
    // axios.post(this.props.url, service)
    //   .catch(err => {
    //     console.error(err);
    //     this.setState({ data: services });
    //   });
  }
  
  componentDidMount() {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div style={ style.ServiceBox }>
        <h2 style={ style.title }>Hospedaje:</h2>
      <PostList
        onPostDelete={ this.handlePostDelete }
        data={ this.state.data }/>
      <PostForm onServiceSubmit={ this.handleServiceSubmit }/>
      </div>
    )
  }
}

export default PostBox;
