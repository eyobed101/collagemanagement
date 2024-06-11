import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const PasswordGenerator = ({ isVisible, onCancel, onGenerate }) => {
  const [specialChar, setSpecialChar] = useState('!');
  const [twoDigits, setTwoDigits] = useState('01');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(specialChar, twoDigits);
  };

  return (
    <Modal
      title="Generate Custom Passwords"
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Item label="Special Character">
          <Input
            value={specialChar}
            onChange={(e) => setSpecialChar(e.target.value)}
            maxLength={1}
          />
        </Form.Item>
        <Form.Item label="Two Digits">
          <Input
            value={twoDigits}
            onChange={(e) => setTwoDigits(e.target.value)}
            maxLength={2}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Generate
        </Button>
      </Form>
    </Modal>
  );
};

export default PasswordGenerator;
