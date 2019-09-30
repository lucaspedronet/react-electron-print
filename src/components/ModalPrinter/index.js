import React, { Component } from 'react';
import { 
  CustomInput,
  ModalHeader, 
  ModalFooter,
  CardFooter,
  ModalBody, 
  FormGroup,
  CardTitle,
  CardBody,
  Button,
  Input,
  Form,
  Label,
  Modal, 
  Card,
  Row, } from 'reactstrap';

import Select from 'react-select'  
import { Container } from './styles';

const { ipcRenderer } = window.require("electron")

export default class ModalPrinter extends Component {
  
  constructor(params) {
    super(params)
    this.state = {
      printers: [],
      modal: false,
      lessPrinting: false
    }

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    console.log(this.state)
  }

  componentWillMount() {
    this.handlePrinters()
  }
  
  handlePrinters = () => {
    this.setState({
      printers: this.getPrinters().map((element, index) => {
        const print =  { 
          key: index,
          value: element.name,
          label: element.name, 
          isDefault: element.isDefault,  
          options: element.options
        }
        return print
      })
    })
  }

  getPrinters(){
    let result = ipcRenderer.sendSync("buscar-impressoras", "Buscou impressoras!")
    console.log(result)
    return result
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Modal</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup>
                <Row>
                <Select
                      className="react-select"
                      classNamePrefix="react-select"
                      name="select-printers"
                      value={this.state.selectPrinter}
                      onChange={this.handleChangeSelectPrinter}
                      options={this.state.selectedOptionsPrinters}
                      isDisabled={this.state.lessPrinting}
                    />
                </Row>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {}}>Imprimir</Button>{' '}
            <Button color="secondary" onClick={() => {}}>Cacelar</Button>
          </ModalFooter>
        </Modal>
      </div>
      )
  }
}
