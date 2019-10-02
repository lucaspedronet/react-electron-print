import React from 'react';
import { Container } from './styles/components'
import GlobalStyles from './styles/global'
import ModalPrinter from './components/ModalPrinter'
import Login from './pages/Login'
import Home from './pages/Home'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <Container>
     <GlobalStyles />
     <Home />
   </Container>
  );
}

export default App;
