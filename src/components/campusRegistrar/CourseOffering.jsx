import React, { useState, useEffect } from 'react';
import { Select, Table, Button , message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const CourseOffering = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [mainTableData, setMainTableData] = useState([]);
  const [otherTableData, setOtherTableData] = useState([]);
  const [termOptions , setTermOptions] = useState([]);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionResponse = await axios.get('https://localhost:7032/api/Section');
        setSections(sectionResponse.data);

        const courseResponse = await axios.get('https://localhost:7032/api/Courses'); // Replace with your course API endpoint
        setCourses(courseResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchTerms = async () => {
      try {
        const response = await axios.get('https://localhost:7032/api/Terms');
        const currentTerms = response.data.filter((term) => new Date(term.endDate) > Date.now());
        setTermOptions(currentTerms);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
    fetchData();
  }, []);

  const handleSectionChange = (value) => {
    setSelectedSection(value);
  };

  const handleAssignCourses = async () => {
    try {
      if (termOptions.length === 0) {
        message.error('No active terms available for course assignment.');
        return;
      }
  
      // Assuming you want the first active term, modify as needed
      const termId = termOptions[0].termId;
  
      const selectedSectionData = sections.find((data) => data.dcode === selectedSection );
      const sectionId = selectedSectionData ? selectedSectionData.sectionId : '';
  
      console.log("test ", termId);
      console.log("selected", sectionId);
      console.log("selected line", otherTableData.map((record) => record.courseNo));
  
      // Iterate over each course in otherTableData and make individual POST requests
      for (const record of otherTableData) {
        // Prepare the data for the post request
        const postData = {
          courseNo: record.courseNo,
          sectionId: sectionId,
          termId: termId,
          instrId: 'AD/C/04/23', 
        };

        console.log("POST" ,postData)
  
        // Perform the post request
        try {
          // Perform the post request
          const response = await axios.post('https://localhost:7032/api/SecCourseAssgts', [postData], {
            headers: {
              'Content-Type': 'application/json', // Set Content-Type to application/json
            },
          });
        
          console.log('Post request successful:', response.data);
        } catch (error) {
          console.error('Error assigning courses:', error);
          if (error.response && error.response.data && error.response.data.errors) {
            const errorMessage = Object.values(error.response.data.errors).join('; ');
            message.error(`Error assigning courses: ${errorMessage}`);
          } else {
            message.error('Error assigning courses. Please try again.');
          }
        }

      }
  


      message.success('Courses assigned successfully!');
  
      // Clear the otherTableData after successful assignment
      setOtherTableData([]);
    } catch (error) {
      console.error('Error assigning courses:', error);
      message.error('Error assigning courses. Please try again.');
    }
  };
  

  const handleSectionProgramChange =(value) =>{
    setSelectedProgram(value);

  }

  const handleRowClick = (record) => {
    const updatedMainTableData = mainTableData.filter((data) => data.courseNo !== record.courseNo);
    setMainTableData(updatedMainTableData);
    setOtherTableData([...otherTableData, { ...record }]);
  };

  const columns = [
    { title: 'Course ID', dataIndex: 'courseNo', key: 'courseNo' },
    { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleRowClick(record)}>Assign</Button>
      ),
    },
  ];

  const otherTableColumns = [
    { title: 'Course ID', dataIndex: 'courseNo', key: 'courseNo' },
    { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
  ];

  return (
    <div>
      <Select
        placeholder="Select Section"
        style={{ width: 200, marginBottom: 16 }}
        onChange={handleSectionChange}
      >
        {sections.map((section) => (
          <Option key={section.sectionId} value={section.dcode}>
            {section.sectionName}
          </Option>
        ))}
      </Select>
      {selectedSection && 
      <Select
        placeholder="Select Program"
        style={{ width: 200, marginBottom: 16  , marginLeft:30}}
        onChange={handleSectionProgramChange}
      >
       <Option value="TVET">TVET</Option>
       <Option value="Diploma">Diploma</Option>
       <Option value="Degree">Degree</Option>
        <Option value="Masters">Masters</Option>
       
      </Select>
      } 
      <h2>Course </h2>
      <Table
        dataSource={courses.filter((course) => course.dcode === selectedSection && course.program === selectedProgram )}
        columns={columns}
        rowKey="courseNo"
        bordered
        pagination={false}
      />
      <h2 style={{ margin: '2%' }}>Offered Courses </h2>
      <Table
        dataSource={otherTableData}
        columns={otherTableColumns}
        rowKey="courseNo"
        bordered
        pagination={false}
      />
      <Button onClick={handleAssignCourses} type="primary" style={{ marginBottom: 16, backgroundColor: '#4279A6' }}>
        Assign Courses
      </Button>
    </div>
  );
};

export default CourseOffering;
