import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
// import SiderGenerator from './Menu';

const GradeApproval = () => {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);

  useEffect(() => {
    // Fetch or set your grade data here
    // For demonstration purposes, I'm using static data
    const initialData = [
      { key: '1', student: 'John Doe', course: 'Math', grade: 'A', status: 'Pending' },
      // Add more grade entries
    ];
    setData(initialData);
  }, []);

  const columns = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
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
        <>
          <Button type="link" onClick={() => handleApprove(record)}>
            Approve
          </Button>
          <Button type="link" onClick={() => handleReject(record)}>
            Reject
          </Button>
        
        </>
      ),
    },
  ];

  const handleApprove = (record) => {
    setSelectedRecord(record);
    setIsApprovalModalVisible(true);
  };

  const handleReject = (record) => {
    // Handle reject logic, e.g., update status to 'Rejected' in your data
    const updatedData = data.map((item) =>
      item.key === record.key ? { ...item, status: 'Rejected' } : item
    );
    setData(updatedData);
  };

  const handleModalOk = () => {
    // Handle approve logic, e.g., update status to 'Approved' in your data
    const updatedData = data.map((item) =>
      item.key === selectedRecord.key ? { ...item, status: 'Approved' } : item
    );
    setData(updatedData);
    setIsApprovalModalVisible(false);
    setSelectedRecord(null);
  };

  const handleModalCancel = () => {
    setIsApprovalModalVisible(false);
    setSelectedRecord(null);
  };

  return (
    <div  className="bg-[#F9FAFB] min-h-[100vh]  ">
    {/* <SiderGenerator navigate={navigate}/> */}

    <div className="list-sub mb-10 ml-[20%]">
      <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
        Grade Approval
      </p>
      <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} pagination={{ position: ['bottomCenter'] }} />

      <Modal
        title="Approval Confirmation"
        visible={isApprovalModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Are you sure you want to approve the grade for {selectedRecord?.student}?</p>
      </Modal>
    </div>
    </div>
  );
};

export default GradeApproval;
