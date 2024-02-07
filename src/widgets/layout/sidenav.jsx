import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ArrowForwardIos } from "@mui/icons-material";

const initialActiveIndex = 0;

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const handleItemClick = (index, onClick) => {
    setActiveIndex(index);
    onClick();
    setOpenSubMenuIndex(null); // Close the submenu when a menu item is clicked
    setAnchorEl(null);
  };

  const handleMenuOpen = (event, index) => {
    setOpenSubMenuIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenSubMenuIndex(null);
    setAnchorEl(null);
  };

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
      <div className={`relative`}>
        <Link
          to="/"
          className="py-2 px-8 text-center"
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
            style={{ marginBottom: "5px" }}
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
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-2 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, onClick, subMenu }, pageIndex) => (
              <li key={name}>
                {subMenu ? (
                  <>
                    <Button
                      variant="text"
                      color={
                        pageIndex === activeIndex
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className={`flex items-center gap-4 px-3 capitalize ${
                        pageIndex === activeIndex ? "active" : ""
                      }`}
                      fullWidth
                      onClick={(e) => handleMenuOpen(e, pageIndex)}
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{name}</span>
                        <ArrowForwardIos
                          style={{ fontSize: "1.2rem", marginLeft: "15px" }}
                        />
                      </Typography>
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={openSubMenuIndex === pageIndex}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {subMenu.map((item, subIndex) => (
                        <MenuItem
                          key={subIndex}
                          className={`flex items-center gap-4 px-3 capitalize ${
                            pageIndex === activeIndex ? "active" : ""
                          }`}
                          onClick={() =>
                            handleItemClick(pageIndex, item.onClick)
                          }
                        >
                          {item.icon}
                          {item.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    variant={pageIndex === activeIndex ? "gradient" : "text"}
                    color={
                      pageIndex === activeIndex
                        ? sidenavColor
                        : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                    }
                    className={`flex items-center gap-4 px-3 capitalize ${
                      pageIndex === activeIndex ? "active" : ""
                    }`}
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
