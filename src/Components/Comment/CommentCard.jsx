import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { isCommentLikeByUser, timeDifference } from "../../Config/logics";
import { useDispatch, useSelector } from "react-redux";
import {
  likeCommentAction,
  unLikeCommentAction,
} from "../../Redux/Comment/Action";

const CommentCard = ({ comment }) => {
  const [isCommentLike, setIsCommentLike] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const data = {
    commentId: comment.id,
    jwt: token,
  };
  const handleLikeComment = () => {
    setIsCommentLike(true);
    dispatch(likeCommentAction(data));
  };
  const handleUnLikeComment = () => {
    setIsCommentLike(false);
    dispatch(unLikeCommentAction(data));
  };
  useEffect(() => {
    setIsCommentLike(isCommentLikeByUser(comment, user.reqUser.id));
  }, [user.reqUser, comment]);
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center">
          <div>
            <img
              className="w-9 h-9 rounded-full object-cover"
              src={
                comment.user.userImage ||
                "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
              }
              alt=""
            />
          </div>
          <div className="ml-3">
            <p>
              <span className="font-semibold">{comment?.user.username}</span>
              <span className="ml-2">{comment.content}</span>
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-2">
              <span>{timeDifference(comment?.createdAt)}</span>
              {comment?.likedByUsers?.length > 0 && (
                <span>{comment?.likedByUsers?.length} likes</span>
              )}
            </div>
          </div>
        </div>

        {isCommentLike ? (
          <AiFillHeart
            onClick={handleUnLikeComment}
            className="text-xs hover:opacity-50 cursor-pointer text-red-500"
          />
        ) : (
          <AiOutlineHeart
            onClick={handleLikeComment}
            className="text-xs hover:opacity-50 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
