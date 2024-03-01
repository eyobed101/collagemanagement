import React, { useState } from 'react';
import { Select, Button, Input , Row ,Col } from 'antd';

const { Option } = Select;

const ThesisResult = () => {
    // State variables for selected values
    const [academicYear, setAcademicYear] = useState('');
    const [chairDepartment, setChairDepartment] = useState('');
    const [extExaminerDepartment, setExtExaminerDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [chairPerson, setChairPerson] = useState('');
    const [extExaminer, setExtExaminer] = useState('');
    const [studentName, setStudentName] = useState('');
    const [examinerDepartment, setExaminerDepartment] = useState('');
    const [examinerFromOutside, setExaminerFromOutside] = useState('');
    const [thesisResult, setThesisResult] = useState('');
    const [examinerName, setExaminerName] = useState('');

    // Function to handle form submission
    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted!');
    };

    return (
        <div className="bg-[#F9FAFB] min-h-[100vh]  ">
        {/* <SiderGenerator /> */}
    <div className="list-header mb-2 ml-100">
      <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">Thesis Result Submission Form</h1>
    </div>
    <div className="list-sub mb-10 ml-[2%] ">
     {/* {handleGrade()} */}
      <div className="list-filter"/>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                  {/* <Row gutter={24} style={{marginTop:'5%'}}> */}
                  {/* <Col span={7}> */}
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' }}>
                  <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Acadamic Year</label>  
                <Select
                value={academicYear} onChange={setAcademicYear} style={{ width: 300,height:40 }} placeholder="Academic Year">
                    {/* Options for Academic Year */}
                    <Option value="2022/23">2022/23</Option>
                    <Option value="2023/24">2023/24</Option>  
                </Select>
                </div>
                {/* </Col> */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' }}>
                <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Chair Department</label>  
                <Select value={chairDepartment} onChange={setChairDepartment} style={{ width: 300,height:40 }} placeholder="Chair Department">
                    {/* Options for Chair Department */}
                    <Option value="Computer Science">Computer Science</Option>
                    <Option value="Information Science">Information Science</Option> 
                </Select>
                </div>
                <div style={{ marginBottom: 16, marginRight:30,display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' }}>
                {/* <Col span={8}> */}
                <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Ext Examiner Department</label>
                <Select value={extExaminerDepartment} onChange={setExtExaminerDepartment} style={{ width: 300 ,height:40 }} placeholder="External Examiner Department">
                    {/* Options for External Examiner Department */}
                    <Option value="Computer Science">Computer Science</Option>
                    <Option value="Information Science">Information Science</Option> 
                </Select>
                </div>
                {/* </Col> */}
            </div>
            <div style={{marginTop:30 }}/>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' }}>
            {/* <Row gutter={24} style={{marginTop:'5%'}}> */}
                  {/* <Col span={6}> */}
                  <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Semister</label>
                <Select value={semester} onChange={setSemester} style={{ width: 300 ,height: 40 }} placeholder="Semester">
                    {/* Options for Semester */}
                    <Option value="Semister 1">Semister 1</Option>
                    <Option value="Semister 2">Semister 2</Option> 
                </Select>
                </div>
                {/* </Col> */}
                {/* <Col span={8}> */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' }}>
                <label  style={{marginBottom:10 , color:'#333' , fontSize:14}}>Chair Person</label>
                <Select value={chairPerson} onChange={setChairPerson} style={{ width: 300, height:40 }} placeholder="Chair Person">
                    {/* Options for Chair Person */}
                    <Option value="Kebede Mola">Kebede Mola</Option>
                    <Option value="Ayele Afewerke   ">Ayele Afewerke</Option> 
                </Select>
                </div>
                {/* </Col> */}
                {/* <Col span={8}> */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' ,  marginRight:30}}>
                <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>External Examiner </label>
                <Select 
               value={extExaminer} onChange={setExtExaminer} style={{ width: 300 , height:40 }} placeholder="External Examiner">
                    {/* Options for External Examiner */}
                    <Option value="Thomas Mola">Thomas Mola</Option>
                    <Option value="Tarikua Afewerke   ">Tarikua Afewerke</Option> 
                </Select>
                </div>
                {/* </Col> */}
                </div>
            {/* </Row> */}
            <div style={{marginTop:30 }}/>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            {/* <Row gutter={24} style={{marginTop:'5%'}}> */}
            {/* <Col span={7}> */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' }}>
                <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Student Name</label>
                <Select value={studentName} onChange={setStudentName} style={{ width: 300, height:40 }} placeholder="Student Name">
                    {/* Options for Student Name */}
                    <Option value="UGR/1876/11 | Solomon Abdi">UGR/1876/11 | Solomon Abdi</Option>
                    <Option value="UGR/1886/12 | Kasahun Aminu ">UGR/1886/12 | Kasahun Aminu</Option> 
                </Select>
                </div>
                {/* </Col> */}
                {/* <Col span={8}> */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' }}>
                <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Examiner Department</label>
                <Select value={examinerDepartment} onChange={setExaminerDepartment} style={{ width: 300, height:40 }} placeholder="Examiner Department">
                    {/* Options for Examiner Department */}
                    <Option value="Computer Science">Computer Science</Option>
                    <Option value="Electrical Science">Electrical Science</Option> 
                </Select>
                </div>
                {/* </Col> */}
                {/* <Col span={8}> */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column', marginRight:30 }}>
                <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Examiner Department</label>
         <Input value={examinerFromOutside} onChange={(e) => setExaminerFromOutside(e.target.value)} style={{ width: 300 , height:40 }} placeholder="Examiner from outside" />
              {/* </Col> */}
              </div>
              </div>
            {/* </Row> */}
            <div style={{marginTop:30 }}/>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            {/* <Row gutter={24} style={{marginTop:'5%'}}> */}
            {/* <Col span={8}> */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' }}>
                <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Thesis Result</label>
                <Select value={thesisResult} onChange={setThesisResult} style={{ width: 300 , height:40 }} placeholder="Thesis Result">
                    {/* Options for Thesis Result */}
                    <Option value="A">A</Option>
                    <Option value="B">B</Option> 
                    <Option value="C">C</Option>
                    <Option value="D">D</Option> 

                </Select>
                </div>
                {/* </Col> */}
                {/* <Col span={8}> */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'column' }}>
                <label style={{marginBottom:10 , color:'#333' , fontSize:14}}>Examiner Name</label>
                <Select value={examinerName} onChange={setExaminerName} style={{ width: 300 , height:40 }} placeholder="Examiner Name">
                    {/* Options for Examiner Name */}
                    <Option value="Melat Mola">Melat Mola</Option>
                    <Option value="Diriba Afewerke   ">Diriba Afewerke</Option> 
                </Select>
                </div>
                {/* </Col> */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' ,flexDirection: 'row' , marginRight:"13%" }}>
                <Button type="primary" onClick={handleSubmit}
                style={{ marginBottom: 16 , margingRight:20, marginTop :20, backgroundColor:'#4279A6' , justifySelf:'flex-end', display:'flex' }}
                >Submit</Button>
                 <Button type="primary" onClick={handleSubmit}
                style={{ marginBottom: 16 , margingLeft:20, marginTop :20, backgroundColor:'#FFF' ,color:'#333'  ,justifySelf:'flex-end', display:'flex' }}
                >Cancel</Button>
                </div>
            {/* </Row> */}
            </div>
        
        </div>
        </div>
    );
};

export default ThesisResult;
