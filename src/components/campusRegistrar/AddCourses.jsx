import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';

const Curriculum = () => {
  const [courseData, setCourseData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Example: Fetching course data from an API
  useEffect(() => {
    // Replace this with your API call to fetch course data
    const fetchCourseData = async () => {
      // Example API endpoint
      const apiUrl = 'https://api.example.com/courses';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, []);

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    // Add more columns as needed
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" style={{ backgroundColor: "blue" }}  onClick={showModal}>
        View Curriculum
      </Button>
      <Modal
        title="Curriculum"
        visible={isModalVisible}
        okButtonProps={{ style: { backgroundColor: 'blue' } }} 
        onOk={handleOk}
        onCancel={handleCancel}
        width={800} // Adjust the width as needed
      >
        <Table columns={columns} dataSource={courseData} pagination={{ position: ['bottomCenter'] }} />
      </Modal>
    </div>
  );
};

export default Curriculum;
