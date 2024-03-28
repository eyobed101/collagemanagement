import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "antd";

const StudentCopyVerification = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [graduatesData, setGraduatesData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectedGraduate, setSelectedGraduate] = useState(null);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 100000);
  };

  useEffect(() => {
    // Fetch or set your graduates data here
    // For demonstration purposes, I'm using static data
    const initialData = [
      {
        key: "1",
        studentName: "John Doe",
        program: "Computer Science",
        year: "2011",
        status: "Pending Verfication",
      },
      {
        key: "2",
        studentName: "Jane Doe",
        program: "Industrial Science",
        year: "2010",
        status: "Pending Verfication",
      },
      {
        key: "3",
        studentName: "Kalkidan Misganaw",
        program: "Electrical Enginerring",
        year: "2011",
        status: "Pending Verfication",
      },
      {
        key: "4",
        studentName: "Abel Abebe",
        program: "Computer Science",
        year: "2010",
        status: "Pending Verfication",
      },
      {
        key: "5",
        studentName: "Eyob Domow",
        program: "Information Science",
        year: "2011",
        status: "Pending Verfication",
      },
      // Add more graduate entries
    ];
    setGraduatesData(initialData);
  }, []);

  const column1 = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "CGPA",
      dataIndex: "cgpa",
      key: "cgpa",
    },
    {
      title: "Courses Taken",
      dataIndex: "coursesTaken",
      key: "coursesTaken",
      render: (coursesTaken) => (
        <ul>
          {coursesTaken.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      ),
    },
  ];

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Program",
      dataIndex: "program",
      key: "program",
    },
    {
      title: "Entry Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => handleOpenModal(record)}>
          Open Student Copy
        </Button>
      ),
    },
  ];

  const handleOpenModal = (record) => {
    setIsModalVisible(true);

    setSelectedGraduate(record);

    console.log("news  ", record);

    // console.log("s ", gradesData)
    const data = [
      {
        key: record.key,
        department: record.program,
        studentName: record.studentName,
        studentId: generateUniqueId(),
        cgpa: 3.5,
        coursesTaken: [
          "Introduction to Programming",
          "Database Management",
          "Web Development",
        ],
      },
      // Add more student data as needed
    ];

    setStudentData(data);

    setIsVerified(false);
  };

  const handleVerifyCopy = () => {
    // Implement your verification logic here
    // For demonstration, set isVerified to true
    setIsVerified(true);
  };

  const handleSignCopy = () => {
    // Implement your signing logic here
    // For demonstration, show a success message
    alert("Student copy signed successfully!");
    setIsModalVisible(false);
  };

  return (
    <div className="mb-8 flex flex-col gap-12 bg-white p-5 rounded-md shadow-md">
      {/* <SiderGenerator navigate={navigate}/> */}
      <div className="list-sub mb-10 ml-[2%]">
        <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0]">
          Graduates Approval
        </p>
        <div className="bg-white p-5 rounded-md shadow-md">
          <Table
            columns={columns}
            dataSource={graduatesData}
            style={{ marginTop: 20 }}
            pagination={{ position: ["bottomCenter"] }}
          />
        </div>

        <Modal
          title="Student Copy Verification"
          visible={isModalVisible}
          onOk={handleSignCopy}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>,
            <Button
              key="verify"
              type="primary"
              style={{ backgroundColor: "blue" }}
              onClick={handleVerifyCopy}
              disabled={isVerified}
            >
              Verify Copy
            </Button>,
            <Button
              key="sign"
              type="primary"
              style={{ backgroundColor: "grey" }}
              onClick={handleSignCopy}
              disabled={!isVerified}
            >
              Sign Copy
            </Button>,
          ]}
        >
          <Table
            columns={column1}
            dataSource={studentData}
            style={{ marginTop: 20 }}
            pagination={{ position: ["bottomCenter"] }}
          />

          <p>Status: {isVerified ? "Verified" : "Not Verified"}</p>
        </Modal>
      </div>
    </div>
  );
};

export default StudentCopyVerification;
