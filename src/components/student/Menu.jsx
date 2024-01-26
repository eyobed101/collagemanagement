import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Icon from "react-eva-icons";
import { Layout, Menu } from "antd";

import Grades from "./grades";
import Profile from "./profile";
import Tables from "./tables";

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

const StudentSiderGenerator = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [isProfile, setIsProfile] = useState(true);
  const [isGrade, setIsGrade] = useState(false);
  const [isCourse, setIsCourse] = useState(false);
  

  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const handleProfile = () => {
    setIsCourse(false);
    setIsGrade(false);
    setIsProfile(true);

  };
  const handleGrade= () => {
    setIsCourse(false);
    setIsProfile(false);
    setIsGrade(true);
  };
  const handleCourse = () => {
    setIsCourse(true);
    setIsGrade(false);
    setIsProfile(false);
  };
  
  const handlelogout = () => {
    dispatch(userAction.logout());
  };

  

  const routes = [
    {
      title: "Student",
      pages: [
        {
          icon: <UserCircleIcon {...icon} />,
          name: "Profile",
          onClick: handleProfile,
        },
        {
          icon: <BookOpenIcon {...icon} />,
          name: "Course List",
          onClick: handleCourse,
        },
        {
          icon: <BookOpenIcon {...icon} />,
          name: "Grades",
          onClick: handleGrade,
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
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <div>
          {isProfile ? <Profile /> : null}
          {isGrade ? <Grades /> : null}
          {isCourse ? <Tables /> : null}
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
    
  );
};

export default StudentSiderGenerator;
