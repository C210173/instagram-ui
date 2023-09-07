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

const initialState = {
  reqUser: null,
  findByUsername: null,
  findUserByIds: [],
  followUser: null,
  unfollowUser: null,
  searchUser: null,
  updateUser: null,
  popularUsers: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_USER:
      return { ...state, reqUser: action.payload };
    case GET_USER_BY_USERNAME:
      return { ...state, findByUsername: action.payload };
    case GET_USER_BY_USER_IDS:
      return { ...state, findUserByIds: action.payload };
    case FOLLOW_USER:
      return { ...state, followUser: action.payload };
    case UNFOLLOW_USER:
      return { ...state, unfollowUser: action.payload };
    case SEARCH_USER:
      return { ...state, searchUser: action.payload };
    case UPDATE_USER:
      return { ...state, updateUser: action.payload };
    case POPULAR_USER:
      return { ...state, popularUsers: action.payload };
    case CLEAR_USER_DATA:
      return {
        ...state,
        reqUser: null,
        findByUsername: null,
        findUserByIds: [],
        followUser: null,
        unfollowUser: null,
        searchUser: null,
        updateUser: null,
        popularUsers: null,
      };
    default:
      return state;
  }
};
