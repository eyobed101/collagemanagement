// src/components/AddDropManagement.js
import React, { useEffect, useState } from "react";
import addDropTableData from "@/data/addrop";
import courseTableData from "@/data/courses";
import axios from "axios";
// import student from "@/student";
import { apiurl } from "../constants";
import { tailspin } from "ldrs";
import axiosInstance from "@/configs/axios";
import {notification} from "antd";

const AddDropManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedOffDepartment, setSelectedOffDepartment] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedOffSection, setSelectedOffSection] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [departments, setDepartiment] = useState([]);
  const [offDepartments, setOffDepartiment] = useState([]);
  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offSections, setOffSections] = useState([]);
  const [sectionStudEnroll, setSectionStudEnroll] = useState([]);
  const [sectionCourseAss, setSectionCourseAss] = useState([]);
  const [sectionAddCourseAss, setSectionAddCourseAss] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedOfferingDepartment, setSelectedOfferingDepartment] = useState(
    ""
  );
  const [selectedOfferingSection, setSelectedOfferingSection] = useState("");
  const [coursesToAdd, setCoursesToAdd] = useState([]);
  const [coursesToDrop, setCoursesToDrop] = useState([]);
  const [newCourseList, setNewCourceList] = useState([]);

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  tailspin.register();

  const handleStudentSelection = (student) => {
    setSelectedStudent(student);
  };

  const handleDroppedCourseSelection = (course) => {
    // const isSelected = borrowingCourses.some((selectedCourse) => selectedCourse.courseNo === course.courseNo);
    setSectionCourseAss((prevCourses) =>
      prevCourses.map((selectedCourse) =>
        selectedCourse.courseNo === course.courseNo
          ? { ...selectedCourse, isSelected: !selectedCourse.isSelected }
          : selectedCourse
      )
    );
  };
  const handleAddedCourseSelection = (course) => {
    // const isSelected = borrowingCourses.some((selectedCourse) => selectedCourse.courseNo === course.courseNo);
    console.log("addd", course);
    setSectionAddCourseAss((prevCourses) =>
      prevCourses.map((selectedCourse) =>
        selectedCourse.courseNo === course.courseNo
          ? { ...selectedCourse, isSelected: !selectedCourse.isSelected }
          : selectedCourse
      )
    );
  };

  const handleClearAdded = () => {
    setNewCourceList([]);
  };

  const handleAddDropFunction = () => {
    // setNewCourceList((prev) => [
    //   ...prev,
    //   ...sectionCourseAss
    //     .filter((sec) => sec.sectionId === selectedSection.sectionId)
    //     .filter((sec2) => sec2.isSelected === false)
    //     .map((course) => course),
    // ]);

    setNewCourceList((prev) => [
      ...prev,
      ...sectionAddCourseAss
        .filter((sec) => sec.sectionId === selectedOffSection.sectionId)
        .filter((sec2) => sec2.isSelected)
        .map((course) => course),
    ]);
  };

  const handleTransaction = async () => {
    try {
      setLoading(true);
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      let formData = [];
      let dropped = [];

      sectionCourseAss
        .filter((cor) => cor.isSelected === true)
        .map((course) => {
          const data = {
            studId: selectedStudent.studId,
            courseNo: course.courseNo,
            sectionId: course.sectionId,
            submitBy: "AD/C/04/23",
            dateSubmitted: formattedDate,
            termId: course.termId,
            registered: "Yes",
            dateRegistered: formattedDate,
          };

          dropped.push(data);
        });

      newCourseList.map((course) => {
        const data = {
          studId: selectedStudent.studId,
          courseNo: course.courseNo,
          sectionId: selectedOffSection.sectionId,
          submitBy: "AD/C/04/23",
          dateSubmitted: formattedDate,
          termId: course.termId,
          registered: "Yes",
          dateRegistered: formattedDate,
        };

        formData.push(data);
      });
      console.log("dropped", dropped);

      const endpoint = `/api/CourseRegistrationPendings`;
      const add_and_drop_endpoint = `/api/AddDropCourses`;
      const drop_endpoint = `/api/CourseRegistrationPendings`;

      for (const item of dropped) {
        const drop_response = await axiosInstance.delete(drop_endpoint, {
          data: item, // Send the current item as data
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response data:", drop_response.data);

      }

      console.log("new course fromdata to be added in ", formData)


      const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      for (const item of dropped) {
        formData.push(item)
      }


      console.log("fromdata to be added in add&drop", formData)

      const add_and_drop_response = await axiosInstance.post(
        add_and_drop_endpoint,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      notification.success({
        message: "Successful",
        description: "Add and drop operation is successfull!",
      });

      setSuccess(true);
      setError(null);

      console.log("Response data:", response.data);
      console.log("Add and Drop data:", add_and_drop_response.data);
      console.log("dropped data:", drop_response.data);
    } catch (error) {
      console.error("Error:", error.message);
      setSuccess(false);
      setError(error.message);
      notification.error({
        message: "Failed",
        description: `Error add and drop operation: ${error.message || error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // #######################################################

        const departmentsResponse = await axiosInstance.get(
          `/api/Departments?sortOrder=name desc&pageNumber=1`
        );
        setDepartiment(departmentsResponse.data);
        setOffDepartiment(departmentsResponse.data);
        console.log(departmentsResponse.data);

        // #######################################################

        const sectionsResponse = await axiosInstance.get(`/api/Section`);
        setSections(sectionsResponse.data);
        setOffSections(sectionsResponse.data);
        console.log(sectionsResponse.data);

        // #######################################################

        const sectionStudEnrollResponse = await axiosInstance.get(
          `/api/SectionStudEnroll`
        );
        setSectionStudEnroll(sectionStudEnrollResponse.data);
        console.log(sectionStudEnrollResponse.data);
        // #######################################################

        const fetchSecCourses = await axiosInstance.get(`/api/SecCourseAssgts`);
        setSectionCourseAss(
          fetchSecCourses.data.map((course) => {
            return {
              ...course,
              isSelected: false,
            };
          })
        );
        setSectionAddCourseAss(
          fetchSecCourses.data.map((course) => {
            return {
              ...course,
              isSelected: false,
            };
          })
        );
        // #######################################################

        const fetchStudents = await axiosInstance.get(`/api/Applicants`);
        setStudents(fetchStudents.data);

        // #######################################################
        const fetchCourses = await axiosInstance.get(`/api/Courses`);
        setCourses(fetchCourses.data);

        // #######################################################
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSectionChange = (event) => {
    const selectedData = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data");

    setSelectedSection({
      ...JSON.parse(selectedData),
    });
  };
  const handleOffSectionChange = (event) => {
    const selectedData = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data");

    setSelectedOffSection({
      ...JSON.parse(selectedData),
    });
  };

  const departmentOptions = Array.from(
    new Set(addDropTableData.map((student) => student.department))
  );
  const sectionOptionsByDepartment = addDropTableData.reduce((acc, student) => {
    acc[student.department] = acc[student.department] || [];
    if (!acc[student.department].includes(student.section)) {
      acc[student.department].push(student.section);
    }
    return acc;
  }, {});

  const uniqueTerms = Array.from(
    new Set(
      addDropTableData
        .filter(
          (student) =>
            student.department === selectedDepartment &&
            student.section === selectedSection
        )
        .map((student) => student.term)
    )
  );

  const uniquePrograms = Array.from(
    new Set(
      addDropTableData
        .filter(
          (student) =>
            student.department === selectedDepartment &&
            student.section === selectedSection
        )
        .map((student) => student.program)
    )
  );

  const filteredStudents = addDropTableData.filter(
    (student) =>
      (!selectedDepartment || student.department === selectedDepartment) &&
      (!selectedSection || student.section === selectedSection) &&
      (!selectedProgram || student.program === selectedProgram) &&
      (!selectedTerm || student.term === selectedTerm)
  );

  const filteredCourses = courseTableData.filter(
    (course) =>
      (!selectedOfferingDepartment ||
        course.department === selectedOfferingDepartment) &&
      (!selectedOfferingSection || course.section === selectedOfferingSection)
  );

  const handleAddCourse = (student) => {
    const courseToAdd = {
      id: coursesToAdd.length + 1,
      name: `New Course ${coursesToAdd.length + 1}`,
      department: selectedOfferingDepartment,
      section: selectedOfferingSection,
    };

    const isCourseAlreadyAdded = student.courses.some(
      (course) =>
        course.department === courseToAdd.department &&
        course.section === courseToAdd.section
    );

    if (!isCourseAlreadyAdded) {
      student.courses = [...student.courses, courseToAdd];
      setCoursesToAdd([...coursesToAdd, courseToAdd]);
    }
  };

  const handleDropCourse = (student) => {
    const courseToRemoveIndex = student.courses.findIndex(
      (course) =>
        course.department === selectedOfferingDepartment &&
        course.section === selectedOfferingSection
    );

    if (courseToRemoveIndex !== -1) {
      setCoursesToDrop([
        ...coursesToDrop,
        student.courses[courseToRemoveIndex],
      ]);
      student.courses.splice(courseToRemoveIndex, 1);
    }
  };

  return (
    <div className="mb-8 mt-4 flex flex-col gap-12 bg-white p-5 rounded-md">
      <div class="grid grid-cols-4 mt-10">
        <div class="col-span-4 sm:col-span-2 bg-opacity-25 bg-gray-200 backdrop-filter backdrop-blur-lg p-4 rounded-md mx-2">
          <div className="flex flex-wrap w-full">
            <div className="mb-10 flex flex-col w-full">
             
              <select
                id="departmentOption"
                class="m-1 p-3 w-full font-semibold bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                value={selectedDepartment ? selectedDepartment.dname : ""}
                onChange={(e) =>
                  setSelectedDepartment(
                    departments.find((dept) => dept.dname === e.target.value)
                  )
                }
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept.dname}>
                    {dept.dname}
                  </option>
                ))}
              </select>
            </div>

            <div className=" mb-10 flex flex-col w-full">
             
              <select
                class="m-1 p-3 w-full font-semibold bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
                // value={selectedSection}
                onChange={handleSectionChange}
              >
                <option value="">Select Section</option>

                {selectedDepartment ? (
                  sections
                    .filter(
                      (section) => section.dcode === selectedDepartment.did
                    )
                    .map((section) => (
                      <option
                        key={section.sectionId}
                        value={section.sectionName}
                        data={JSON.stringify(section)}
                      >
                        {section.sectionName}
                      </option>
                    ))
                ) : (
                  <option disabled>Select a Department first</option>
                )}
              </select>
            </div>

            <div className="flex w-full justify-between">
              <div className="mr-5 mb-10 flex flex-col w-[100%] sm:w-[50%]">
                
                <div class="m-1 p-3 w-full font-semibold bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md">
                  {selectedDepartment && selectedSection
                    ? selectedSection.program || "Program Not Found"
                    : "Program"}
                </div>
              </div>

              <div className="mb-10 flex flex-col w-[100%] sm:w-[50%]">
                
                <div class="m-1 p-3 w-full font-semibold bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md">
                  {selectedDepartment && selectedSection
                    ? selectedSection.acadYear || "Term Not Found"
                    : "Acadamic Year"}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-2 mb-10 border-2 px-2 rounded-md shadow-md border-[#a2a2a2]">
                <label className="text-md items-center flex font-semibold  text-[#434343]">
                  Number of Students
                </label>

                <label class="m-1 p-3 w-full font-semibold bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md">
                  {
                    sectionStudEnroll.filter(
                      (section) =>
                        section.sectionId === selectedSection.sectionId
                    ).length
                  }
                </label>
              </div>
              <div className="grid grid-cols-2 mb-10 border px-2 rounded-md border-[#a2a2a2]">
              <label className="text-md items-center flex font-semibold  text-[#434343]">
                  Today's Date{" "}
                </label>

                <label class="m-1 p-3 w-full font-semibold bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md">
                  {new Date(Date.now()).toLocaleDateString()}{" "}
                  {new Date(Date.now()).toLocaleTimeString()}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 sm:col-span-2 min-w-[300px] border-2 shadow-md p-4 rounded-md">
          
          <div className="border-2 border-[#C2C2C2] p-4 overflow-y-auto h-max-[70%] shadow-sm rounded-md">
            {selectedDepartment
              ? selectedSection
                ? sectionStudEnroll
                    .filter(
                      (section) =>
                        section.sectionId === selectedSection.sectionId
                    )
                    .map((student, index) => (
                      <div
                        key={index}
                        className={`border mb-2 p-2 cursor-pointer text-black ${
                          selectedStudent === student ? "bg-gray-300" : ""
                        }`}
                        onClick={() => handleStudentSelection(student)}
                      >
                        {student.studId}{" "}
                        {students
                          .filter((stud) => stud.studId === student.studId)
                          .map(
                            (std) => `${std.fname} ${std.mname} ${std.lname}`
                          )}
                      </div>
                    ))
                : "No section selected"
              : "No department selected"}
          </div>
        </div>
      </div>

      <hr className="mb-4  border-2 border-[#C2C2C2]" />

      {selectedStudent ? (
        <div>
          {students
            .filter((stud) => stud.studId === selectedStudent.studId)
            .map((student) => (
              <div
                key={student.studId}
                className="flex rounded-md border-2 p-2 text-lg font-semibold text-[#434343]"
              >
                The Selected Student is{" "}
                <span className="block text-lg font-semibold bg-blue-gray-50 text-[#434343] ml-2 border-2 px-4 rounded-sm">{`${
                  student.studId
                }-${student.fname} ${student.mname ? student.mname + " " : ""}${
                  student.lname
                }`}</span>
              </div>
            ))}
        </div>
      ) : (
        ""
      )}

      <div class="grid grid-cols-2 gap-2">
        <div class="col-span-2 sm:col-span-1">
          
          <select
            id="departmentOff"
            class="m-1 p-3 w-full font-semibold bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
            value={selectedOffDepartment ? selectedOffDepartment.dname : ""}
            onChange={(e) =>
              setSelectedOffDepartment(
                offDepartments.find((dept) => dept.dname === e.target.value)
              )
            }
          >
            <option value="">Select Offering Department</option>
            {offDepartments.map((dept, index) => (
              <option key={index} value={dept.dname}>
                {dept.dname}
              </option>
            ))}
          </select>
        </div>

        <div class="col-span-2 sm:col-span-1">
          
          <select
            id="sectionOff"
            class="m-1 p-3 w-full font-semibold bg-blue-gray-50 border-2 shadow-md border-[#676767] focus:ring-indigo-300 focus:border-indigo-300 block sm:text-sm rounded-md"
            onChange={handleOffSectionChange}
          >
            <option value="">Select Offering Section</option>

            {selectedOffDepartment ? (
              offSections
                .filter(
                  (section) => section.dcode === selectedOffDepartment.did
                )
                .filter((secn) => secn.sectionId !== selectedStudent.sectionId)
                .map((section) => (
                  <option
                    key={section.sectionId}
                    value={section.sectionName}
                    data={JSON.stringify(section)}
                  >
                    {section.sectionName}
                  </option>
                ))
            ) : (
              <option disabled>Select Offering Department first</option>
            )}
          </select>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-3 sm:col-span-1">
          <div className="mb-8">
            <h2 className="block text-lg font-semibold mb-2 text-[#181212]">
              Courses
            </h2>
            <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto max-h-48 min-h-[200px] shadow-sm rounded-md">
              {selectedOffDepartment
                ? selectedOffSection
                  ? sectionAddCourseAss
                      .filter(
                        (cor) => cor.sectionId === selectedOffSection.sectionId
                      )
                      .map((course, index) => (
                        <li
                          key={index}
                          className={`border mb-2 p-2 cursor-pointer list-none text-black ${
                            course.isSelected ? "bg-gray-300" : ""
                          }`}
                          onClick={() => handleAddedCourseSelection(course)}
                        >
                          <input
                            type="checkbox"
                            checked={course.isSelected || false}
                            readOnly
                            className="mr-2"
                          />
                          {course.courseNo} -{" "}
                          {courses
                            .filter((cor) => cor.courseNo === course.courseNo)
                            .map((cour) => cour.courseName)}
                        </li>
                      ))
                  : "No offering section selected"
                : "No offering department selected"}
            </div>
          </div>
        </div>

        <div class="col-span-3 sm:col-span-1">
          <div className="mb-8">
            <h2 className="block text-lg font-semibold mb-2 text-[#434343]">
              Courses to be Added
            </h2>
            <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto max-h-48 min-h-[200px] shadow-sm rounded-md">
              {newCourseList.map((course) => (
                <div key={course.courseNo} className="border p-4 mb-2">
                  {course.courseNo} -{" "}
                  {courses
                    .filter((cor) => cor.courseNo === course.courseNo)
                    .map((cour) => cour.courseName)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div class="col-span-3 sm:col-span-1">
          <div>
            <h2 className="block text-lg font-semibold mb-2 text-[#434343]">
              Courses to be Dropped
            </h2>
            <div className="border-[2px] border-[#c4bfbf] p-4 overflow-y-auto max-h-48 min-h-[200px] shadow-sm rounded-md">
              {sectionCourseAss
                .filter((cor) => cor.sectionId === selectedSection.sectionId)
                .map((course, index) => (
                  // <div key={course.courseNo} className="border p-4 mb-2">
                  //   {course.courseNo} - {course.courseName}
                  // </div>
                  <li
                    key={index}
                    className={`border mb-2 p-2 cursor-pointer list-none text-black ${
                      course.isSelected ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleDroppedCourseSelection(course)}
                  >
                    <input
                      type="checkbox"
                      checked={course.isSelected || false}
                      readOnly
                      className="mr-2"
                    />
                    {course.courseNo} -{" "}
                    {courses
                      .filter((cor) => cor.courseNo === course.courseNo)
                      .map((cour) => cour.courseName)[0]}
                  </li>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between m-5">
        <div className="flex space-x-5">
          <button
            className="px-8 py-4 bg-[#4279A6] text-white font-semibold rounded hover:bg-green-400 transition-colors duration-300 ease-in-out"
            onClick={() => handleAddDropFunction()}
          >
            ADD/DROP
          </button>
          <button
            className="px-8 py-4 bg-[#4279A6] text-white font-semibold rounded hover:bg-green-400 transition-colors duration-300 ease-in-out"
            onClick={() => handleClearAdded()}
          >
            Clear Added
          </button>
        </div>
        <button
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-400 transition-colors duration-300 ease-in-out"
          onClick={() => handleTransaction()}
        >
          Save Transaction
        </button>
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
          <div class="ms-3 text-sm font-medium">Submission successful!</div>
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
  );
};

export default AddDropManagement;
