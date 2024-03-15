import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import { api } from '../constants';
// import SiderGenerator from './Menu';

const GradeApproval = () => {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/api/Grades`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studId',
      key: 'studId',
    },
    {
      title: 'Course No',
      dataIndex: 'courseNo',
      key: 'courseNo',
    },
    {
      title: 'course Grade',
      dataIndex: 'courseGrade',
      key: 'courseGrade',
    },
    {
      title: 'Submitted By',
      dataIndex: 'submitBy',
      key: 'submitBy',
    },
    {
      title: 'Date Submitted',
      dataIndex: 'dateSubmitted',
      key: 'dateSubmitted',
    },
    {
      title: 'Term Id',
      dataIndex: 'termId',
      key: 'termId',
    },

    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
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

    <div className="list-sub mb-10 ml-[0%]">
      <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
        Grade Approval
      </p>
      <Table  dataSource={data} columns={columns}  bordered  loading={loading}
      rowKey={(record) => record.studId}
      pagination={{ pageSize: 10 }} />

      <Modal
        title="Approval Confirmation"
        visible={isApprovalModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 

      >
        <p>Are you sure you want to approve the grade for {selectedRecord?.student}?</p>
      </Modal>
    </div>
    </div>
  );
};

export default GradeApproval;
