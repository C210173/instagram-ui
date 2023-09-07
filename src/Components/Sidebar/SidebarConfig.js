import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiFillCompass,
  AiOutlineMessage,
  AiFillMessage,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlinePlusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
export const menu = [
  {
    title: "Home",
    icon: <AiOutlineHome className="text-2xl mr-5" />,
    activeIcon: <AiFillHome className="text-2xl mr-5"></AiFillHome>,
  },
  {
    title: "Search",
    icon: <AiOutlineSearch className="text-2xl mr-5" />,
    activeIcon: <FaSearch className="text-2xl mr-5"></FaSearch>,
  },
  {
    title: "Explore",
    icon: <AiOutlineCompass className="text-2xl mr-5" />,
    activeIcon: <AiFillCompass className="text-2xl mr-5"></AiFillCompass>,
  },
  {
    title: "Reels",
    icon: <RiVideoLine className="text-2xl mr-5" />,
    activeIcon: <RiVideoFill className="text-2xl mr-5"></RiVideoFill>,
  },
  {
    title: "Message",
    icon: <AiOutlineMessage className="text-2xl mr-5" />,
    activeIcon: <AiFillMessage className="text-2xl mr-5"></AiFillMessage>,
  },
  {
    title: "Notifications",
    icon: <AiOutlineHeart className="text-2xl mr-5" />,
    activeIcon: <AiFillHeart className="text-2xl mr-5"></AiFillHeart>,
  },
  {
    title: "Create",
    icon: <AiOutlinePlusCircle className="text-2xl mr-5" />,
    activeIcon: <AiFillPlusCircle className="text-2xl mr-5"></AiFillPlusCircle>,
  },
  {
    title: "Profile",
    icon: <CgProfile className="text-2xl mr-5" />,
    activeIcon: <CgProfile className="text-2xl mr-5"></CgProfile>,
  },
];
