import React, { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

export function UserForm() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [coursePreferences, setCoursePreferences] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [passportPhoto, setPassportPhoto] = useState(null);
  const [identificationCopy, setIdentificationCopy] = useState(null);
  const [academicTranscripts, setAcademicTranscripts] = useState(null);
  // const [startDate, setStartDate] = useState(new Date());

  const [checkedItems, setCheckedItems] = useState({
    grade_8_ministry: false,
    grades_9_10_transcript: false,
    grade_10_national_exam: false,
    grades_11_12_transcript: false,
    grade_12_national_exam: false,
  });

  const [currentTab, setCurrentTab] = useState(0);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  const handlePassportPhotoChange = (event) => {
    setPassportPhoto(event.target.files[0]);
  };

  const handleIdentificationCopyChange = (event) => {
    setIdentificationCopy(event.target.files[0]);
  };

  const handleAcademicTranscriptsChange = (event) => {
    setAcademicTranscripts(event.target.files[0]);
  };

  const handleCourseSelection = (course) => {
    const updatedCourses = [...selectedCourses];

    if (updatedCourses.includes(course)) {
      updatedCourses.splice(updatedCourses.indexOf(course), 1);
    } else {
      updatedCourses.push(course);
    }

    setSelectedCourses(updatedCourses);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentTab((prevTab) => Math.min(prevTab + 1, 3));
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setCurrentTab((prevTab) => Math.max(prevTab - 1, 0));
  };

  // Sample array of courses
  const availableCourses = ["Course A", "Course B", "Course C", "Course D"];

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div class="mt-10 sm:mt-0">
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <Tabs
                    selectedIndex={currentTab}
                    onSelect={(index) => setCurrentTab(index)}
                  >
                    <TabList
                      style={{
                        width: "100%",
                        borderBottom: "2px solid #ccc",
                        
                      }}
                    >
                      {[
                        "Personal Information",
                        "Contact Address",
                        "Position Preference",
                      ].map((tabLabel, index) => (
                        <Tab
                          key={index}
                          style={{
                            color: index === currentTab ? "#FFF" : "#000",
                            fontSize: "15px",
                            padding: "15px",
                            margin:"4px",
                            flex: 1,
                            textAlign: "center",
                            borderRadius:"5px",
                            fontWeight: 500,
                            backgroundColor:
                              index === currentTab ? "#4279A6" : "transparent",
                          }}
                        >
                          {tabLabel}
                        </Tab>
                      ))}
                    </TabList>
                    {/* <div class="grid grid-cols-6 gap-6"> */}
                    <TabPanel>
                      <div class="grid grid-cols-6 mt-10">
                        <div class="col-span-6 sm:col-span-3">
                          <label
                            // for="full_name"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Full Name
                          </label>
                          <div className="flex flex-wrap">
                          <input
                              type="text"
                              name="title"
                              id="first_name"
                              placeholder="title"
                              autocomplete="given-name"
                              class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                            />
                            <input
                              type="text"
                              name="first_name"
                              id="first_name"
                              placeholder="First Name"
                              autocomplete="given-name"
                              class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                            />
                            <input
                              type="text"
                              name="middle_name"
                              id="middle_name"
                              placeholder="Middle Name"
                              autocomplete="given-name"
                              class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-400 rounded-md"
                            />
                            <input
                              type="text"
                              name="last_name"
                              id="last_name"
                              placeholder="Last Name"
                              autocomplete="family-name"
                              class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <div className="flex flex-wrap justify-between">
                            <div className="flex flex-col px-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Sex
                              </label>
                              <select
                                id="sex"
                                name="sex"
                                value={selectedGender}
                                onChange={(e) =>
                                  setSelectedGender(e.target.value)
                                }
                                class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                              >
                                <option class="rounded-sm" value="">
                                  Select Gender
                                </option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                              </select>
                            </div>
                            <div className="flex flex-col px-4">
                              <label
                                for="date_of_birth"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                name="date_of_birth"
                                id="date_of_birth"
                                class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                              />
                            </div>
                            <div className="flex flex-col px-4">
                              <label
                                for="place_of_birth"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Place of Birth
                              </label>
                              <input
                                type="text"
                                name="place_of_birth"
                                id="place_of_birth"
                                class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-span-6 md:col-span-3">
                          <div className="flex flex-wrap justify-between">
                            <div className="flex flex-col py-4 w-[50%]">
                              <label
                                for="country"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Nationality
                              </label>
                              <select
                                id="country"
                                name="country"
                                autocomplete="country"
                                class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                              >
                                <option>Ethiopian</option>
                                <option>American</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                              </select>
                            </div>
                            <div className="flex flex-col py-4 w-[50%]">
                              <label
                                for="marital_status"
                                class="block text-sm font-medium text-gray-700"
                              >
                                Marital Status
                              </label>
                              <select
                                id="marital_status"
                                name="marital_status"
                                autocomplete="marital_status"
                                class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                              >
                                <option>SINGLE</option>
                                <option>Married</option>
                                <option>Widowed</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div class="grid grid-cols-6 gap-6 mt-10">
                        <div class="col-span-6 md:col-span-3">
                          <label
                            for="zone"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Zone / Woreda
                          </label>
                          <input
                            type="text"
                            name="zone"
                            id="zone"
                            autocomplete="street-address"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>

                        <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            for="kebele"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Kebele
                          </label>
                          <input
                            type="text"
                            name="kebele"
                            id="kebele"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>

                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="town"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Town
                          </label>
                          <input
                            type="text"
                            name="town"
                            id="town"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>

                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="telephone"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Tel
                          </label>
                          <input
                            type="text"
                            name="telephone"
                            id="telephone"
                            autocomplete="postal-code"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="po-box"
                            class="block text-sm font-medium text-gray-700"
                          >
                            PO Box
                          </label>
                          <input
                            type="text"
                            name="po-box"
                            id="po-box"
                            autocomplete="Phone Number"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-4">
                          <label
                            for="email_address"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            name="email_address"
                            id="email_address"
                            autocomplete="email"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="emergency_contact_name"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Person to be Contacted
                          </label>
                          <input
                            type="text"
                            name="emergency_contact_name"
                            id="emergency_contact_name"
                            autocomplete="emergency_contact_name"
                            class="m-1 p-3 bg-blue-gray-50 w-full focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="emergency_contact_phone_number"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Hire Date
                          </label>
                          <input
                                type="date"
                                name="hireDate"
                                id="hireDate"
                                class="m-1 p-3 bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                              />
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div class="grid grid-cols-6 gap-6 mt-10">
                        {/* Previous Educational Institution */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="previous_education"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Administrative Position
                          </label>
                          <input
                            type="text"
                            id="previous_education"
                            name="adminstrativePosition"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="previous_educational_institution"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Education Level
                          </label>
                          <input
                            type="text"
                            id="previous_educational_institution"
                            name="educLevel"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="previous_major_department"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Qualification
                          </label>
                          <input
                            type="text"
                            id="previous_major_department"
                            name="qualification"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="previous_education_cgpa"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Employee Type
                          </label>
                          <input
                            type="text"
                            id="previous_education_cgpa"
                            name="empType"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="service_year"
                            className="block text-sm font-medium text-gray-700"
                          >
                           Employee Position
                          </label>
                          <input
                            type="text"
                            id="service_year"
                            name="empPosition"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="program_type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Center ID
                          </label>
                          <select
                            id="program_type"
                            name="programtype"
                            autocomplete="program_type"
                            class="m-1 p-3 w-full bg-blue-gray-50 focus:ring-indigo-300 focus:border-indigo-300 block shadow-sm sm:text-sm border-gray-600 rounded-md"
                          >
                            <option>Regular</option>
                            <option>Distance</option>
                            <option>Night</option>
                          </select>
                        </div>

                      
                      </div>
                    </TabPanel>
                   
                    {/* </div> */}
                  </Tabs>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "40px",
                    }}
                  >
                    <button
                      onClick={handlePrevious}
                      style={{
                        display: currentTab === 0 ? "none" : "inline-flex",
                      }}
                      disabled={currentTab === 0}
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Previous
                    </button>
                    {currentTab < 2 ? (
                      <button
                        onClick={handleNext}
                        style={{ marginLeft: "auto" }}
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserForm;
