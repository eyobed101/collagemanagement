import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import { api } from '../constants';
import axiosInstance from '@/configs/axios';
// import SiderGenerator from './Menu';

const GradeApproval = () => {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/Grades`);
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
    <div  className="mb-8 mt-4 flex flex-col gap-12 bg-white p-5 rounded-md shadow-md min-h-screen">
    {/* <SiderGenerator navigate={navigate}/> */}

    <div className="list-sub mb-10 ml-[0%]">
    <p className="text-[#4d6a90] text-[20px] font-bold align-middle mb-8 border-b-[#EAECF0]">
        Grade Approval
      </p>
      <hr className="mb-4 border-2 border-[#C2C2C2]" />

      <Table  dataSource={data} columns={columns}  bordered  loading={loading}
      rowKey={(record) => record.studId}
      className="custom-table"
          pagination={{ pageSize: 10 }}/>

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
