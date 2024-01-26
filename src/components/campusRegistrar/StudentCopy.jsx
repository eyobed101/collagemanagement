import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const StudentCopyVerification = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleOpenModal = () => {
    setIsVerified(false);
    setIsModalVisible(true);
  };

  const handleVerifyCopy = () => {
    // Implement your verification logic here
    // For demonstration, set isVerified to true
    setIsVerified(true);
  };

  const handleSignCopy = () => {
    // Implement your signing logic here
    // For demonstration, show a success message
    alert('Student copy signed successfully!');
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Open Student Copy
      </Button>

      <Modal
        title="Student Copy Verification"
        visible={isModalVisible}
        onOk={handleSignCopy}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="verify" type="primary" onClick={handleVerifyCopy} disabled={isVerified}>
            Verify Copy
          </Button>,
          <Button key="sign" type="primary" onClick={handleSignCopy} disabled={!isVerified}>
            Sign Copy
          </Button>,
        ]}
      >
        <p>Display the content of the student copy here.</p>
        <p>Status: {isVerified ? 'Verified' : 'Not Verified'}</p>
      </Modal>
    </div>
  );
};

export default StudentCopyVerification;
