import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth.js";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);

  return (
    <Router>
      <CustomLayout {...props}>
        <BaseRouter />
      </CustomLayout>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
