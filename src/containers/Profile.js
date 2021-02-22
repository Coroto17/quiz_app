import React from "react";
import { connect } from "react-redux";

const Profile = (props) => (
  <div>Hi {props.username}</div>
)

const mapStateToProps = (state) => ({
  token: state.auth.tokken,
  username: state.auth.username
})

const mapDispatchToProps = (dispatch) => ({
  //
})

export default connect(mapStateToProps)(Profile);