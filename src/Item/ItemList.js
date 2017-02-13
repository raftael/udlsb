import React, { Component } from 'react';
import Item from './Item';
//import style from '../style';

class ItemList extends Component {
  render() {
    let itemNodes = this.props.data.map(item => {
      return (
        <Item
          type={ item.type }
          detailItems={item.detail.items}
          detailInfo={item.detail.info}
          uniqueID={ item['_id'] }
          onItemDelete={ this.props.onItemDelete }
          onItemUpdate={ this.props.onItemUpdate }
          key={ item['_id'] }>
          { /*service.description --- child object */}
        </Item>
      )
    })
    return (
      <div >
        { itemNodes }
      </div>
    )
  }
}

export default ItemList;
