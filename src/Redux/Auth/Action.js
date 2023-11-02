import { BASE_API } from "../../Config/Api";
import { SIGN_IN, SIGN_UP } from "./ActionType";

export const signinAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/signin`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Basic " + btoa(data.email + ":" + data.password),
      },
    });
    const token = res.headers.get("Authorization");
    localStorage.setItem("token", token);
    dispatch({ type: SIGN_IN, payload: token });
    console.log("sign in token: ", token);
  } catch (error) {
    console.log(error);
  }
};

export const signupAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    });
    const user = await res.json();
    console.log("sign up user: ", user);
    dispatch({ type: SIGN_UP, payload: user });
  } catch (error) {
    console.log(error);
  }
};
