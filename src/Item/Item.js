import React, { Component } from 'react';
import style from '../style';
import marked from 'marked';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state= { toBeUpdated: false, 
      type: this.props.type, 
      
    };
    //binding all our functions to this class
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    // this.handleTitleChange = this.handleTitleChange.bind(this);
    // this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    // this.handleImageChange = this.handleImageChange.bind(this);
    // this.handleModuleChange = this.handleModuleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    // this.handleServiceUpdate = this.handleServiceUpdate.bind(this);
  }
  updateItem(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleItemUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if author or text changed, set it. if not, leave null and our PUT request
    //will ignore it.
    // let title = (this.state.title) ? this.state.title : null;
    // let description = (this.state.description) ? this.state.description : null;
    // let image = (this.state.image) ? this.state.image : null;
    // let module = (this.state.module) ? this.state.module : null;
    let type = (this.state.type) ? this.state.type : null;
    let item = { type: type };
    this.props.onItemUpdate(id, item);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      // title: this.state.title, 
      // description: this.state.description, 
      // image: this.props.image, 
      // module: this.props.module, 
      // type: this.props.type
    })
  }
  deleteItem(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onItemDelete(id);
    console.log('oops deleted');
  }
//   handleTitleChange(e) {
//     this.setState({ title: e.target.value });
//   }
//   handleDescriptionChange(e) {
//     this.setState({ description: e.target.value });
//   }
//   handleImageChange(e) {
//     this.setState({ image: e.target.value });
//   }
//   handleModuleChange(e) {
//     this.setState({ module: e.target.value });
//   }
  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString(), {smartLists: true, sanitize:true, breaks: true});
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div style={ style.service }>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={12}><h3>{this.props.type}</h3></Col>
          </Row>
          <Row className="show-grid">
            {/*<Col xs={12} md={12}><p>{this.props.detailInfo.description}</p></Col>
            <Col xs={12} md={12}><p>{this.props.detailInfo..image}</p></Col>
          */}
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <Button bsStyle="primary" bsSize="small" onClick={ this.updateItem }>Editar</Button>
              <Button bsStyle="danger" bsSize="small" onClick={ this.deleteItem }>Borrar</Button>
            </Col>
          </Row>
        </Grid>
         {/* <a style={ style.deleteLink } href='#' onClick={ this.deleteService }>Borrar</a> */}
        { (this.state.toBeUpdated)
          ? (<form onSubmit={ this.handleItemUpdate }>
              <FormControl
                type='text'
                placeholder='Update title...' 
                style={ style.serviceFormText }
                value={ this.state.type }
                onChange={ this.handleTypeChange } />

              <Button bsStyle="primary" bsSize="medium" type="submit">Actualizar</Button>
                
              {/*<input
                type='submit'
                style={ style.serviceFormPost }
                value='Update' /> */}
            </form>)
          : null}
      </div>
    )
  }
}

export default Item;
