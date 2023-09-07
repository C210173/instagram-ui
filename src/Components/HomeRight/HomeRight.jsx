import React from "react";
import SuggetionCard from "./SuggetionCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeRight = () => {
  const { user, post } = useSelector((store) => store);
  const navigate = useNavigate();

  // Hàm xử lý khi bấm vào chữ "swith"
  const handleSwitchClick = () => {
    // Xóa token khỏi localStorage (sử dụng removeItem)
    localStorage.removeItem("token");

    // Chuyển đến trang /login
    navigate("/login");
  };

  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <div>
              <img
                className="w-12 h-12 rounded-full"
                src={
                  user.reqUser?.image ||
                  "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
                }
                alt=""
              />
            </div>
            <div className="ml-3">
              <p>{user.reqUser?.name}</p>
              <p className="opacity-70">{user.reqUser?.username}</p>
            </div>
          </div>
          <div className="border cursor-pointer">
            <p
              className="text-blue-700 font-semibold"
              onClick={handleSwitchClick}
            >
              swith
            </p>
          </div>
        </div>
        <div className="space-y-5 mt-10">
          {user.popularUsers?.map((item) => (
            <SuggetionCard user={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
