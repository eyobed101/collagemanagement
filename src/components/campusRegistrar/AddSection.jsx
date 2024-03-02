import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

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

  useEffect(() => {
    axios.get('http://localhost:5169/api/StudyCenters')
      .then(response => {
        setStudyCenters(response.data);
      })
      .catch(error => {
        console.error('Error fetching study centers:', error);
      });

    axios.get('http://localhost:5169/api/Section')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching sections:', error);
      });
  }, []);

  const cancel = () => {
    setEditingKey('');
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
  };

  const columns = [
    {
      title: 'Section ',
      dataIndex: 'sectionId',
      key: 'sectionId',
    },
    {
      title: 'Study Center',
      dataIndex: 'campusId',
      key: 'campusId',
    },
    {
      title: 'Section Name',
      dataIndex: 'sectionName',
      key: 'sectionName',
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
    },
    {
      title: 'Program Type',
      dataIndex: 'programType',
      key: 'programType',
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
          <span>
            <Button onClick={() => edit(record.key)}>Edit</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const generateRandomKey = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  const handleDelete = (key) => {
    const newData = data.filter(item => item.key !== key);
    setData(newData);
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
  };

  const onFinishCreate = (values) => {
    const newData = [...data];
    const newKey = generateRandomKey();
    newData.push({ ...values, key: newKey });
    setData(newData);
    setIsCreateModalVisible(false);

    const newSection = {
      ...values,
    };

    axios.post('http://localhost:5169/api/Section', newSection)
      .then(response => {
        console.log('Section created successfully:', response.data);
        const newData = [...data];
        const newKey = generateRandomKey();
        newData.push({ ...newSection, key: newKey });
        setData(newData);
        setIsCreateModalVisible(false);
      })
      .catch(error => {
        console.error('Error creating section:', error);
      });
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
      <Form.Item label="Term / Academic Year" name="term" required>
        <Input />
      </Form.Item>
      <Form.Item label="Study Center" name="campusId" required>
        <Select key="study center">
          {studyCenters.map(center => (
            <Option key={center.campusId} value={center.campusId}>
              {center.centerName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{ backgroundColor: '#4279A6' }} htmlType="submit">
          Create
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );

  const editModal = (
    <Modal
      title="Edit Section"
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
      title="Create Section"
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
      <Button onClick={showCreateModal} type="primary" style={{ marginBottom: 16, backgroundColor: '#4279A6' }}>
        Create New Section
      </Button>
      <Table dataSource={sections} columns={columns}  bordered  loading={loading}
      rowKey={(record) => record.sectionId}
      pagination={{ pageSize: 10 }} />
      {editModal}
      {createModal}
    </div>
  );
};

export default AddSection;