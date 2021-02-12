import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Layout, Menu, Breadcrumb } from "antd";
import "./Layout.css";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          {props.isAuthenticated ? (
            <Menu.Item key="2" onClick={() => props.logout()}>Logout</Menu.Item>
          ) : (
            <>
              <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/signup">Sign Up</Link></Menu.Item>
            </>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
