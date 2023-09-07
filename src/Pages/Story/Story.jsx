import React, { useEffect } from "react";
import StoryView from "../../Components/StoryComponents/StoryView";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findStoryByUserId } from "../../Redux/Story/Action";

const Story = () => {
  const userId = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { story } = useSelector((store) => store);

  console.log("story -----", story);

  useEffect(() => {
    const data = { token, userId };
    dispatch(findStoryByUserId(data));
  }, [userId]);
  return (
    <div>
      <StoryView stories={story?.stories} />
    </div>
  );
};

export default Story;
