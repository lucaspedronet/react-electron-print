import React, { Component } from 'react';

import { Container } from './styles';

const { ipcRenderer } = window.require("electron")

export default class ModalPrinter extends Component {
  
  constructor(params) {
    super(params)
    this.state = {
      printers: []
    }
  }

  componentDidMount(){}

  componentWillMount(){
    this.setState({
      printers: this.getPrinters()
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

  render() {
    return (
      <Container>
      </Container>
      )
  }
}
