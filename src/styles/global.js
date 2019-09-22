import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: #282a36;
    font-size: 14px;
    color: #fff;
  }

  body, input, button {
    font-family: 'Source Sans Pro';
  }

  button {
    cursor: pointer;
  }
`;
