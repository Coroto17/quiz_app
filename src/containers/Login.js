import React from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../store/actions/auth";
import { Form, Input, Button, Alert, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = (props) => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: '${label} is required!',
  };
  const onFinish = (values) => {    
    const { username, password } = values;
    props.login(username, password);
  };

  let error = [];
  if (props.error) {
    let object = props.error.response.data
    for (let item in object) {
      error.push(<li key={item}>{object[item]}</li>)
    }
  }

  if (props.token) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{height: "calc(100vh - 110px)", marginTop: "40px", display: "grid", verticalAlign:"middle", textAlign:"center"}}>
      <Row justify="center" align="bottom"><h1 style={{textAlign:"center"}}>Login</h1></Row>
      <Row justify="center" align="middle">
        <Col span={12}>
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            validateMessages={validateMessages}
            style={{borderRadius: "5px", border: "2px solid #DDD", padding: "10px"}}
          >
            {props.error && (
              <Alert
                message="There were errors with the form"
                description={(<ul>{error}</ul>)}
                type="error"
                showIcon
                banner
                closable
              />
            )}

            <Form.Item
              name="username"
              label="Username"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter Username" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={12}>
          <Alert
            message="New to this Website?"
            style={{textAlign: "center"}}
            description={<NavLink to="/signup">Signup</NavLink>}
            type="info"
            showIcon
          />
        </Col>
      </Row>
    </div>
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