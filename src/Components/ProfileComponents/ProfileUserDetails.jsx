import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProfileUserDetails = () => {
  const { user } = useSelector((store) => store);
  const navigate = useNavigate();

  return (
    <div className="py-10 w-full">
      <div className="flex items-center">
        <div className="w-[15%] mr-10">
          <img
            className="w-32 h-32 rounded-full "
            src={
              user.reqUser?.image ||
              "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
            }
            alt=""
          />
        </div>
        <div className="space-y-5">
          <div className="flex space-x-10 items-center">
            <p>{user.reqUser?.username}</p>
            <button onClick={() => navigate("/account/edit")}>
              Edit profile
            </button>
            <IoSettingsOutline></IoSettingsOutline>
          </div>
          <div className="flex space-x-10">
            <div>
              <span className="font-semibold mr-2">10</span>
              <span>posts</span>
            </div>
            <div>
              <span className="font-semibold mr-2">
                {user.reqUser?.follower.length}
              </span>
              <span>follower</span>
            </div>
            <div>
              <span className="font-semibold mr-2">
                {user.reqUser?.following.length}
              </span>
              <span>following</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">{user.reqUser?.name}</p>
            <p className="font-thin text-sm">{user.reqUser?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};