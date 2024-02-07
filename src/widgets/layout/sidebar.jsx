import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";


// const renderSubMenu = (subMenu, sidenavType) => {
//   return (
//     <ul className="flex flex-col gap-1">
//       {subMenu.map(({ icon, name, path, subMenu }) => (
//         <li key={name}>
//           <NavLink to={path}>
//             {({ isActive }) => (
//               <Button
//                 variant={isActive ? "gradient" : "text"}
//                 color={
//                   isActive
//                     ? sidenavColor
//                     : sidenavType === "dark"
//                     ? "white"
//                     : "blue-gray"
//                 }
//                 className="flex items-center gap-4 px-8 capitalize"
//                 fullWidth
//               >
//                 {icon}
//                 <Typography
//                   color="inherit"
//                   className="font-medium capitalize"
//                 >
//                   {name}
//                 </Typography>
//               </Button>
//             )}
//           </NavLink>
//           {subMenu && renderSubMenu(subMenu, sidenavType)}
//         </li>
//       ))}
//     </ul>
//   );
// };

export function Sidebar({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderSubMenu = (subMenu, sidenavType) => {
    return (
      <ul className="flex flex-col gap-1">
        {subMenu.map(({ icon, name, path, subMenu }) => (
          <li key={name}>
            <div
              onMouseEnter={(e) => subMenu && handleMenuOpen(e)}
              onMouseLeave={handleMenuClose}
            >
              <NavLink to={path}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-8 capitalize"
                    fullWidth
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
              </NavLink>
              {subMenu && (
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {subMenu.map((subMenuItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      onClick={() => {
                        subMenuItem.onClick && subMenuItem.onClick();
                        handleMenuClose();
                      }}
                    >
                      {subMenuItem.name}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img src={brandImg} alt="Brand Logo"  width={70} height={70} style={{marginBottom:"20px"}}/>
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
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
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {renderSubMenu(pages, sidenavType)}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidebar.defaultProps = {
  brandImg: "/img/favicon.png",
  brandName: "Admas Univerity",
};

Sidebar.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidebar.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidebar;