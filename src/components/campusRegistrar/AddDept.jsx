import React, { useState, useEffect ,useRef } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { api } from '../constants';
import axiosInstance from '@/configs/axios';


const { Option } = Select;

const AddDepartment = () => {
  const [data, setData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');

  const [departments, setDepartments] = useState([]);
  const editFormRef = useRef(null); // Ref for accessing form instance


  useEffect(() => {
    const fetchData = async () => {
    await axiosInstance.get(`/api/Departments`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching department data:', error);
      });
    }

    fetchData();
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
            <Button onClick={() => edit(record)}>Edit</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const edit = (record) => {
    console.log(record)
     // form.setFieldsValue(record);
    setEditingKey(record.did);
    // handleOk();  
    setIsEditModalVisible(true);
    editFormRef.current.setFieldsValue(record);


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

  const onFinishEdit = async(values) => {
    const updatedData = data.map((item) =>
      item.did === editingKey ? { ...item, ...values } : item
    );
    const postData = {
      "did": editingKey,
      "dcode": values.dcode,
      "dname": values.dname,   
      "depType": values.depType, 
      "major": values.major,      
      "createdDate": moment(Date.now()).format('YYYY-MM-DD'),      
     };

     console.log("test ", postData);
      await axiosInstance.put(`/api/Departments/`+ editingKey, postData)
      .then(response => {
        console.log('Department updated successfully:', response.data);
        setData(updatedData);
        setEditingKey('');
        setIsEditModalVisible(false);
        
      })
      .catch(error => {
        console.error('Error creating department:', error);
      });
       
  };

  const onFinishCreate = async (values) => {
    const departmentCode = Math.floor(Math.random() * 100);
  
  
    const newDepartment = {
      did: departmentCode,
      ...values,
    };
    console.log(newDepartment)
  
    await axiosInstance.post(`/api/Departments`, newDepartment)
      .then(response => {
        console.log('Department created successfully:', response.data);
        setData(newDepartment);
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
    ref={editFormRef}
    layout="vertical"
    onFinish={onFinishEdit}
    initialValues={data.find((item) => item.did === editingKey)}
  >
      <Form.Item label="Department Code" name="dcode" required>
        <Input defaultValue={data.dcode} placeholder={data.dcode} />
      </Form.Item>
      <Form.Item label="Department Name" name="dname" required>
        <Input />
      </Form.Item>
      <Form.Item label="Department Type" name="depType" required>
      <Select>
          <Option value="Major">Major</Option>
          <Option value="Supportive">Supportive</Option>
          <Option value="Common">Common</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Is Major" name="major" required>
        <Select>
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
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
       <Form.Item label="Department Code" name="dcode" required>
        <Input />
      </Form.Item>
      <Form.Item label="Department Name" name="dname" required>
        <Input />
      </Form.Item>
      <Form.Item label="Department Type" name="depType" required>
      <Select>
          <Option value="Major">Major</Option>
          <Option value="Supportive">Supportive</Option>
          <Option value="Common">Common</Option>
        </Select>
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
    <div className='mb-8 flex flex-col gap-6 bg-white p-5 rounded-md shadow-md'>
      <Button onClick={showCreateModal} type="primary" style={{ marginBottom: 16, fontWeight:"bold",backgroundColor: '#4279A6', padding: '12px 24px', height: 'auto' , maxWidth:"18%"}} >
        Create New Department
      </Button>
      <Table dataSource={data} columns={columns} rowKey="key" bordered pagination={false} />
      {editModal}
      {createModal}
    </div>
  );
};

export default AddDepartment;