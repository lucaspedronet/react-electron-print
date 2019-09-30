import React, { Fragment } from 'react';
import ModalPrint from '../../components/ModalPrinter'
import { Form, Input } from '@rocketseat/unform';
const { ipcRenderer } = window.require('electron')
// import { Container } from './styles';

export default function Home() {

  function getPrinters() {
    const printer = ipcRenderer.sendSync("buscar-impressoras")
    return printer
  }

  function handleModal() {
  }

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
    </Fragment>
  );
}
