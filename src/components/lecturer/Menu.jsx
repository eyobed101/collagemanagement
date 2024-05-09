import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// import Icon from "react-eva-icons";

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
import { LogoutOutlined, AppRegistration ,MailOutlineTwoTone ,RequestPageSharp , SubdirectoryArrowLeft, GradeOutlined } from "@mui/icons-material";
import Sidebar from "@/widgets/layout/sidebar";
import { MdLogout } from "react-icons/md";
import { FaGraduationCap, FaSchool } from "react-icons/fa";
import AssessmentRegistration from "./RegisterAssesment";
import GradeSubmission from "./GradeSubmission";
import MaintainAssesgment from "./MaintainAssesment";
import GradeChangeSubmission from "./submitGradeChange";
import ThesisResult from "./ThesisResult";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const LucturerSiderGenerator = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [isLucturer, setIsLecturer] = useState(false);
  const [isSubject, setIsSubject] = useState(false);
  const [isRegisterAssesment, setIsRegisterAssesment] = useState(false);
  const [isMaintainAssesment, setIsMaintainAssesment] = useState(true);
  const [isSubmitGrade , setIsSubmitGrade] = useState(false);
  const [isGradeChange, setIsGradeChange] = useState(false);
  const [isThesis, setThesis] = useState(false);
  

  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleThesis =() =>{
    setIsLecturer(false);
    setIsSubject(false);
    setIsGradeChange(false)
    setIsSubmitGrade(false);
    setIsRegisterAssesment(false)
    setIsMaintainAssesment(false)
    setThesis(true)
  }


  const handleLecturer = () => {
    setIsLecturer(true);
    setIsSubject(false);
    setIsGradeChange(false)
    setIsSubmitGrade(false);
    setIsRegisterAssesment(false)
    setIsMaintainAssesment(false)

  };
  const handleCreateSubject= () => {
    setIsLecturer(false);
    setIsSubject(true);
    setIsGradeChange(false)
    setIsSubmitGrade(false);
    setIsRegisterAssesment(false)
    setIsMaintainAssesment(false)
    setThesis(false)

  };

  const handleGradeChange =() =>{
    setIsLecturer(false);
    setIsSubject(false);
    setIsGradeChange(true)
    setIsSubmitGrade(false);
    setIsRegisterAssesment(false)
    setIsMaintainAssesment(false)
    setThesis(false)

  }

  const handleSubmitGrade =() =>{
    setIsLecturer(false);
    setIsSubject(false);
    setIsGradeChange(false)
    setIsSubmitGrade(true);
    setIsRegisterAssesment(false)
    setIsMaintainAssesment(false)
    setThesis(false)

  }

  const handleAssessment =() =>{
    setIsLecturer(false);
    setIsSubject(false);
    setIsGradeChange(false)
    setIsSubmitGrade(false);
    setIsRegisterAssesment(false)
    setIsMaintainAssesment(true)
    setThesis(false)


  }

  const handleRegisterAssessment =() =>{
    setIsLecturer(false);
    setIsSubject(false);
    setIsGradeChange(false)
    setIsSubmitGrade(false);
    setIsRegisterAssesment(true)
    setIsMaintainAssesment(false)
    setThesis(false)

  }
  
  
  const handlelogout = () => {
    dispatch(userAction.logout());
  };

  

  const routes = [
    {
      title: "Lecturer",
      pages: [
        {
          icon: <BookOpenIcon {...icon} />,
          name: "Grade",
          subMenu: [
            {
              icon: <AppRegistration {...icon} />,
              name: "Register Assesment",
              onClick: handleRegisterAssessment,
            },
            {
              icon: <GradeOutlined {...icon} />,
              name: "Grade Submission From Excel",
              onClick: handleGradeChange,
            },
            {
              icon: <MailOutlineTwoTone {...icon} />,
              name: "Maintain Assignment Form ",
              onClick: handleAssessment,
            },
            {
              icon: <RequestPageSharp {...icon} />,
              name: "Thesis Result Form",
              onClick: handleThesis,
            },
            {
              icon: <SubdirectoryArrowLeft {...icon} />,
              name: "Submit Grade Change",
              onClick: handleSubmitGrade,
            },
          
          
          ],

        },
        // {
        //   icon: <UserCircleIcon {...icon} />,
        //   name: "Grade Entry",
        //   onClick: handleLecturer,
        // },
        // {
        //   icon: <BookOpenIcon {...icon} />,
        //   name: "Grade Change",
        //   onClick: handleCreateSubject,
        // },
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
          {isSubmitGrade ?<GradeChangeSubmission/> : null}
          {isRegisterAssesment ? <AssessmentRegistration/> : null}
          {isMaintainAssesment ? <MaintainAssesgment/> : null}
          {isGradeChange? <GradeSubmission/> : null}
          {isThesis?<ThesisResult/> : null}
        </div>
        <div className="text-[#4279A6]">
          <Footer />
        </div>
      </div>
    </div>
    
  );
};

export default LucturerSiderGenerator;
