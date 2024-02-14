import React, { useState } from "react";
import courseTableData from "@/data/courses";
import addDropTableData from "@/data/addrop";

const StudentCourseRegistration = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [program, setProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [term, setTerm] = useState("");
  const [department, setDepartment] = useState("");
  const [coursesAssigned, setCoursesAssigned] = useState(0);
  const [todaysDate, setTodaysDate] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [coursesUnderSection, setCoursesUnderSection] = useState(["Mathimatics", "Biology", "Software Designing", "Introduction to Economics", "World Business"]);

  const studentsUnderSection = ["(RVGODAcE0) Kebede Fantu Temesgen", "(RVGODAcE0) Gemechu Kassa Geleta", "(RVGODAcE0) Abel Dessalegn Sambi","(RVGODAcE0) Robert Madu Alex", "(RVGODAcE0) Mickel Samuel David"];

  const handleSectionChange = (section) => {

    setSelectedSection(section);
    setProgram("Degree");
    setBatch("");
    setTerm("2");
    setDepartment("Computer Science");
    setCoursesAssigned(5); 
    setTodaysDate(new Date().toLocaleDateString());
  };

  const handleCourseClick = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((selectedCourse) => selectedCourse !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleClearSelectedCourses = () => {
    const updatedCourses = coursesUnderSection.filter(
      (course) => !selectedCourses.includes(course)
    );

    setSelectedCourses([]);

    setCoursesUnderSection(updatedCourses);
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
            <option value="(AUC)1009281">(AUC)1009281</option>
            <option value="(AUC)1043281">(AUC)1043281</option>
            <option value="(AUC)1043281">(AUC)1043281</option>
            <option value="(AUC)1143281">(AUC)1143281</option>
            <option value="(AUC)1043251">(AUC)1043251</option>
            <option value="(AUC)1047751">(AUC)1047751</option>
            <option value="(AUC)1113251">(AUC)1113251</option>
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
            <div className="text-lg border p-2">{selectedSection ? program:""}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Batch:
            </label>
            <div className="text-lg border p-2">{selectedSection ? batch:""}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Term/Academic Year:
            </label>
            <div className="text-lg border p-2">{selectedSection?term:""}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Department:
            </label>
            <div className="text-lg border p-2">{selectedSection ? department:""}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Courses Assigned:
            </label>
            <div className="text-lg border p-2">{selectedSection ? coursesAssigned: ""}</div>
          </div>
          <div className="mb-4 border border-[#c2c2c2] p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Today's Date:
            </label>
            <div className="text-lg border p-2">{selectedSection ? todaysDate : ""}</div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Students Under Selected Section
          </h2>
          <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-sm rounded-md">
            {selectedSection ? studentsUnderSection.map((student, index) => (
              <div
                key={index}
                className="border mb-2 p-2 cursor-pointer text-black"
              >
                {student}
              </div>
            )):"Section has not been selected"}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Courses Under This Section
          </h2>
          <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-sm rounded-md">
            {selectedSection ? coursesUnderSection.map((course, index) => (
              <div
                key={index}
                // className="border mb-2 p-2 cursor-pointer text-black"
                onClick={() => handleCourseClick(course)}
                className={`border mb-2 p-2 cursor-pointer text-black ${
                  selectedCourses.includes(course) ? 'bg-gray-300' : ''
                }`}
              >
                {course}
              </div>
            )): "Section has not been selected" }
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
              {selectedSection ? studentsUnderSection.length:"0"}
            </div>
          </div>
          <div className="flex justify-between mb-4 border p-2 mr-4">
            <label className="block text-sm font-medium text-gray-600">
              Number of Courses:
            </label>
            <div className="text-lg font-semibold border px-5">
              {selectedSection ? coursesUnderSection.length : "0"}
            </div>
          </div>
          <div className="flex justify-between mb-4 border p-2 mr-4">
            <label className="block text-sm font-medium text-gray-600">
              Courses Assigned:
            </label>
            <div className="text-lg font-semibold border px-5">{selectedSection ? coursesAssigned:"0"}</div>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-1 bg-green-500 text-white rounded" onClick={handleClearSelectedCourses}
>
              Clear Selected Course{" "}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentCourseRegistration;
