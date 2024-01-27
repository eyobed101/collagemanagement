import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { Layout, Menu } from "antd";

import DepartmentAdmin from "./Department_Admin";
import DepartmentCourse from "./Deparment_Course";
import DepartmentHead from "./Department_Head";

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
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { setSidenavType } from "@/context";
import { LogoutOutlined } from "@mui/icons-material";
import Sidebar from "@/widgets/layout/sidebar";
import { MdLogout } from "react-icons/md";
import { FaGraduationCap, FaSchool } from "react-icons/fa";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const DepartSiderGenerator = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [isDepartmentHead, setIsDepartmentHead] = useState(true);
  const [isDepartmentCourse, setIsDepartmentCourse] = useState(false);
  const [isDepartmentAdmin, setIsDepartmentAdmin] = useState(false);
  

  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const handleCDepartmentCourse = () => {
    setIsDepartmentAdmin(false);
    setIsDepartmentCourse(true);
    setIsDepartmentHead(false);

  };
  const handleDepartmentHead= () => {
    setIsDepartmentAdmin(false);
    setIsDepartmentCourse(false);
    setIsDepartmentHead(true);
  };
  const handleDepartmentAdmin = () => {
    setIsDepartmentAdmin(true);
    setIsDepartmentCourse(false);
    setIsDepartmentHead(false);
  };
  
  const handlelogout = () => {
    dispatch(userAction.logout());
  };

  

  const routes = [
    {
      title: "epartiment",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "Departimen Admin",
          onClick: handleDepartmentAdmin,
        },
        {
          icon: <HomeIcon {...icon} />,
          name: "Departiment Head",
          onClick: handleDepartmentHead,
        },
        {
          icon: <BuildingLibraryIcon {...icon} />,
          name: "Depatiment Course",
          onClick: handleCDepartmentCourse,
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
          {isDepartmentAdmin ? <DepartmentAdmin /> : null}
          {isDepartmentHead ? <DepartmentHead /> : null}
          {isDepartmentCourse ? <DepartmentCourse /> : null}
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
    
  );
};

export default DepartSiderGenerator;
