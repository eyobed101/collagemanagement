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
import RegistrarOfficerSiderGenerator from "./registrarOfficer/Menu";
import axiosInstance from "@/configs/axios";
const { Header, Content, Sider } = Layout;
const drawerWidth = 240;

const ProtectedRouteWithAxios = ({ element: Component, ...rest }) => {
  // Wrap the provided component with axiosInstance
  const WrappedComponent = () => <Component axiosInstance={axiosInstance} />;
  return <Route {...rest} element={<WrappedComponent />} />;
};


const Layouts = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  

  useEffect(() => {
     if(user == "RootAdmin"){
      navigate("/root_admin")
     }
     else if(user == "CampusAdmin"){
      navigate("/campus_admin")
     }
     else if(user == "RegistrarOfficer"){
      navigate("/register_office")
     }
     else if(user == "Department"){
      navigate("/department_admin")
     }
     else if(user == "Student"){
      navigate("/student_home")
     }
     else if(user == "CentralRegistrar"){
      navigate("/center_register")
     }
     else if(user == "CampusRegistrar"){
      navigate("/campus_registrar")
     }
     else if(user == "Lecturer"){
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
              
              <Route path="/root_admin" element={<RootAdmin />} />
              <Route path="/register_office" element={<RegistrarOfficerSiderGenerator />} />
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
