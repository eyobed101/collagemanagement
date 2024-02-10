import React, { useState } from "react";

const CourseLeaseManagement = () => {
  const [givingDepartment, setGivingDepartment] = useState("");
  const [givingCourses, setGivingCourses] = useState([]);
  const [borrowingDepartment, setBorrowingDepartment] = useState("");
  const [borrowingCourses, setBorrowingCourses] = useState([]);
  const [courseType, setCourseType] = useState("");
  const [prerequisites, setPrerequisites] = useState(false);

  const departments = ["Dept A", "Dept B"];
  const courses = [
    { id: 101, name: "Course 1", department: "Dept A", section: "A" },
    { id: 102, name: "Course 2", department: "Dept B", section: "B" },
  ];

  const filteredCoursesByDepartment = courses.filter(
    (course) => course.department === givingDepartment
  );

  const handleAddCourse = () => {
    setBorrowingCourses([
      ...borrowingCourses,
      {
        department: givingDepartment,
        courses: givingCourses,
        courseType,
        prerequisites,
      },
    ]);

    setGivingCourses([]);
  };

  const handleClearSelected = () => {
    setGivingCourses([]);
  };

  const handleClearAdded = () => {
    setBorrowingCourses([]);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Giving Department
          </h2>
          <div className="mb-4">
            <select
              className="px-8 py-3 w-full border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm rounded-md"
              value={givingDepartment}
              onChange={(e) => setGivingDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-[#434343]">
              Courses
            </label>
            <select
              className="px-8 py-3 w-full border-[2px] min-h-[200px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm rounded-md"
              multiple
              value={givingCourses}
              onChange={(e) =>
                setGivingCourses(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              {filteredCoursesByDepartment.map((course) => (
                <option className="border mb-2 p-2 cursor-pointer text-black" key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex">
              <button
                className="px-4 py-3 bg-[#4279A6] text-white rounded"
                onClick={handleClearSelected}
              >
                Clear Selected Course
              </button>
            </div>
            <div className="flex ml-auto">
              <button
                className="px-4 py-3 bg-[#4279A6] text-white rounded"
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
              className="px-8 py-3 w-full border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm rounded-md"
              value={borrowingDepartment}
              onChange={(e) => setBorrowingDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-[#434343]">
              Added Courses
            </label>
            <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-sm rounded-md">
              {borrowingCourses.map((borrowedCourse, index) => (
                <li key={index} className="border mb-2 p-2 cursor-pointer text-black">
                  {borrowedCourse.courses.join(", ")} -{" "}
                  {borrowedCourse.courseType} - Prerequisites:{" "}
                  {borrowedCourse.prerequisites ? "Yes" : "No"}
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
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-[#434343]">
              Course Type
            </label>
            <hr class="border-t-2 border-gray-300 shadow-md my-4" />
            <div className="flex space-x-5 text-black">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="supportiveCheckbox"
                  className="mr-2"
                  checked={courseType === "Supportive"}
                  onChange={() => setCourseType("Supportive")}
                />
                <label htmlFor="supportiveCheckbox">Supportive</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="commonCheckbox"
                  className="mr-2"
                  checked={courseType === "Common"}
                  onChange={() => setCourseType("Common")}
                />
                <label htmlFor="commonCheckbox">Common</label>
              </div>
              <div className="flex items-center">
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
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-[#434343]">
              Prerequisites
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="prerequisitesCheckbox"
                className="mr-2"
                checked={prerequisites}
                onChange={() => setPrerequisites(!prerequisites)}
              />
              <label htmlFor="prerequisitesCheckbox">Yes</label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
            <button
              className="px-4 py-3 bg-green-500 text-white rounded"
            >
              Save Transaction{" "}
            </button>
          </div>
    </div>
  );
};

export default CourseLeaseManagement;
