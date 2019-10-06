import React from 'react';
import { Container } from './styles/components'
import GlobalStyles from './styles/global'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
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
