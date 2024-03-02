import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, Select } from 'antd';
import axios from 'axios';


const { Option } = Select;

const AddDepartment = () => {
  const [data, setData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5169/api/Departments', {
      params: {
        sortOrder: 'name desc',
        pageNumber: 1,
      },
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching department data:', error);
      });
  }, []);

  const cancel = () => {
    setEditingKey('');
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
  };

  const columns = [
    {
      title: 'Department Code',
      dataIndex: 'dcode',
      key: 'dcode',
    },
    {
      title: 'Department Name',
      dataIndex: 'dname',
      key: 'dname',
    },
    {
      title: 'Department Type',
      dataIndex: 'depType',
      key: 'depType',
    },
    {
      title: 'Is Major',
      dataIndex: 'major',
      key: 'major',
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
    const departmentCode = `D${Math.random().toString(36).substring(2, 8)}`;
  
    const newDepartment = {
      dcode: departmentCode,
      ...values,
    };
    console.log(newDepartment)
  
    axios.post('http://localhost:5169/api/Departments', newDepartment)
      .then(response => {
        console.log('Department created successfully:', response.data);
        const newData = [...data];
        const newKey = String(data.length + 1);
        newData.push({ ...newDepartment, key: newKey });
        setData(newData);
        setIsCreateModalVisible(false);
        
      })
      .catch(error => {
        console.error('Error creating department:', error);
      });
  };

  const handleDelete = (key) => {
    const newData = data.filter(item => item.key !== key);
    setData(newData);
  };

  const isEditing = (record) => record.key === editingKey;

  const editForm = (
    <Form
      layout="vertical"
      onFinish={onFinishEdit}
      initialValues={data.find((item) => item.key === editingKey)}
    >
      <Form.Item label="Department Code" name="departmentCode" required>
        <Input />
      </Form.Item>
      <Form.Item label="Department Name" name="departmentName" required>
        <Input />
      </Form.Item>
      <Form.Item label="Program Name" name="programName" required>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{ backgroundColor: '#4279A6' }} htmlType="submit">
          Save
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );

  const createForm = (
    <Form layout="vertical" onFinish={onFinishCreate}>
      <Form.Item label="Department Name" name="dname" required>
        <Input />
      </Form.Item>
      <Form.Item label="Department Type" name="depType" required>
        <Input />
      </Form.Item>
      <Form.Item label="Is Major" name="major" required>
        <Select>
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
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

  return (
    <div>
      <Button onClick={showCreateModal} type="primary" style={{ marginBottom: 16, backgroundColor: '#4279A6' }} >
        Create New Department
      </Button>
      <Table dataSource={data} columns={columns} rowKey="key" bordered pagination={false} />
      {editModal}
      {createModal}
    </div>
  );
};

export default AddDepartment;
