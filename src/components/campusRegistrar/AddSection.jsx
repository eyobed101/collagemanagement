import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
// import 'antd/dist/antd.css';

const AddSection = () => {
  const [data, setData] = useState([
    {
      key: '1',
      section: 'SEC/7090/12',
      program: 'Regular',
      batch: 'Bachelor of Science',
      term: '2011/12/II',
      department: 'Computer Science',
    },
    // Add more sample data as needed
  ]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');

  const cancel = () => {
    setEditingKey('');
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
  };

  const columns = [
    {
      title: 'Section ',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
    },
    {
        title: 'Term / Acadamic Year',
        dataIndex: 'term',
        key: 'term',
    },
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" onClick={() => save(record.key)}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <Button onClick={() => edit(record.key)}>Edit</Button>
        );
      },
    },
  ];

  const generateRandomKey = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };

  const handleCreateOk = () => {
    setIsCreateModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const onFinishEdit = (values) => {
    const newData = [...data];
    const index = newData.findIndex((item) => item.key === editingKey);

    if (index > -1) {
      newData[index] = { ...newData[index], ...values };
      setData(newData);
      setEditingKey('');
      setIsEditModalVisible(false);
    }
  };

  const onFinishCreate = (values) => {
    const newData = [...data];
    const newKey = String(data.length + 1);
    newData.push({ ...values, key: newKey });
    setData(newData);
    setIsCreateModalVisible(false);
  };

  const isEditing = (record) => record.key === editingKey;

  const editForm = (
    <Form
      layout="vertical"
      onFinish={onFinishEdit}
      initialValues={data.find((item) => item.key === editingKey)}
    >
      <Form.Item label="Section" name="section" required>
        <Input />
      </Form.Item>
      <Form.Item label="Program" name="program" required>
        <Input />
      </Form.Item>
      <Form.Item label="Batch" name="batch" required>
        <Input />
      </Form.Item>
      <Form.Item label="Term /Acadamic/year" name="term" required>
        <Input />
      </Form.Item>
      <Form.Item label="Department" name="department" required>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{   backgroundColor:'#4279A6' }} htmlType="submit">
          Save
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );

  const createForm = (
    <Form layout="vertical" onFinish={onFinishCreate}>
      <Form.Item label="Section" name="section" required>
        <Input />
      </Form.Item>
      <Form.Item label="Program" name="program" required>
        <Input />
      </Form.Item>
      <Form.Item label="Batch" name="batch" required>
        <Input />
      </Form.Item>
      <Form.Item label="Term /Acadamic/year" name="term" required>
        <Input />
      </Form.Item>
      <Form.Item label="Department" name="department" required>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary"  style={{  backgroundColor:'#4279A6' }} htmlType="submit">
          Create
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );

  const editModal = (
    <Modal
      title="Edit Department"
      visible={isEditModalVisible}
      onOk={handleEditOk}
      onCancel={handleEditCancel}
      footer={null}
    >
      {editForm}
    </Modal>
  );

  const createModal = (
    <Modal
      title="Create Department"
      visible={isCreateModalVisible}
      onOk={handleCreateOk}
      onCancel={handleCreateCancel}
      footer={null}
    >
      {createForm}
    </Modal>
  );

  const handleInputChange = (e, record, dataIndex) => {
    const newData = [...data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      newData[index][dataIndex] = e.target.value;
      setData(newData);
    }
  };

  const edit = (key) => {
    setEditingKey(key);
    showEditModal();
  };

  const save = (key) => {
    setEditingKey('');
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
  };

  return (
    <div>
      <Button onClick={showCreateModal} type="primary" style={{ marginBottom: 16,  backgroundColor:'#4279A6' }}>
        Create New Section
      </Button>
      <Table dataSource={data} columns={columns} rowKey="key" bordered pagination={false} />
      {editModal}
      {createModal}
    </div>
  );
};

export default AddSection;
