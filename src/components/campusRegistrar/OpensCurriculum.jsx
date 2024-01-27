import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const OpenCurriculumButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    // Add additional logic to fetch or set curriculum details
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary"  style={{ backgroundColor: "blue" }} onClick={showModal}>
        Open Curriculum
      </Button>
      <Modal
        title="Curriculum Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: 'blue' } }} 

      >
        {/* Add curriculum details or component here */}
        <p>This is where you display details about the curriculum.</p>
      </Modal>
    </div>
  );
};

export default OpenCurriculumButton;
