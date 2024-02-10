// src/components/AddDropManagement.js
import React, { useState } from "react";

const AddDropManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");

  const [selectedOfferingDepartment, setSelectedOfferingDepartment] = useState(
    ""
  );
  const [selectedOfferingSection, setSelectedOfferingSection] = useState("");
  const [coursesToAdd, setCoursesToAdd] = useState([]);
  const [coursesToDrop, setCoursesToDrop] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const students = [
    {
      id: 1,
      name: "Student 1",
      department: "Dept A",
      section: "A",
      program: "Program A",
      term: "Term 1",
      courses: [],
    },
    {
      id: 2,
      name: "Student 2",
      department: "Dept B",
      section: "B",
      program: "Program B",
      term: "Term 2",
      courses: [],
    },
    {
      id: 3,
      name: "Student 3",
      department: "Dept A",
      section: "B",
      program: "Program A",
      term: "Term 1",
      courses: [],
    },
    {
      id: 4,
      name: "Student 4",
      department: "Dept B",
      section: "A",
      program: "Program B",
      term: "Term 2",
      courses: [],
    },
    {
      id: 1,
      name: "Student 5",
      department: "Dept B",
      section: "B",
      program: "Program A",
      term: "Term 1",
      courses: [],
    },
    {
      id: 2,
      name: "Student 6",
      department: "Dept A",
      section: "A",
      program: "Program B",
      term: "Term 2",
      courses: [],
    },
  ];

  const courses = [
    { id: 101, name: "Course 1", department: "Dept A", section: "A" },
    { id: 102, name: "Course 2", department: "Dept B", section: "B" },
    { id: 102, name: "Course 33", department: "Dept A", section: "A" },
    { id: 102, name: "Course 21", department: "Dept B", section: "B" },
    { id: 102, name: "Course 3", department: "Dept C", section: "A" },
    { id: 102, name: "Course 11", department: "Dept C", section: "B" },
    { id: 102, name: "Course 6", department: "Dept C", section: "A" },
    { id: 102, name: "Course 7", department: "Dept A", section: "B" },
    { id: 102, name: "Course 5", department: "Dept B", section: "A" },
    { id: 102, name: "Course 8", department: "Dept C", section: "B" },
    { id: 102, name: "Course 7", department: "Dept B", section: "A" },
    { id: 102, name: "Course 9", department: "Dept A", section: "B" },
    { id: 102, name: "Course 10", department: "Dept A", section: "A" },
  ];

  const filteredStudents = students.filter(
    (student) =>
      (!selectedDepartment || student.department === selectedDepartment) &&
      (!selectedSection || student.section === selectedSection) &&
      (!selectedProgram || student.program === selectedProgram) &&
      (!selectedTerm || student.term === selectedTerm)
  );

  const filteredCourses = courses.filter(
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
    <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md">
      <div class="grid grid-cols-4 mt-10">
        <div class="col-span-4 sm:col-span-2">
          <div className="flex flex-wrap w-full">
            <div className="mr-5 mb-10 flex flex-col w-full">
              <label
                for="departmentOption"
                className="block text-lg font-semibold text-[#434343] mb-2"
              >
                Student's Departiment{" "}
              </label>
              <select
                id="departmentOption"
                className="px-8 py-3 border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm  rounded-md"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Dept A">Dept A</option>
                <option value="Dept B">Dept B</option>
              </select>
            </div>

            <div className="mr-5 mb-10 flex flex-col w-full">
              <label
                for="departmentOption"
                className="block text-lg font-semibold mb-2 text-[#434343]"
              >
                Student's Section{" "}
              </label>
              <select
                className="px-8 py-3 border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm  rounded-md"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            <div className="mr-5 mb-10 flex flex-col w-[100%] sm:w-[45%]">
              <label
                for="departmentOption"
                className="block text-lg font-semibold mb-2 text-[#434343]"
              >
                Program{" "}
              </label>
              <select
                className="px-8 py-3 border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm  rounded-md"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                <option value="">Select Program</option>
                <option value="Program A">Program A</option>
                <option value="Program B">Program B</option>
              </select>
            </div>

            <div className="mb-10 flex flex-col w-[100%] sm:w-[45%]">
              <label
                for="departmentOption"
                className="block text-lg font-semibold mb-2 text-[#434343]"
              >
                Term/Acadamic Year{" "}
              </label>
              <select
                className="px-8 py-3 border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm  rounded-md"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option value="">Select Term</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-2 mb-10 mr-10 border p-2 rounded-md">
                <label className="block text-lg font-semibold mr-5 text-[#434343]">
                  Number of Students
                </label>

                <label className="px-8 py-2 border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm  rounded-md">
                  {filteredStudents.length}
                </label>
              </div>
              <div className="grid grid-cols-2 mb-10 mr-10 border p-2 rounded-md">
                <label className="block text-lg font-semibold text-[#434343] mr-5">
                  Today's Date{" "}
                </label>

                <label className="px-8 py-2 border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm  rounded-md">
                  {new Date(Date.now()).toLocaleDateString()}{" "}
                  {new Date(Date.now()).toLocaleTimeString()}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-4 sm:col-span-2 min-w-[300px]">
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Students under selected Section
          </h2>
          <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto h-full shadow-sm rounded-md">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className={`border mb-2 p-2 cursor-pointer text-black${
                  selectedUser && selectedUser.id === student.id
                    ? "bg-blue-100"
                    : ""
                }`}
                onClick={() => {
                  setSelectedUser(selectedUser === student ? null : student);
                  setCoursesToAdd([]);
                  setCoursesToDrop([]);
                }}
              >
                {student.id} - {student.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr class="border-t-2 border-gray-300 shadow-md my-4" />

      <div class="grid grid-cols-2 gap-2">
        <div class="col-span-2 sm:col-span-1">
          <select
            className="px-8 py-3 w-full border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm  rounded-md"
            value={selectedOfferingDepartment}
            onChange={(e) => setSelectedOfferingDepartment(e.target.value)}
          >
            <option value="">Select Offering Department</option>
            <option value="Dept A">Dept A</option>
            <option value="Dept B">Dept B</option>
          </select>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <select
            className="px-8 py-3 w-full border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm  rounded-md"
            value={selectedOfferingSection}
            onChange={(e) => setSelectedOfferingSection(e.target.value)}
          >
            <option value="">Select Offering Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
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
              {filteredCourses.map((course) => (
                <div key={course.id} className="border p-4 mb-2">
                  {course.id} - {course.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div class="col-span-3 sm:col-span-1">
          <div className="mb-8">
            <h2 className="block text-lg font-semibold mb-2 text-[#434343]">
              Courses to be Added
            </h2>
            <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto max-h-48 min-h-[200px] shadow-sm rounded-md">
              {coursesToAdd.map((course) => (
                <div key={course.id} className="border p-4 mb-2">
                  {course.id} - {course.name}
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
            <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto max-h-48 min-h-[200px] shadow-sm rounded-md">
              {coursesToDrop.map((course) => (
                <div key={course.id} className="border p-4 mb-2">
                  {course.id} - {course.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded ml-auto"
        onClick={() => console.log("ADD/DROP clicked")}
      >
        ADD/DROP
      </button>
    </div>
  );
};

export default AddDropManagement;
