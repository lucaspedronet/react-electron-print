import React, { Fragment } from 'react';
import { Form, Input } from '@rocketseat/unform';

function Login() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Fragment>
      <Form className="form" onSubmit={handleSubmit}>
        <Input className="input" name="email" placeholder="lucaspedronet" />
        <Input className="input" name="password" type="password" placeholder="senha secreta!" />

        <button className="btn login" type="submit">Login</button>
      </Form>
    </Fragment>
  );
}

export default Login;