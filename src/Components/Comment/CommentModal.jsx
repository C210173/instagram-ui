import React, { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsThreeDots,
  BsEmojiSmile,
} from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import CommentCard from "./CommentCard";
import "./CommentModal.css";
import { createCommentAction } from "../../Redux/Comment/Action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findPostByIdAction } from "../../Redux/Post/Action";
import { timeDifference } from "../../Config/logics";

const CommentModal = ({
  onClose,
  isOpen,
  isSaved,
  isPostLike,
  handSavePost,
  handlePostLike,
}) => {
  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { postId } = useParams();
  const { comment, post, user } = useSelector((store) => store);

  useEffect(() => {
    const data = { jwt: token, postId };
    if (postId) {
      dispatch(findPostByIdAction(data));
    }
  }, [comment.createdComment, postId]);
  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[75vh]">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  className="max-h-full w-full"
                  src={post.singlePost?.image}
                  alt=""
                />
              </div>
              <div className=" w-[55%] pl-10 relative">
                <div className="flex justify-between items-center py-5">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="w-9 h-9 rounded-full"
                        src={
                          post.singlePost?.user.userImage ||
                          "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="ml-2">
                      <p>{post.singlePost?.user.username}</p>
                    </div>
                  </div>

                  <BsThreeDots />
                </div>
                <hr />
                <div className="comment">
                  {post.singlePost?.comments?.map((item) => (
                    <CommentCard comment={item} />
                  ))}
                </div>
                <div className="absolute bottom-0 w-[90%]">
                  <div className="flex justify-between items-center w-full py-4">
                    <div className="flex items-center space-x-2">
                      {isPostLike ? (
                        <AiFillHeart
                          onClick={handlePostLike}
                          className="text-2xl hover:opacity-50 cursor-pointer text-red-500"
                        />
                      ) : (
                        <AiOutlineHeart
                          onClick={handlePostLike}
                          className="text-2xl hover:opacity-50 cursor-pointer"
                        />
                      )}
                      <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
                      <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                      {isSaved ? (
                        <BsBookmarkFill
                          onClick={handSavePost}
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

                  <div className="w-full py-2">
                    {post.singlePost?.likedByUsers?.length > 0 && (
                      <p>{post.singlePost?.likedByUsers?.length} likes</p>
                    )}
                    <p className="opacity-50 text-sm">
                      {timeDifference(post.singlePost?.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center w-full">
                    <BsEmojiSmile />
                    <input
                      type="text"
                      className="commentInputs w-full"
                      placeholder="Add a comment..."
                      onChange={(e) => setCommentContent(e.target.value)}
                      value={commentContent}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const data = {
                            postId,
                            jwt: token,
                            data: {
                              content: commentContent,
                            },
                          };
                          dispatch(createCommentAction(data));
                          setCommentContent("");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
