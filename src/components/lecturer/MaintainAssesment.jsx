import React, { useState } from 'react';
import { Select, Button, Table } from 'antd';

const { Option } = Select;

const MaintainAssesgment = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [studentData, setStudentData] = useState([]);

  // Mock student data
  const mockStudentData = [
    { id: 'UGR/1885/21', fullName: 'John Doe', midExam: 19, assessment: 12, presentation: 8, finalExam: 37, acadamic:'2021/22' , course:'Section A| Introduction to Computer'},
    { id: 'UGR/1897/21', fullName: 'Jane Smith', midExam: 20, assessment: 11, presentation: 7, finalExam: 24 ,acadamic:'2021/22' ,course:'Section B| Introduction to Computer'},
   { id: 'UGR/1960/21', fullName: 'Thomas Boyle', midExam: 13, assessment: 10, presentation: 9, finalExam: 30 ,acadamic:'2021/22' , course:'Section A| Introduction to Computer'},
    { id: 'UGR/1875/21', fullName: 'Smith Abel', midExam: 22, assessment: 14, presentation: 10, finalExam: 42 , acadamic:'2021/22' ,course:'Section C| Introduction to Computer'},
    { id: 'UGR/1885/14', fullName: 'Kalab Doe', midExam: 19, assessment: 11, presentation: 13, finalExam: 37, acadamic:'2021/22' , course:'Section A| Introduction to Computer'},
    { id: 'UGR/1897/15', fullName: 'Melat Smith', midExam: 24, assessment: 11, presentation: 7, finalExam: 24 ,acadamic:'2022/23' ,course:'Section B| Introduction to Computer'},
   { id: 'UGR/1960/15', fullName: 'Seble Boyle', midExam: 13, assessment: 10, presentation: 9, finalExam: 30 ,acadamic:'2023/24' , course:'Section A| Introduction to Computer'},
    { id: 'UGR/1875/15', fullName: 'Eyobed Abel', midExam: 22, assessment: 14, presentation: 10, finalExam: 42 , acadamic:'2021/22' ,course:'Section C| Introduction to Computer'},
    { id: 'UGR/1885/12', fullName: 'Sole Doe', midExam: 19, assessment: 12, presentation: 8, finalExam: 37, acadamic:'2022/23' , course:'Section A| Introduction to Computer'},
    { id: 'UGR/1897/12', fullName: 'Exo Smith', midExam: 20, assessment: 11, presentation: 7, finalExam: 24 ,acadamic:'2023/24' ,course:'Section B| Introduction to Computer'},
   { id: 'UGR/1960/12', fullName: 'Eyob Boyle', midExam: 13, assessment: 10, presentation: 9, finalExam: 30 ,acadamic:'2022/23' , course:'Section A| Introduction to Computer'},
    { id: 'UGR/1875/12', fullName: 'Wonde Abel', midExam: 22, assessment: 14, presentation: 10, finalExam: 42 , acadamic:'2023/24' ,course:'Section C| Introduction to Computer'},
    // Add more student data here
  ];

  const handleShowData = () => {
    // Filter student data based on selected academic year, course, and semester
    // Here, you should fetch the data from your API based on the selected filters
    // For demo purposes, filtering the mock data
    const filteredData = mockStudentData.filter(student => {
        console.log(student);
       return  student.acadamic === academicYear  
    });
    console.log(filteredData);
    console.log(academicYear , course)
    setStudentData(filteredData); //udentData, filteredData); //:'udentData);
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1
    },
    {
      title: 'ID No',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Mid Exam',
      dataIndex: 'midExam',
      key: 'midExam'
    },
    {
      title: 'Assessment',
      dataIndex: 'assessment',
      key: 'assessment'
    },
    {
      title: 'Presentation',
      dataIndex: 'presentation',
      key: 'presentation'
    },
    {
      title: 'Final Exam',
      dataIndex: 'finalExam',
      key: 'finalExam'
    },
    {
      title: 'Total',
      key: 'total',
      render: (text, record) => record.midExam + record.assessment + record.presentation + record.finalExam
    }
  ];

  const handleAcadamic = async (value) => {
    setAcademicYear(value);
  };
  const handleCourse = async(value) =>{
    setCourse(value);
  }
  const handleSemister = async (value) => {
       setSemester(value);
  }

  return (
            <div className="mb-8 flex flex-col gap-12 bg-white p-5 rounded-md ">
    {/* <SiderGenerator /> */}
<div className="list-header mb-2 ml-100">
  <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">Maintain Assesment</h1>
</div>
<div className="list-sub mb-10 ml-[2%] ">
 {/* {handleGrade()} */}
  <div className="list-filter"></div>
      <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' , justifyContent: 'flex-start' , display:'flex' }}>
      <div style={{display:'flex' , flexDirection:'column' , marginRight:'20%'}}>
      <label>Acadamic Year</label>  
        <Select value={academicYear} 
             onChange={handleAcadamic}
         placeholder="Select Academic Year" 
         style={{ marginRight: '8px' ,width:350,height:40 }}>
          {/* Add academic year options */}
          <Option value="2021/22">2021/22</Option>
            <Option value="2022/23">2022/23</Option>
            <Option value="2023/24">2023/24</Option>

        </Select>
        </div>
        <div style={{display:'flex' , flexDirection:'column'}}>
        <label>Course</label>  
        <Select value={course} onChange={handleCourse} placeholder="Select Course" style={{ marginRight: '8px',width:350,height:40 }}>
          {/* Add course options */}
          <Option value="Section A| Introduction to Computer">Section A| Introduction to Computer</Option>
            <Option value="Section B| Introduction to Computer">Section B| Introduction to Computer</Option>
            <Option value="Section C| Introduction to Computer">Section C| Introduction to Computer</Option>
        </Select>
        </div>
      </div>
      <div style={{ marginBottom: '16px' , flexDirection :'row' , justifyContent:'flex-start' , flex:1 , display:'flex' }}>
      <div style={{display:'flex' , flexDirection:'column' , marginRight:'20%'}}>
      <label>Semister</label>  
      <Select value={semester} onChange={handleSemister} placeholder="Select Semester" style={{ marginRight: '8px', width:350, height:40  }}>
          {/* Add semester options */}
          <Option value="1">Semester 1</Option>
           <Option value="2">Semester 2</Option>
          
        </Select>
        </div>
        <Button type="primary" onClick={handleShowData} style={{ marginBottom: 16 , margingRight:'20%', marginTop :20, backgroundColor:'#4279A6' , justifySelf:'flex-end',  }}>Show Data</Button>
      </div>
      <Table dataSource={studentData} columns={columns} />
    </div>
    </div>
  );
};

export default MaintainAssesgment;
