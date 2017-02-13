import React, { Component } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
//import ItemForm from './ItemForm';
import style from '../style';

class ItemBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadItemsFromServer = this.loadItemsFromServer.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
  }
  loadItemsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  handleItemSubmit(item) {
    let items = this.state.data;
    item.id = Date.now();
    let newItems = item.concat([item]);
    this.setState({ data: newItems });
    axios.post(this.props.url, item)
      .catch(err => {
        console.error(err);
        this.setState({ data: items });
      });
  }
  handleItemDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('item deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }
  handleItemUpdate(id, item) {
    //sends the item id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, item)
      .catch(err => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.loadItemsFromServer();
    setInterval(this.loadItemsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={ style.ServiceBox }>
        <h2 style={ style.title }>Elementos:</h2>
      <ItemList
        onItemDelete={ this.handleItemDelete }
        onItemUpdate={ this.handleItemUpdate }
        data={ this.state.data }/>
      {/*<ItemForm onItemSubmit={ this.handleItemSubmit }/> */}
      </div>
    )
  }
}

export default ItemBox;
