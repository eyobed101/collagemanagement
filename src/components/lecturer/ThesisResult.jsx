import React, { useState } from "react";
import {Select, Button, Input, Row, Col } from "antd";

const { Option } = Select;

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
            <Select
              value={academicYear}
              onChange={setAcademicYear}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Academic Year"
            >
                <Option value="" fontWeight="bold">
                Select Acadamic Year
              </Option>
              <Option value="2022/23">2022/23</Option>
              <Option value="2023/24">2023/24</Option>
            </Select>
          </div>
          <div>
            <Select
              value={chairDepartment}
              onChange={setChairDepartment}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Chair Department"
            >
                <Option value="" fontWeight="bold">
                Select Department
              </Option>
              <Option value="Computer Science">Computer Science</Option>
              <Option value="Information Science">Information Science</Option>
            </Select>
          </div>
         
          <div>
            <Select
              value={semester}
              onChange={setSemester}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Semester"
            >
                <Option value="" fontWeight="bold">
                Select Semister
              </Option>
              <Option value="Semester 1">Semester 1</Option>
              <Option value="Semester 2">Semester 2</Option>
            </Select>
          </div>
          <div>
            <Select
              value={chairPerson}
              onChange={setChairPerson}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Chair Person"
            >
                <Option value="" fontWeight="bold">
                Select Student
              </Option>
              <Option value="Kebede Mola">Kebede Mola</Option>
              <Option value="Ayele Afewerke">Ayele Afewerke</Option>
            </Select>
          </div>
          <div>
            <Select
              value={extExaminer}
              onChange={setExtExaminer}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="External Examiner"
            >
                <Option value="" fontWeight="bold">
                Select Student
              </Option>
              <Option value="Thomas Mola">Thomas Mola</Option>
              <Option value="Tarikua Afewerke">Tarikua Afewerke</Option>
            </Select>
          </div>
          <div>
            <Select
              value={studentName}
              onChange={setStudentName}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Student Name"
            >
                <Option value="" fontWeight="bold">
                Select ID
              </Option>
              <Option value="UGR/1876/11 | Solomon Abdi">
                UGR/1876/11 | Solomon Abdi
              </Option>
              <Option value="UGR/1886/12 | Kasahun Aminu">
                UGR/1886/12 | Kasahun Aminu
              </Option>
            </Select>
          </div>
          <div>
            <Select
              value={examinerDepartment}
              onChange={setExaminerDepartment}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Examiner Department"
            >
                <Option value="" fontWeight="bold">
                Select Collage
              </Option>
              <Option value="Computer Science">Computer Science</Option>
              <Option value="Electrical Science">Electrical Science</Option>
            </Select>
          </div>
          <div>
            <input
              value={examinerFromOutside}
              onChange={(e) => setExaminerFromOutside(e.target.value)}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Examiner from outside"
            />
          </div>
          <div>
            <Select
              value={thesisResult}
              onChange={setThesisResult}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Thesis Result"
            >
                <Option value="" fontWeight="bold">
                Select Grade
              </Option>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </div>
          <div>
            <Select
              value={examinerName}
              onChange={setExaminerName}
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              placeholder="Examiner Name"
            >
                <Option value="" fontWeight="bold">
                Select Applicant
              </Option>
              <Option value="Melat Mola">Melat Mola</Option>
              <Option value="Diriba Afewerke">Diriba Afewerke</Option>
            </Select>
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
