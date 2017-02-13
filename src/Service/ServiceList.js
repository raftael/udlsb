import React, { Component } from 'react';
import Service from './Service';
//import style from '../style';

class ServiceList extends Component {
  render() {
    let serviceNodes = this.props.data.map(service => {
      return (
        <Service
          title={ service.title }
          serviceItem={service}
          uniqueID={ service['_id'] }
          image={service.image}
          description={service.description}
          module={service.module}
          type={service.type}
          onServiceDelete={ this.props.onServiceDelete }
          onServiceUpdate={ this.props.onServiceUpdate }
          key={ service['_id'] }>
          { /*service.description --- child object */}
          
        </Service>
      )
    })
    return (
      <div >
        { serviceNodes }
      </div>
    )
  }
}

export default ServiceList;
