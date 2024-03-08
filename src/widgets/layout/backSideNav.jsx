import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { ArrowForwardIos } from "@mui/icons-material";
import { MenuItem } from "@mui/material";

const initialActiveIndex = 0;

const SubMenuItem = ({ item, onClick, subIndex, hoveredItemIndex, handleItemClick }) => (
  <MenuItem
    selected={true}
    divider={true}
    dense={true}
    onClick={() => handleItemClick(subIndex, onClick)}
    className={`flex items-center gap-4 px-1 capitalize w-[280px] h-[50px]  !hover:bg-[#4279A6]  ${
      hoveredItemIndex === subIndex ? 'active' : ''
    } !hover:bg-[#4279A6] `}
    style={{
      borderRadius: 30,
      backgroundColor: hoveredItemIndex === subIndex ? '#4279A6' : null,
      color: hoveredItemIndex === subIndex ? '#FFF' : '#4279A6',
    }}
  >
    {item.icon}
    {item.name}
  </MenuItem>
);
export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const handleItemClick = (index, onClick) => {
    setActiveIndex(index);
    onClick();
    setShowSubMenu(false);
  };

  const handleMouseEnter = (index) => {
    setShowSubMenu(true);
    setOpenSubMenuIndex(index);
  };

  const handleMouseLeave = () => {
    setShowSubMenu(false);
    setHoveredItemIndex(null);
    setOpenSubMenuIndex(null);
  };

  const handleSubMenuMouseEnter = (index) => {
    setHoveredItemIndex(index);
  };

  const handleSubMenuMouseLeave = () => {
    setHoveredItemIndex(null);
  };

  const SubMenu = ({ subMenu, isOpen, onMouseLeave, activeIndex, handleItemClick, hoveredItemIndex }) => (
    <div
      className={`absolute top-0 left-full bg-[#4279A6] opacity-25 rounded-lg z-10`}
      onMouseLeave={onMouseLeave}
      style={{
        transformOrigin: 'top left',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      {subMenu.map((item, subIndex) => (
        <SubMenuItem
          key={subIndex}
          item={item}
          subIndex={subIndex}
          pageIndex={activeIndex}
          handleItemClick={handleItemClick}
          hoveredItemIndex={hoveredItemIndex}
        />
      ))}
    </div>
  );
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-24px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative">
        <Link
          to="/"
          className="py-2 px-8 text-center border-b-2 shadow-md bg-blue-gray-50"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={brandImg}
            alt="Brand Logo"
            width={70}
            height={70}
            style={{ marginBottom: "5px", marginTop: "10px" }}
          />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "#4279A6"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid bg-[#4279A6] rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1 ">
            {title && (
              <li className="mx-3.5 mt-2 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75 "
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, onClick, subMenu }, pageIndex) => (
              <li key={name}>
                {subMenu ? (
                  <>
                    <div
                      onMouseEnter={() => handleMouseEnter(pageIndex)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Button
                        variant="text"
                        style={{
                          backgroundColor:
                            pageIndex === activeIndex ? "#4279A6" : null,
                          color: pageIndex === activeIndex ? "#FFF" : "#4279A6",
                        }}
                        color={
                          pageIndex === activeIndex
                            ? "#4279A6"
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className={`flex items-center gap-4 px-3 capitalize relative ${
                          pageIndex === activeIndex ? "active" : ""
                        } border rounded-xl  `}
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="#4279A6"
                          className="font-medium capitalize flex items-center justify-between w-full "
                        >
                          <span>{name}</span>
                          <ArrowForwardIos className="text-sm" />
                        </Typography>
                      </Button>
                      {showSubMenu && openSubMenuIndex === pageIndex && (
                        <SubMenu
                          subMenu={subMenu}
                          isOpen={openSubMenuIndex === pageIndex}
                          onMouseLeave={() => handleMouseLeave()}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <Button
                    variant="text"
                    style={{
                      backgroundColor:
                        pageIndex === activeIndex ? "#4279A6" : null,
                      color: pageIndex === activeIndex ? "#FFF" : "#4279A6",
                    }}
                    color={
                      pageIndex === activeIndex
                        ? "#4279A6"
                        : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                    }
                    className={`flex items-center gap-4 px-3  capitalize ${
                      pageIndex === activeIndex ? "active" : ""
                    } border rounded-xl`}
                    fullWidth
                    onClick={() => handleItemClick(pageIndex, onClick)}
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/favicon.png",
  brandName: "Admas University",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
