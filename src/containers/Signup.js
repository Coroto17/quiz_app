import React from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup } from "../store/actions/auth";
import { Form, Input, Button, Select, Alert, Row, Col } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Option } = Select;

const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const onFinish = (values) => {
    console.log(values);
    let is_student = false;
    const { username, email, password1, password2, userType } = values;
    if (userType === "student") is_student = true;
    props.signup(username, email, password1, password2, is_student);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("error", errorInfo);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password1')) {
      callback('The passwords must match!');
    } else {
      callback();
    }
  }

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
    <div>
      <Row justify="center" align="bottom"><h1 style={{textAlign:"center"}}>Signup</h1></Row>
      <Row justify="center">
        <Col>
          <Form
            form={form}
            onFinish={onFinish}
            validateMessages={validateMessages}
            onFinishFailed={onFinishFailed}
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
              <Input prefix={<UserOutlined />} placeholder="Enter a Username" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter Email" />
            </Form.Item>

            <Form.Item
              name="password1"
              label="Password"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter a password" />
            </Form.Item>

            <Form.Item
              name="password2"
              label="Confirm Password"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              rules={[
                {
                  required: true, 
                },
                {
                  validator: compareToFirstPassword
                }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
            </Form.Item>

            <Form.Item
              name="userType"
              label="Type of User"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a type of user"
                //onChange={onUserTypeChange}
              >
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Signup
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Alert
              message="Already have an Account?"
              style={{padding: "15px"}}
              description={<NavLink to="/login">Login</NavLink>}
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
    signup: (username, email, password1, password2, is_student) =>
      dispatch(authSignup(username, email, password1, password2, is_student)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
