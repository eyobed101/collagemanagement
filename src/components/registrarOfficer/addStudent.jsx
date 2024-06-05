import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Transition } from "@headlessui/react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { apiurl } from "../constants";
import { tailspin } from "ldrs";
import axiosInstance from "@/configs/axios";
import {notification} from "antd";

// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

const generateStudentId = () => {
  const prefix = "STUD";
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const randomNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  const studentId = `${prefix}${currentYear}${randomNumber}`;
  return studentId;
};

export function AddStudent() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [coursePreferences, setCoursePreferences] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [academicTranscripts, setAcademicTranscripts] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState([]);

  const [passportPhoto, setPassportPhoto] = useState(null);
  const [identificationCopy, setIdentificationCopy] = useState(null);
  const initialFormData = {
    studId: "",
    fname: "",
    mname: "",
    lname: "",
    dname: 0,
    sex: "",
    sectionId: "",
    termId: "",
    doB: "2024-02-28",
    placeOfBirth: "",
    nationality: "Ethiopian",
    maritalStatus: "SINGLE",
    prevEducation: "",
    prevInstitution: "",
    prevMajorDepartment: "",
    prevEducCgpa: 0,
    serviceyear: 0,
    program: "",
    programType: "",
    centerId: "",
    zone: "",
    woreda: "",
    kebele: "",
    town: "",
    tel: "",
    pobox: "",
    email: "",
    persontoBeContacted: "",
    appDate: "2024-02-28",
    approved: "",
    approvedDate: "2024-02-28",
    age: 0,
    ageInyear: 0,
    batch: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  // let [data, setData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [dep, setDep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [studyCenters, setStudyCenters] = useState([]);
  const [sections, setSections] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loadingTerms, setLoadingTerms] = useState(true);
  const [loadingCenters, setLoadingCenters] = useState(true);
  const [spining, setSpining] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  tailspin.register();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/Departments?sortOrder=name desc&pageNumber=1`
        );
        setDepartments(response.data);
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    const fetchDocuments = async () => {
      try {
        const response = await axiosInstance.get("/api/AppDocuments");
        setDocuments(response.data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };
    const fetchSections = async () => {
      try {
        const response = await axiosInstance.get(`/api/Section`);
        setSections(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    const fetchTerms = async () => {
      try {
        const response = await axiosInstance.get(`/api/Terms`);
        setTerms(response.data);
        setLoadingTerms(false);
      } catch (error) {
        console.error("Error fetching terms:", error);
        setLoadingTerms(false);
      }
    };

    fetchDepartments();
    fetchSections();
    fetchTerms();
    fetchDocuments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "dname") {
      const selectedDepartment = departments.find(
        (department) => department.dcode === value
      );
      console.log(selectedDepartment.did);

      if (selectedDepartment) {
        setDep(selectedDepartment.did);
        setFormData((prevData) => ({
          ...prevData,
          dname: selectedDepartment.did,
        }));
      }
    } else if (name === "centerId") {
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
    } else if (name === "sectionId") {
      const selectedSection = sections.find(
        (section) => section.sectionId === value
      );
      if (selectedSection) {
        setFormData((prevData) => ({
          ...prevData,
          sectionId: selectedSection.sectionId,
        }));
      }
    } else if (name === "termId") {
      const selectedTerm = terms.find((term) => term.termId === value);
      if (selectedTerm) {
        setFormData((prevData) => ({
          ...prevData,
          termId: selectedTerm.termId,
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
    setSpining(true);
    setLoading1(true);

    const docIdsQueryString = selectedDocId.map(id => `DocId=${id}`).join('&');

    console.log("DOCCCCCCC", docIdsQueryString)
    let getStudentID = generateStudentId();

    const data = {
      StudId: getStudentID,
      Fname: formData.fname,
      Mname: formData.mname,
      Lname: formData.lname,
      Dname: formData.dname,
      Sex: formData.sex,
      SectionId: formData.sectionId,
      TermId: formData.termId,
      DoB: formData.doB,
      PlaceOfBirth: formData.placeOfBirth,
      Nationality: formData.nationality,
      MaritalStatus: formData.maritalStatus,
      PrevEducation: formData.prevEducation,
      PrevInstitution: formData.prevInstitution,
      PrevMajorDepartment: formData.prevMajorDepartment,
      PrevEducCgpa: formData.prevEducCgpa,
      Serviceyear: formData.serviceyear,
      Program: formData.program,
      ProgramType: formData.programType,
      CenterId: formData.centerId,
      Zone: formData.zone,
      Woreda: formData.woreda,
      Kebele: formData.kebele,
      Town: formData.town,
      Tel: formData.tel,
      Pobox: formData.pobox,
      Email: formData.email,
      PersontoBeContacted: formData.persontoBeContacted,
      AppDate: formData.appDate,
      Approved: formData.approved,
      ApprovedDate: formData.approvedDate,
      Age: formData.age,
      AgeInyear: formData.ageInyear,
      Batch: formData.batch,
    };

    const { SectionId, TermId, ...restFormData } = data;

    console.log("data", data);

    const apiUrl = `/api/Applicants`;

    try {
      const docIdsParams = selectedDocId.reduce((acc, id) => {
        acc[`DocId`] = acc[`DocId`] || [];
        acc[`DocId`].push(id);
        return acc;
      }, {});

      const response = await axiosInstance.post(apiUrl, restFormData, {
        params: {
          ...docIdsParams,
          SectionID: SectionId,
          TermId: TermId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess(true);
      setError(null);
      setFormData(initialFormData);
      notification.success({
        message: "Successful",
        description: "The Student is created successfully!",
      });
      // setData({});
      console.log(response.data);
    } catch (error) {
      setSuccess(false);
      setError(error.message);
      notification.error({
        message: "Failed",
        description: `Error creating student: ${error.message || error}`,
      });
      console.error(error);
    } finally {
      setSpining(false);
      setLoading1(false);

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

  const handleCheckboxChange = (event) => {
    const docId = event.target.value;
    setSelectedDocId(prevSelectedDocIds =>
      event.target.checked
        ? [...prevSelectedDocIds, docId]
        : prevSelectedDocIds.filter(id => id !== docId)
    );
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

  const activeTerms = terms.filter(
    (term) => new Date(term.endDate) > new Date()
  );

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 relative">
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
                            margin: "4px",
                            flex: 1,
                            textAlign: "center",
                            borderRadius: "5px",
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
                        <div className="col-span-6 md:col-span-3 mx-2 my-2">
                          <label
                            // for="full_name"
                            class="block text-sm font-medium text-gray-700"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="fname"
                            value={formData.fname}
                            id="first_name"
                            placeholder="First Name"
                            autocomplete="given-name"
                            onChange={handleInputChange}
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div className="col-span-6 md:col-span-3 mx-2 my-2">
                          <label
                            // for="full_name"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Middle Name
                          </label>
                          <input
                            type="text"
                            name="mname"
                            value={formData.mname}
                            id="middle_name"
                            placeholder="Middle Name"
                            autocomplete="given-name"
                            onChange={handleInputChange}
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div className="col-span-6 md:col-span-3 mx-2 my-2">
                          <label
                            // for="full_name"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lname"
                            value={formData.lname}
                            id="last_name"
                            placeholder="Last Name"
                            autocomplete="family-name"
                            onChange={handleInputChange}
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>

                        <div className="col-span-6 md:col-span-3 mx-2 my-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Sex
                          </label>
                          <select
                            id="sex"
                            name="sex"
                            value={formData.sex}
                            onChange={handleInputChange}
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option class="rounded-sm" value="">
                              Select Gender
                            </option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3 mx-2 my-2">
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
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3 mx-2 my-2">
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
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>

                        <div class="col-span-6 md:col-span-3 mx-2">
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
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option>Ethiopian</option>
                            <option>American</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                        <div class="col-span-6 md:col-span-3 mx-2">
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
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option>SINGLE</option>
                            <option>Married</option>
                            <option>Widowed</option>
                          </select>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div class="grid grid-cols-6 mt-10 border-2 shadow-lg p-5">
                        <div class="col-span-6 md:col-span-3 mx-2 my-2">
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

                        <div class="col-span-6 md:col-span-3 mx-2 my-2">
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

                        <div class="col-span-6 sm:col-span-3 m-2">
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

                        <div class="col-span-6 md:col-span-3 m-2">
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
                            onChange={handleInputChange}
                            id="telephone"
                            autocomplete="Tel"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div class="col-span-6 md:col-span-3 m-2">
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
                            onChange={handleInputChange}
                            id="email"
                            autocomplete="email"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
                        </div>
                        <div class="col-span-6 md:col-span-3 m-2">
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
                        <div class="col-span-6 md:col-span-3 m-2">
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
                      <div class="grid grid-cols-6 gap-4 mt-10 border-2 shadow-lg p-5 mx-2">
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
                        <div className="col-span-6 p-4 shadow-md rounded-md">
      <label className="block text-lg font-medium text-gray-700 mb-5">
        Submitted Documents
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {documents.map((doc) => (
          <div key={doc.docId} className="flex items-start">
            <input
              type="checkbox"
              id={`doc_${doc.docId}`}
              name={`doc_${doc.docId}`}
              value={doc.docId}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor={`doc_${doc.docId}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {doc.documentName}
            </label>
          </div>
        ))}
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
                            <option value="">Select Program</option>

                            <option value="Degree">Degree</option>
                            <option value="TVET">TVET</option>
                            <option value="Masters">Masters</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="program_type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Program Type
                          </label>
                          <select
                            id="program_type"
                            name="programType"
                            value={formData.programType}
                            onChange={handleInputChange}
                            autocomplete="program_type"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option value="">Program Types</option>

                            <option value="Regular">Regular</option>
                            <option value="Distance">Distance</option>
                            <option value="Extension">Extension</option>
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
                            name="dname"
                            value={formData.dcode}
                            onChange={handleInputChange}
                            autoComplete="department"
                            className="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option value="">All Depatiments</option>

                            {loading ? (
                              <option>Loading departments...</option>
                            ) : (
                              departments.map((department) => (
                                <option
                                  key={department.did}
                                  value={department.dcode}
                                >
                                  {department.dname}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="section"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Section
                          </label>
                          <select
                            id="section"
                            name="sectionId"
                            value={formData.sectionId}
                            onChange={handleInputChange}
                            autoComplete="department"
                            className="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option value="">All Sections</option>

                            {loading ? (
                              <option>Loading sections...</option>
                            ) : (
                              sections
                                .filter((section) => dep === section.dcode)
                                .map((section) => (
                                  <option
                                    key={section.sectionId}
                                    value={section.sectionId}
                                  >
                                    {section.sectionName}
                                  </option>
                                ))
                            )}
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="term"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Term
                          </label>
                          <select
                            id="term"
                            name="termId"
                            value={formData.termId}
                            onChange={handleInputChange}
                            autoComplete="term"
                            className="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option value="">All Terms</option>

                            {loadingTerms ? (
                              <option>Loading terms...</option>
                            ) : (
                              activeTerms.map((term) => (
                                <option key={term.termId} value={term.termId}>
                                  {term.name} - {term.acadYear}
                                </option>
                              ))
                            )}
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
                            name="appDate"
                            value={formData.appDate}
                            onChange={handleInputChange}
                            id="application_date"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          />
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
                            name="approvedDate"
                            value={formData.approvedDate}
                            onChange={handleInputChange}
                            id="approved_date"
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
                            value={formData.approved}
                            onChange={handleInputChange}
                            autocomplete="approved"
                            class="m-1 p-3 w-full bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                          >
                            <option>Yes</option>
                            <option>No</option>
                          </select>
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
                      padding: "10px",
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
                        {loading && (
                          <svg
                            className="animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 4s-4 1-4 4"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M22 12h-6M18 12a6 6 0 01-6 6H6"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 20V12"
                            />
                          </svg>
                        )}
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>

            {loading1 ? (
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

export default AddStudent;
