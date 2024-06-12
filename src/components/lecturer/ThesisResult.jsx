import React, { useState } from "react";
import { Button, Input, Row, Col } from "antd";

// const { option } = select;

const ThesisResult = () => {
  // State variables for selected values
  const [academicYear, setAcademicYear] = useState("");
  const [chairDepartment, setChairDepartment] = useState("");
  const [extExaminerDepartment, setExtExaminerDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [chairPerson, setChairPerson] = useState("");
  const [extExaminer, setExtExaminer] = useState("");
  const [studentName, setStudentName] = useState("");
  const [examinerDepartment, setExaminerDepartment] = useState("");
  const [examinerFromOutside, setExaminerFromOutside] = useState("");
  const [thesisResult, setThesisResult] = useState("");
  const [examinerName, setExaminerName] = useState("");

  // Function to handle form submission
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted!");
  };

  return (
    <div className="mt-8 flex flex-col gap-12 bg-white rounded-md">
      {/* <SiderGenerator /> */}

      <div className="mt-8 flex flex-col gap-12 bg-white p-5 rounded-md min-h-screen shadow-md">
        <div className="list-header mb-2 ml-100">
          <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">
            Thesis Result Submission Form
          </h1>
        </div>

        <div className="list-sub mb-10 ml-[2%] p-5 shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <select
              value={academicYear}
              onChange={setAcademicYear}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Academic Year"
            >
                <option value="" fontWeight="bold">
                Select Acadamic Year
              </option>
              <option value="2022/23">2022/23</option>
              <option value="2023/24">2023/24</option>
            </select>
          </div>
          <div>
            <select
              value={chairDepartment}
              onChange={setChairDepartment}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Chair Department"
            >
                <option value="" fontWeight="bold">
                Select Department
              </option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Science">Information Science</option>
            </select>
          </div>
         
          <div>
            <select
              value={semester}
              onChange={setSemester}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Semester"
            >
                <option value="" fontWeight="bold">
                Select Semister
              </option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
            </select>
          </div>
          <div>
            <select
              value={chairPerson}
              onChange={setChairPerson}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Chair Person"
            >
                <option value="" fontWeight="bold">
                Select Student
              </option>
              <option value="Kebede Mola">Kebede Mola</option>
              <option value="Ayele Afewerke">Ayele Afewerke</option>
            </select>
          </div>
          <div>
            <select
              value={extExaminer}
              onChange={setExtExaminer}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="External Examiner"
            >
                <option value="" fontWeight="bold">
                Select Student
              </option>
              <option value="Thomas Mola">Thomas Mola</option>
              <option value="Tarikua Afewerke">Tarikua Afewerke</option>
            </select>
          </div>
          <div>
            <select
              value={studentName}
              onChange={setStudentName}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Student Name"
            >
                <option value="" fontWeight="bold">
                Select ID
              </option>
              <option value="UGR/1876/11 | Solomon Abdi">
                UGR/1876/11 | Solomon Abdi
              </option>
              <option value="UGR/1886/12 | Kasahun Aminu">
                UGR/1886/12 | Kasahun Aminu
              </option>
            </select>
          </div>
          <div>
            <select
              value={examinerDepartment}
              onChange={setExaminerDepartment}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Examiner Department"
            >
                <option value="" fontWeight="bold">
                Select Collage
              </option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Science">Electrical Science</option>
            </select>
          </div>
          <div>
            <input
              value={examinerFromOutside}
              onChange={(e) => setExaminerFromOutside(e.target.value)}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Examiner from outside"
            />
          </div>
          <div>
            <select
              value={thesisResult}
              onChange={setThesisResult}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Thesis Result"
            >
                <option value="" fontWeight="bold">
                Select Grade
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div>
            <select
              value={examinerName}
              onChange={setExaminerName}
              className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Examiner Name"
            >
                <option value="" fontWeight="bold">
                Select Applicant
              </option>
              <option value="Melat Mola">Melat Mola</option>
              <option value="Diriba Afewerke">Diriba Afewerke</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-5">
          <Button
            type="primary"
            onClick={handleSubmit}
            className="px-6 py-2 bg-white text-black border flex justify-center items-center font-semibold p-20 border-gray-300 rounded-md shadow-md"
          >
            Submit
          </Button>
          <Button
            type="secondary"
            //   onClick={handleCancel}
            className="px-6 py-2 bg-white text-black border flex justify-center items-center font-semibold p-20 border-gray-300 rounded-md shadow-md"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThesisResult;
