import React, { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { menu } from "./SidebarConfig";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import CreatePostModal from "../Post/CreatePostModal";
import SearchComponents from "../SearchComponents/SearchComponents";
import { BsInstagram } from "react-icons/bs";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { user } = useSelector((store) => store);

  const handleTabClick = (title) => {
    setActiveTab(title);
    if (title === "Profile") {
      navigate(`/${user.reqUser?.username}`);
    } else if (title === "Home") {
      navigate("/");
    } else if (title === "Create") {
      onOpen();
    }
    if (title === "Search") {
      setIsSearchVisible(true);
    } else {
      setIsSearchVisible(false);
    }
  };
  return (
    <div className="sticky top-0 h-[100vh] flex pl-5">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="pt-10">
            {activeTab !== "Search" ? (
              <img
                className='"w-40'
                src="https://i.imgur.com/zqpwkLQ.png"
                alt="logo"
              />
            ) : (
              <BsInstagram className="mt-8 text-3xl mb-5 ml-[-3px]" />
            )}
          </div>
          <div className="mt-10">
            {menu.map((item) => (
              <div
                onClick={() => handleTabClick(item.title)}
                className="flex items-center mb-5 cursor-pointer text-lg"
              >
                {activeTab === item.title ? item.activeIcon : item.icon}
                {activeTab !== "Search" && (
                  <p
                    className={`${
                      activeTab === item.title ? "font-bold" : "font-medium"
                    }`}
                  >
                    {item.title}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex left-0 items-center cursor-pointer pb-10">
          <IoReorderThreeOutline className="text-2xl" />
          {activeTab !== "Search" && <p className="ml-5">More</p>}
        </div>
      </div>
      <CreatePostModal onClose={onClose} isOpen={isOpen} />
      {isSearchVisible && <SearchComponents />}
    </div>
  );
};

export default Sidebar;
