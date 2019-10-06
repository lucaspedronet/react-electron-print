import React, { Component } from 'react';

export default class ModalPrinter extends Component {
 
  constructor(props) {
    super(props);
    this.state = {value: 'coco'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Seu sabor favorito é: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    console.log(this.props)
    return (
      <div>
        
      </div>
      )
  }
}
