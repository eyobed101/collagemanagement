import React, { useState } from 'react';
import { Modal, Form, Select, Button, Table, Space,Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
// import SiderGenerator from './Menu';

const { Option } = Select;

const Curriculum = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCurriculumModalVisible, setIsCurriculumModalVisible] = useState(false);
  const [isCourseModalVisible, setIsCourseModalVisible] = useState(false);
  const [curriculums, setCurriculums] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currculumName , setCurrculumName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [isEditCourseModalVisible, setIsEditCourseModalVisible] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [isEditCurriculumModalVisible, setIsEditCurriculumModalVisible] = useState(false);

  const showCurriculumModal = () => {
    setIsCurriculumModalVisible(true);
  };

  const showCourseModal = (curriculumName) => {
    setIsCourseModalVisible(true);
    setCurrculumName(curriculumName.name); // Set the curriculum name in the state
    console.log("are you ",curriculumName.name);
    // form.resetFields(); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsCurriculumModalVisible(false);
    setIsCourseModalVisible(false);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsEditCourseModalVisible(true);
  };
  
  // Update the handleCourseOk function to edit the selected course
  const handleEditCourseOk = () => {
    const updatedCourses = courses.map((course) =>
      course.id === selectedCourse.id ? { ...course, ...form.getFieldsValue() } : course
    );
  
    setCourses(updatedCourses);
    form.resetFields();
    setIsEditCourseModalVisible(false);
  };

  const handleEditCurriculum = (curriculum) => {
    setSelectedCurriculum(curriculum);
    setIsEditCurriculumModalVisible(true);
  };
  
  // Update the handleCurriculumOk function to edit the selected curriculum
  const handleEditCurriculumOk = () => {
    const updatedCurriculums = curriculums.map((curriculum) =>
      curriculum.id === selectedCurriculum.id ? { ...curriculum, ...form.getFieldsValue() } : curriculum
    );
  
    setCurriculums(updatedCurriculums);
    form.resetFields();
    setIsEditCurriculumModalVisible(false);
  };

  

  const handleCurriculumOk = () => {
    const newCurriculum = {
      id: uuidv4(),
      name: `Curriculum ${Math.floor(Math.random() * 1000)}`,
      year: form.getFieldValue('year'),
      program: form.getFieldValue('program'),
      section: form.getFieldValue('section'),
      department: form.getFieldValue('department'),
    };
  
    setCurriculums((prevCurriculums) => [...prevCurriculums, newCurriculum]);
  
    form.resetFields();
    setIsCurriculumModalVisible(false);
  };    

  const handleCourseOk = () => {
    const newCourse = {
      id: uuidv4(),
      curriculumName: currculumName,
      courseName: form.getFieldValue('courseName'),
      courseType: form.getFieldValue('courseType'),
    };
  
    setCourses((prevCurriculums) => [...prevCurriculums, newCourse]);
  
    form.resetFields();
    setIsCourseModalVisible(false);
  };

  const columns = [
    {
      title: 'Curriculum Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={() => showCourseModal(record)}>Add Courses</Button>
          </Space>
        ),
      },
  ];
  const courseColumns = [
    {
      title: 'Curriculum Name',
      dataIndex: 'curriculumName',
      key: 'curriculumName',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Course Type',
      dataIndex: 'courseType',
      key: 'courseType',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={() => handleEditCourse(record)}>Edit</Button>
          </Space>
        ),
      },
  ];

  return (
    <div  className="bg-[#F9FAFB] min-h-[100vh]  ">
          {/* <SiderGenerator navigate={navigate}/> */}
    <div className="list-sub mb-10 ml-[20%]">
   <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
        Curriculum and Course List
      </p>
      <Button type="primary" onClick={showCurriculumModal}>
        New Curriculum
      </Button>

      <Modal title="Create New Curriculum" visible={isCurriculumModalVisible} onOk={handleCurriculumOk} onCancel={handleCancel}>
        <Form form={form} onFinish={handleCurriculumOk} layout="vertical">
          <Form.Item label="Year" name="year" rules={[{ required: true, message: 'Please select a year' }]}>
            <Select>
              <Option value="2023">2023</Option>
              <Option value="2024">2024</Option>
              <Option value="2025">2025</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Program" name="program" rules={[{ required: true, message: 'Please select a program' }]}>
            <Select>
              <Option value="Bachelor">Bachelor</Option>
              <Option value="Master">Master</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Section" name="section" rules={[{ required: true, message: 'Please select a section' }]}>
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Please select a department' }]}>
            <Select>
              <Option value="Computer Science">Computer Science</Option>
              <Option value="Electrical Engineering">Electrical Engineering</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Add Courses to Curriculum" visible={isCourseModalVisible} onOk={handleCourseOk} onCancel={handleCancel}>
        <Form form={form} onFinish={handleCourseOk} layout="vertical">
          <Form.Item label="Curriculum Name" name="curriculumName">
            <Input value={currculumName} placeholder={currculumName} disabled />
          </Form.Item>

          <Form.Item label="Course Name" name="courseName" rules={[{ required: true, message: 'Please enter a course name' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Course Type" name="courseType" rules={[{ required: true, message: 'Please select a course type' }]}>
            <Select>
              <Option value="Major">Major</Option>
              <Option value="Common">Common</Option>
              {/* Add more course types as needed */}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
      title="Edit Curriculum"
      visible={isEditCurriculumModalVisible}
      onOk={handleEditCurriculumOk}
      onCancel={() => setIsEditCurriculumModalVisible(false)}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="year" label="Academic Year">
        <Select>
              <Option value="2023">2023</Option>
              <Option value="2024">2024</Option>
              <Option value="2025">2025</Option>
            </Select>
        </Form.Item>
        <Form.Item name="program" label="Program">
        <Select>
              <Option value="Bachelor">Bachelor</Option>
              <Option value="Master">Master</Option>
            </Select>
        </Form.Item>
        <Form.Item name="section" label="Section">
        <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>
        </Form.Item>
        <Form.Item name="department" label="Department">
        <Select>
              <Option value="Computer Science">Computer Science</Option>
              <Option value="Electrical Engineering">Electrical Engineering</Option>
            </Select>
        </Form.Item>
      </Form>
    </Modal>

    <Modal
      title="Edit Course"
      visible={isEditCourseModalVisible}
      onOk={handleEditCourseOk}
      onCancel={() => setIsEditCourseModalVisible(false)}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="courseName" label="Course Name">
          <Input placeholder="Enter Course Name" />
        </Form.Item>
        <Form.Item name="courseType" label="Course Type">
        <Select>
              <Option value="Major">Major</Option>
              <Option value="Common">Common</Option>
              {/* Add more course types as needed */}
            </Select>
        </Form.Item>
        {/* Add other course-related fields as needed */}
      </Form>
    </Modal>

      <Table columns={columns} dataSource={curriculums} style={{ marginTop: 20 }} pagination={{ position: ['bottomCenter'] }} />
      <Table columns={courseColumns} dataSource={courses} style={{ marginTop: 20 }} pagination={{ position: ['bottomCenter'] }} />

    </div>
    </div>

  );
};

export default Curriculum;

