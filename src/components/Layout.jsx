import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../redux/user";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
//////////////Styles///////////////////////
import { styled, useTheme } from "@mui/material/styles";
import Icon from "@mui/material/IconButton";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
// import Icon from "react-eva-icons";
import { Layout, Menu } from "antd";

// //////////// Route Components /////////////////
// import ListAnnouncment from "./subComponents/ListAnnouncment";
// import AdminDash from "./subComponents/AdminDash";
// import TeacherDash from "./subComponents/TeacherDash";
// import ParentDash from "./subComponents/ParentDash";
// import AddParent from "./subComponents/AddParent";
// import AddStudnets from "./subComponents/AddStudnets";
// import CreateNewStudnet from "./subComponents/CreateNewStudnet";
// import ListClasses from "./subComponents/ListClasses";
// import ListCourses from "./subComponents/ListCourses";
// import AddClass from "./subComponents/CreateClasses";
// import AddTeacher from "./subComponents/AddTeacher";
// import CreateNewTeacher from "./subComponents/CreateNewTeacher";
// import CreateCrouse from "./subComponents/CreateCrouse";
// import CreateRole from "./subComponents/CreateRole";
// import ParentProfile from "./subComponents/ParentProfile";
// import ViewCourse from "./modals/courses/view";
// import UpdateCourse from "./modals/courses/update";
// import TeacherView from "./modals/teacher/view";
// import TeacherUpdate from "./modals/teacher/update";
// import ViewClass from "./modals/classes/view";
// import UpdateClass from "./modals/classes/update";
// import ViewStudent from "./modals/student/View";
// import UpdateStudent from "./modals/student/Update";
// import AttendanceList from "./subComponents/AttendanceList";
// import AttendanceView from "./modals/attendance/view";
// import Profile from "../components/subComponents/Profile";
// import ProfileEdit from "../components/subComponents/ProfileEdit";
// import CenterList from "../components/subComponents/CenterList";
// import TermList from "../components/subComponents/TermList";
// import SectionList from "../components/subComponents/SectionList";
// import DepartmentList from "../components/subComponents/DepartmentList";
// import CoursesList from "../components/subComponents/CoursesList";
// import ApplicantList from "../components/subComponents/ApplicantList";
// import GradeList from "../components/subComponents/GradeList";
// import EmployeeList from "../components/subComponents/EmployeeList";
// import InstCourseAssgtList from "../components/subComponents/InstCourseAssgtList";
// import DCourseOfferingList from "../components/subComponents/DCourseOfferingList";
// import AppDocumentsList from "../components/subComponents/AppDocumentsList";
// import CoursePrerequisitesList from "../components/subComponents/CoursePrerequisitesList";
// import CourseLeasesList from "../components/subComponents/CourseLeasesList";
// import CourseRegistrationPendingList from "../components/subComponents/CourseRegistrationPendingList";
// import StudentStatusList from "../components/subComponents/StudentStatusList";
// import SuperAdmin from "../Auth/SuperAdmin";
// import Register from "./useradminDashboard";
import RootAdmin from "./admin/Root_Admin";
// import CampusAdmin from "./Campus_Head/Campus_Admin";
import ViewCenterStudent from "./centralRegistrar/ViewStudent";
// import CenterRegistrar from "./centralRegistrar/Center_Registerar";
import Lecturer from "./lecturer/lecture";
import DepartmentHead from "./departmentHead/Department_Head";
import SiderGenerator from "./centralRegistrar/Menu"
import DepartmentAdmin from "./departmentHead/Department_Admin";
import GraduatesList from "./centralRegistrar/GraduateList";
import PaymentStatus from "./centralRegistrar/PaymentStatus";
import GradingSystem from "./centralRegistrar/GradeList";
import CampusRegistrar from "./campusRegistrar/Campus_register";
import GradeApproval from "./campusRegistrar/GradeApproval";
import GraduatesApproval from "./campusRegistrar/GraduateApproval";
import StudentCopyVerification from "./campusRegistrar/StudentCopy";
import Curriculum from "./campusRegistrar/Curriculum";
import TuitionStatistics from "./campusRegistrar/Tutition";
import CourseOffering from "./campusRegistrar/CourseOffering";
import CampusSiderGenerator from "./campusRegistrar/Menu";
import DepartSiderGenerator from "./departmentHead/Menu";
import StudentSiderGenerator from "./student/Menu";
import LucturerSiderGenerator from "./lecturer/Menu";
import CampusAdmin from "./Campus_Head/Campus_Admin"
const { Header, Content, Sider } = Layout;
const drawerWidth = 240;

const Layouts = () => {
  const [management, setManagement] = useState(false);
  const navigate = useNavigate();
  const profile = useSelector((state) => state.user.profile);
  const school = useSelector((state) => state.user.school);
  const user = useSelector((state) => state.user.value);
  // const role = useSelector((state) => state.user.profile.role);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const theme = useTheme();

  const [open, setOpen] = React.useState(
    windowSize.innerWidth <= 425 ? false : true
  );
  const current = user;
  const dispatch = useDispatch();
  console.log(profile);
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const logout = () => {
    dispatch(userAction.logout());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    position: windowSize.innerWidth <= 425 ? "fixed" : "",
    zIndex: 1000,
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      <a
        className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
      >
        TVET
      </a>,
      "sub2",
      <Icon
        name="cast-outline"
        fill="#667085"
        size="large" // small, medium, large, xlarge
        animation={{
          type: "pulse", // zoom, pulse, shake, flip
          hover: true,
          infinite: false,
        }}
      />,[
        getItem(
          <a
            onClick={() => navigate("/department-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            departmentHead
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/TermList")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Term
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/Courses-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/CoursePrerequisites-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course PreRequisite
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/Applicant-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Student
          </a>,

          "6"
        ),

        getItem(
          <a
            onClick={() => navigate("/Grade-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Grade
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/CourseOffering-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course Offering
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/CourseLeases-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course Leases
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/StudentStatus-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Student Status
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/CourseRegistrationPending-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course RegPending
          </a>,
          "6"
        ),
       
        getItem(
          <a
            onClick={() => navigate("/InstCourseAssg-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Inst Course Assg
          </a>,
          "6"
        ),
      ]
    ),
    getItem(
      <a
        onClick={() => navigate("/announcment")}
        className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
      >
        Announcment
      </a>,
      "sub2",
      <Icon
        name="volume-up-outline"
        fill="#667085"
        size="large" // small, medium, large, xlarge
        animation={{
          type: "pulse", // zoom, pulse, shake, flip
          hover: true,
          infinite: false,
        }}
      />
    ),
    getItem(
      <p
        // onClick={() => navigate("/announcment")}
        className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-4 ml-5"
      >
        Management
      </p>,
      "sub4",
      <Icon
        name="book-outline"
        fill="#667085"
        size="large" // small, medium, large, xlarge
        animation={{
          type: "pulse", // zoom, pulse, shake, flip
          hover: true,
          infinite: false,
        }}
      />,
      [
        getItem(
          <a
            onClick={() => navigate("/list-center")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Study Center
          </a>,
          "5"
        ),
        getItem(
          <a
            onClick={() => navigate("/section-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Section
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/Employee-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Employee
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/AppDocuments-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Documents
          </a>,
          "6"
        ),
      ]
    ),
    getItem(
      <a
        onClick={() => navigate("/admin")}
        className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
      >
        Regular
      </a>,
      "sub1",
      <Icon
        name="home-outline"
        fill="#667085"
        size="large" // small, medium, large, xlarge
        animation={{
          type: "pulse", // zoom, pulse, shake, flip
          hover: true,
          infinite: false,
        }}
      />,
      [
        getItem(
          <a
            onClick={() => navigate("/department-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            departmentHead
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/TermList")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Term
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/Courses-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/CoursePrerequisites-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course PreRequisite
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/Applicant-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Student
          </a>,

          "6"
        ),

        getItem(
          <a
            onClick={() => navigate("/Grade-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Grade
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/CourseOffering-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course Offering
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/CourseLeases-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course Leases
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/StudentStatus-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Student Status
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/CourseRegistrationPending-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Course RegPending
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/AppDocuments-view")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Documents
          </a>,
          "6"
        ),
        getItem(
          <a
            onClick={() => navigate("/register_user")}
            className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
          >
            Inst Course Assg
          </a>,
          "6"
        ),
      ]
    ),
  ];
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  // const SiderGenerator = () => {
  //   const [openKeys, setOpenKeys] = useState([]);
  //   const onOpenChange = (keys) => {
  //     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //       setOpenKeys(keys);
  //     } else {
  //       setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //     }
  //   };
  //   console.log("OpenKeys"  , profile)
  //   if (profile == true) {
  //     const currentURL = window.location.pathname;
  //     return (
  //       <Drawer variant="permanent" open={open}>
  //         {/* <DrawerHeader /> */}
  //         <div className="mt-6 ml-6 mb-2">
  //           {open ? (
  //             <div className="flex flex-row justify-start ml-1">
  //               <IconButton
  //                 onClick={handleDrawerClose}
  //                 sx={{
  //                   marginRight: 0,
  //                   marginLeft: 0,
  //                 }}
  //               >
  //                 <Icon
  //                   name="menu-arrow-outline"
  //                   fill="#667085"
  //                   size="large" // small, medium, large, xlarge
  //                   animation={{
  //                     type: "pulse", // zoom, pulse, shake, flip
  //                     hover: true,
  //                     infinite: false,
  //                   }}
  //                 />
  //               </IconButton>
  //               <img
  //               style={{marginLeft:10}}
  //                 src={require("../assets/logo1.png")}
  //                 className="w-[58px] h-[37px] z-1"
  //               />
  //             </div>
  //           ) : (
  //             <div className="flex flex-row justify-start -ml-2">
  //               <IconButton
  //                 color="default"
  //                 aria-label="open drawer"
  //                 onClick={handleDrawerOpen}
  //                 edge="start"
  //                 sx={{
  //                   marginRight: 0,
  //                   marginLeft: 0,
  //                   ...(open && { display: "none" }),
  //                 }}
  //               >
  //                 <Icon
  //                   name="menu-outline"
  //                   fill="#667085"
  //                   size="large" // small, medium, large, xlarge
  //                   animation={{
  //                     type: "pulse", // zoom, pulse, shake, flip
  //                     hover: true,
  //                     infinite: false,
  //                   }}
  //                 />
  //               </IconButton>
  //             </div>
  //           )}
  //         </div>
  //         <Menu
  //           mode="inline"
  //           openKeys={openKeys}
  //           onOpenChange={onOpenChange}
  //           style={{
  //             width: 240,
  //             marginLeft: 10,
  //           }}
  //           items={items}
  //         />
  //       </Drawer>
  //     );
  //   }
  // };

  useEffect(() => {
     if(user.email == "onetest@gmail.com"){
      navigate("/root_admin")
     }
     else if(user.email == "one@gmail.com"){
      navigate("/campus_admin")
     }
     else if(user.email == "register@gmail.com"){
      navigate("/register_office")
     }
     else if(user.email == "department@gmail.com"){
      navigate("/department_admin")
     }
     else if(user.email == "student@gmail.com"){
      navigate("/student_home")
     }
     else if(user.email == "center@gmail.com"){
      navigate("/center_register")
     }
     else if(user.email == "campusRegister@gmail.com"){
      navigate("/campus_registrar")
     }
     else if(user.email == "lecture@gmail.com"){
      navigate("/lecture")
     }
     else {
      dispatch(userAction.logout())
     }

    // if (profile == undefined) {
    //   navigate("/createrole");
    // } else {
    //   if (profile == true) {
    //     navigate("/admin");
      // } else if (profile.role["isParent"] == true) {
      //   navigate("/list-parent");
      //   //navigate("/createrole")
      // } else if (profile.role["isTeacher"] == true) {
      //   navigate("/teacher");
      // } else {
      //   navigate("/createrole");
    //  }
    // }
  }, []);

  return (
    <Layout className="bg-[#F9FAFB] min-h-[100vh]">
      <Box sx={{ display: "flex", width: "100%" }}>
         {/* <SiderGenerator /> */}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          className="bg-[#F9FAFB] w-[100%] overflow-x-hidden "
        >
          {/* <DrawerHeader /> */}
          <Content className="bg-[#F9FAFB] h-[auto] w-[100%]">
            <Routes>
              {/* <Route path="/admin" element={<AdminDash />} /> */}
              {/* <Route path="/list-center" element={<CenterList />} /> */}
              {/* <Route path="/teacher" element={<TeacherDash />} />
              <Route path="/parent" element={<ParentDash />} />
              <Route path="/add-parent" element={<AddParent />} />
              <Route path="/list-student" element={<AddStudnets />} />
              <Route path="/list-classes" element={<ListClasses />} />
              <Route path="/add-student" element={<CreateNewStudnet />} />
              <Route path="/add-term" element={<AddClass />} />
              <Route path="/list-teacher" element={<AddTeacher />} />
              <Route path="/add-teacher" element={<CreateNewTeacher />} />
              <Route path="/list-Course" element={<ListCourses />} />
              <Route path="/add-course" element={<CreateCrouse />} />
              <Route path="/createrole" element={<CreateRole />} />
              <Route path="/list-parent" element={<ParentProfile />} />
              <Route path="/view-course" element={<ViewCourse />} />
              <Route path="/update-course" element={<UpdateCourse />} />
              <Route path="/view-teacher" element={<TeacherView />} />
              <Route path="/update-teacher" element={<TeacherUpdate />} />
              <Route path="/view-class" element={<ViewClass />} />
              <Route path="/update-class" element={<UpdateClass />} />
              <Route path="/view-student" element={<ViewCenterStudent />} />
              <Route path="/update-student" element={<UpdateStudent />} />
              <Route path="/announcment" element={<ListAnnouncment />} />
              <Route path="/attendance" element={<AttendanceList />} />
              <Route path="/view-attendance" element={<AttendanceView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="profile-edit" element={<ProfileEdit />} />
              <Route path="TermList" element={<TermList />} />
              <Route path="section-view" element={<SectionList />} />
              <Route path="department-view" element={<DepartmentList />} />
              <Route path="Courses-view" element={<CoursesList />} />
              <Route path="CourseLeases-view" element={<CourseLeasesList />} />
              <Route path="Superadmin" element={<SuperAdmin />} />
              <Route path="/register_user" element={<Register />} /> */}
              <Route path="/root_admin" element={<RootAdmin />} />
              {/* <Route path="/campus_admin" element={<CampusAdmin />} /> */}
              <Route path="/center_register" element={<SiderGenerator />} />
              <Route path="/student_home" element={<StudentSiderGenerator />} />
              <Route path="/campus_admin" element={<CampusAdmin />} /> 
              {/* <Route path="/center_register" element={<CenterRegistrar />} /> */}
              <Route path="/graduate_list" element={<GraduatesList />} />
              <Route path="/Payment_status" element={<PaymentStatus />} />
              <Route path="/lecture" element={<LucturerSiderGenerator />} />
              <Route path="/department_admin" element={<DepartSiderGenerator />} />
              <Route path="/grading_system" element={<GradingSystem />} />
              <Route path="/campus_registrar" element={<CampusSiderGenerator />} />
              <Route path="/grade_approval" element={<GradeApproval />} />
              <Route path="/graduate_approval" element={<GraduatesApproval />} />
              <Route path="/curriculum" element={<Curriculum />} />
               <Route path="/student_copy" element={<StudentCopyVerification/>} /> 
              <Route path="/tuition" element={<TuitionStatistics />} />
              <Route path="/course_offering" element={<CourseOffering />} />
              <Route path="/view-student" element={<ViewCenterStudent />} />




              {/* <Route
                path="StudentStatus-view"
                element={<StudentStatusList />}
              /> */}
              {/* <Route
                path="CourseRegistrationPending-view"
                element={<CourseRegistrationPendingList />}
              />
              <Route path="Applicant-view" element={<ApplicantList />} />
              <Route
                path="CoursePrerequisites-view"
                element={<CoursePrerequisitesList />}
              />
              <Route path="AppDocuments-view" element={<AppDocumentsList />} />
              <Route
                path="CourseOffering-view"
                element={<DCourseOfferingList />}
              /> */}
              {/* <Route path="Employee-view" element={<EmployeeList />} />
              <Route
                path="InstCourseAssg-view"
                element={<InstCourseAssgtList />}
              />
              <Route path="Grade-view" element={<GradeList />} /> */}
            </Routes>
          </Content>
        </Box>
      </Box>
    </Layout>
  );
};

export default Layouts;
