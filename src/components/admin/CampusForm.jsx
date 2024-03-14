import React, { useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';


import {
  MdWork,
  MdAddLocation,
  MdHowToReg,
  MdLocationOn,

} from "react-icons/md";

function CampusForm({ onSubmit }) {
  const [centerId, setCenterId] = useState('');
  const [centerName, setCenterName] = useState('');
  const [regionalCenterName, setRegionalCenterName] = useState('');
  const [region, setRegion] = useState('');
  const [currentCenterThis, setcurrentCenterThis] = useState('');
  const [centerType, setcenterType] = useState('');



  const handleSubmit = async () => {


    try {
      // Make a POST request to your server endpoint

      const postData = {
        "centerId": centerId,
        "centerName": centerName,
        "regionalCenterName":regionalCenterName,          
        "region": region,
        "currentCenterThis": currentCenterThis,
        "centerType": centerType 
       };
      console.log("Response iss" , postData)

      const response = await axios.post('https://localhost:7032/api/StudyCenters/StudyCenter', postData);

      // Handle the response as needed
      console.log('Data successfully posted:', response.data);

      // Optionally, invoke the onSubmit callback
      onSubmit(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
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
          <MdHowToReg className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={centerId}
            onChange={(e) => setCenterId(e.target.value)}
            placeholder="Center ID to add for the university"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdWork className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={centerName}
            onChange={(e) => setCenterName(e.target.value)}
            placeholder="Center name to add for the university"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
         <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdWork className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={regionalCenterName}
              onChange={(e) => setRegionalCenterName(e.target.value)}
              placeholder="Regional Center Name"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdLocationOn className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Region Location "
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdWork className="text-gray-700 text-2xl" />
            <select
              type="text"
              required
              value={currentCenterThis}
              onChange={(e) => {
                setcurrentCenterThis(e.target.value);
                console.log(e.target.value); // Log the selected value
              }}
              placeholder="Current Center is this "
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
         </select>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdWork className="text-gray-700 text-2xl" />
            <select
              type="text"
              required
              value={centerType}
              onChange={(e) => setcenterType(e.target.value)}
              placeholder="Center Type "
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            >
               <option value="Regular">Regular</option>
               <option value="Extension">Extension</option>
              <option value="Distance">Distance</option>
              <option value="TVET">TVET</option>

         </select>
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-[#4279A6] px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={handleSubmit}
          >
            Save Center
          </button>
        </div>
      </div>
    </div>

  );
}

export default CampusForm;
