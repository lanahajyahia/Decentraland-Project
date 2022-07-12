import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

import axios from "axios";

// THIS IS A FUNCTION THAT RETURN ANOTHER FUNCTION - CALLBACK
export const login = (username, password) => async (dispatch) => {
  console.log(username, password);

  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    // setLoading(true);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // destructure only data from what we get
    const { data } = await axios.post(
      "/api/users/login",
      {
        username,
        password,
      },
      config
    );
    console.log("data", data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // local storage cannot store object data - only string
    // setUserInfo(JSON.stringify(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
    // setLoading(false);
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });

    // setError(err.response.data.message);
    // setLoading(false);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (username, password, isBuyer) => async (dispatch) => {
  console.log("register action", username, password, isBuyer);
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      {
        username,
        password,
        isBuyer,
      },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));

    // setLoading(true);
    // setLoading(false);
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });

    // setError(err.response.data.message);
    // setLoading(false);
  }

  console.log(username, isBuyer);
};
