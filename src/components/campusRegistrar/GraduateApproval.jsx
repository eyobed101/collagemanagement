import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
// import SiderGenerator from './Menu';


const GraduatesApproval = () => {
  const [graduatesData, setGraduatesData] = useState([]);
  const [selectedGraduate, setSelectedGraduate] = useState(null);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);

  useEffect(() => {
    // Fetch or set your graduates data here
    // For demonstration purposes, I'm using static data
    const initialData = [
      { key: '1', studentName: 'John Doe', program: 'Computer Science',batch: '2021/22',cgpa: 2.85, major: 2.4, remain: 0, status: 'Pending Approval' },
      { key: '2', studentName: 'Jane Doe', program: 'Electrical Enginnering',batch: '2021/22',cgpa: 3.42, major: 3.1, remain: 2,  status: 'Pending Approval' },
      { key: '3', studentName: 'Abel Kebde', program: 'Information Science',batch: '2021/22',cgpa: 4, major: 4, remain: 0,  status: 'Pending Approval' },
      { key: '4', studentName: 'Kalkidan Misganaw', program: 'Industrial Science',batch: '2019/20',cgpa: 3.77, major: 3.2, remain: 0,  status: 'Pending Approval' },
      { key: '5', studentName: 'Eyobed Smith', program: 'Computer Science',batch: '2021/22',cgpa: 3.51, major: 3.3, remain: 2,  status: 'Pending Approval' },
      { key: '6', studentName: 'Exodus Eyob', program: 'Computer Science',batch: '2020/21',cgpa: 3.58, major: 2.7, remain: 0,  status: 'Pending Approval' },
      { key: '7', studentName: 'Tomas Mekonen', program: 'Computer Science',batch: '2020/21',cgpa: 3.48, major: 2.8, remain: 0,  status: 'Pending Approval' },
      // Add more graduate entries
    ];
    setGraduatesData(initialData);
  }, []);

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
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
      title: 'CGPA',
      dataIndex: 'cgpa',
      key: 'cgpa',
    },
    {
      title: 'MAJOR GPA',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'Remaining Course',
      dataIndex: 'remain',
      key: 'remain',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="link" onClick={() => handleApprove(record)}>
          Approve
        </Button>
      ),
    },
  ];

  const handleApprove = (record) => {
    setSelectedGraduate(record);
    setIsApprovalModalVisible(true);
  };

  const handleModalOk = () => {
    // Handle approve logic, e.g., update status to 'Approved' in your data
    const updatedData = graduatesData.map((item) =>
      item.key === selectedGraduate.key ? { ...item, status: 'Approved' } : item
    );
    setGraduatesData(updatedData);
    setIsApprovalModalVisible(false);
    setSelectedGraduate(null);
  };

  const handleModalCancel = () => {
    setIsApprovalModalVisible(false);
    setSelectedGraduate(null);
  };

  return (
    <div  className="bg-[#F9FAFB] min-h-[100vh]  ">
    {/* <SiderGenerator navigate={navigate}/> */}
    <div className="list-sub mb-10 ml-[2%]">
      <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
        Graduates Approval
      </p>
      <Table
        columns={columns}
        dataSource={graduatesData}
        style={{ marginTop: 20 }}
        pagination={{ position: ['bottomCenter'] }}
      />

      <Modal
        title="Approval Confirmation"
        visible={isApprovalModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ style: { backgroundColor: 'blue' } }} 

      >
        <p>Are you sure you want to approve the graduation for {selectedGraduate?.studentName}?</p>
      </Modal>
    </div>
    </div>
  );
};

export default GraduatesApproval;
