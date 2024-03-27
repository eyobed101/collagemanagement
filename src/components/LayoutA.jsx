import { useEffect } from "react";
import { Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../redux/user";
import PrivateRoute from "./PrivateRoute";
import RootAdmin from "./admin/Root_Admin";
import RegistrarOfficerSiderGenerator from "./registrarOfficer/Menu";
import SiderGenerator from "./centralRegistrar/Menu";
import StudentSiderGenerator from "./student/Menu";
import LucturerSiderGenerator from "./lecturer/Menu";
import CampusAdmin from "./Campus_Head/Campus_Admin";
import ViewCenterStudent from "./centralRegistrar/ViewStudent";
import GraduatesList from "./centralRegistrar/GraduateList";
import PaymentStatus from "./centralRegistrar/PaymentStatus";
import GradingSystem from "./centralRegistrar/GradeList";
import CampusSiderGenerator from "./campusRegistrar/Menu";
import DepartSiderGenerator from "./departmentHead/Menu";
import TuitionStatistics from "./campusRegistrar/Tutition";
import CourseOffering from "./campusRegistrar/CourseOffering";
import GradeApproval from "./campusRegistrar/GradeApproval";
import GraduatesApproval from "./campusRegistrar/GraduateApproval";
import Curriculum from "./campusRegistrar/Curriculum";

const Layouts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  localStorage.setItem('tokenNew', user);
    useEffect(() => {
    console.log("asasasa")
    if (!user || !user.role) {
      dispatch(userLogoutAction());

    }
  }, [user, dispatch]);

  return (
    <Routes>
      <PrivateRoute
        path="/root_admin"
        element={<RootAdmin />}
        roles={["RootAdmin"]}
      />
      <PrivateRoute
        path="/register_office"
        element={<RegistrarOfficerSiderGenerator />}
        roles={["RegistrarOfficer"]}
      />
      <PrivateRoute
        path="/center_register"
        element={<SiderGenerator />}
        roles={["CentralRegistrar"]}
      />
      <PrivateRoute
        path="/student_home"
        element={<StudentSiderGenerator />}
        roles={["Student"]}
      />
      <PrivateRoute
        path="/campus_admin"
        element={<CampusAdmin />}
        roles={["CampusAdmin"]}
      />
      <PrivateRoute
        path="/graduate_list"
        element={<GraduatesList />}
        roles={["CentralRegistrar"]}
      />
      <PrivateRoute
        path="/Payment_status"
        element={<PaymentStatus />}
        roles={["CentralRegistrar"]}
      />
      <PrivateRoute
        path="/lecture"
        element={<LucturerSiderGenerator />}
        roles={["Lecturer"]}
      />
      <PrivateRoute
        path="/department_admin"
        element={<DepartSiderGenerator />}
        roles={["Department"]}
      />
      <PrivateRoute
        path="/grading_system"
        element={<GradingSystem />}
        roles={["CentralRegistrar"]}
      />
      <PrivateRoute
        path="/campus_registrar"
        element={<CampusSiderGenerator />}
        roles={["CampusRegistrar"]}
      />
      <PrivateRoute
        path="/grade_approval"
        element={<GradeApproval />}
        roles={["CampusRegistrar"]}
      />
      <PrivateRoute
        path="/graduate_approval"
        element={<GraduatesApproval />}
        roles={["CampusRegistrar"]}
      />
      <PrivateRoute
        path="/curriculum"
        element={<Curriculum />}
        roles={["CampusRegistrar"]}
      />
      <PrivateRoute
        path="/tuition"
        element={<TuitionStatistics />}
        roles={["CampusRegistrar"]}
      />
      <PrivateRoute
        path="/course_offering"
        element={<CourseOffering />}
        roles={["CampusRegistrar"]}
      />
      <PrivateRoute
        path="/view-student"
        element={<ViewCenterStudent />}
        roles={["CentralRegistrar"]}
      />
    </Routes>
  );
};

export default Layouts;
