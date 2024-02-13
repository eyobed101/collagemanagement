import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// import Icon from "react-eva-icons";
import { Layout, Menu } from "antd";

import Lecturer from "./lecture";
import CreateSubject from "./LectureHome";

import {
  Configurator,
  DashboardNavbar,
  Footer,
  Sidenav,
} from "@/widgets/layout";
import {
  BuildingLibraryIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
// import { IconButton } from "@mui/material";
import { BookOpenIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { setSidenavType } from "@/context";
import { LogoutOutlined } from "@mui/icons-material";
import Sidebar from "@/widgets/layout/sidebar";
import { MdLogout } from "react-icons/md";
import { FaGraduationCap, FaSchool } from "react-icons/fa";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const LucturerSiderGenerator = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [isLucturer, setIsLecturer] = useState(true);
  const [isSubject, setIsSubject] = useState(false);
  

  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const handleLecturer = () => {
    setIsLecturer(true);
    setIsSubject(false);

  };
  const handleCreateSubject= () => {
    setIsLecturer(false);
    setIsSubject(true);
  };
  
  
  const handlelogout = () => {
    dispatch(userAction.logout());
  };

  

  const routes = [
    {
      title: "Lecturer",
      pages: [
        {
          icon: <UserCircleIcon {...icon} />,
          name: "Grade Entry",
          onClick: handleLecturer,
        },
        {
          icon: <BookOpenIcon {...icon} />,
          name: "Grade Change",
          onClick: handleCreateSubject,
        },
        {
          icon: <MdLogout {...icon} />,
          name: "Log out",
          onClick: handlelogout,
        },
      ],
    },
    // Add more navigation sections as needed
  ];

  
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          setSidenavType === "dark"
            ? "/img/logo-ct.png"
            : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        {/* <NavBar /> */}
        <DashboardNavbar />
        <Configurator />
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        <div>
          {isLucturer ? <Lecturer /> : null}
          {isSubject ? <CreateSubject /> : null}
        </div>
        <div className="text-[#4279A6]">
          <Footer />
        </div>
      </div>
    </div>
    
  );
};

export default LucturerSiderGenerator;
