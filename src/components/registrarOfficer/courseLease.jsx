import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../constants";
import { tailspin } from "ldrs";
import axiosInstance from "@/configs/axios";


const CourseLeaseManagement = () => {
  const [givingDepartment, setGivingDepartment] = useState("");
  const [givingCourses, setGivingCourses] = useState([]);
  const [departments, setDepartiment] = useState([]);
  const [courses, setCourses] = useState([]);
  const [borrowingDepartment, setBorrowingDepartment] = useState("");
  const [borrowingCourses, setBorrowingCourses] = useState([]);
  const [courseType, setCourseType] = useState("");
  const [prerequisites, setPrerequisites] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  tailspin.register();

  // const departments = ["Dept A", "Dept B"];
  // const courses = [
  //   { id: 101, name: "Course 1", department: "Dept A", section: "A" },
  //   { id: 102, name: "Course 2", department: "Dept B", section: "B" },
  // ];

  // const filteredCoursesByDepartment = courses.filter(
  //   (course) => course.department === givingDepartment
  // );

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/Departments?sortOrder=name desc&pageNumber=1`
        );
        setDepartiment(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(`/api/Courses`);
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    // }
    // const fetchCourses = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5169/api/Courses");
    //     setSecCourseAss(response.data);
    //   } catch (error) {
    //     console.error("Error fetching sections:", error);
    //   }

    // }

    fetchDepartments();
    fetchCourses();
    // fetchSectionStudentEnroll();
    // fetchSecCourseAss();
  }, []);

  const handleTransaction = async () => {
    try {
      setLoading(true)
      let formData = [];

      const endpoint = `/api/CourseLeases`;

      console.log("boo", borrowingDepartment);

      borrowingCourses.map(async (course, index) => {
        const data = {
          courseNo: course.courseNo,
          dname: borrowingDepartment.did,
          courseType: courseType,
          hasLabNew: "No",
          hasPreReq: "No",
          acadYearLevel: 0,
          termLevel: 0,
          courseLeaseId: 0,
        };

        formData.push(data);
      });

      const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess(true);
      setError(null);

      console.log("Response data:", response.data);
      setGivingDepartment("");
      setGivingCourses([]);
      setDepartiment([]);
      setCourses([]);
      setBorrowingDepartment("");
      setBorrowingCourses([]);
      setCourseType("");
      setSuccess(false);
      setError(null);

      // const response = await axios.post(endpoint, data, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
    } catch (error) {
      console.error("Error:", error.message);
      setSuccess(false);
      setError(error.message);
    }
    finally {
      setLoading(false)
    }
  };

  const handleAddCourse = () => {
    setBorrowingCourses([
      ...borrowingCourses,
      ...givingCourses,
      // {
      //   department: givingDepartment,
      //   courses: givingCourses,
      //   courseType,
      //   prerequisites,
      // },
    ]);

    console.log(borrowingCourses);

    setGivingCourses([]);
  };

  const handleClearSelected = () => {
    setGivingCourses([]);
  };

  const handleCourseSelection = (course) => {
    // const isSelected = borrowingCourses.some((selectedCourse) => selectedCourse.courseNo === course.courseNo);
    setBorrowingCourses((prevCourses) =>
      prevCourses.map((selectedCourse) =>
        selectedCourse.courseNo === course.courseNo
          ? { ...selectedCourse, isSelected: !selectedCourse.isSelected }
          : selectedCourse
      )
    );
  };

  const handleClearAdded = () => {
    // Clear only the selected courses
    setBorrowingCourses((prevCourses) =>
      prevCourses.filter((course) => !course.isSelected)
    );

    // setBorrowingCourses((prevCourses) => prevCourses.filter((course) => !course.isSelected));
  };

  // const handleClearAdded = () => {
  //   setBorrowingCourses([]);
  // };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md relative">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Giving Department
          </h2>
          <div className="mb-4">
            <select
              className="px-8 py-3 w-full bg-blue-gray-50 border-[2px] border-[#676767] text-black block shadow-md sm:text-sm rounded-md"
              value={givingDepartment ? givingDepartment.dname : ""}
              onChange={(e) =>
                setGivingDepartment(
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

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-[#434343]">
              Courses
            </label>

            <select
              className="px-8 py-3 w-full border-[2px] min-h-[200px] border-[#C2C2C2] text-black block shadow-md sm:text-sm rounded-md"
              multiple
              value={givingCourses.map((course) => course.courseNo)}
              onChange={(e) => {
                const selectedCourseNumbers = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                const selectedCourses = courses.filter((course) =>
                  selectedCourseNumbers.includes(course.courseNo)
                );
                setGivingCourses(selectedCourses);
              }}
            >
              {courses
                .filter((course) => course.dcode === givingDepartment.did)
                .map((course) => (
                  <option
                    className="border mb-2 p-2 cursor-pointer text-black"
                    key={course.courseNo}
                    value={course.courseNo}
                  >
                    {course.courseName}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4 mt-3">
            <label className="block text-lg font-semibold mb-2 text-[#434343]">
              Course Type
            </label>
            <hr class="border-t-2 border-[#676767] shadow-md my-4" />
            <div className="flex space-x-5 text-black">
              <div className="flex items-center px-6 py-2 border-2 border-[#959595] shadow-md rounded-sm">
                <input
                  type="checkbox"
                  id="supportiveCheckbox"
                  className="mr-2"
                  checked={courseType === "Supportive"}
                  onChange={() => setCourseType("Supportive")}
                />
                <label htmlFor="supportiveCheckbox">Supportive</label>
              </div>
              <div className="flex items-center px-6 py-2 border-2 border-[#959595] shadow-md rounded-sm">
                <input
                  type="checkbox"
                  id="commonCheckbox"
                  className="mr-2"
                  checked={courseType === "Common"}
                  onChange={() => setCourseType("Common")}
                />
                <label htmlFor="commonCheckbox">Common</label>
              </div>
              <div className="flex items-center px-6 py-2 border-2 border-[#959595] shadow-md rounded-sm">
                <input
                  type="checkbox"
                  id="minorCheckbox"
                  className="mr-2"
                  checked={courseType === "Minor"}
                  onChange={() => setCourseType("Minor")}
                />
                <label htmlFor="minorCheckbox">Minor</label>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-20">
            <div className="flex">
              <button
                className="px-4 py-3 border-2 border-[#676767] font-bold shadow-md rounded-md text-blue-gray-900 hover:bg-[#4279A6] hover:text-white"
                onClick={handleClearSelected}
              >
                Clear Selected Course
              </button>
            </div>
            <div className="flex ml-auto">
              <button
                className="px-4 py-3 border-2 border-[#676767] font-bold shadow-md rounded-md text-blue-gray-900 hover:bg-[#4279A6] hover:text-white"
                onClick={handleAddCourse}
              >
                Add Selected Courses
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Borrowing Department
          </h2>
          <div className="mb-4">
            <select
              className="px-8 py-3 w-full bg-blue-gray-50 border-[2px] border-[#676767] text-black block shadow-md sm:text-sm rounded-md"
              value={borrowingDepartment ? borrowingDepartment.dname : ""}
              onChange={(e) =>
                setBorrowingDepartment(
                  departments.find((dept) => dept.dname === e.target.value)
                )
              }
            >
              <option value="">Select Department</option>
              {departments.filter((dep) => dep.dcode !== givingDepartment.dcode).map((dept, index) => (
                <option key={index} value={dept.dname}>
                  {dept.dname}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-[#434343]">
              Added Courses
            </label>
            <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-md rounded-md">
              {borrowingCourses.map((borrowedCourse, index) => (
                <li
                  key={index}
                  className={`border mb-2 p-2 cursor-pointer list-none text-black ${
                    borrowedCourse.isSelected ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleCourseSelection(borrowedCourse)}
                >
                  <input
                    type="checkbox"
                    checked={borrowedCourse.isSelected || false}
                    readOnly
                    className="mr-2"
                  />
                  {borrowedCourse.courseNo}-{borrowedCourse.courseName}
                </li>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-3 bg-[#4279A6] text-white rounded"
              onClick={handleClearAdded}
            >
              Clear Selected{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="px-4 py-3 bg-green-500 text-white rounded"
          onClick={handleTransaction}
        >
          Save Transaction{" "}
        </button>
      </div>
      {loading ? <l-tailspin
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
      ></l-tailspin>:""}
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

export default CourseLeaseManagement;
