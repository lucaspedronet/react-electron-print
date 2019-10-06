import React, { Fragment, Component } from 'react';
import { 
  ModalHeader, 
  ModalFooter,
  ModalBody, 
  FormGroup,
  Button,
  Form,
  Modal, 
  Row, } from 'reactstrap';
import Select from 'react-select';
import { Colxx } from '../../components/CustomBootstrap';
const { ipcRenderer } = window.require('electron')
// import { Container } from './styles';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedOptionsPrinters: [],
      selectedOptionsCopy: [],
      configPrint: null,
      selectPrinter: '',
      lessprint: false,
      modal: false,
      selectCopy: ''
    }
    this.toggle = this.toggle.bind(this)
    this.handleChangeSelectPrinter = this.handleChangeSelectPrinter.bind(this)
    this.handleChangeSelectCopy = this.handleChangeSelectCopy.bind(this)
    
  }

  componentDidMount(){
    this.handleOptionsPrinters()
    this.handleOptionsCopy()
  }
  
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  /**
   * @function handleChangeSelectPrinter Seta a impressora escolhida no estado de selectPrinter
   */
  handleChangeSelectPrinter(selectPrinter) {
    console.log(selectPrinter)
    this.setState({ selectPrinter });
  };

   /**
   * @function getPrinters Busca as impressoras instaladas no SO.
   */
  getPrinters() {
    const printer = ipcRenderer.sendSync("buscar-impressoras");
    console.log(printer)
    return printer
  }

  /**
   * @function handleOptionsPrinters Faz um modelo de opções de impressora para o Select, a impressora default é lista como 1ª opção.
   */
  handleOptionsPrinters = () => {
    const list = this.getPrinters()
    const SELECT_PRINTER = new Array();

    list.map((print, index) => {
      if (print.isDefault) {
        SELECT_PRINTER.unshift({
          label: print.name,
          value: print.name,
          key: index
        });
      } else {
        SELECT_PRINTER.push({
          label: print.name,
          value: print.name,
          key: index
        });
      }
    });
    console.log(list);
    console.log(this.state);
    this.setState({ selectedOptionsPrinters: SELECT_PRINTER });
    return SELECT_PRINTER;
  };

   /**
   * @function handleChangeSelectPrinter Seta a quantidade copias escolhida no estado de copy.
   */
  handleChangeSelectCopy(selectCopy) {
    console.log(selectCopy)
    this.setState({ selectCopy });
  };

  handleOptionsCopy(){
    const options = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' }
    ]
    this.setState({ selectedOptionsCopy: options })
    return options
  }

  handlePrint = () => {
    const { selectPrinter, selectCopy } = this.state
    const configPrint = {
      name: selectPrinter.value,
      numberCopy: selectCopy.value
    }

    console.log(configPrint.name)
    console.log(configPrint.numberCopy)
    const print = ipcRenderer.sendSync("realizar-impressao", configPrint)
    this.toggle()
    return print
  }

  handleModal() {
    const { 
      selectPrinter, 
      selectedOptionsPrinters, 
      selectCopy, 
      selectedOptionsCopy } = this.state
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} >
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
          <Row>
            <Colxx xxs="12" md="12" className="mb-1">
              <h6>
                Selecione sua impressora!
              </h6>
              <Select
                className="react-select"
                classNamePrefix="react-select"
                name="select-printers"
                placeholder="Selecione sua impressora!"
                value={selectPrinter}
                onChange={this.handleChangeSelectPrinter}
                options={selectedOptionsPrinters}
              />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" md="12" className="mb-5">
              <h6>
                Selecione número de cópias!
              </h6>
              <Select
                className="react-select"
                classNamePrefix="react-select"
                name="select-copy"
                placeholder="Selecione número copias"
                value={selectCopy}
                onChange={this.handleChangeSelectCopy}
                options={selectedOptionsCopy}
              />
            </Colxx>
          </Row>
          </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handlePrint}>Imprimir</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cacelar</Button>
          </ModalFooter>
      </Modal>
      )

  }

  render(){
    return (
      <Fragment>
        <div>
        <Row>
          <Colxx xxs="12" md="12" className="mb-5">
            <Button outline onClick={() => {}} >
              Cadastrar usuário
            </Button>
            <Button outline onClick={() => this.setState({ modal: true })} >
              Realizar impressão
            </Button>
          </Colxx>
        </Row>
        </div>
        {
          this.state.modal 
            ? this.handleModal()
            : null
        }
      </Fragment>
    );
  }
}
