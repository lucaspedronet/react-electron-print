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
import { colourOptions, groupedOptions } from '../../Data';
import CustomSelectInput from '../../components/CustomSelectInput'

const { ipcRenderer } = window.require("electron")

export default class ModalPrinter extends Component {
  groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  colourStyles = {
    alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: "#ccc",
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  }
  }
  constructor(params) {
    super(params)
    this.state = {
      optionsPrinters: [],
      modal: false,
      lessPrinting: false,
      selectPrinter: '',
      copy: 0
    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    console.log(this.state)
  }

  componentWillMount() {
    this.handlePrinters()
  }
  
  handlePrinters = () => {
    this.setState({
      optionsPrinters: this.getPrinters().map((element, index) => {
        const print = {
          key: index,
          value: element.name,
          label: element.name,
        }
        return print
      })
    })
  }

  formatGroupLabel = data => (
    <div style={this.groupStyles}>
      <span>{data.label}</span>
      <span style={this.groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

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
  
  /**
   * @function handleChangeSelectPrinter Seta a impressora escolhida no estado de selectPrinter
   */
  handleChangeSelectPrinter = selectPrinter => {
    this.setState({ selectPrinter });
  };
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
                  defaultValue={colourOptions[2]}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="select-printers"
                  value={this.state.selectPrinter}
                  onChange={this.handleChangeSelectPrinter}
                  options={this.state.optionsPrinters}
                  isDisabled={this.state.lessPrinting}
                  formatGroupLabel={this.formatGroupLabel}
                  styles={this.colourStyles}
                  />
                  <input
                    onChange={e => this.setState({ copy: e.target.value })}
                    value={this.state.copy}
                  />
                  <Select options={this.options} />
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
