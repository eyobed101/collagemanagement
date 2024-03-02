import React, { useState } from 'react';
import { Select, Button, Table } from 'antd';

const { Option } = Select;

const GradeSubmission = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [studentData, setStudentData] = useState([]);

  const mockStudentData = [
    { id: 'UGR/1885/21', fullName: 'John Doe', score1: 19, score2: 12, score3: 8, score4: 37, acadamic:'2021/22' , course:'Section A| Introduction to Computer' , grade:'A'},
    { id: 'UGR/1897/21', fullName: 'Jane Smith', score1: 20, score2: 11, score3: 7, score4: 24 ,acadamic:'2021/22' ,course:'Section B| Introduction to Computer',grade:'A'},
   { id: 'UGR/1960/21', fullName: 'Thomas Boyle', score1: 13, score2: 10, score3: 9, score4: 30 ,acadamic:'2021/22' , course:'Section A| Introduction to Computer', grade:'A'},
    { id: 'UGR/1875/21', fullName: 'Smith Abel', score1: 22, score2: 14, score3: 10, score4: 42 , acadamic:'2021/22' ,course:'Section C| Introduction to Computer',grade:'B'},
    { id: 'UGR/1885/14', fullName: 'Kalab Doe', score1: 19, score2: 11, score3: 6, score4: 37, acadamic:'2021/22' , course:'Section A| Introduction to Computer',grade:'B'},
    { id: 'UGR/1897/15', fullName: 'Melat Smith', score1: 24, score2: 11, score3: 7, score4: 24 ,acadamic:'2022/23' ,course:'Section B| Introduction to Computer',grade:'A'},
   { id: 'UGR/1960/15', fullName: 'Seble Boyle', score1: 13, score2: 10, score3: 9, score4: 30 ,acadamic:'2023/24' , course:'Section A| Introduction to Computer',grade:'A'},
    { id: 'UGR/1875/15', fullName: 'Eyobed Abel', score1: 22, score2: 14, score3: 10, score4: 42 , acadamic:'2021/22' ,course:'Section C| Introduction to Computer',grade:'C'},
    { id: 'UGR/1885/12', fullName: 'Sole Doe', score1: 19, score2: 12, score3: 8, score4: 37, acadamic:'2022/23' , course:'Section A| Introduction to Computer',grade:'C'},
    { id: 'UGR/1897/12', fullName: 'Exo Smith', score1: 20, score2: 11, score3: 7, score4: 24 ,acadamic:'2023/24' ,course:'Section B| Introduction to Computer',grade:'A'},
   { id: 'UGR/1960/12', fullName: 'Eyob Boyle', score1: 13, score2: 10, score3: 9, score4: 30 ,acadamic:'2022/23' , course:'Section A| Introduction to Computer',grade:'A'},
    { id: 'UGR/1875/12', fullName: 'Wonde Abel', score1: 22, score2: 14, score3: 10, score4: 42 , acadamic:'2023/24' ,course:'Section C| Introduction to Computer',grade:'B'},
    // Add more student data here
  ];


  const handleGenerateData = () => {
    // Generate data for the selected academic year, course, and semester
    // For demonstration purposes, use mock data
    const filteredData = mockStudentData.filter(student => {
        return student.acadamic === academicYear;
    });

    const updatedData = filteredData.map(student => {
        const totalScore = student.score1 + student.score2 + student.score3 + student.score4;
        const grade = convertToLetterGrade(totalScore);

        return {
            ...student,
            total: totalScore,
            grade: grade
        };
    });

    setStudentData(updatedData);
};


  const handleSubmitData = () => {
    // Submit student data
    // Implement your submit logic here
    console.log('Submitted data:', studentData);
  };

  const convertToLetterGrade = (grade) => {
    if (grade > 85) {
      return 'A+';
    } else if (grade > 80) {
      return 'A-';
    } else if (grade > 75) {
      return 'B+';
    } else if (grade > 70) {
      return 'B';
    } else if (grade > 65) {
      return 'B-';
    } else if (grade > 60) {
      return 'C+';
    } else if (grade > 50) {
      return 'C';
    } else {
      return 'F';
    }
  };

  const handleAcadamic = async (value) => {
    setAcademicYear(value);
  };
  const handleCourse = async(value) =>{
    setCourse(value);
  }
  const handleSemister = async (value) => {
       setSemester(value);
  }

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
      title: '25%',
      dataIndex: 'score1',
      key: 'score1'
    },
    {
      title: '15%',
      dataIndex: 'score2',
      key: 'score2'
    },
    {
      title: '10%',
      dataIndex: 'score3',
      key: 'score3'
    },
    {
      title: '50%',
      dataIndex: 'score4',
      key: 'score4'
    },
    {
      title: 'Total (100%)',
      key: 'total',
      render: (text, record) => {
        const total = record.score1 + record.score2 + record.score3 + record.score4;
        return <span>{total}</span>;
      }
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade'
    },
    {
      title: 'NG',
      dataIndex: 'ng',
      key: 'ng'
    },
    {
      title: 'IA',
      dataIndex: 'ia',
      key: 'ia'
    },
    {
      title: 'F',
      dataIndex: 'f',
      key: 'f'
    }
  ];

  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
    {/* <SiderGenerator /> */}
<div className="list-header mb-2 ml-100">
  <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">Grade Submission</h1>
</div>
<div className="list-sub mb-10 ml-[2%] ">
 {/* {handleGrade()} */}
  <div className="list-filter"></div>      
  <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' , justifyContent: 'flex-start' , display:'flex' }}>
      <div style={{display:'flex' , flexDirection:'column', marginRight:'20%'}}>
      <label>Acadamic Year</label>  
        <Select value={academicYear} onChange={handleAcadamic} 
        placeholder="Select Academic Year"
         style={{ marginRight: '8px', width:350 , height:40 }}>
          {/* Add academic year options */}
          <Option value="2021/22">2021/22</Option>
            <Option value="2022/23">2022/23</Option>
            <Option value="2023/24">2023/24</Option>
        </Select>
        </div>
        <div style={{display:'flex' , flexDirection:'column'}}>
      <label>Course</label> 
        <Select value={course} onChange={handleCourse} placeholder="Select Course" style={{
             marginRight: '8px',  width:350 , height:40 }}>
          {/* Add course options */}
          <Option value="Section A| Introduction to Computer">Section A| Introduction to Computer</Option>
            <Option value="Section B| Introduction to Computer">Section B| Introduction to Computer</Option>
            <Option value="Section C| Introduction to Computer">Section C| Introduction to Computer</Option>
        </Select>
        </div>
      </div>
      <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' , justifyContent:'flex-start' , display:'flex' }}>
      <div style={{display:'flex' , flexDirection:'column', marginRight:'20%'}}>
      <label>Semister</label> 
        <Select value={semester} onChange={handleSemister} placeholder="Select Semester" 
        style={{ marginRight: '8px',  width:350 , height:40 }}>
          {/* Add semester options */}
          <Option value="1">Semester 1</Option>
           <Option value="2">Semester 2</Option>
        </Select>
        </div>
        <Button type="primary" style={{ marginBottom: 16 , margingLeft:20, marginTop :20, backgroundColor:'#4279A6' , justifySelf:'flex-end', display:'flex' }} onClick={handleGenerateData}>Show</Button>
        </div>
        <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' , justifyContent: 'flex-start' , display:'flex', backgroundColor: '#CFE4D9'}}>
        <Button type="primary" onClick={handleGenerateData} style={{ marginBottom: 16 ,marginLeft:'2%', marginTop :20, backgroundColor:'#FFF', color:'#4279A6', marginRight:"20%" }}>Generate</Button>
        <Button type="primary" onClick={handleSubmitData} style={{ marginBottom: 16 , margingLeft:20, marginTop :20, backgroundColor:'#4279A6'  }}>Submit</Button>
        </div>
      <Table dataSource={studentData} columns={columns} />
    </div>
    </div>
  );
};

export default GradeSubmission;
