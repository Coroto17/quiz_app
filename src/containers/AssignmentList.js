import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/assignments";

import { List, Divider, Skeleton } from "antd";
import Assignment from "../components/Assignment";

// const data = [
//   "Racing car sprays burning fuel into crowd.",
//   "Japanese princess to wed commoner.",
//   "Australian walks 100km after outback crash.",
//   "Man charged over missing wedding girl.",
//   "Los Angeles battles huge wildfires.",
// ];

const AssignmentList = (props) => {
  useEffect(() => {
    if (props.token) props.getAssignments(props.token);
  }, [props.token]);

  return (
    <>
      {props.loading ? (
        <Skeleton active />
      ) : (
        <>
          <Divider orientation="left">Assignments</Divider>
          <List
            size="large"
            bordered
            dataSource={props.assignments}
            renderItem={(item) => <Assignment item={item} />}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    assignments: state.assignments.assignments,
    loading: state.assignments.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAssignments: (token) => dispatch(actions.getAssignments(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList);
