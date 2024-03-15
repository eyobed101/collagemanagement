import React, { useEffect, useState } from "react";
import courseTableData from "@/data/courses";
import addDropTableData from "@/data/addrop";
import axios from "axios";
import { waveform } from 'ldrs'
import { apiurl } from "../constants";

waveform.register()

// Default values shown


const StudentCourseRegistration = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [sectionStudEnroll, setSectionStudEnroll] = useState([]);
  const [secCourseAss, setSecCourseAss] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseRegistrationPendings, setCourseRegistrationPendings] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [program, setProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [term, setTerm] = useState("");
  const [department, setDepartment] = useState([]);
  const [coursesAssigned, setCoursesAssigned] = useState(0);
  const [todaysDate, setTodaysDate] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/Section`);
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    const fetchSectionStudentEnroll = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/SectionStudEnroll`
        );
        setSectionStudEnroll(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    const fetchSecCourseAss = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/SecCourseAssgts`
        );
        setSecCourseAss(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/Courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/Departments`
        );
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching departiment:", error);
      }
    };
    const fetchApplicant = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/Applicants`
        );
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    const fetchCourseRegistration = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/CourseRegistrationPendings`
        );
        setCourseRegistrationPendings(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchSections();
    fetchSectionStudentEnroll();
    fetchSecCourseAss();
    fetchDepartments();
    fetchApplicant();
    fetchCourses();
    fetchCourseRegistration();
  }, []);

  const handleSectionChange = (event) => {
    const selectedData = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data");

    setSelectedSection({
      ...JSON.parse(selectedData),
    });

    setTodaysDate(new Date().toLocaleDateString());
  };

  const handleCourseClick = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(
        selectedCourses.filter((selectedCourse) => selectedCourse !== course)
      );
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };
  const handleStudentClick = (student) => {
    if (selectedStudent.includes(student)) {
      setSelectedStudent(selectedStudent.filter((stud) => stud !== student));
    } else {
      setSelectedStudent([...selectedStudent, student]);
    }
  };

  const handleClearSelectedCourses = () => {
    const updatedCourses = coursesUnderSection.filter(
      (course) => !selectedCourses.includes(course)
    );

    setSelectedCourses([]);

    setCoursesUnderSection(updatedCourses);
  };
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    const data = []

    if (checked) {
      const allStudents = sectionStudEnroll
        .filter((section) => section.sectionId === selectedSection.sectionId)
        .map((student) => {return student});
      setSelectedStudent(allStudents);
      console.log("from you",selectedStudent)
    } else {
      // If "Select All" is unchecked, deselect all students
      setSelectedStudent([]);
    }
  }

  const handleTransaction = async () => {
    try {
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      
      selectedStudent.map(async (stud) => {
        let formData = [];

        secCourseAss
          .filter(
            async (section) => section.sectionId === selectedSection.sectionId
          )
          .map(async (course) => {
            const data = {
              studId: stud.studId,
              courseNo: course.courseNo,
              sectionId: course.sectionId,
              submitBy: "AD/C/04/23",
              dateSubmitted: formattedDate,
              termId: course.termId,
              registered: "Yes",
              dateRegistered: formattedDate,
            };

            formData.push(data);
          });
        console.log(formData);

        const endpoint = `${apiurl}/api/CourseRegistrationPendings`;

        const response = await axios.post(endpoint, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSuccess(true);
      setError(null);

        console.log(response.data);
      });
    } catch (error) {
      console.error("Error:", error.message);
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md">
    
      <div className="px-5">
        <h2 className="text-lg font-semibold mb-2 text-[#434343]">
          Section Selection
        </h2>
        <div className="mb-4">
          <select
            className="px-8 py-3 w-full bg-blue-gray-50 border-[2px] border-[#676767] text-black block shadow-md sm:text-sm rounded-md"
            onChange={handleSectionChange}
            key="sectionSelect"
          >
            <option value="">Select Section</option>
            {sections?.map((section) => (
              <option
                key={section.sectionId}
                data={JSON.stringify(section)}
                value={section.sectionName}
              >
                {section.sectionName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Information Section */}
      <div className="shadow-md rounded-md p-5">
        <h2 className="text-lg font-semibold mb-2 text-[#434343]">
          Information
        </h2>
        <div className="grid grid-cols-1  sm:grid-cols-3 mb-5">
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Program:
            </label>
            <div className="text-lg border p-2">
              {selectedSection.program ? selectedSection.program : ""}
            </div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Program Type
            </label>
            <div className="text-lg border p-2">
              {selectedSection.sectionId ? selectedSection.programType : ""}
            </div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Academic Year:
            </label>
            <div className="text-lg border p-2">
              {selectedSection.acadYear ? selectedSection.acadYear : ""}
            </div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Department:
            </label>
            <div className="text-lg border p-2">
              {selectedSection
                ? department
                    .filter((dep) => dep.did === selectedSection.dcode)
                    .map((dept) => dept.dname)
                : ""}
            </div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Courses Assigned:
            </label>
            <div className="text-lg border p-2">
              {selectedSection.sectionId
                ? secCourseAss.filter(
                    (section) => section.sectionId === selectedSection.sectionId
                  ).length
                : "0"}
            </div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Today's Date:
            </label>
            <div className="text-lg border p-2">
              {selectedSection.sectionId ? todaysDate : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border shadow-md rounded-md p-5">
        <div className="flex justify-between mb-4 border border-[#676767] rounded-md shadow-md p-2 mr-4">
          <label className="block text-sm font-medium text-gray-600">
            Number of Students:
          </label>
          <div className="text-lg font-semibold border px-5">
            {selectedSection.sectionId
              ? sectionStudEnroll.filter(
                  (section) => section.sectionId === selectedSection.sectionId
                ).length
              : "0"}
          </div>
        </div>
        <div className="flex justify-between mb-4 border border-[#676767] rounded-md shadow-md p-2 mr-4">
          <label className="block text-sm font-medium text-gray-600">
            Number of Courses:
          </label>
          <div className="text-lg font-semibold border px-5">
            {selectedSection.sectionId
              ? secCourseAss.filter(
                  (section) => section.sectionId === selectedSection.sectionId
                ).length
              : "0"}
          </div>
        </div>
        <div className="flex justify-between mb-4 border border-[#676767] rounded-md shadow-md p-2 mr-4">
          <label className="block text-sm font-medium text-gray-600">
            Courses Assigned:
          </label>
          <div className="text-lg font-semibold border px-5">
            {selectedSection ? coursesAssigned : "0"}
          </div>
        </div>
      </div>
     

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border shadow-md p-5 rounded-md">
        <div className="">
          <div className="flex justify-between mr-5">
            <h2 className="text-lg font-semibold mb-2 text-[#434343]">
              Students Under Selected Section
            </h2>
            <div>
              <input
                type="checkbox"
                className="p-6 text-black"
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <label className="ml-2 text-black font-[25px]">Select All</label>
            </div>
          </div>
          <div className="border-2 border-[#676767] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-md rounded-md">
            {selectedSection.sectionId ? (
              <div>
                {sectionStudEnroll
                  .filter(
                    (section) => section.sectionId === selectedSection.sectionId
                  )
                  .map((student, index) => (
                    <div
                      key={index}
                      onClick={() => handleStudentClick(student)}
                      className={`border-2 border-[#84b1d6] mb-2 p-2 cursor-pointer rounded-md text-black ${
                        selectedStudent.includes(student) ? "bg-gray-300" : ""
                      }`}
                    >
                      {index} - {student.studId}{" "}
                      {applicants
                        .filter((stud) => stud.studId === student.studId)
                        .map((std) => `${std.fname} ${std.mname} ${std.lname}`)}
                    </div>
                  ))}
              </div>
            ) : (
              "Section has not been selected"
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Courses Under This Section
          </h2>
          <div className="border-2 border-[#676767] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-md rounded-md">
            {selectedSection.sectionId
              ? secCourseAss
                  .filter(
                    (section) => section.sectionId === selectedSection.sectionId
                  )
                  .map((course, index) => (
                    <div
                      key={index}
                      // className="border mb-2 p-2 cursor-pointer text-black"
                      onClick={() => handleCourseClick(course)}
                      className={`border mb-2 p-2 cursor-pointer text-black ${
                        selectedCourses.includes(course) ? "bg-gray-300" : ""
                      }`}
                    >
                      {course.courseNo}{" "}
                      {courses
                        .filter((cor) => cor.courseNo === course.courseNo)
                        .map((cous) => cous.courseName)}
                    </div>
                  ))
              : "Section has not been selected"}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between space-x-2 mx-2 mb-10">
          <button
            className="px-4 py-3 bg-green-500 font-bold text-white rounded-md"
            onClick={handleClearSelectedCourses}
          >
            Clear Selected Course{" "}
          </button>
          <button
            className="px-4 bg-green-500 font-bold text-white rounded-md"
            onClick={handleTransaction}
          >
            Save Transaction{" "}
          </button>
        </div>
      </div>
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
  );
};

export default StudentCourseRegistration;
