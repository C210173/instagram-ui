import React, { useEffect, useState } from "react";

import StoryCircle from "../../Components/Story/StoryCircle";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { findUserPostAction } from "../../Redux/Post/Action";
import {
  findUserByUserIdsAction,
  getPopularUserAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import { hasStory } from "../../Config/logics";

const HomePage = () => {
  const [userIds, setUserIds] = useState([]);
  const { user, post } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  console.log("user: ", user);

  useEffect(() => {
    const newIds = user.reqUser?.following?.map((user) => user.id);
    if (newIds?.length > 0) {
      setUserIds([user.reqUser?.id, ...newIds]);
    } else {
      setUserIds([user.reqUser?.id]);
    }
  }, [user.reqUser]);

  useEffect(() => {
    const data = {
      jwt: token,
      userIds: [userIds].join(","),
    };
    dispatch(findUserPostAction(data));
    dispatch(getPopularUserAction(token));
    dispatch(findUserByUserIdsAction(data));
  }, [userIds, post.createdPost, post.deletedPost]);

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  const storyUsers = hasStory(user.findUserByIds);
  return (
    <div>
      <div className="mt-10 flex w-[100%] justify-center">
        <div className="w-[44%] px-10">
          <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full">
            {storyUsers.length > 0 &&
              storyUsers.map((item) => <StoryCircle user={item} />)}
          </div>
          <div className="space-y-10 w-full mt-10 ">
            {post.usersPost.length > 0 &&
              post.usersPost.map((item) => <PostCard post={item} />)}
          </div>
        </div>
        <div className="w-[27%]">
          <HomeRight />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
