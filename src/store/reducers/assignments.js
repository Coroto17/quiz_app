import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utils";

const initialState = {
  assignments: [],
  currentAssignment: {},
  error: null,
  loading: null,
};

const getAssignmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getAssignmentListSuccess = (state, action) => {
  return updateObject(state, {
    assignments: action.assignments,
    error: null,
    loading: false,
  });
};

const getAssignmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const getAssignmentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getAssignmentDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentAssignment: action.assignment,
    error: null,
    loading: false,
  });
};

const getAssignmentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ASSIGNMENTS_LIST_START:
      return getAssignmentListStart(state, action);
    case actionTypes.GET_ASSIGNMENTS_LIST_SUCCESS:
      return getAssignmentListSuccess(state, action);
    case actionTypes.GET_ASSIGNMENTS_LIST_FAIL:
      return getAssignmentListFail(state, action);
    case actionTypes.GET_ASSIGNMENT_DETAIL_START:
      return getAssignmentDetailStart(state, action);
    case actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS:
      return getAssignmentDetailSuccess(state, action);
    case actionTypes.GET_ASSIGNMENT_DETAIL_FAIL:
      return getAssignmentDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;
