import React, { Component } from 'react';
import { Form, Select } from '@rocketseat/unform';
import { Container } from './styles';

const { ipcRenderer } = window.require("electron")

export default class ModalPrinter extends Component {
  
  constructor(params) {
    super(params)
    this.state = {
      printers: []
    }
  }

  componentDidMount(){
    console.log(this.state)
  }

  componentWillMount(){
    this.setState({
      printers: this.getPrinters().map((element, index) => {
        const print =  { 
          id: index, 
          title: element.name, 
          isDefault: element.isDefault,  
          options: element.options
        }
        return print
      })
    })
  }
  
  handlePrinters = () => {
    this.setState({
      printers: this.getPrinters()
    })
  }

  getPrinters(){
    let result = ipcRenderer.sendSync("buscar-impressoras", "Buscar todas as impressoras instaladas em meu notebook.")
    console.log(result)
    return result
  }

  handleSubmit(data, { resetForm }) {
    console.log(data)
    console.log(resetForm)
    resetForm({ tech: 'react' });
  }

  handleProgress(progress, event) {}

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Select name="tech" options={this.state.printers} />

          <button type="submit">Send</button>
        </Form>
      </Container>
      )
  }
}
