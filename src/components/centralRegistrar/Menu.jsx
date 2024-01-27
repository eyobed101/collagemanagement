import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// import Icon from "react-eva-icons";
import { Layout, Menu } from "antd";

import CenterRegistrar from "./Center_Registerar";
import GradingSystem from "./GradeList";
import GraduatesList from "./GraduateList";
import PaymentStatus from "./PaymentStatus";
import ViewCenterStudent from "./ViewStudent";

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

const SiderGenerator = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [isCenterRegister, setIsCenterRegister] = useState(true);
  const [isPay, setIsPay] = useState(false);
  const [isGradeList, setIsGradeList] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isGradulateList, setIsGraduateList] = useState(false);

  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const handleCentralRegistrar = () => {
    setIsPay(false);
    setIsGraduateList(false);
    setIsView(false);
    setIsGradeList(false);
    setIsCenterRegister(true);
  };
  const handlePay = () => {
    setIsPay(true);
    setIsGraduateList(false);
    setIsView(false);
    setIsGradeList(false);
    setIsCenterRegister(false);
  };
  const handleView = () => {
    setIsPay(false);
    setIsGraduateList(false);
    setIsView(true);
    setIsGradeList(false);
    setIsCenterRegister(false);
  };
  const handleGradeList = () => {
    setIsPay(false);
    setIsGraduateList(false);
    setIsView(false);
    setIsGradeList(true);
    setIsCenterRegister(false);
  };

  const handleGraduateList = () => {
    setIsPay(false);
    setIsGraduateList(true);
    setIsView(false);
    setIsGradeList(false);
    setIsCenterRegister(false);
  };

  const handlelogout = () => {
    dispatch(userAction.logout());
  };

  

  const routes = [
    {
      title: "Center Registral",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "Central Registrar",
          onClick: handleCentralRegistrar,
        },
        {
          icon: <HomeIcon {...icon} />,
          name: "Payment Status",
          onClick: handlePay,
        },
            {
          icon: <FaSchool {...icon} />,
          name: "Grading System",
          onClick: handleGradeList,
        },
        {
          icon: <FaGraduationCap {...icon} />,
          name: "Graduate list",
          onClick: handleGraduateList,
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
          {isCenterRegister ? <CenterRegistrar /> : null}
          {isPay ? <PaymentStatus /> : null}
          {isGradeList ? <GradingSystem /> : null}
          {isGradulateList ? <GraduatesList /> : null}
          {isView ? <ViewCenterStudent /> : null}
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
    
  );
};

export default SiderGenerator;
