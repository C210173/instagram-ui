import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import "./PostCard.css";
import CommentModal from "../Comment/CommentModal";
import { useDispatch, useSelector } from "react-redux";
import {
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction,
} from "../../Redux/Post/Action";
import { isPostLikeByUser, isSavePost } from "../../Config/logics";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPostLike, setIsPostLike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const navigate = useNavigate();

  const data = { jwt: token, postId: post?.id };

  const handSavePost = () => {
    setIsSaved(true);
    dispatch(savePostAction(data));
  };

  const handUnSavePost = () => {
    setIsSaved(false);
    dispatch(unSavePostAction(data));
  };

  const handlePostLike = () => {
    setIsPostLike(true);
    dispatch(likePostAction(data));
  };

  const handlePostUnLike = () => {
    setIsPostLike(false);
    dispatch(unLikePostAction(data));
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOpenCommentModal = () => {
    navigate(`/comment/${post.id}`);
    onOpen();
  };

  useEffect(() => {
    setIsPostLike(isPostLikeByUser(post, user.reqUser?.id));
    setIsSaved(isSavePost(user.reqUser, post.id));
  }, [post.likedByUsers, user.reqUser]);
  return (
    <div>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={
                post.user.userImage ||
                "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
              }
              alt=""
            />
            <div className="pl-2">
              <p className="font-semibold text-sm ">{post?.user.username}</p>
              <p className="font-thin text-sm">{post.location}</p>
            </div>
          </div>
          <div className="dropdown">
            <BsThreeDots className="dots" onClick={handleClick} />
            <div className="dropdown-content">
              {showDropdown && (
                <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">
                  Delete
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <img className="w-full " src={post?.image} alt="" />
        </div>
        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2">
            {isPostLike ? (
              <AiFillHeart
                onClick={handlePostUnLike}
                className="text-2xl hover:opacity-50 cursor-pointer text-red-500"
              />
            ) : (
              <AiOutlineHeart
                onClick={handlePostLike}
                className="text-2xl hover:opacity-50 cursor-pointer"
              />
            )}
            <FaRegComment
              onClick={handleOpenCommentModal}
              className="text-xl hover:opacity-50 cursor-pointer"
            />
            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
          </div>
          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill
                onClick={handUnSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            ) : (
              <BsBookmark
                onClick={handSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="w-full py-2 px-5">
          {post?.likedByUsers?.length > 0 && (
            <p>{post?.likedByUsers?.length} likes</p>
          )}
          {post?.comments?.length > 0 && (
            <p className="opacity-50 py-2 cursor-pointer">
              view all {post?.comments?.length} comments
            </p>
          )}
        </div>

        <div className="border border-t w-full">
          <div className="flex w-full items-center px-5">
            <BsEmojiSmile />
            <input
              type="text"
              className="commentInput"
              placeholder="Add a comment..."
            />
          </div>
        </div>
      </div>
      <CommentModal
        handlePostLike={handlePostLike}
        onClose={onClose}
        isOpen={isOpen}
        handSavePost={handSavePost}
        isPostLike={isPostLike}
        isSaved={isSaved}
      />
    </div>
  );
};

export default PostCard;
