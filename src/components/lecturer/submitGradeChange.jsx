import React, { useState } from 'react';
import { Select, InputNumber, Input, Button, Table, Row, Col } from 'antd';

const { Option } = Select;

const GradeChangeSubmission = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [student, setStudent] = useState('');
  const [prevTotalMark, setPrevTotalMark] = useState('');
  const [reason, setReason] = useState('');
  const [newTotalMark, setNewTotalMark] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [assessmentData, setAssessmentData] = useState([]);
  const [filteredAssessmentData, setFilteredAssessmentData] = useState([]);


  const assessmentDatas = [
    {assessmentTitle: "Mid Exam(25%)" , prevResult: '19' , newResult :'19'},
    {assessmentTitle: "Assignment(15%)" , prevResult: '12' , newResult :'12'},
    {assessmentTitle: "Presentation(10%)" , prevResult: '7' , newResult :'7'},
    {assessmentTitle: "Final Exam(50%)" , prevResult: '33' , newResult :'33'},
  ]

  const handleAddAssessment = () => {
    setAssessmentData([
      ...assessmentData,
      {
        key: assessmentData.length + 1,
        assessmentTitle: '',
        prevResult: '',
        newResult: '',
      },
    ]);
  };

  const handleSave = () => {
    // Add your save logic here
    console.log({
      academicYear,
      course,
      semester,
      student,
      prevTotalMark,
      reason,
      assessmentData,
      newTotalMark,
      newGrade,
    });
    // Clear form fields after saving
    setAcademicYear('');
    setCourse('');
    setSemester('');
    setStudent('');
    setPrevTotalMark('');
    setReason('');
    setAssessmentData([]);
    setNewTotalMark('');
    setNewGrade('');
  };

  const handleStudentChange = (value) => {
    setStudent(value);
    // Filter assessment data based on selected student
    // const filteredData = assessmentDatas.filter((item) => item.student === value);
    setFilteredAssessmentData(assessmentDatas);
    // console.log("test  ", filteredData)
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Assessment Title',
      dataIndex: 'assessmentTitle',
      key: 'assessmentTitle',
    //   render: (_, record) => (
    //     <Input
    //       value={record.assessmentTitle}
    //       onChange={(e) => handleAssessmentTitleChange(e, record.key)}
    //     />
    //   ),
    },
    {
      title: 'Prev.Result',
      dataIndex: 'prevResult',
      key: 'prevResult',
      render: (_, record) => (
        <Input
          value={record.prevResult}
          onChange={(e) => handlePrevResultChange(e, record.key)}
        />
      ),
    },
    {
      title: 'New Result',
      dataIndex: 'newResult',
      key: 'newResult',
      render: (_, record) => (
        <Input
          value={record.newResult}
          onChange={(e) => handleNewResultChange(e, record.key)}
        />
      ),
    },
  ];

  const handleAssessmentTitleChange = (e, key) => {
    const { value } = e.target;
    const newData = assessmentData.map((item) =>
      item.key === key ? { ...item, assessmentTitle: value } : item
    );
    setAssessmentData(newData);
  };

  const handlePrevResultChange = (e, key) => {
    const { value } = e.target;
    const newData = assessmentData.map((item) =>
      item.key === key ? { ...item, prevResult: value } : item
    );
    setAssessmentData(newData);
  };

  const handleNewResultChange = (e, key) => {
    const { value } = e.target;
    const newData = assessmentData.map((item) =>
      item.key === key ? { ...item, newResult: value } : item
    );
    setAssessmentData(newData);
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

  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
    {/* <SiderGenerator /> */}
<div className="list-header mb-2 ml-100">
  <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">Submit Grade Change</h1>
</div>
<div className="list-sub mb-10 ml-[2%] ">
 {/* {handleGrade()} */}
  <div className="list-filter">
      {/* <Row gutter={16}> */}
      <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' , justifyContent:'flex-start' , display:'flex' }}>
      <div style={{display:'flex' , flexDirection:'column', marginRight:'9%'}}>
      <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Acadamic Year</label>  
        <Select value={academicYear} onChange={handleAcadamic} 
        placeholder="Select Academic Year"
         style={{ marginRight: '8px', width:350 , height:40 }}>
          {/* Add academic year options */}
          <Option value="2021/22">2021/22</Option>
            <Option value="2022/23">2022/23</Option>
            <Option value="2023/24">2023/24</Option>
        </Select>
        </div>
        <div style={{display:'flex' , flexDirection:'column'  }}>
      <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Course</label>  
        <Select value={course} onChange={handleCourse} 
        placeholder="Select Course"
         style={{ marginRight: '8px', width:350 , height:40 }}>
          {/* Add academic year options */}
          <Option value="Section A| Introduction to Computer">Section A| Introduction to Computer</Option>
            <Option value="Section B| Introduction to Computer">Section B| Introduction to Computer</Option>
            <Option value="Section C| Introduction to Computer">Section C| Introduction to Computer</Option>
        </Select>
        </div>
          {/* <Select
            value={student}
            onChange={handleStudentChange}
            placeholder="Student"
            style={{ width: '100%' }}
          >
          
          </Select> */}
        </div>
        <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' , justifyContent:'flex-start' , display:'flex' }}>
      <div style={{display:'flex' , flexDirection:'column' , marginRight:'10%'}}>
      <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Semister</label>  
      <Select
            value={semester}
            onChange={handleSemister}
            placeholder="Semister"
            style={{ width: 350 , height:40 }}
          >
           <Option value="1">Semester 1</Option>
            <Option value="2">Semester 2</Option>
          </Select>
        </div>
        <div style={{display:'flex' , flexDirection:'column' , marginRight:40}}>
      <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Student</label>  
        <Select value={student} onChange={handleStudentChange} 
        placeholder="Select Course"
         style={{ marginRight: '8px', width:350 , height:40 }}>
          {/* Add academic year options */}
          <Option value="UGR/1876/11 | Solomon Abdi">UGR/1876/11 | Solomon Abdi</Option>
          <Option value="UGR/1886/12 | Kasahun Aminu ">UGR/1886/12 | Kasahun Aminu</Option> 
          <Option value="UGR/1873/12 | Kalkidan Aminu ">UGR/1873/12 | Kalkidan Aminu</Option> 
          <Option value="UGR/1896/12 | Kebede Debela ">UGR/1886/12 | Kebede Debela</Option> 
        </Select>
        </div>
        </div>
        <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' ,justifyContent:'flex-start' , display:'flex',  }}>
      <div style={{display:'flex' , flexDirection:'column' , marginRight:'27%'}}>
      <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Prev. Total Mark</label>  
      <label style={{marginBottom:10 , color:'#333' , fontSize:14 , marginTop:10}}>0.00</label>  
      <label style={{marginBottom:10 , color:'#333' , fontSize:14 , marginTop:10}}>Prev. Grade</label>  
        </div>
        <div style={{display:'flex' , flexDirection:'column' , marginRight:40}}>
      <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Reason</label>  
      <Input value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: 350 , height:80 }} placeholder="Examiner from outside" />
        </div>
        </div>
      <Table
        columns={columns}
        dataSource={filteredAssessmentData}
        pagination={false}
        style={{ marginTop: '16px' }}
      />
      <Button type="primary" onClick={handleAddAssessment}>
        Add Assessment
      </Button>
      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={6}>
          <InputNumber
            value={newTotalMark}
            onChange={(value) => setNewTotalMark(value)}
            placeholder="New Total Mark"
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={6}>
          <Input
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
            placeholder="New Grade"
          />
        </Col>
        <Col span={6} offset={6}>
          <Button type="primary" onClick={handleSave}  style={{ marginBottom: 16 , margingRight:20, backgroundColor:'#4279A6' , justifySelf:'flex-end', display:'flex' }}>
            Submit
          </Button>
        </Col>
      </Row>
    </div>
    </div>
    </div>
  );
};

export default GradeChangeSubmission;
