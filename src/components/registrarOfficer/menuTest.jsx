import React, { useState } from 'react';

const MainMenu = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSubMenu(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <p>Main Menu</p>
      {showSubMenu && (
        <div className="submenu">
          <p>Submenu Item 1</p>
          <p>Submenu Item 2</p>
          <p>Submenu Item 3</p>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
