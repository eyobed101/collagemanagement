import React, { useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import {api  } from '../constants'
import { tailspin } from "ldrs";

import {
  MdWork,
  MdHowToReg,
  MdLocationOn,

} from "react-icons/md";
import axiosInstance from '@/configs/axios';

function CampusForm({ onSubmit }) {
  const [centerId, setCenterId] = useState('');
  const [centerName, setCenterName] = useState('');
  const [regionalCenterName, setRegionalCenterName] = useState('');
  const [region, setRegion] = useState('');
  const [currentCenterThis, setcurrentCenterThis] = useState('');
  const [centerType, setcenterType] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);



  tailspin.register();



  const handleSubmit = async () => {

    setLoading(true);
    try {
      // Make a POST request to your server endpoint

      let postData = {
        "centerId": centerId,
        "centerName": centerName,
        "regionalCenterName":regionalCenterName,          
        "region": region,
        "currentCenterThis": currentCenterThis,
        "centerType": centerType 
       };
      console.log("Response iss" , postData)

      const response = await axiosInstance.post(`/api/StudyCenters/StudyCenter`, postData);

      // Handle the response as needed
      console.log('Data successfully posted:', response.data);
      setSuccess(true);
      setError(null);
      postData = {}
      // Optionally, invoke the onSubmit callback
      onSubmit(response.data);
    } catch (error) {
      console.error('Error posting data:', error);setSuccess(false);
      setError(error.response.data);
      console.error(error);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center bg-white p-5 rounded-md relative">
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
          <p className="text-center text-[#344054] text-[24px] font-bold align-middle mt-10 mb-8 border-b-[#EAECF0] border-b-[2px]">
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
        {loading ? (
              <l-tailspin
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                size="60"
                stroke="5"
                speed="0.9"
                color="#4279A6"
              ></l-tailspin>
            ) : (
              ""
            )}
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-[#4279A6] px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={handleSubmit}
          >
            Save Center
          </button>
        </div>
        <div className='flex w-full items-center'>
        {success && (
              <div
                id="alert-border-3"
                class="flex items-center mt-5 p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div class="ms-3 text-sm font-medium">
                  Submission successful!
                </div>
                <button
                  type="button"
                  class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                  data-dismiss-target="#alert-border-3"
                  aria-label="Close"
                >
                  <span class="sr-only">Dismiss</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}

            {error && (
              <div
                id="alert-border-2"
                class="flex items-center mt-5 p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div class="ms-3 text-sm font-medium">Error: {error}</div>
                <button
                  type="button"
                  class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                  data-dismiss-target="#alert-border-2"
                  aria-label="Close"
                >
                  <span class="sr-only">Dismiss</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}
            </div>
      </div>
    </div>

  );
}

export default CampusForm;
