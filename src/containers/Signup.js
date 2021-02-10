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
import { authSignup } from "../store/actions/auth";

const RegistrationForm = (props) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password1, password2 } = values;
    props.signup(username, email, password1, password2);
  };

  const handleChange = (event) => {
    setValues({
      [event.target.name]: event.target.value,
    });
  };

  if (props.token) {
    return <Redirect to="/" />;
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Signup to your account
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
                value={values.email}
                name="email"
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                onChange={handleChange}
                fluid
                value={values.password1}
                name="password1"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Form.Input
                onChange={handleChange}
                fluid
                value={values.password2}
                name="password2"
                icon="lock"
                iconPosition="left"
                placeholder="Confirm password"
                type="password"
              />
              <Button
                color="teal"
                fluid
                size="large"
                loading={props.loading}
                disabled={props.loading}
              >
                Signup
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account?{" "}
            <NavLink
              to="/login"
              activeStyle={{ color: "teal", fontWeight: "bold" }}
            >
              Login
            </NavLink>
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
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
