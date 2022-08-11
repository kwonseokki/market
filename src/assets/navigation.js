import { IoIosAddCircle, IoIosSearch } from "react-icons/io";
import { RiWechatLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";
import { MdHomeFilled } from "react-icons/md";
export const navigations = [
  { path: "/", pathname: "홈", icon: <MdHomeFilled/> },
  { path: "/search", pathname: "검색", icon: <IoIosSearch /> },
  {
    path: "/upload",
    pathname: "",
    icon: <IoIosAddCircle style={{ color: "#FDBA74", fontSize: "2.5rem" }} />,
  },
  { path: "/mychat", pathname: "채팅", icon: <RiWechatLine /> },
  { path: "/info", pathname: "프로젝트", icon: <HiOutlineUser /> },
];
