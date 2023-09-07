import { FETCH_FOLLOWING_USER_STORY, FETCH_USER_STORY } from "./ActionType";

const BASE_API = "http://localhost:5454/api";

export const findFollowingUserStory = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_API}/stories/f/${data.userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
  });
  const stories = await res.json();
  dispatch({ type: FETCH_FOLLOWING_USER_STORY, payload: stories });
};

export const findStoryByUserId = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/stories/${data.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const stories = await res.json();
    console.log("stories :", stories);
    dispatch({ type: FETCH_USER_STORY, payload: stories });
  } catch (error) {
    console.log("catch error ", error);
  }
};
