import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// import Icon from "react-eva-icons";
// import { Layout, Menu } from "antd";

import AddStudent from "./addStudent";
// import StudentCourseRegistration from "./manageStudent";
import AddDropManagement from "./addDropManagement";
import GradeEntry from "./gradeEntry";
import CourseLeaseManagement from "./courseLease";
import StudentCourseRegistration from "./courseRegistration";
import StudentCourseExemption from "./studentExemption";
import StudentStatusManagement from "./manageStudent";
import StudentCourses from "./CourseTaken"
import MainMenu from "./menuTest";
import StudentList from "./studentList";
import CreateUser from "./CreateUser";

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
// import { AddIcCallOutlined, HowToReg, ListAlt, LogoutOutlined, Report, ReportOffOutlined, StarOutlineSharp } from "@mui/icons-material";
import { Add, AddIcCallOutlined, HowToReg, ListAlt,StarOutlineSharp, LogoutOutlined, Report, AdminPanelSettings, ReportOffOutlined , ExitToAppOutlined , RedoOutlined} from "@mui/icons-material";
import Sidebar from "@/widgets/layout/sidebar";
import { MdLogout } from "react-icons/md";
import { FaFreeCodeCamp, FaGraduationCap, FaPaperclip, FaSchool } from "react-icons/fa";
import EntryExam from "./EntryExam";
import ExitExam from "./ExitExam";
import Remedial from "./Remedial";
import { Avatar, List } from "@mui/material";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const RegistrarOfficerSiderGenerator = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [isAddStudent, setIsAddStudent] = useState(true);
  const [isCourseRegistration, setIsCourseRegistration] = useState(false);
  const [isAddDrop, setIsAddDrop] = useState(false);
  const [isGradeEntry, setIsGradeEntry] = useState(false);
  const [isCourseLease, setIsCourseLease] = useState(false);
  const [isCourseExemption, setIsCourseExemption] = useState(false);
  const [isStudentStatus, setIsStudentStatus] = useState(false);
  const [isEntryExam, setIsEntryExam] = useState(false);
  const [isExitExam, setIsExitExam] = useState(false);
  const [isRemedial, setIsRemedial] = useState(false);
  const [isCourseTaken, setIsCourseTaken] = useState(false);
  const [isStudentList, setIsStudentList] = useState(false);
  const [isCreateUser, setIsCreateUser] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);

  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderSubMenu = (subMenuItems) => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onMouseEnter={handleMenuOpen}
        onMouseLeave={handleMenuClose}
      >
        {subMenuItems.map((subMenuItem, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              subMenuItem.onClick();
              handleMenuClose();
            }}
          >
            {subMenuItem.icon}
            {subMenuItem.name}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const renderMenuItems = (pages) => {
    return pages.map((page, index) => (
      <div key={index}>
        <div
          onMouseEnter={(e) => page.subMenu && handleMenuOpen(e)}
          onMouseLeave={handleMenuClose}
        >
          <MenuItem onClick={page.onClick}>
            {page.icon}
            {page.name}
          </MenuItem>
          {page.subMenu && renderSubMenu(page.subMenu)}
        </div>
      </div>
    ));
  };

  const handleCourseTaken =() =>{
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false)
    setIsCourseExemption(false)
    setIsEntryExam(false)
    setIsExitExam(false)
    setIsRemedial(false)
    setIsCourseTaken(true)
    setIsStudentList(false)
    setIsCreateUser(false)
   
    setIsStudentStatus(false)
  }

  const handleAddStudent = () => {
    setIsAddStudent(true);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false)
    setIsCourseExemption(false)
    setIsStudentStatus(false)
    setIsEntryExam(false)
    setIsExitExam(false)
    setIsRemedial(false)
    setIsCourseTaken(false)
    setIsStudentList(false)
    setIsCreateUser(false)



  };
  const handleCourseRegistration = () => {
    setIsAddStudent(false);
    setIsCourseRegistration(true);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false)
    setIsCourseExemption(false)
    setIsStudentStatus(false)
    setIsStudentList(false)
    setIsCreateUser(false)



    setIsEntryExam(false)
    setIsExitExam(false)
    setIsRemedial(false)
    setIsCourseTaken(false)
  };
  const handleCourseLease = () => {
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(true)
    setIsCourseExemption(false)
    setIsStudentStatus(false)
    setIsStudentList(false)
    setIsCreateUser(false)

    setIsEntryExam(false)
    setIsExitExam(false)
    setIsRemedial(false)
    setIsCourseTaken(false)
  };
  const handleAddDrop = () => {
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(true);
    setIsGradeEntry(false);
    setIsCourseLease(false);
    setIsCourseExemption(false);
    setIsStudentStatus(false)
    setIsStudentList(false)
    setIsCreateUser(false)

    setIsEntryExam(false)
    setIsExitExam(false)
    setIsRemedial(false)
    setIsCourseTaken(false)

  };
  const handleStudentList = () => {
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false);
    setIsCourseExemption(false)
    setIsStudentStatus(false)

    setIsStudentList(true)
    setIsCreateUser(false)

    setIsEntryExam(false)
    setIsExitExam(false)
    setIsRemedial(false)
    setIsCourseTaken(false)
  };

  const handleEntryExam =() =>{
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false);
    setIsCourseExemption(false)
    setIsEntryExam(true)
    setIsExitExam(false)
    setIsRemedial(false)
    setIsCourseTaken(false)
    setIsStudentStatus(false)
    setIsStudentList(false)
    setIsCreateUser(false)

  }

  const handleExitExam =() =>{
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false);
    setIsCourseExemption(false)
    setIsEntryExam(false)
    setIsExitExam(true)
    setIsRemedial(false)
    setIsCourseTaken(false)
    setIsStudentStatus(false)
    setIsStudentList(false)
    setIsCreateUser(false)

  }
  const handleCourseExemption = () => {
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false);
    setIsCourseExemption(true)
    setIsStudentStatus(false)
    setIsStudentStatus(false)
    setIsRemedial(false)
    setIsCourseTaken(false)
    setIsStudentStatus(false)
    setIsCreateUser(false)

    setIsStudentList(false)


  };
  const handleStudentStatus = () => {
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false);
    setIsCourseExemption(false)
    setIsStudentStatus(true)
    setIsStudentList(false)
    setIsCreateUser(false)


    setIsEntryExam(false)
    setIsExitExam(false)
    setIsRemedial(false)
    setIsCourseTaken(false)
  };

  const handleRemedial =() => {
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false);
    setIsCourseExemption(false)
    setIsEntryExam(false)
    setIsExitExam(false)
    setIsRemedial(true)
    setIsCourseTaken(false)
    setIsStudentStatus(false)
    setIsStudentList(false)
    setIsCreateUser(false)


  }
  const handleCreateUser =() => {
    setIsAddStudent(false);
    setIsCourseRegistration(false);
    setIsAddDrop(false);
    setIsGradeEntry(false);
    setIsCourseLease(false);
    setIsCourseExemption(false)
    setIsEntryExam(false)
    setIsExitExam(false)
    setIsRemedial(false)
    setIsCourseTaken(false)
    setIsStudentStatus(false)
    setIsStudentList(false)
    setIsCreateUser(true)


  }

  const handlelogout = () => {
    dispatch(userAction.logout());
  };

  const routes = [
    {
      title: "Registrar Officer",
      pages: [
        {
          icon: <UserCircleIcon {...icon} />,
          name: "Student",
          subMenu: [
            {
              icon: <ListAlt {...icon} />,
              name: "Student Admission",
              onClick: handleAddStudent,
            },
            {
              icon: <HowToReg {...icon} />,
              name: "Student Document",
              // onClick: handleCourseRegistration,
            },
            {
              icon: <AdminPanelSettings {...icon} />,
              name: "Admission Status",
              onClick: handleStudentStatus,
            },
            {
              icon: <Add {...icon} />,
              name: "Entry Exam",
              onClick: handleEntryExam,
            },
            {
              icon: <ExitToAppOutlined {...icon} />,
              name: "Exit Exam",
              onClick: handleExitExam,
            },
            {
              icon: <RedoOutlined {...icon} />,
              name: "Remedial",
              onClick: handleRemedial,
            },
            {
              icon: <FaFreeCodeCamp {...icon} />,
              name: "Course Taken",
              onClick: handleCourseTaken,
            },
          ],
          
        },
        {
          icon: <BookOpenIcon {...icon} />,
          name: "Course Registration",
          subMenu: [
            {
              icon: <ListAlt {...icon} />,
              name: "Course Lease",

              onClick: handleCourseLease,
            },
            {
              icon: <HowToReg {...icon} />,
              name: "Student Course Registration",
              onClick: handleCourseRegistration,
            },
            {
              icon: <Add {...icon} />,
              name: "Course ADD/DROP",
              onClick: handleAddDrop,
            },
            {
              icon: <FaFreeCodeCamp {...icon} />,
              name: "Course Exemption",
              onClick: handleCourseExemption,
            },
          ],

        },
        {
          icon: <StarOutlineSharp {...icon} />,
          name: "Edit Applicant Data",
          onClick: handleStudentList,

          
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "Create Student Account",
          onClick: handleCreateUser,
        },
        {
          icon: <FaPaperclip {...icon} />,
          name: "Reports",
          // onClick: handleAddDrop,

          
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
          {isGradeEntry ? <MainMenu /> : null}
          {isCourseLease ? <CourseLeaseManagement /> : null}
          {isCourseExemption ? <StudentCourseExemption /> : null}
          {isStudentStatus ? <StudentStatusManagement /> : null}
          {isEntryExam ? <EntryExam /> : null}
          {isExitExam ? <ExitExam /> : null}
          {isRemedial ? <Remedial /> : null}
          {isCourseTaken ?<StudentCourses /> : null}
          {isStudentList ?<StudentList /> : null}
          {isCreateUser ?<CreateUser /> : null}
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RegistrarOfficerSiderGenerator;
