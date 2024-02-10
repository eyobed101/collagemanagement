import React, { useState } from "react";

const StudentCourseRegistration = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [program, setProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [term, setTerm] = useState("");
  const [department, setDepartment] = useState("");
  const [coursesAssigned, setCoursesAssigned] = useState(0);
  const [todaysDate, setTodaysDate] = useState("");

  const studentsUnderSection = ["Student 1", "Student 2", "Student 3"];
  const coursesUnderSection = ["Course 1", "Course 2", "Course 3"];

  const handleSectionChange = (section) => {

    setSelectedSection(section);
    setProgram("Your Program");
    setBatch("Your Batch");
    setTerm("Your Term");
    setDepartment("Your Department");
    setCoursesAssigned(5); 
    setTodaysDate(new Date().toLocaleDateString());
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md">
      <div>
        <h2 className="text-lg font-semibold mb-2 text-[#434343]">
          Section Selection
        </h2>
        <div className="mb-4">
          <select
            className="px-8 py-3 w-full border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm rounded-md"
            value={selectedSection}
            onChange={(e) => handleSectionChange(e.target.value)}
          >
            <option value="">Select Section</option>
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
          </select>
        </div>
      </div>

      {/* Information Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-[#434343]">
          Information
        </h2>
        <div className="grid grid-cols-1  sm:grid-cols-3 mb-5">
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Program:
            </label>
            <div className="text-lg border p-2">{program}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Batch:
            </label>
            <div className="text-lg border p-2">{batch}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Term/Academic Year:
            </label>
            <div className="text-lg border p-2">{term}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Department:
            </label>
            <div className="text-lg border p-2">{department}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Courses Assigned:
            </label>
            <div className="text-lg border p-2">{coursesAssigned}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Today's Date:
            </label>
            <div className="text-lg border p-2">{todaysDate}</div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Students Under Selected Section
          </h2>
          <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-sm rounded-md">
            {studentsUnderSection.map((student, index) => (
              <div
                key={index}
                className="border mb-2 p-2 cursor-pointer text-black"
              >
                {student}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Courses Under This Section
          </h2>
          <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-sm rounded-md">
            {coursesUnderSection.map((course, index) => (
              <div
                key={index}
                className="border mb-2 p-2 cursor-pointer text-black"
              >
                {course}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex justify-between mb-4 border p-2 mr-4">
            <label className="block text-sm font-medium text-gray-600">
              Number of Students:
            </label>
            <div className="text-lg font-semibold border px-5">
              {studentsUnderSection.length}
            </div>
          </div>
          <div className="flex justify-between mb-4 border p-2 mr-4">
            <label className="block text-sm font-medium text-gray-600">
              Number of Courses:
            </label>
            <div className="text-lg font-semibold border px-5">
              {coursesUnderSection.length}
            </div>
          </div>
          <div className="flex justify-between mb-4 border p-2 mr-4">
            <label className="block text-sm font-medium text-gray-600">
              Courses Assigned:
            </label>
            <div className="text-lg font-semibold border px-5">{coursesAssigned}</div>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-1 bg-green-500 text-white rounded">
              Clear Selected Course{" "}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentCourseRegistration;
