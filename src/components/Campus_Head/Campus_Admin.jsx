import React, { useState } from 'react';
import CreateUser from './CreateUser';
import CampusHome from './CampusHome';
import CampusDash from './Campus_Dashboard';
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
import { IconButton } from "@mui/material";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { setSidenavType } from "@/context";
import { LogoutOutlined } from "@mui/icons-material";

const icon = {
  className: "w-5 h-5 text-inherit",
};


function CampusAdmin() {
  
  const [campus, setCampus] = useState(null);
  const [user, setUser] = useState(null);
  const [isUser,setIsUser] = useState(false);
  const [isHome,setIsHome] = useState(true);
  const users = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const handleCampusSubmit = (newCampus) => {
    setCampus(newCampus);
  };
  const handleUserSubmit = (newUser) => {
    setUser(newUser);
  };


  const handleUser =() =>{
    setIsUser(true);
    setIsHome(false)
  }

  const handlehome =() =>{
    setIsUser(false);
    setIsHome(true)
  }

  const handlelogout =() =>{
    dispatch(userAction.logout());
  }

  const routes = [
    {
      title: "Campus Administrator",
      pages: [
        { icon: <HomeIcon {...icon} />, name: "Home", onClick: handlehome },
   
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
    
      <div style={{ padding: '20px' }}>
       {isUser?  <CreateUser  onSubmit={handleCampusSubmit} /> :<div> </div>}             
      <div>
        {isHome ?<CampusDash />  : null }
          {/* <h2>Current Campus:</h2>
          <pre>{JSON.stringify(campus, null, 2)}</pre>
          <h2>Current User:</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
      </div>
      <div className="text-blue-gray-600">
          <Footer />
        </div>
    </div>
    </div>
    </div>
  );
}

export default CampusAdmin;
