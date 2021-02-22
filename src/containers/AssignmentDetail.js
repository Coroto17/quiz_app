import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAssignmentDetail } from "../store/actions/assignments";
import { Card, Skeleton } from "antd";
import { withRouter } from "react-router-dom";

import Questions from "./Questions";
import Choices from "../components/Choices";

const cardStyle = {
  margin: "20px 0",
};

const AssignmentDetail = ({
  token,
  error,
  loading,
  currentAssignment,
  getAssignmentDetail,
  match,
}) => {
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    if (token) getAssignmentDetail(token, match.params.id);
  }, [token]);

  const onChange = (e, qId) => {
    console.log("radio checked", e.target.value);
    setUserAnswers({...userAnswers, [qId]: e.target.value})
  };

  const { title } = currentAssignment;

  return Object.keys(currentAssignment).length > 0 ? (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <Card title={title}>
          <Questions
            questions={currentAssignment.questions.map((q) => (
              <Card
                style={cardStyle}
                type="inner"
                key={q.id}
                title={`${q.order}. ${q.question}`}
              >
                <Choices
                  questionId={q.order}
                  choices={q.choices}
                  handleChange={onChange}
                  userAnswers={userAnswers}
                />
              </Card>
            ))}
          />
        </Card>
      )}
    </>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    loading: state.assignments.loading,
    error: state.assignments.error,
    token: state.auth.token,
    currentAssignment: state.assignments.currentAssignment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAssignmentDetail: (token, id) =>
      dispatch(getAssignmentDetail(token, id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssignmentDetail)
);
