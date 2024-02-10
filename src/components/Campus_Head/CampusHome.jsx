import React, { useState, useEffect } from 'react';
import { Table, Modal, Input, Button } from 'antd';
import CampusDash from './Campus_Dashboard';


const CampusHome = () =>{
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modifiedUserData, setModifiedUserData] = useState({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a style={{color:'black' , fontWeight:'bold'}}>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEditUser(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDeleteUser(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  
  
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModifiedUserData({ ...user });
    setIsModalVisible(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  
  const handleModalOk = () => {
    // Handle your logic to update the user data
    // For demonstration purposes, I'm updating the data in state
    const updatedData = data.map((user) =>
      user.key === selectedUser.key ? { ...user, ...modifiedUserData } : user
    );
    setData(updatedData);
    setIsModalVisible(false);
    setSelectedUser(null);
    setModifiedUserData({});
  };
  
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setModifiedUserData({});
  };

  const handleDeleteModalOk = () => {
    // Handle your logic to delete the user data
    // For demonstration purposes, I'm updating the data in state
    const updatedData = data.filter((user) => user.key !== selectedUser.key);
    setData(updatedData);
    setIsDeleteModalVisible(false);
    setSelectedUser(null);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    // Fetch or set your user data here
    // For demonstration purposes, I'm using static data
    const datas = [
      {
        key: '1',
        name: 'John Brown',
        email: 'john@admas.com',
        role: 'Department head',
        password: 'test123'
      },
      {
        key: '2',
        name: 'kebede ayele',
        email: 'kebede@admas.com',
        role: 'registrar Office',
        password: 'test456'

      },
      {
        key: '3',
        name: 'Tomas nahom',
        email: 'tomas@admas.com',
        role: 'Campus registrar head',
        password: 'test789'
      },
    ];

    setData(datas);
  }, []);


return (
    <div>
      {/* <CampusDash /> */}
    <div style={{color:'black'}}>
         <p className="text-center text-[#344054] text-[24px] font-bold align-middle  mb-8 border-b-[#EAECF0] border-b-[2px]">
      Users Registeration
          </p> 
      <Table columns={columns} dataSource={data}  style={{ marginTop: 20 }}  pagination={{ position: ["bottomCenter"] }} />;
      <Modal  
        title="Edit User"
        visible={isModalVisible}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <label>Name:</label>
        <Input
          value={modifiedUserData.name}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, name: e.target.value })}
        />
        <label>Email:</label>
        <Input
          value={modifiedUserData.email}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, email: e.target.value })}
        />
        <label>Role:</label>
        <Input
          value={modifiedUserData.role}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, role: e.target.value })}
        />
         <label>Password:</label>
        <Input
          value={modifiedUserData.password}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, password: e.target.value })}
        />
      </Modal>

      <Modal
        title="Delete User"
        visible={isDeleteModalVisible}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
      >
        <p>Are you sure you want to delete {selectedUser?.name}?</p>
      </Modal>
    </div>
    </div>
);
}
export default CampusHome;