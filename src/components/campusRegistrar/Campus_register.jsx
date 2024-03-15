import React, { useState , useEffect} from 'react';
import { Space, Table, Button, Col, DatePicker, Drawer, Form, Input, Row, Select ,Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from '../constants';
// import SiderGenerator from './Menu';

import Grid from "@mui/material/Grid";


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
  { id: 1, year: 'Degree' },
  { id: 2, year: 'Masters' },
  { id: 3, year: 'Doctrate' },
  // Add more campuses as needed
];




const CampusRegistrar = () => {
 
//   const dispatch = useDispatch();
   const navigate = useNavigate();
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [student , setStudent] = useState([])
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/api/Applicants`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      key: "program"
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






  const handleCampusChange = async(value) => {
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
       student.filter((stu) => stu.programType == campus  )
    );
    console.log("ggg ", campus)
    if (campus,year) {
      return student.filter((student) => student.programType == campus && student.program == year);
      conso

    } else if (campus) {
      return student.filter(
        (student) => student.programType == campus);
    }
   else {
      return student;
    }
  };
  
  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
        {/* <SiderGenerator navigate={navigate}/> */}
    <div className="list-header mb-2 ml-100 w-[100%] overflow-x-hidden">
      <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]">Campus Registrar Management System</h1>
    </div>
    <div class="flex gap-10 p-10 ml-[0%]">
    <Space direction="horizontal" size={16}>
    {noUsers.map(item => (
         <Card
         key={item.id}
         size="small"
         title={item.name}
         headStyle={{fontSize:16 , fontWeight: 'bold' , color: 'black'}}
       //   extra={<a href="#">More</a>}
         style={{
           width: 200
         }}
       >
         <p className='font-bold text-base text-gray-500'> {item.number} people</p>
         <div style={{ display:'flex', flexDirection:'row'}}>
         <p className='text-xl font-light'>increased by </p>
         <p className='text-xl font-light text-green-500'>    {item.number/200}%</p>
         </div>
       </Card>

    ))}
  </Space>
  
   </div>
    <div className="list-sub mb-10 ml-[2%]">
      <div className="list-filter">
        <Select
          bordered={false}
          className="!rounded-[6px] border-[#EAECF0] border-[2px]"
          placeholder="--Select Campus ---"
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
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
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
 <div className="list-sub mb-10 ml-[2%]">
 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
         <Grid item xs={12} sm={12} md={12}>
          <Card
            bordered={false}
            className="w-[100%] min-h-[419px]"
          >
            <div>
            <div>
        {/* Display student records based on selected campus and year */}
        {/* {selectedCampus && selectedYear && ( */}
          <div className="" >
          <h2 className="text-xl  font-[600] font-jakarta ">Student Records for {selectedYear} </h2>
            <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => handleView(record), // click row
          };
        }}
        style={{ marginTop: 20 }}
      dataSource={student} columns={columns}  bordered  loading={loading}
      rowKey={(record) => record.studId}
      pagination={{ pageSize: 10 }} />
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

export default CampusRegistrar;