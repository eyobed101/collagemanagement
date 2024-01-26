import React, { useState } from 'react';
import { motion } from "framer-motion";

import {
  MdWork,
  MdAddLocation,
} from "react-icons/md";

function CampusForm({ onSubmit }) {
  const [campusName, setCampusName] = useState('');
  const [campusLocation, setCampusLocation] = useState('');

  const handleSubmit = () => {
    const newCampus = {
      name: campusName,
      location: campusLocation,
    };
    onSubmit(newCampus);
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center">
      <div className="w-[90%] md:w-[50%]  rounded-lg p-4 flex flex-col items-center justify-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold `}
          >
            {/* {msg} */}
          </motion.p>      
          <div>
          <p className="text-center text-[#344054] text-[24px] font-bold align-middle -mt-16 mb-8 border-b-[#EAECF0] border-b-[2px]">
         Root Adminstrator
          </p> 
            </div> 
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdWork className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={campusName}
            onChange={(e) => setCampusName(e.target.value)}
            placeholder="Campus name to add for the university"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
         <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAddLocation className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={campusLocation}
              onChange={(e) => setCampusLocation(e.target.value)}
              placeholder="Campus Location "
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={handleSubmit}
          >
            Save Campus
          </button>
        </div>
      </div>
    </div>

  );
}

export default CampusForm;
