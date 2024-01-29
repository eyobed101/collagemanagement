import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// import Icon from "react-eva-icons";
import { Layout, Menu } from "antd";

import AddStudent from "./addStudent";
import StudentCourseRegistration from "./manageStudent";
import AddDropManagement from "./add_dropManagement";
import GradeEntry from "./gradeEntry";

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
import { AddIcCallOutlined, LogoutOutlined } from "@mui/icons-material";
import Sidebar from "@/widgets/layout/sidebar";
import { MdLogout } from "react-icons/md";
import { FaGraduationCap, FaSchool } from "react-icons/fa";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const RegistrarOfficerSiderGenerator = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [isAddStudent, setIsAddStudent] = useState(true);
  const [isCourseRegistration, setIsCourseRegistration] = useState(false);
  const [isAddDrop, setIsAddDrop] = useState(false);
  const [isGradeEntry, setIsGradeEntry] = useState(false);
  

  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const handleAddStudent = () => {
    setIsAddStudent(true);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);

  };
  const handleCourseRegistration= () => {
    setIsAddStudent(false);
    setIsCourseRegistration(true);
    setIsAddDrop(false);
    setIsGradeEntry(false);


  };
  const handleAddDrop= () => {
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(true);
    setIsGradeEntry(false);


  };
  const handleGradeEntry= () => {
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(true);


  };
  
  
  const handlelogout = () => {
    dispatch(userAction.logout());
  };

  

  const routes = [
    {
      title: "Registrar Officer",
      pages: [
        {
          icon: <UserCircleIcon {...icon} />,
          name: "Register Student",
          onClick: handleAddStudent,
        },
        {
          icon: <BookOpenIcon {...icon} />,
          name: "Course Registration",
          onClick: handleCourseRegistration,
        },
        {
          icon: <FaGraduationCap {...icon} />,
          name: "Student Management",
          onClick: handleAddDrop,
        },
        {
          icon: <FaGraduationCap {...icon} />,
          name: "Grade Entry",
          onClick: handleGradeEntry,
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
          {isAddStudent ? <AddStudent /> : null}
          {isAddDrop ? <AddDropManagement /> : null}
          {isCourseRegistration ? <StudentCourseRegistration /> : null}
          {isGradeEntry ? <GradeEntry /> : null}
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
    
  );
};

export default RegistrarOfficerSiderGenerator;
