import { BASE_API } from "../../Config/Api";
import {
  CLEAR_USER_DATA,
  FOLLOW_USER,
  GET_USER_BY_USERNAME,
  GET_USER_BY_USER_IDS,
  POPULAR_USER,
  REQ_USER,
  SEARCH_USER,
  UNFOLLOW_USER,
  UPDATE_USER,
} from "./ActionType";

export const getUserProfileAction = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/users/req`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });

    const reqUser = await res.json();
    dispatch({ type: REQ_USER, payload: reqUser });
  } catch (error) {
    console.log("cacth :", error);
  }
};

export const findUserByUserNameAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/users/username/${data.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const user = await res.json();
    console.log("find by user name", user);
    dispatch({ type: GET_USER_BY_USERNAME, payload: user });
  } catch (error) {
    console.log("error", error);
  }
};

export const findUserByUserIdsAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/users/m/${data.userIds}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const users = await res.json();
    console.log("find by user ids", users);
    dispatch({ type: GET_USER_BY_USER_IDS, payload: users });
  } catch (error) {
    console.log("error", error);
  }
};

export const followUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/users/follow/${data.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const user = await res.json();
    console.log("follow user", user);
    dispatch({ type: FOLLOW_USER, payload: user });
  } catch (error) {
    console.log("error", error);
  }
};

export const unFollowUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/users/unfollow/${data.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const user = await res.json();
    console.log("un follow user", user);
    dispatch({ type: UNFOLLOW_USER, payload: user });
  } catch (error) {
    console.log("error", error);
  }
};

export const searchUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API}/api/users/search/?query=${data.query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );
    const user = await res.json();
    console.log("search user", user);
    dispatch({ type: SEARCH_USER, payload: user });
  } catch (error) {
    console.log("error", error);
  }
};

export const editUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/users/account/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });
    const user = await res.json();
    console.log("edit user", user);
    dispatch({ type: UPDATE_USER, payload: user });
  } catch (error) {
    console.log("error", error);
  }
};

export const getPopularUserAction = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/users/popular`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const users = await res.json();
    console.log("popular user", users);
    dispatch({ type: POPULAR_USER, payload: users });
  } catch (error) {
    console.log("error", error);
  }
};

export const clearUserData = () => {
  return { type: CLEAR_USER_DATA };
};
