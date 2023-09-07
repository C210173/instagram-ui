import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction, unFollowUserAction } from "../../Redux/User/Action";

const SuggetionCard = ({ user }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  // State để theo dõi trạng thái follow của người dùng đề xuất
  const [isFollowing, setIsFollowing] = useState(false); // Mặc định chưa theo dõi

  // Kiểm tra xem tài khoản hiện tại đã theo dõi người dùng đề xuất chưa
  useEffect(() => {
    if (
      currentUser.reqUser &&
      currentUser.reqUser?.following.find((item) => item.id === user.id) !==
        undefined
    ) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [currentUser.reqUser, user.id]);

  // Xử lý khi nhấn nút "Follow" hoặc "Following"
  const handleFollowToggle = () => {
    if (isFollowing) {
      // Nếu đang theo dõi, hủy theo dõi
      dispatch(unFollowUserAction({ jwt: token, userId: user.id }));
      setIsFollowing(false); // Cập nhật trạng thái là false
    } else {
      // Nếu chưa theo dõi, thực hiện theo dõi
      dispatch(followUserAction({ jwt: token, userId: user.id }));
      setIsFollowing(true); // Cập nhật trạng thái là true
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img
          className="w-9 h-9 rounded-full object-cover"
          src={
            user.image ||
            "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
          }
          alt=""
        />
        <div className="ml-2">
          <p className="text-sm font-semibold">{user.username}</p>
          <p className="text-sm font-semibold opacity-70">
            {isFollowing ? "Following" : "Popular"}
          </p>
        </div>
      </div>
      <p
        className={`text-sm font-semibold ${
          isFollowing ? "text-gray-500" : "text-blue-700"
        } cursor-pointer`}
        onClick={handleFollowToggle}
      >
        {isFollowing ? "Un Follow" : "Follow"}
      </p>
    </div>
  );
};

export default SuggetionCard;
