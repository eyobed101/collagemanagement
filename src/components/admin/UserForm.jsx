import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Transition } from "@headlessui/react";

import { api } from "../constants";
import "react-tabs/style/react-tabs.css";
import axiosInstance from "@/configs/axios";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

export function UserForm() {
  const initialFormData = {
    username: "",
    password: "",
    centerId: "",
    email: "",
    roles: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  // let [data, setData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [dep, setDep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [studyCenters, setStudyCenters] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudyCenters = async () => {
      try {
        const response = await axiosInstance.get(`/api/StudyCenters`);
        setStudyCenters(response.data);
        setLoadingCenters(false);
      } catch (error) {
        console.error("Error fetching study centers:", error);
      }
    };
    fetchStudyCenters();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "centerId") {
      const selectedCenter = studyCenters.find(
        (center) => center.CenterId === value
      );
      console.log(selectedCenter.CenterId);

      if (selectedCenter) {
        setFormData((prevData) => ({
          ...prevData,
          centerId: selectedCenter.CenterId,
        }));
      }
    } else {
      console.log(value);
      setFormData((prevData) => ({
        ...prevData,

        [name]: value,
      }));
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    // Set the Authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      username: formData.username,
      Email: formData.email,
      Password: formData.password,
      CenterId: formData.centerId,
      roles:formData.roles
    };

    const { ...restFormData } = data;

    console.log("data", data);

    const apiUrl = `/api/Authenticate/AdminRegister`;

    try {
      const response = await axiosInstance.post(apiUrl, restFormData, { params: {
        roles: formData.roles
      }});

      setSuccess(true);
      setError(null);
      setFormData(initialFormData);
      // setData({});
      console.log(response.data);
    } catch (error) {
      setSuccess(false);
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div class="mt-10 sm:mt-0">
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit} className="relative">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  {/* <div class="grid grid-cols-6 gap-6"> */}
                  <div class="grid grid-cols-6 mt-10 border-2 shadow-lg p-5">
                    <div className="col-span-6 md:col-span-3 mx-2 my-2">
                      <label
                        // for="full_name"
                        class="block text-sm font-medium text-gray-700"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        id="first_name"
                        placeholder="User Name"
                        autocomplete="given-name"
                        onChange={handleInputChange}
                        class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                      />
                    </div>

                    <div class="col-span-6 md:col-span-3 m-2">
                      <label
                        for="email_address"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email address"
                        onChange={handleInputChange}
                        id="email"
                        autocomplete="email"
                        class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                      />
                    </div>
                    <div class="col-span-6 md:col-span-3 m-2">
                      <label
                        for="email_address"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        id="password"
                        class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 m-2">
                      <label
                        htmlFor="study_center"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Study Center
                      </label>
                      <select
                        id="study_center"
                        name="centerId"
                        value={formData.centerId}
                        onChange={handleInputChange}
                        autoComplete="study_center"
                        className="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                      >
                        <option value="">All Study Centers</option>

                        {loadingCenters ? (
                          <option>Loading study centers...</option>
                        ) : (
                          studyCenters.map((center) => (
                            <option
                              key={center.CenterId}
                              value={center.CenterId}
                            >
                              {center.CenterId}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3 m-2">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <select
                        id="roles"
                        name="roles"
                        value={formData.roles}
                        onChange={handleInputChange}
                        autoComplete=" "
                        className="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                      >
                        <option value="">Roles</option>

                            <option
                              value={"CampusAdmin"}
                            >
                              Campus Admin
                            </option>
                            <option
                              value={"CentralRegistrar"}
                            >
                              Central Registrar
                            </option>

                      </select>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "40px",
                      padding: "10px",
                      alignSelf: "end",
                    }}
                  >
                    <button
                      type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
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
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/* {spining && <div className="loading-spinner">Loading...</div>} */}
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
    </>
  );
}

export default UserForm;
