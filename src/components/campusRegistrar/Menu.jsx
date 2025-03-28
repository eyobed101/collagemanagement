import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import { useNavigate } from "react-router-dom";
import CampusRegistrar from "./Campus_register";
import CourseOffering from "./CourseOffering";
import GradeApproval from "./GradeApproval";
import GraduatesApproval from "./GraduateApproval";
import Curriculum from "./Curriculum";
import TuitionStatistics from "./Tutition";
import AddTerm from "./AddTerm";
import AddDepartment from "./AddDept";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CourseList from "./CourseList";

import {
  Configurator,
  DashboardNavbar,
  Footer,
  Sidenav,
} from "@/widgets/layout";
import {
  BuildingLibraryIcon,
  HomeIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
// import { IconButton } from "@mui/material";
import { BookOpenIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { setSidenavType } from "@/context";
import { Add, AddIcCallOutlined, Approval, BookOnlineOutlined, BookSharp, Bookmark, CountertopsRounded, HowToReg, ListAlt, LogoutOutlined, MoneyOutlined } from "@mui/icons-material";
import Sidebar from "@/widgets/layout/sidebar";
import { MdLogout } from "react-icons/md";
import { FaGraduationCap, FaRegAddressBook, FaSchool } from "react-icons/fa";
import StudentCopyVerification from "./StudentCopy";
import { checkPropTypes } from "prop-types";
import AddSection from "./AddSection";
import AddCourse from "./AddCourses";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const CampusSiderGenerator = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [isCourseOffering, setIsCourseOffering] = useState(false);
  const [isCampusRegistrar, setIsCampusRegistrar] = useState(true);
  const [isGraduateApproval, setIsGraduateApproval] = useState(false);
  const [isGradeApproval, setIsGradeApproval] = useState(false);
  const [isTutution, setIsTutution] = useState(false);
  const [isCurriculem, setIsCurriculem] = useState(false);
  const [isStudentCopy, setIsStudentCopy] = useState(false);
  const [isAddTerm, setIsAddTerm] = useState(false);
  const [isAddDepart, setIsAddDepart] = useState(false);
  const [isAddSection, setIsAddSection] = useState(false);
  const [isAddCourse, setIsAddCourse] = useState(false);
  const [isCourseList, setIsCourseList] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const handleMenuOpen = (index) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleMenuClose = () => {
    setOpenSubMenuIndex(null);
  };

  const renderSubMenu = (subMenuItems, index) => {
    return (
      <Menu
        anchorEl={document.getElementById(`submenu-${index}`)}
        open={openSubMenuIndex === index}
        onClose={handleMenuClose}
             getContentAnchorEl={null} // Prevents default behavior of trying to find the anchor in the DOM
      >
        {subMenuItems.map((subMenuItem, subIndex) => (
          <MenuItem
            key={subIndex}
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
          onMouseEnter={() => page.subMenu && handleMenuOpen(index)}
          onMouseLeave={handleMenuClose}
        >
          <MenuItem onClick={page.onClick}  id={`submenu-${index}`}>
            {page.icon}
            {page.name}
          </MenuItem>
          {page.subMenu && renderSubMenu(page.subMenu, index)}
        </div>
      </div>
    ));
  };


  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [open, setOpen] = React.useState(
    windowSize.innerWidth <= 425 ? false : true
  );

  const handlelogout = () => {
    dispatch(userAction.logout());
  };
  const handleCurrculum = () => {
    setIsStudentCopy(false);
    setIsCurriculem(true);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsAddCourse(false)
    setIsAddDepart(false)
    setIsAddSection(false)
    setIsAddTerm(false)
    setIsCourseList(false)
  };

 

  const handleTerm = () => {
    setIsStudentCopy(false);
    setIsCurriculem(false);
    setIsAddTerm(true);
    setIsAddDepart(false);
    setIsAddSection(false);
    setIsAddCourse(false);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsCourseList(false);
  };

  const handleDept = () => {
    setIsStudentCopy(false);
    setIsCurriculem(false);
    setIsAddDepart(true);
    setIsAddTerm(false);
    setIsAddSection(false);
    setIsAddCourse(false);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsCourseList(false);
  };

  const handleSection = () => {
    setIsStudentCopy(false);
    setIsCurriculem(false);
    setIsAddSection(true);
    setIsAddDepart(false);
    setIsAddTerm(false);
    setIsAddCourse(false);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsCourseList(false);
  };

  const handleCampusRegistrar = () => {
    setIsStudentCopy(false);
    setIsCampusRegistrar(true);
    setIsCurriculem(false);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsAddCourse(false);
    setIsAddDepart(false);
    setIsAddSection(false);
    setIsAddTerm(false);
    setIsCourseList(false);
  };
  const handleTuition = () => {
    setIsStudentCopy(false);
    setIsCurriculem(false);
    setIsTutution(true);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsAddCourse(false);
    setIsAddDepart(false);
    setIsAddSection(false);
    setIsAddTerm(false);
    setIsCourseList(false);
  };
  const handleStudentCopy = () => {
    setIsStudentCopy(true);
    setIsCurriculem(false);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsAddCourse(false);
    setIsAddDepart(false);
    setIsAddSection(false);
    setIsAddTerm(false);
    setIsCourseList(false);
  };

  const handleGraduateApproval = () => {
    setIsStudentCopy(false);
    setIsCurriculem(false);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(true);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsAddCourse(false);
    setIsAddDepart(false);
    setIsAddSection(false);
    setIsAddTerm(false);
    setIsCourseList(false);
  };

  const handleGradeApproval = () => {
    setIsStudentCopy(false);
    setIsCurriculem(false);
    setIsTutution(false);
    setIsGradeApproval(true);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsAddCourse(false);
    setIsAddDepart(false);
    setIsAddSection(false);
    setIsAddTerm(false);
    setIsCourseList(false);
  };

  const handleCourseOffering = () => {
    setIsStudentCopy(false);
    setIsCurriculem(false);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(true);
    setIsCampusRegistrar(false);
    setIsAddSection(false);
    setIsAddDepart(false);
    setIsAddTerm(false);
    setIsAddCourse(false);
    setIsCourseList(false);
  };

  const handleCourse = () => {
    setIsStudentCopy(false);
    setIsCurriculem(false);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsAddSection(false);
    setIsAddDepart(false);
    setIsAddTerm(false);
    setIsAddCourse(true);
    setIsCourseList(false);
  };
  const handleCourseList = () => {
    setIsStudentCopy(false);
    setIsCurriculem(false);
    setIsTutution(false);
    setIsGradeApproval(false);
    setIsGraduateApproval(false);
    setIsCourseOffering(false);
    setIsCampusRegistrar(false);
    setIsAddSection(false);
    setIsAddDepart(false);
    setIsAddTerm(false);
    setIsAddCourse(false);
    setIsCourseList(true);
  };

 
  const routes = [
    {
      title: "Campus Registral",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "Campus Registrar",
          onClick: handleCampusRegistrar,
        },
        {
          icon: <BookOpenIcon {...icon} />,
          name: "Terms & Sections",
          subMenu: [
            {
              icon: <PlusIcon {...icon} />,
              name: "Add Term",
              onClick: handleTerm,
            },
            {
              icon: <PlusIcon {...icon} />,
              name: "Add Department",
              onClick: handleDept,
            },
            {
              icon: <PlusIcon {...icon} />,
              name: "Add Section",
              onClick: handleSection,
            }
          ],

        },
      
      
        {
          icon: <Bookmark {...icon} />,
          name: "Course",
          subMenu: [
            {
              icon: <ListAlt {...icon} />,
              name: "Course List",
              onClick: handleCourseList,
            },
            {
              icon: <PlusIcon {...icon} />,
              name: "Add Course",
              onClick: handleCourse,
            },
     
            {
              icon: <HowToReg {...icon} />,
              name: "Course Offering",
              onClick: handleCourseOffering,
            }
     
          ],
        },
        
        {
          icon: <BuildingLibraryIcon {...icon} />,
          name: "Curriculum & Tuition",
          subMenu: [
            {
              icon: <HomeIcon {...icon} />,
              name: "Currculum",
              onClick: handleCurrculum,
            },
            {
              icon: <MoneyOutlined {...icon} />,
              name: "Tuition",
              onClick: handleTuition,
            },
                ],

        },
        {
          icon: <FaSchool {...icon} />,
          name: "Student Copy",
          onClick: handleStudentCopy,
        },
  
        {
          icon: <Approval {...icon} />,
          name: "Approval",
          subMenu: [
            {
              icon: <FaGraduationCap {...icon} />,
              name: "Graduate Approval",
              onClick: handleGraduateApproval,
            },
            {
              icon: <FaRegAddressBook {...icon} />,
              name: "Grade Approval",
              onClick: handleGradeApproval,
            },
            
                ],

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

        <div>
          {isCampusRegistrar ? <CampusRegistrar /> : null}
          {isCourseOffering ? <CourseOffering /> : null}
          {isTutution ? <TuitionStatistics /> : null}
          {isGradeApproval ? <GradeApproval /> : null}
          {isGraduateApproval ? <GraduatesApproval /> : null}
          {isCurriculem ? <Curriculum /> : null}
          {isStudentCopy ? <StudentCopyVerification /> : null}
          {isAddTerm ? <AddTerm /> : null}
          {isAddDepart ? <AddDepartment /> : null}
          {isAddSection ? <AddSection /> : null}
          {isAddCourse ? <AddCourse /> : null}
          {isCourseList ? <CourseList /> : null}




        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CampusSiderGenerator;
