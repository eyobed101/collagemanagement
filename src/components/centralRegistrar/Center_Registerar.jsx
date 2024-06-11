import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../constants";
// import SiderGenerator from './Menu';

import Grid from "@mui/material/Grid";
import axiosInstance from "@/configs/axios";

// Mock data
const { Option } = Select;

const campuses = [
  { id: 1, name: "Regular" },
  { id: 2, name: "Extension" },
  // Add more campuses as needed
];
const noUsers = [
  { id: 1, name: "Totalstudents", number: 4000 },
  { id: 2, name: "TotalStaff", number: 200 },
  { id: 3, name: "Graduated student this year", number: 400 },
  { id: 4, name: "No of applicants", number: 376 },
];

const Acadamic = [
  { id: 1, year: "Degree" },
  { id: 2, year: "Masters" },
  { id: 3, year: "Doctrate" },
  // Add more campuses as needed
];

const CenterRegistrar = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/Applicants`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: (
        <p className="font-jakarta font-[600] text-[16px] text-[#344054]">
          Name
        </p>
      ),
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span>{`${record.fname} ${record.mname}`}</span>
      ),
    },
    {
      title: <p className="font-jakarta  font-[600]"> Student ID</p>,
      key: "studId",
      dataIndex: "studId",
    },
    {
      title: <p className="font-jakarta  font-[600]">Program</p>,
      dataIndex: "program",
      key: "program",
    },
    {
      title: <p className="font-jakarta  font-[600]">Approved </p>,
      dataIndex: "approved",
      key: "approved",
    },
    {
      title: <p className="font-jakarta  font-[600]">Program Type</p>,
      dataIndex: "programType",
      key: "programType",
    },
    {
      title: <p className="font-jakarta  font-[600]">Center ID</p>,
      dataIndex: "centerId",
      key: "centerId",
    },
  ];

  const handleView = (data) => {
    navigate("/view-student", { state: { data } });
  };

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
      "test is kal ",
      student.filter((stu) => stu.programType == campus)
    );
    console.log("ggg ", campus);
    if ((campus, year)) {
      return student.filter(
        (student) => student.programType == campus && student.program == year
      );
      conso;
    } else if (campus) {
      return student.filter((student) => student.programType == campus);
    } else {
      return student;
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-12 bg-white mt-6 p-5 rounded-md">
      {/* <SiderGenerator navigate={navigate}/> */}
      {/* <div className="list-header mb-2 ml-100 w-[100%] overflow-x-hidden">
      <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]">Campus Registrar Management System</h1>
    </div> */}
      <div className="flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-10 p-4 md:p-10">
          {noUsers.map((item) => (
            <div
              key={item.id}
              className="flex justify-center">
              <Card
                size="small"
                title={item.name}
                headStyle={{ fontSize: 16, fontWeight: "bold", color: "black" }}
                className="w-full sm:w-[400px] lg:w-[300px] flex flex-col justify-between bg-opacity-25 bg-gray-200 backdrop-filter backdrop-blur-lg rounded-lg shadow-md px-4 pt-4"
              >
                <div className="my-2">
                  <p className="font-bold text-lg text-gray-700">
                    {item.number} people
                  </p>
                  <div className="flex items-center">
                    <p className="text-base text-gray-600">Increased by</p>
                    <p className="ml-1 text-lg text-green-500">
                      {(item.number / 200).toFixed(2)}%
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 float-right bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                  View More
                </button>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      <div className="list-sub mb-10 ml-[2%]">
        <div className="list-filter">
          <Select
            bordered={false}
            className="!rounded-[6px] border-[#dbe4f5] border-[2px] h-[45px] font-bold"
            placeholder="Select Program"
            style={{ width: 250 }}
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
              className="!rounded-[6px] border-[#EAECF0] border-[2px] h-[45px] ml-5 font-bold"
              style={{ width: 120 }}
              placeholder="Select Acadamic Year---"
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
      <div className="list-sub mb-10 ml-[2%]">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item xs={12} sm={12} md={12}>
            <Card bordered={false} className="w-[100%] min-h-[419px]">
              <div>
                <div>
                  {/* Display student records based on selected campus and year */}
                  {/* {selectedCampus && selectedYear && ( */}
                  <div className="">
                    <h2 className="text-xl  font-[600] font-jakarta ">
                      Student Records for {selectedYear}{" "}
                    </h2>
                    <Table
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: (event) => handleView(record), // click row
                        };
                      }}
                      style={{ marginTop: 20 }}
                      dataSource={student}
                      columns={columns}
                      bordered
                      loading={loading}
                      rowKey={(record) => record.studId}
                      pagination={{ pageSize: 10 }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CenterRegistrar;
