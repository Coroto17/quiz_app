import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Layout, Menu, Breadcrumb } from "antd";
import "./Layout.css";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
  const [activeLink, setActiveLink] = useState("1");
  const { pathname } = props.location;

  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveLink("1");
        break;
      case "/login":
        setActiveLink("2");
        break;
      case "/signup":
        setActiveLink("3");
        break;
      default:
        setActiveLink("1");
    }
  }, [pathname]);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={activeLink}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          {props.isAuthenticated ? (
            <Menu.Item key="2" onClick={() => props.logout()}>
              Logout
            </Menu.Item>
          ) : (
            <>
              <Menu.Item key="2">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/signup">Sign Up</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
      <Content style={{padding: "0 24px"}}>
        <Breadcrumb style={{ margin: "16px" }}>
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={`/profiles/${props.userId}`}>Profile</Link></Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Orlando Lara ©2021</Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId
})

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));
