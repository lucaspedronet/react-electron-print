import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const { ipcRenderer } = window.require("electron")
// import { Container } from './styles';

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
      <div>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select">
                  {this.state.printers.map(print => (
                      <div key={print.name} >
                        <option>{print.name}</option>
                      </div>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>)
  }
}
