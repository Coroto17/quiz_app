import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username,
        password
      })
      .then((res) => {
        const user = {
          token: res.data.key,
          userId: res.data.user,
          username: res.data.user_data.username,
          is_student: res.data.user_data.is_student,
          is_teacher: res.data.user_data.is_teacher,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        }
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (
  username,
  email,
  password1,
  password2,
  is_student
) => {
  return (dispatch) => {
    dispatch(authStart());
    const user = {
      username,
      email,
      password1,
      password2,
      is_student,
      is_teacher: !is_student,
    };
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", user)
      .then((res) => {
        const user = {
          token: res.data.key,
          userId: res.data.user,
          username: res.data.user_data.username,
          is_student: res.data.user_data.is_student,
          is_teacher: res.data.user_data.is_teacher,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
