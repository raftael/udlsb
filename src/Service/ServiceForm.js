import React, { Component } from 'react';
import style from '../style';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';

class ServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '', image: '', type: '', module: '' };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleModuleChange = this.handleModuleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  handleImageChange(e) {
    this.setState({ image: e.target.value });
  }
  handleModuleChange(e) {
    this.setState({ module: e.target.value });
  }
  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let image = this.state.image.trim();
    let module = this.state.module.trim();
    let type = this.state.type.trim();
    if (!title || !description || !image || !module || !type) {
      return;
    }
    this.props.onServiceSubmit({ title: title, description: description, image: image, module: module, type: type });
    this.setState({ title: '', description: '', image: '', module: '', type: '' });
  }
  render() {
    return (
      <form style={ style.serviceForm } onSubmit={ this.handleSubmit }>
        <FormControl
          type='text'
          placeholder='title...'
          style={ style.serviceFormText}
          value={ this.state.title }
          onChange={ this.handleTitleChange } />
        <FormControl
          type='text'
          placeholder='descrption...'
          style={ style.serviceFormText}
          value={ this.state.description }
          onChange={ this.handleDescriptionChange } />
        <FormControl
          type='text'
          placeholder='image...'
          style={ style.serviceFormText}
          value={ this.state.image }
          onChange={ this.handleImageChange } />
          <FormControl
          type='text'
          placeholder='module...'
          style={ style.serviceFormText}
          value={ this.state.module }
          onChange={ this.handleModuleChange } />
          <FormControl
          type='text'
          placeholder='type...'
          style={ style.serviceFormText}
          value={ this.state.type }
          onChange={ this.handleTypeChange } />

        <Button bsStyle="primary" bsSize="large" type="submit">Post</Button>
        
        {/* <input
          type='submit'
          style={ style.serviceFormPost }
          value='Post'/> */}
      </form>
    )
  }
}

export default ServiceForm;
