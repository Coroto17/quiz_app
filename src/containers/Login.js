import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../store/actions/auth";

const LoginForm = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = values;
    props.login(username, password);
  };

  return props.token ? (
    <Redirect to="/" />
  ) : (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        {props.error && <p>{props.error.message}</p>}

        <>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                onChange={handleChange}
                value={values.username}
                name="username"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
              />
              <Form.Input
                onChange={handleChange}
                fluid
                value={values.password}
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button
                color="teal"
                fluid
                size="large"
                loading={props.loading}
                disabled={props.loading}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <NavLink to="/signup">Sign Up</NavLink>
          </Message>
        </>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
