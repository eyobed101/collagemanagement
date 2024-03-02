import React, { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

export function AddStudent() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [coursePreferences, setCoursePreferences] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [academicTranscripts, setAcademicTranscripts] = useState(null);

  const [passportPhoto, setPassportPhoto] = useState(null);
  const [identificationCopy, setIdentificationCopy] = useState(null);
  const initialFormData = {
    studId: '',
    fname: '',
    mname: '',
    lname: '',
    dname: 0,
    sex: '',
    doB: '2024-02-28',
    placeOfBirth: '',
    nationality: '',
    maritalStatus: '',
    prevEducation: '',
    prevInstitution: '',
    prevMajorDepartment: '',
    prevEducCgpa: 0,
    serviceyear: 0,
    program: '',
    programType: '',
    centerId: '',
    zone: '',
    woreda: '',
    kebele: '',
    town: '',
    tel: '',
    pobox: '',
    email: '',
    persontoBeContacted: '',
    appDate: '2024-02-28',
    approved: '',
    approvedDate: '2024-02-28',
    age: 0,
    ageInyear: 0,
    batch: '',
  };

  const [formData, setFormData] = useState(initialFormData);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the backend API
      const response = await axios.post('http://your-backend-url/submit-form', formData);

      // Handle response (e.g., show success message)
      console.log(response.data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error(error);
    }
  };


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
            <form onSubmit={handleSubmit}>
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
                        "Education Background",
                        "Department Preferences",
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
                      <div class="grid grid-cols-6 mt-10 border-2 shadow-lg p-5">
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
                              name="fname"
                              value={formData.fname}
                              id="first_name"
                              placeholder="First Name"
                              autocomplete="given-name"
                              onChange={handleInputChange}

                              class="m-1 p-3 bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                            />
                            <input
                              type="text"
                              name="mname"
                              value={formData.mname}
                              id="middle_name"
                              placeholder="Middle Name"
                              autocomplete="given-name"
                              onChange={handleInputChange}
                              class="m-1 p-3 bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                            />
                            <input
                              type="text"
                              name="lname"
                              value={formData.lname}
                              id="last_name"
                              placeholder="Last Name"
                              autocomplete="family-name"
                              onChange={handleInputChange}
                              class="m-1 p-3 bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
          value={formData.sex}
          onChange={handleInputChange}
                                class="m-1 p-3 bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                                name="doB"
                                value={formData.doB}
                                id="date_of_birth"
                                onChange={handleInputChange}
                                class="m-1 p-3 bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                                name="placeOfBirth"
                                value={formData.placeOfBirth}
                                onChange={handleInputChange}
                                id="place_of_birth"
                                class="m-1 p-3 bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                                id="nationality"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                autocomplete="country"
                                class="m-1 p-3 bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                                id="maritalStatus"
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleInputChange}
                                autocomplete="marital_status"
                                class="m-1 p-3 bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                      <div class="grid grid-cols-6 gap-6 mt-10 border-2 shadow-lg p-5">
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
                            value={formData.zone}
                            onChange={handleInputChange}
                            id="zone"
                            autocomplete="street-address"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                            value={formData.kebele}
                            onChange={handleInputChange}
                            id="kebele"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                            value={formData.town}
                            onChange={handleInputChange}
                            id="town"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                            name="tel"
                            value={formData.tel}
                            onChange={handleInputChange}                            id="telephone"
                            autocomplete="Tel"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                            name="pobox"
                            value={formData.pobox}
                            onChange={handleInputChange}                            
                            id="po-box"
                            autocomplete="Po-box"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
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
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}                            
                            id="email"
                            autocomplete="email"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="emergency_contact_name"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Emergency Contact Name
                          </label>
                          <input
                            type="text"
                            name="persontoBeContacted"
                            value={formData.persontoBeContacted}
                            onChange={handleInputChange}                            
                            id="emergency_contact_name"
                            autocomplete="emergency_contact_name"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="emergency_contact_phone_number"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Emergency Contact Phone Number
                          </label>
                          <input
                            type="phone"
                            name="emergency_contact_phone_number"
                            id="emergency_contact_phone_number"
                            autocomplete="emergency_contact_phone_number"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div class="grid grid-cols-6 gap-6 mt-10 border-2 shadow-lg p-5">
                        {/* Previous Educational Institution */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="previous_education"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Previous Education
                          </label>
                          <input
                            type="text"
                            id="previous_education"
                            name="prevEducation"
                            value={formData.prevEducation}
                            onChange={handleInputChange}
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="previous_educational_institution"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Previous Institution
                          </label>
                          <input
                            type="text"
                            id="previous_educational_institution"
                            name="prevInstitution"
                            value={formData.prevInstitution}
                            onChange={handleInputChange}
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="previous_major_department"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Previous Major Department
                          </label>
                          <input
                            type="text"
                            id="previous_major_department"
                            name="prevMajorDepartment"
                            value={formData.prevMajorDepartment}
                            onChange={handleInputChange}
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="previous_education_cgpa"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Previous Education CGPA
                          </label>
                          <input
                            type="number"
                            id="previous_education_cgpa"
                            name="prevEducCgpa"
                            value={formData.prevEducCgpa}
                            onChange={handleInputChange}                            
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="service_year"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Service Year
                          </label>
                          <input
                            type="year"
                            id="service_year"
                            name="serviceyear"
                            value={formData.serviceyear}
                            onChange={handleInputChange}                             
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>

                        <div className="col-span-6 p-4  shadow-md rounded-md">
                          <label className="block text-lg font-medium text-gray-700 mb-5">
                            Submitted Documents
                          </label>
                          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <div className="flex items-start border-2 border-[#676767] px-5 py-4 rounded-md shadow-sm">
                              <input
                                type="checkbox"
                                id="grade_8_ministry"
                                name="grade_8_ministry"
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="grade_8_ministry"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                8th Grade Ministry
                              </label>
                            </div>

                            <div className="flex items-start border-2 border-[#676767] px-5 py-4 rounded-md shadow-sm">
                              <input
                                type="checkbox"
                                id="grades_9_10_transcript"
                                name="grades_9_10_transcript"
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="grades_9_10_transcript"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                9th and 10th Grade Transcript
                              </label>
                            </div>

                            <div className="flex items-start border-2 border-[#676767] px-5 py-4 rounded-md shadow-sm">
                              <input
                                type="checkbox"
                                id="grade_10_national_exam"
                                name="grade_10_national_exam"
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="grade_10_national_exam"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                10th EGSECE
                              </label>
                            </div>

                            <div className="flex items-start border-2 border-[#676767] px-5 py-4 rounded-md shadow-sm">
                              <input
                                type="checkbox"
                                id="grades_11_12_transcript"
                                name="grades_11_12_transcript"
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="grades_11_12_transcript"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                11th and 12th Grade Transcript
                              </label>
                            </div>

                            <div className="flex items-start border-2 border-[#676767] px-5 py-4 rounded-md shadow-sm">
                              <input
                                type="checkbox"
                                id="grade_12_national_exam"
                                name="grade_12_national_exam"
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="grade_12_national_exam"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                12th NEAEA
                              </label>
                            </div>
                          </div>
                        </div>

                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div class="grid grid-cols-6 gap-6 border-2 shadow-lg p-5">
                        {/* Program/Department */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="program_department"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Program
                          </label>
                          <select
                            id="program_department"
                            name="program"
                            value={formData.program}
                            onChange={handleInputChange}                             
                            autocomplete="program_department"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option>Computer Science</option>
                            <option>Accounting</option>
                            <option>Marketing</option>
                            <option>Business Management</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="program_type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Program/Department
                          </label>
                          <select
                            id="program_type"
                            name="programType"
                            value={formData.programType}
                            onChange={handleInputChange}                             
                            autocomplete="program_type"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option>Regular</option>
                            <option>Distance</option>
                            <option>Night</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="department"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Department
                          </label>
                          <select
                            id="department"
                            name="department"
                            autocomplete="department"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option>CS</option>
                            <option>CS</option>
                            <option>CS</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="study_center"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Study Center
                          </label>
                          <select
                            id="study_center"
                            name="study_center"
                            autocomplete="study_center"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option>CS</option>
                            <option>CS</option>
                            <option>CS</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="application_date"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Application Date
                          </label>
                          <input
                            type="date"
                            name="application_date"
                            id="application_date"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="approved"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Approved ?
                          </label>
                          <select
                            id="approved"
                            name="approved"
                            autocomplete="approved"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="approved_date"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Approved Date
                          </label>
                          <input
                            type="date"
                            name="approved_date"
                            id="approved_date"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="passport_photo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Passport-sized Photo
                          </label>
                          <input
                            type="file"
                            id="passport_photo"
                            name="passport_photo"
                            accept="image/*"
                            onChange={handlePassportPhotoChange}
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>

                        {/* <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="identification_copy"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Scanned Copy of Identification (e.g., Passport, Driver's
                        License)
                      </label>
                      <input
                        type="file"
                        id="identification_copy"
                        name="identification_copy"
                        accept="image/*,application/pdf"
                        onChange={handleIdentificationCopyChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div> */}
                      </div>
                    </TabPanel>
                    {/* </div> */}
                  </Tabs>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "40px",
                      padding:"10px"
                    }}
                  >
                    <button
                      onClick={handlePrevious}
                      style={{
                        display: currentTab === 0 ? "none" : "inline-flex",
                      }}
                      disabled={currentTab === 0}
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#4279A6] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Previous
                    </button>
                    {currentTab < 3 ? (
                      <button
                        onClick={handleNext}
                        style={{ marginLeft: "auto" }}
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#4279A6] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default AddStudent;
