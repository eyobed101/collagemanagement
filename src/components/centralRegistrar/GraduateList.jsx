import React, { useState, useEffect } from "react";
import { Table, Select } from "antd";
// import SiderGenerator from "./Menu";
import { useNavigate } from "react-router-dom";

// Mock data
const { Option } = Select;

const GraduatesList = ({}) => {
  const [graduatesList, setGraduatesList] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const navigate = useNavigate();

  const handleView = (data) => {
    navigate("/view-student", { state: { data } });
  };

  const Acadamic = [
    { id: 1, year: 2011 },
    { id: 2, year: 2010 },
    { id: 3, year: 2009 },
    { id: 4, year: 2008 },
    { id: 5, year: 2007 },
    { id: 6, year: 2006 },
    { id: 7, year: 2005 },
    { id: 8, year: 2004 },
    // Add more campuses as needed
  ];
  const campuses = [
    { id: 1, name: "Campus 1" },
    { id: 2, name: "Campus 2" },
    // Add more campuses as needed
  ];

  const studentsData = [
    {
      id: 101,
      name: "Student 1",
      cgpa: "3.8",
      acadamicYear: 2011,
      department: "computerscience",
      campus: "Campus 1",
      isGraduated: true,
    },
    {
      id: 102,
      name: "Student 2",
      cgpa: "2.8",
      acadamicYear: 2010,
      department: "Electricalscience",
      campus: "Campus 1",
      isGraduated: true,
    },
    {
      id: 103,
      name: "Student 5",
      cgpa: "2.8",
      acadamicYear: 2010,
      department: "Electricalscience",
      campus: "Campus 2",
      isGraduated: true,
    },
    {
      id: 104,
      name: "Student 6",
      cgpa: "2.8",
      acadamicYear: 2010,
      department: "Electricalscience",
      campus: "Campus 2",
      isGraduated: true,
    },
    {
      id: 201,
      name: "Student 3",
      cgpa: "3.5",
      acadamicYear: 2007,
      department: "informationscience",
      campus: "Campus 1",
      isGraduated: true,
    },
    {
      id: 202,
      name: "Student 4",
      cgpa: "3.2",
      acadamicYear: 2006,
      department: "computerscience",
      campus: "Campus 2",
      isGraduated: true,
    },
    {
      id: 202,
      name: "Student 14",
      cgpa: "3.2",
      acadamicYear: 2006,
      department: "computerscience",
      campus: "Campus 2",
      isGraduated: false,
    },
  ];

  useEffect(() => {
    // Filter graduates based on academic year and graduation status
    const filteredGraduates = studentsData.filter(
      (student) => student.isGraduated
    );

    setGraduatesList(filteredGraduates);
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Campus", dataIndex: "campus", key: "campus" },
    { title: "Academic Year", dataIndex: "acadamicYear", key: "acadamicYear" },
    { title: "Department", dataIndex: "department", key: "department" },
    // Add more columns as needed
  ];
  const handleCampusChange = async (value) => {
    setSelectedCampus(value);
    setSelectedYear(null); // Reset selected year when campus changes
  };
  const handleYearChange = async (value) => {
    setSelectedYear(value);
  };
  const getFilteredStudentRecords = (campus, year) => {
    console.log(campus, year);
    console.log(
      "test ",
      graduatesList.filter((student) => student.acadamicYear)
    );
    if ((campus, year)) {
      return graduatesList.filter(
        (student) => student.campus == campus && student.acadamicYear == year
      );
    } else if (campus) {
      return graduatesList.filter((student) => student.campus == campus);
    } else {
      return graduatesList;
    }
  };
  return (
    <div className="min-h-[100vh] gap-12 bg-white p-5 rounded-md">
      {/* <SiderGenerator navigate ={navigate}/> */}
      <div className="list-header mb-2 ml-100">
        
      </div>
      <div className="list-sub mb-10 ml-[2%]">
        <div className="list-filter">
          <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px] h-[45px] mr-2"
            placeholder="--Select Campus ---"
            style={{ width: 120 }}
            onChange={handleCampusChange}
          >
            {campuses?.map((item, i) => (
              <Option key={item.id} value={item.name} lable={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          {selectedCampus && (
            <Select
              bordered={false}
              className="!rounded-[6px] border-[#EAECF0] border-[2px] h-[45px]"
              style={{ width: 120 }}
              placeholder="--Select Acadamic Year---"
              onChange={handleYearChange}
            >
              {Acadamic?.map((item, i) => (
                <Option key={item.key} value={item.year} lable={item.year}>
                  {item.year}
                </Option>
              ))}
            </Select>
          )}
        </div>
      </div>
      <div className="ml-[2%]">
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => handleView(record), // click row
            };
          }}
          columns={columns}
          dataSource={getFilteredStudentRecords(selectedCampus, selectedYear)}
          pagination={{ position: ["bottomCenter"] }}
        />
      </div>
    </div>
  );
};

export default GraduatesList;
