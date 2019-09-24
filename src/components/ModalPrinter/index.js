import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const { ipcRenderer } = window.require("electron")
// import { Container } from './styles';

export default class ModalPrinter extends Component {
  
  constructor(params) {
    super(params)
    this.state = {
      printers: []
    }
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
      <div>
        <button 
          title="buscar impressoras"
          onClick={this.handlePrinters}
        >Buscar impressoras</button>
        <Button>
          Deu certo!
        </Button>
        <ul>
          {
            this.state.printers.map(print => (
              <div key={print.name} >
                <li> {print.name} </li>
              </div>
            ))
          }
        </ul>
      </div>)
  }
}
