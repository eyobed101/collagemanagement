import React, { useState, useEffect } from 'react';
import { Select, Input, Button, Row, Col ,message } from 'antd';
import axiosInstance from "@/configs/axios";



const { Option } = Select;

const AssessmentRegistration = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [assessmentType, setAssessmentType] = useState('');
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [weight, setWeight] = useState('');
  const [section , setSection]= useState([]);
  const [empId , setempId] = useState('');

  

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const excludedResponse = await axiosInstance.get(
          `/api/InstCourseAssgts`
        ); // Replace with your course API endpoint
        setSection(excludedResponse.data);
        console.log("exc", excludedResponse.data);;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSave = async () => {

    const postData ={
      "courseNo" : course,
      "termId" : semester,
      "empId": empId,
      "assessmentTitle":assessmentTitle,
       "assessmentWeight": weight,
    }
    // Add your save logic here 
    console.log(postData);

    await axiosInstance.post(`/api/AssessmentWeights`, postData)
    .then(response => {
      console.log('Assesment created successfully:', response.data);
      message.success("Assessment Created Successfully")
      
    })
    .catch(error => {
      console.error('Error creating Assesment:', error);
      message.error("Error creating Assesment")

    });

    // Clear form fields after saving
    setAcademicYear("");
    setSemester("");
    setCourse("");
    setAssessmentType("");
    setAssessmentTitle("");
    setWeight("");
  };

  const handleCourse = async(value) =>{
    setCourse(value);
    const selectedItem = section.find(item => item.courseNo === value);
    setempId(selectedItem.empId);
    console.log("test" ,selectedItem.empId);


  }

  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
    {/* <SiderGenerator /> */}
<div className="list-header mb-2 ml-100">
  <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">Register Assesment Weight</h1>
</div>
<div className="list-sub mb-10 ml-[2%] ">
 {/* {handleGrade()} */}
  <div className="list-filter">
   
      <Row gutter={16} style={{marginTop:'5%'}}>
        <Col span={8}>
          <label style={{paddingBottom:10 , color:'#333' , fontSize:14}}>Section</label>  
          <Select
            value={academicYear}
            onChange={(value) => setAcademicYear(value)}
            placeholder="Academic Year"
            style={{ width: '100%' , height: 40 }}
          >
           {section.map((department, index) => (
            <Option key={index} value={department.sectionId}>
              {department.sectionId}
            </Option>
          ))}
            {/* Add more academic years as needed */}
          </Select>
        </Col>
        <Col span={8}>
        <label style={{paddingBottom:10 , color:'#333' , fontSize:14}}>Term</label>  
          <Select
            value={semester}
            onChange={(value) => setSemester(value)}
            placeholder="Semester"
            style={{ width: '100%', height: 40 }}
          >
         {section.map((department, index) => (
            <Option key={index} value={department.termId}>
              {department.termId}
            </Option>
          ))}
          </Select>
        </Col>
        <Col span={6}>
        <label style={{paddingBottom:10 , color:'#333' , fontSize:14}}>Course</label>  
          <Select
            value={course}
            onChange={handleCourse}
            placeholder="Course"
            style={{ width: '100%', height: 40 }}
          >
             {section.map((department, index) => (
            <Option key={index} value={department.courseNo}>
              {department.courseNo}
            </Option>
          ))}        
          </Select>
        </Col>
       
      </Row>
      <Row gutter={16} style={{ marginTop: '5%'  }}>
      <Col span={8}>
      <label style={{paddingBottom:10 , color:'#333' , fontSize:14}}>Assessment Type</label>  
          <Select
            value={assessmentType}
            onChange={(value) => setAssessmentType(value)}
            placeholder="Assessment Type"
            style={{ width: '100%' ,height: 40 }}
          >  
          <Option value="Test">Test</Option>
          <Option value="presentation">Presentation</Option>
          <Option value="Midterm">Midterm</Option>
          <Option value="Final">Final</Option>
            {/* Add more assessment types as needed */}
          </Select>
        </Col>
        <Col span={8}>
        <label style={{paddingBottom:10 , color:'#333' , fontSize:14}}>Assessment Title</label>  
          <Input
            value={assessmentTitle}
            onChange={(e) => setAssessmentTitle(e.target.value)}
            placeholder="Assessment Title"
            style={{ width: '100%' ,height: 40 }}

          />
        </Col>
        <Col span={6}>
        <label style={{paddingBottom:10 , color:'#333' , fontSize:14}}>Weight</label>  
          <Input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight"
            type="number"
            style={{ width: '100%' ,height: 40 }}

          />
        </Col>
            </Row>
            <div style={{display:'flex' , flexDirection:'row' , marginLeft :'76%' , marginTop:'2%' }}>
          <Button type="primary" onClick={handleSave}  style={{ marginBottom: 16 , margingRight:20, marginTop :20, backgroundColor:'#4279A6' , justifySelf:'flex-end', display:'flex' }}>
            Save
          </Button>
          <Button type="primary"   style={{ marginBottom: 16 , margingLeft:20, marginTop :20, color:'#333', backgroundColor:'#FFF' , justifySelf:'flex-end', display:'flex' }}>
            Cancel
          </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentRegistration;
