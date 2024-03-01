import React, { useState , useEffect} from 'react';
import { Space, Table, Button, Col, DatePicker, Drawer, Form, Input, Row, Select ,Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import SiderGenerator from './Menu';

import Grid from "@mui/material/Grid";


// Mock data
const { Option } = Select;

const campuses = [
  { id: 1, name: 'Campus 1' },
  { id: 2, name: 'Campus 2' },
  // Add more campuses as needed
];
const noUsers =[
    {  id: 1 , name: 'Totalstudents' ,number: 4000 },
    {  id: 2 , name: 'TotalStaff' ,number: 200 },
    {  id: 3 , name: 'Graduated student this year' ,number: 400 },
    {  id: 4 , name: 'No of applicants' ,number: 376 },
]

const Acadamic = [
    { id: 1, year:2011},
    { id: 2, year: 2010 },
    { id: 3, year: 2009 },
    { id: 4, year: 2008 },
    { id: 5, year: 2007 },
    { id: 6, year: 2006 },
    { id: 7, year: 2005 },
    { id: 8, year: 2004 },
    // Add more campuses as needed
  ];
const studentRecords = {
  1: [
    { id: 101, name: 'Student 1', cgpa :'3.8', acadamicYear :2011, department :'computerscience' ,curricula:"tot13" },
    { id: 102, name: 'Student 2', cgpa :'2.8', acadamicYear :2010, department :'Electricalscience' ,curricula:"tot13" }, 
    // Add more students for Campus 1
  ],
  2: [
    { id: 201, name: 'Student 3', cgpa :'3.5', acadamicYear :2011, department :'informationscience' ,curricula:"tot13" },
    { id: 202, name: 'Student 4', cgpa :'3.2', acadamicYear :2013, department :'computerscience' ,curricula:"tot13" },
    // Add more students for Campus 2
  ],
  // Add more campuses as needed
};



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
        const response = await axios.get('https://localhost:7032/api/Applicants');
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

  const generateGraduateList = () => {
    // Implement logic to generate graduate list based on selected campus and year
    console.log('Generating graduate list...');
    // handlelogout()
  };

  const checkPaymentStatus = () => {
    // Implement logic to check payment status for selected campus
    console.log('Checking payment status...');
  };

  const getFilteredStudentRecords = (campus, year) => {
    console.log(campus ,year)
    console.log("test " ,studentRecords[1].filter(student => student.acadamicYear))
    if (studentRecords[campus]) {
      return studentRecords[campus].filter(student => student.acadamicYear === year);
    } else {
      return studentRecords[1];
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
          style={{ width: 120 }}
          onChange={handleCampusChange}
        >
          {campuses?.map((item, i) => (
            <Option key={item.id} value={item.id} lable={item.name}>
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