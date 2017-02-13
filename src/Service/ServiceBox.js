import React, { Component } from 'react';
import axios from 'axios';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';
import style from '../style';

class ServiceBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadServicesFromServer = this.loadServicesFromServer.bind(this);
    this.handleServiceSubmit = this.handleServiceSubmit.bind(this);
    this.handleServiceDelete = this.handleServiceDelete.bind(this);
    this.handleServiceUpdate = this.handleServiceUpdate.bind(this);
  }
  loadServicesFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  handleServiceSubmit(service) {
    let services = this.state.data;
    service.id = Date.now();
    let newServices = services.concat([service]);
    this.setState({ data: newServices });
    axios.post(this.props.url, service)
      .catch(err => {
        console.error(err);
        this.setState({ data: services });
      });
  }
  handleServiceDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('service deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }
  handleServiceUpdate(id, service) {
    //sends the service id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, service)
      .catch(err => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.loadServicesFromServer();
    setInterval(this.loadServicesFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={ style.ServiceBox }>
        <h2 style={ style.title }>Servicios:</h2>
      <ServiceList
        onServiceDelete={ this.handleServiceDelete }
        onServiceUpdate={ this.handleServiceUpdate }
        data={ this.state.data }/>
      <ServiceForm onServiceSubmit={ this.handleServiceSubmit }/>
      </div>
    )
  }
}

export default ServiceBox;
