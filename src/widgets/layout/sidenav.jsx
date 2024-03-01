import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useState , useEffect } from "react";
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
    event.stopPropagation();
    setOpenSubMenuIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    console.log("closed");
    setOpenSubMenuIndex(null);
    setAnchorEl(null);
  };

  // const handleMouseLeave = () => {
  //    setOpenSubMenuIndex(null);
  //    setHoveredItemIndex(null);
  //   // /  setAnchorEl(null)
  // };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        anchorEl &&
        !anchorEl.contains(event.target) &&
        !event.target.classList.contains("MuiButtonBase-root")
      ) {
        setOpenSubMenuIndex(null);
      }
    };
  
    document.body.addEventListener("click", handleDocumentClick);
  
    return () => {
      document.body.removeEventListener("click", handleDocumentClick);
    };
  }, [anchorEl]);
  
  

  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredItemIndex(index);
  };

  const handleMouseLeave = () => {
        setHoveredItemIndex(null);
    // setAnchorEl(null);
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
                        onClick={(e) => handleMenuOpen(e, pageIndex)}
                      >
                        {icon}
                        <Typography
                          color="#4279A6"
                          className="font-medium capitalize flex items-center justify-between w-full "
                        >
                          <span>{name}</span>
                          <ArrowForwardIos className="text-sm" />
                        </Typography>
                        {openSubMenuIndex === pageIndex && (
                          <div
                            className="absolute top-0 right-0 w-full h-full bg-[#4279A6] opacity-25 rounded-lg z-10"
                            onClick={handleMenuClose}
                          ></div>
                        )}
                      </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={openSubMenuIndex === pageIndex}
                      onClose={handleMenuClose}
                      // onMouseEnter={handleMenuClose}

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
                          selected={true}
                          divider={true}
                          dense={true}
                          //  disableGutters={true}
                          key={subIndex}
                          className={`flex items-center gap-4 px-1 capitalize w-[280px] h-[50px]  !hover:bg-[#4279A6]  ${
                            pageIndex === activeIndex ? "active" : ""
                          } !hover:bg-[#4279A6] `}
                          onClick={() =>
                            handleItemClick(pageIndex, item.onClick)
                          }
                          // onMouseEnter={() => handleMouseEnter(subIndex)}
                          //  onMouseLeave={handleMouseLeave}
                          style={{
                            borderRadius: 30,
                            backgroundColor:
                              hoveredItemIndex === subIndex ? "#4279A6" : null,
                            color:
                              hoveredItemIndex === subIndex
                                ? "#FFF"
                                : "#4279A6",
                          }}
                        >
                          {item.icon}
                          {item.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    // variant={pageIndex === activeIndex ? "gradient" : "text"}
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
                    // git clean --force && git reset --hard
                    className={`flex items-center gap-4 px-3  capitalize ${
                      pageIndex === activeIndex ? "active" : ""
                    } border rounded-xl`}
                    fullWidth
                    onClick={() => handleItemClick(pageIndex, onClick)}
                    onMouseEnter={handleMouseLeave}

                    // onMouseEnter={(e) => handleMenuClose()}
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
