import React, { useState } from "react";
import CampusForm from "./CampusForm";
import UserForm from "./UserForm";
import RootHome from "./RootHome";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
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
import { setSidenavType } from "@/context";
import { LogoutOutlined } from "@mui/icons-material";

const icon = {
  className: "w-5 h-5 text-inherit",
};

function RootAdmin() {
  const [campus, setCampus] = useState(null);
  const [user, setUser] = useState(null);
  const [isCampus, setIsCampuses] = useState(false);
  const [isCenterRegister, setIsCenterRegister] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const users = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleCampusSubmit = (newCampus) => {
    setCampus(newCampus);
  };
  const handleUserSubmit = (newUser) => {
    setUser(newUser);
  };

  const handlecampus = () => {
    setIsCampuses(true);
    setIsCenterRegister(false);
    setIsHome(false);
  };
  const handleUser = () => {
    setIsCampuses(false);
    setIsCenterRegister(true);
    setIsHome(false);
  };

  const handlehome = () => {
    setIsCampuses(false);
    setIsCenterRegister(false);
    setIsHome(true);
  };

  const handlelogout = () => {
    dispatch(userAction.logout());
  };

  const routes = [
    {
      title: "Root Administrator",
      pages: [
        { icon: <HomeIcon {...icon} />, name: "Home", onClick: handlehome },
        {
          icon: <BuildingLibraryIcon {...icon} />,
          name: "Create Campus",
          onClick: handlecampus,
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "Create User",
          onClick: handleUser,
        },
        {
          icon: <LogoutOutlined {...icon} />,
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
          <div style={{ padding: "20px" }}>
            {isCampus ? (
              <CampusForm onSubmit={handleCampusSubmit} />
            ) : (
              <div> </div>
            )}
            {isCenterRegister ? <UserForm onSubmit={handleUserSubmit} /> : null}
            {isHome ? <RootHome /> : null}
          </div>
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default RootAdmin;
