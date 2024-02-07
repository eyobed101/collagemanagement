// import React, { useState, useEffect } from 'react';
// import { Table, Select, Input, Button, Space,  Modal } from 'antd';

// const { Option } = Select;
// // import SiderGenerator from './Menu';


// const CourseOffering = () => {
//   const coursesData = [
//     { id: 1, name: 'Course A' },
//     { id: 2, name: 'Course B' },
//     { id: 3, name: 'Course C' },
//   ];

//   const terms = ['1', '2', '3'];
//   const section = ['1', '2', '3'];
//   const program = ['computer science', 'information science', 'electrical engineering', 'accounting', 'management'];

//   const [selectedTerm, setSelectedTerm] = useState(terms[0]);
//   const [selectedSection, setSelectedSection] = useState(section[0]);
//   const [selectedProgram, setSelectedprogram] = useState(program[0]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setEditingIndex(null);
//   };


//   useEffect(() => {
//     setEditingIndex(null);
//   }, [selectedCourses]);

//   const handleTermChange = (value) => {
//     setSelectedTerm(value);
//   };

//   const handleSectionChange = (value) => {
//     setSelectedSection(value);
//   };

//   const handleProgramChange = (value) => {
//     setSelectedprogram(value);
//   };

//   const handleYearChange = (e) => {
//     setSelectedYear(e.target.value);
//   };

//   const handleCourseChange = (value) => {
//     const courseId = parseInt(value, 10);
//     const course = coursesData.find((course) => course.id === courseId);

//     if (editingIndex !== null) {
//       setSelectedCourses((prevCourses) =>
//         prevCourses.map((c, index) =>
//           index === editingIndex ? { ...course, term: selectedTerm, year: selectedYear , section:selectedSection , program:selectedProgram } : c )
//       );
//       setEditingIndex(null);
//     } else {
//       setSelectedCourses((prevCourses) => [...prevCourses, { ...course, term: selectedTerm, year: selectedYear, section:selectedSection , program:selectedProgram  }]);
//     }
//     setIsModalVisible(false);

//   };

//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     const course = selectedCourses[index];
//     setSelectedTerm(course.term);
//     setSelectedYear(course.year);
//     showModal();

//   };

//   const handleRemove = (index) => {
//     setSelectedCourses((prevCourses) => prevCourses.filter((_, i) => i !== index));
//   };

//   const columns = [
//     {
//       title: 'Course Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Term',
//       dataIndex: 'term',
//       key: 'term',
//     },
//     {
//       title: 'Year',
//       dataIndex: 'year',
//       key: 'year',
//     },
//     {
//       title: 'Section',
//       dataIndex: 'section',
//       key: 'section',
//     },
//     {
//       title: 'Program',
//       dataIndex: 'program',
//       key: 'program',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record, index) => (
//         <Space size="middle">
//           <Button onClick={() => handleEdit(index)}>Edit</Button>
//           <Button onClick={() => handleRemove(index)}>Remove</Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="bg-[#F9FAFB] min-h-[100vh]  ">
//     {/* <SiderGenerator navigate={navigate}/> */}
//       <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
//         Course Offering
//       </p>
//       <div>
//         <div className="list-filter ml-[2%]">
//     <Select 
//         bordered={false}
//         className="!rounded-[6px] border-[#EAECF0] border-[2px]"
//         placeholder="--Select Term ---"
//         style={{ width: 220 }}
//     value={selectedTerm} onChange={handleTermChange}>
//           {terms.map((term) => (
//             <Option key={term} value={term}>
//               {term}
//             </Option>
//           ))}
//         </Select>

//         <Input
//           type="number"
//           value={selectedYear}
//           onChange={handleYearChange}
//           placeholder="Enter Year"
//           bordered={false}
//           className="!rounded-[6px] border-[#EAECF0] border-[2px]"
//           style={{ width: 220 }}
//         />
//         <Select onChange={handleCourseChange} value=""
//           bordered={false}
//           className="!rounded-[6px] border-[#EAECF0] border-[2px]"
//           style={{ width: 220 }}
//         >
//           <Option value="" disabled>
//             Choose a course
//           </Option>   
//           {coursesData.map((course) => (
//             <Option key={course.id} value={course.id}>
//               {course.name}
//             </Option>
//           ))}
//         </Select>
//   </div>
//       </div>
//       <div className="list-sub mb-10 ml-[2%]">
//       <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
//        Selected Course 
//       </p>
//         <Table columns={columns} dataSource={selectedCourses} />
//         <Modal title="Select Course" visible={isModalVisible} 
//         okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
//         onOk={handleOk} onCancel={handleCancel}>
//           <div>
//           <label>Select Course:</label>
//           <Select onChange={handleCourseChange} value=""
//              bordered={false}
//              className="!rounded-[6px] border-[#EAECF0] border-[2px] mb-20"
//              style={{ width: "100%" }}
//           >
//             <Option value="" disabled>
//               Choose a course
//             </Option>
//             {coursesData.map((course) => (
//               <Option key={course.id} value={course.id}>
//                 {course.name}
//               </Option>
//             ))}
//           </Select>
//           </div>
//           <div style={{marginBottom:20}}/>
//           <div>
//           <label>Select Year:</label>  
//           <Input
//           type="number"
//           value={selectedYear}
//           onChange={handleYearChange}
//           placeholder="Enter Year"
//           bordered={true}
//           className="!rounded-[6px] border-[#EAECF0] border-[2px] mb-10"
//           style={{ width: "100%" }}
//         />
//         </div>
//         <div style={{marginBottom:20}}/>
//         <div>
//           <label>Select Term:</label>  

//            <Select 
//         bordered={false}
//         className="!rounded-[6px] border-[#EAECF0] border-[2px] mt-10"
//         placeholder="--Select Term ---"
//         style={{ width: "100%" }}
//     value={selectedTerm} onChange={handleTermChange}>
//           {terms.map((term) => (
//             <Option key={term} value={term}>
//               {term}
//             </Option>
//           ))}
//         </Select>
//         </div>
//         <div style={{marginBottom:20}}/>
//         <div>
//           <label>Select Section:</label>  

//            <Select 
//         bordered={false}
//         className="!rounded-[6px] border-[#EAECF0] border-[2px] mt-10"
//         placeholder="--Select Term ---"
//         style={{ width: "100%" }}
//     value={selectedSection} onChange={handleSectionChange}>
//           {section.map((term) => (
//             <Option key={term} value={term}>
//               {term}
//             </Option>
//           ))}
//         </Select>
//         </div>
//         <div style={{marginBottom:20}}/>
//         <div>
//           <label>Select Program:</label>  

//            <Select 
//         bordered={false}
//         className="!rounded-[6px] border-[#EAECF0] border-[2px] mt-10"
//         placeholder="--Select Term ---"
//         style={{ width: "100%" }}
//     value={selectedProgram} onChange={handleProgramChange}>
//           {program.map((term) => (
//             <Option key={term} value={term}>
//               {term}
//             </Option>
//           ))}
//         </Select>
//         </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default CourseOffering;

import React, { useState } from 'react';
import { Select, Table, Button } from 'antd';
// import 'antd/dist/antd.css';

const { Option } = Select;

const mockData = [
  { courseId: 'C001', courseName: 'Introduction to Programming', section: 'A', },
  { courseId: 'C002', courseName: 'Web Development Basics', section: 'B', },
  { courseId: 'C003', courseName: 'Database Management', section: 'A',  },
  // Add more sample data as needed
];

const CourseOffering = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [mainTableData, setMainTableData] = useState(mockData);
  const [otherTableData, setOtherTableData] = useState([]);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

  const sections = [...new Set(mainTableData.map((data) => data.section))];

  const handleSectionChange = (value) => {
    setSelectedSection(value);
  };

  const handleRowClick = (record) => {
    const updatedMainTableData = mainTableData.filter((data) => data.courseId !== record.courseId);
    setMainTableData(updatedMainTableData);
    setOtherTableData([...otherTableData, { ...record }]);
    // setSelectedCourseDetails(record.details); // Show details when changing the section
  };

  const columns = [
    { title: 'Course ID', dataIndex: 'courseId', key: 'courseId' },
    { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleRowClick(record)}></Button>
      ),
    },
  ];

  const otherTableColumns = [
    { title: 'Course ID', dataIndex: 'courseId', key: 'courseId' },
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
          <Option key={section} value={section}>
            {section}
          </Option>
        ))}
      </Select>
      <h2>Course </h2>
      <Table
        dataSource={mainTableData.filter((data) => data.section === selectedSection)}
        columns={columns}
        rowKey="courseId"
        bordered
        pagination={false}
      />
      {/* {selectedCourseDetails && (
        <div>
          <h2>Details</h2>
          <p>{selectedCourseDetails}</p>
        </div>
      )} */}
      <h2 style={{margin:'2%'}}>Offered Courses </h2>
      <Table
        dataSource={otherTableData}
        columns={otherTableColumns}
        rowKey="courseId"
        bordered
        pagination={false}
      />
<Button  type="primary" style={{ marginBottom: 16 , backgroundColor:'#4279A6' }} >
        Assign Courses
      </Button>
    </div>
  );
};

export default CourseOffering;
