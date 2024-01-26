import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Icon from "react-eva-icons";
import { Layout, Menu } from "antd";

const SiderGenerator = () => {
    const [openKeys, setOpenKeys] = useState([]);
    
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
    
    
    const handlelogout =() =>{
        dispatch(userAction.logout());
      }
    
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
      function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
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

    const items = [
            getItem(
              <a
                onClick={() => navigate("/course_offering")}
                className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
              >
               Course Offering
              </a>,
            ),
            getItem(
              <a
                onClick={() => navigate("/curriculum")}
                className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
              >
               Currculum
              </a>,
            ),
            getItem(
                <a
                 onClick={() => navigate("/tuition")}
                //   onClick={() => handlelogout()}
                  className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
                >
                 Tuition
                </a>,    
              ),
              getItem(
                <a
                 onClick={() => navigate("/student_copy")}
                //   onClick={() => handlelogout()}
                  className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
                >
                  StudentCopy
                </a>,    
              ),
              getItem(
                <a
                 onClick={() => navigate("/grade_approval")}
                //   onClick={() => handlelogout()}
                  className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
                >
                  GradeApproval
                </a>,    
              ),
              getItem(
                <a
                 onClick={() => navigate("/graduate_approval")}
                //   onClick={() => handlelogout()}
                  className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
                >
                  Graduate Approval
                </a>,    
              ),
              getItem(
                <a
                   onClick={() => handlelogout()}
                  className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
                >
                  Logout
                </a>,
             
              ),
      ];
    const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      
    };
      const currentURL = window.location.pathname;
      return (
        <Drawer variant="permanent" open={open}>
          {/* <DrawerHeader /> */}
          <div className="mt-6 ml-6 mb-2">
            {open ? (
              <div className="flex flex-row justify-start ml-1">
                <IconButton
                  onClick={handleDrawerClose}
                  sx={{
                    marginRight: 0,
                    marginLeft: 0,
                  }}
                >
                  <Icon
                    name="menu-arrow-outline"
                    fill="#667085"
                    size="large" // small, medium, large, xlarge
                    animation={{
                      type: "pulse", // zoom, pulse, shake, flip
                      hover: true,
                      infinite: false,
                    }}
                  />
                </IconButton>
                <img
                style={{marginLeft:10}}
                  src={require("../../../assets/logo1.png")}
                  className="w-[58px] h-[37px] z-1"
                />
              </div>
            ) : (
              <div className="flex flex-row justify-start -ml-2">
                <IconButton
                  color="default"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 0,
                    marginLeft: 0,
                    ...(open && { display: "none" }),
                  }}
                >
                  <Icon
                    name="menu-outline"
                    fill="#667085"
                    size="large" // small, medium, large, xlarge
                    animation={{
                      type: "pulse", // zoom, pulse, shake, flip
                      hover: true,
                      infinite: false,
                    }}
                  />
                </IconButton>
              </div>
            )}
          </div>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
              width: 240,
              marginLeft: 10,
            }}
            items={items}
          />
        </Drawer>
      );
    
  };

  export default SiderGenerator;