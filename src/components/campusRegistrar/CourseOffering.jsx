import React, { useState, useEffect } from 'react';
import { Table, Select, Input, Button, Space,  Modal } from 'antd';

const { Option } = Select;
import SiderGenerator from './Menu';


const CourseOffering = () => {
  const coursesData = [
    { id: 1, name: 'Course A' },
    { id: 2, name: 'Course B' },
    { id: 3, name: 'Course C' },
  ];

  const terms = ['Fall', 'Spring', 'Summer'];

  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingIndex(null);
  };


  useEffect(() => {
    setEditingIndex(null);
  }, [selectedCourses]);

  const handleTermChange = (value) => {
    setSelectedTerm(value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleCourseChange = (value) => {
    const courseId = parseInt(value, 10);
    const course = coursesData.find((course) => course.id === courseId);

    if (editingIndex !== null) {
      setSelectedCourses((prevCourses) =>
        prevCourses.map((c, index) =>
          index === editingIndex ? { ...course, term: selectedTerm, year: selectedYear } : c
        )
      );
      setEditingIndex(null);
    } else {
      setSelectedCourses((prevCourses) => [...prevCourses, { ...course, term: selectedTerm, year: selectedYear }]);
    }
    setIsModalVisible(false);

  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const course = selectedCourses[index];
    setSelectedTerm(course.term);
    setSelectedYear(course.year);
    showModal();

  };

  const handleRemove = (index) => {
    setSelectedCourses((prevCourses) => prevCourses.filter((_, i) => i !== index));
  };

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Term',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(index)}>Edit</Button>
          <Button onClick={() => handleRemove(index)}>Remove</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
    <SiderGenerator navigate={navigate}/>
      <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
        Course Offering
      </p>
      <div>
        <div className="list-filter ml-[15%]">
    <Select 
        bordered={false}
        className="!rounded-[6px] border-[#EAECF0] border-[2px]"
        placeholder="--Select Term ---"
        style={{ width: 220 }}
    value={selectedTerm} onChange={handleTermChange}>
          {terms.map((term) => (
            <Option key={term} value={term}>
              {term}
            </Option>
          ))}
        </Select>

        <Input
          type="number"
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Enter Year"
          bordered={false}
          className="!rounded-[6px] border-[#EAECF0] border-[2px]"
          style={{ width: 220 }}
        />
        <Select onChange={handleCourseChange} value=""
          bordered={false}
          className="!rounded-[6px] border-[#EAECF0] border-[2px]"
          style={{ width: 220 }}
        >
          <Option value="" disabled>
            Choose a course
          </Option>   
          {coursesData.map((course) => (
            <Option key={course.id} value={course.id}>
              {course.name}
            </Option>
          ))}
        </Select>
  </div>
      </div>
      <div className="list-sub mb-10 ml-[20%]">
      <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
       Selected Course 
      </p>
        <Table columns={columns} dataSource={selectedCourses} />
        <Modal title="Select Course" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div>
          <label>Select Course:</label>
          <Select onChange={handleCourseChange} value=""
             bordered={false}
             className="!rounded-[6px] border-[#EAECF0] border-[2px] mb-20"
             style={{ width: "100%" }}
          >
            <Option value="" disabled>
              Choose a course
            </Option>
            {coursesData.map((course) => (
              <Option key={course.id} value={course.id}>
                {course.name}
              </Option>
            ))}
          </Select>
          </div>
          <div style={{marginBottom:20}}/>
          <div>
          <label>Select Year:</label>  
          <Input
          type="number"
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Enter Year"
          bordered={true}
          className="!rounded-[6px] border-[#EAECF0] border-[2px] mb-10"
          style={{ width: "100%" }}
        />
        </div>
        <div style={{marginBottom:20}}/>
        <div>
          <label>Select Term:</label>  

           <Select 
        bordered={false}
        className="!rounded-[6px] border-[#EAECF0] border-[2px] mt-10"
        placeholder="--Select Term ---"
        style={{ width: "100%" }}
    value={selectedTerm} onChange={handleTermChange}>
          {terms.map((term) => (
            <Option key={term} value={term}>
              {term}
            </Option>
          ))}
        </Select>
        </div>
        </Modal>
      </div>
    </div>
  );
};

export default CourseOffering;
