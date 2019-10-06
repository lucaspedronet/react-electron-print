import React, { Fragment, Component } from 'react';
import ModalPrint from '../../components/ModalPrinter'
import { 
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
import Select from 'react-select';
import { Colxx, Separator } from '../../components/CustomBootstrap';
const { ipcRenderer } = window.require('electron')
// import { Container } from './styles';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedOptionsPrinters: [],
      selectPrinter: '',
      modal: false,
      lessprint: null
    }
    this.toggle = this.toggle.bind(this)
    this.handleChangeSelectPrinter = this.handleChangeSelectPrinter.bind(this)
  }

  componentDidMount(){
    this.handleOptionsPrinters()
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
    this.setState({ selectPrinter });
  };

  getPrinters() {
    const printer = ipcRenderer.sendSync("buscar-impressoras");
    console.log(printer)
    return printer
  }

  /**
   * @function getPrinters Retorna um Array de impressoras instaladas no seu Windows.
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

  handleModal() {
    const { selectPrinter, selectedOptionsPrinters } = this.state
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} >
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
          <Row>
            <Colxx xxs="12" md="12" className="mb-5">
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
          </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {}}>Imprimir</Button>{' '}
            <Button color="secondary" onClick={() => {}}>Cacelar</Button>
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
            <button onClick={() => {}} >
              Cadastrar usuário
            </button>
            <button onClick={() => this.setState({ modal: true })} >
              Realizar impressão
            </button>
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
