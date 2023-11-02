import { BASE_API } from "../../Config/Api";
import {
  CREATE_NEW_POST,
  DELETE_POST,
  GET_SINGLE_POST,
  GET_USER_POST,
  LIKE_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
} from "./ActionType";

export const createPostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });
    const post = await res.json();
    console.log("create post ", post);
    dispatch({ type: CREATE_NEW_POST, payload: post });
  } catch (error) {
    console.log("Catch: " + error);
  }
};

export const findUserPostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/posts/following/${data.userIds}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const posts = await res.json();

    console.log("find post by user ids: ", posts);
    dispatch({ type: GET_USER_POST, payload: posts });
  } catch (error) {
    console.log("Catch: " + error);
  }
};

export const reqUserPostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/posts/all/${data.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const posts = await res.json();

    console.log("req user post: ", posts);
    dispatch({ type: GET_USER_POST, payload: posts });
  } catch (error) {
    console.log("Catch: " + error);
  }
};

export const likePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/posts/like/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const post = await res.json();

    console.log("like post: ", post);
    dispatch({ type: LIKE_POST, payload: post });
  } catch (error) {
    console.log("Catch: " + error);
  }
};

export const unLikePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/posts/unlike/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const post = await res.json();

    console.log("un like post: ", post);
    dispatch({ type: UNLIKE_POST, payload: post });
  } catch (error) {
    console.log("Catch: " + error);
  }
};

export const savePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/posts/save_post/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const post = await res.json();

    console.log("saved post: ", post);
    dispatch({ type: SAVE_POST, payload: post });
  } catch (error) {
    console.log("Catch: " + error);
  }
};

export const unSavePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API}/api/posts/unsave_post/${data.postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );
    const post = await res.json();

    console.log("un saved post: ", post);
    dispatch({ type: UNSAVE_POST, payload: post });
  } catch (error) {
    console.log("Catch: " + error);
  }
};

export const findPostByIdAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/posts/${data.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const post = await res.json();

    console.log("get signle post: ", post);
    dispatch({ type: GET_SINGLE_POST, payload: post });
  } catch (error) {
    console.log("Catch: " + error);
  }
};

export const deletePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/api/posts/delete/${data.postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const post = await res.json();

    console.log("delete post: ", post);
    dispatch({ type: DELETE_POST, payload: post });
  } catch (error) {
    console.log("Catch: " + error);
  }
};
