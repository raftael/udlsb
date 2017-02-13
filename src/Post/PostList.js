import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
  render() {
    let postNodes = this.props.data.map(post => {
      return (
        <Post
          name={ post.name }
          level={post.level}
          uniqueID={ post['_id'] }
          persons={post.persons}
          gender={post.gender}
          mail={post.mail}
          date={post.date}
          onPostDelete={ this.props.onPostDelete }
          key={ post['_id'] }>
        </Post>
      )
    })
    return (
      <div >
        { postNodes }
      </div>
    )
  }
}

export default PostList;
