import React from "react";
import { useNavigate } from "react-router-dom";

const StoryCircle = ({ user }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/story/${user.id}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center"
    >
      <img
        className="w-16 h-16 rounded-full object-cover"
        src={
          user.image ||
          "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
        }
        alt=""
      />
      <p className="">{user.username}</p>
    </div>
  );
};

export default StoryCircle;
