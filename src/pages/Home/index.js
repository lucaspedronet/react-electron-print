import React, { Fragment } from 'react';
import ModalPrint from '../../components/ModalPrinter'
import Select from 'react-select'
const { ipcRenderer } = window.require('electron')
// import { Container } from './styles';

export default function Home() {

  function getPrinters() {
    const printer = ipcRenderer.sendSync("buscar-impressoras")
    return printer
  }

  function handleModal() {
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <Fragment>
      <div>
        <button onClick={() => {}} >
          Cadastrar usuário
        </button>
        <button onClick={() => {}} >
          Realizar impressão
        </button>
      </div>
      <Select options={options} />
    </Fragment>
  );
}
