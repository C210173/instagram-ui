import React, { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { followUserAction, unFollowUserAction } from "../../Redux/User/Action";

export const ProfileUserDetails = () => {
  const { user, post } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const token = localStorage.getItem("token");

  const [isFollowing, setIsFollowing] = useState(false);
  const isCurrentUser = user.reqUser?.username === username;

  useEffect(() => {
    if (user.reqUser) {
      setIsFollowing(
        user.reqUser?.following.some(
          (item) => item.id === user.findByUsername?.id
        )
      );
    }
  }, [user.reqUser, user.findByUsername]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      dispatch(
        unFollowUserAction({ jwt: token, userId: user.findByUsername?.id })
      );
    } else {
      dispatch(
        followUserAction({ jwt: token, userId: user.findByUsername?.id })
      );
    }
    setIsFollowing(!isFollowing);
  };

  const renderActionButton = () => {
    if (isCurrentUser) {
      return (
        <>
          <button onClick={() => navigate("/account/edit")}>
            Edit profile
          </button>
          <IoSettingsOutline />
        </>
      );
    } else {
      return (
        <p
          className={`text-sm font-semibold ${
            isFollowing ? "text-gray-500" : "text-blue-700"
          } cursor-pointer`}
          onClick={handleFollowToggle}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </p>
      );
    }
  };

  const profileUser = isCurrentUser ? user.reqUser : user.findByUsername;

  return (
    <div className="py-10 w-full">
      <div className="flex items-center">
        <div className="w-[15%] mr-10">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={
              profileUser?.image ||
              "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
            }
            alt=""
          />
        </div>
        <div className="space-y-5">
          <div className="flex space-x-10 items-center">
            <p>{profileUser?.username}</p>
            {renderActionButton()}
          </div>
          <div className="flex space-x-10">
            <div>
              <span className="font-semibold mr-2">
                {post.usersPost?.length}
              </span>
              <span>posts</span>
            </div>
            <div>
              <span className="font-semibold mr-2">
                {profileUser?.follower.length}
              </span>
              <span>follower</span>
            </div>
            <div>
              <span className="font-semibold mr-2">
                {profileUser?.following.length}
              </span>
              <span>following</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">{profileUser?.name}</p>
            <p className="font-thin text-sm">{profileUser?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
