import React, { Component } from 'react';
//import logo from './logo.svg';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
//import NavDropdown from 'react-bootstrap/lib/NavDropdown';
//import MenuItem from 'react-bootstrap/lib/MenuItem';
import ServiceBox from './Service/ServiceBox';
import PostBox from './Post/PostBox';
import ItemBox from './Item/ItemBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeKey: 1 };
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  handleSelect(event, key) {
    this.setState({activeKey: event});
  }

  render() {
    return (
      <div className="App">
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">App UDLSB | </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav onSelect={this.handleSelect}>
                <NavItem eventKey={1} href="#">Servicios</NavItem>
                <NavItem eventKey={2} href="#">Elementos</NavItem>
                <NavItem eventKey={3} href="#">Hospedaje</NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">cerrar sesión</NavItem>
              </Nav>
            </Navbar.Collapse>
         </Navbar>

        {this.state.activeKey === 1 ? <ServiceBox url='http://localhost:3001/api/services' pollInterval={50000} /> : null }
        {this.state.activeKey === 2 ? <ItemBox url='http://localhost:3001/api/items' pollInterval={50000} /> : null }
        {this.state.activeKey === 3 ? <PostBox url='http://localhost:3001/api/lodges' pollInterval={50000} /> : null }
      </div>
    );
  }
}

export default App;
