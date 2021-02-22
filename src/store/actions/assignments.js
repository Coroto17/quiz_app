import axios from "axios";
import * as actionTypes from "./actionTypes";

const getAssignmentListStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_LIST_START,
  };
};

const getAssignmentListSuccess = (assignments) => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_LIST_SUCCESS,
    assignments,
  };
};

const getAssignmentListFail = (error) => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_LIST_FAIL,
    error: error,
  };
};

export const getAssignments = (token) => {
  return (dispatch) => {
    dispatch(getAssignmentListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get("http://127.0.0.1:8000/assignments/")
      .then((res) => {
        const assignments = res.data;
        dispatch(getAssignmentListSuccess(assignments));
      })
      .catch((err) => {
        dispatch(getAssignmentListFail(err));
      });
  };
};

const getAssignmentDetailStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_START,
  };
};

const getAssignmentDetailSuccess = (assignment) => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS,
    assignment,
  };
};

const getAssignmentDetailFail = (error) => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_FAIL,
    error: error,
  };
};

export const getAssignmentDetail = (token, id) => {
  return (dispatch) => {
    dispatch(getAssignmentDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`http://127.0.0.1:8000/assignments/${id}/`)
      .then((res) => {
        const assignment = res.data;
        dispatch(getAssignmentDetailSuccess(assignment));
      })
      .catch((err) => {
        dispatch(getAssignmentDetailFail(err));
      });
  };
};