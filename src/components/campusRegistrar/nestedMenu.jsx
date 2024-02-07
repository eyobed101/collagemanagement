import React from 'react';
import MenuItem from '@mui/material/MenuItem';

const NestedMenuItem = ({ label, parentMenuOpen, onClick }) => {
  return (
    <MenuItem
      onClick={() => {
        onClick();
      }}
      disabled={!parentMenuOpen}
    >
      {label}
    </MenuItem>
  );
};

export default NestedMenuItem;