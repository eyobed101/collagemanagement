import React, { useState } from "react";
import { Table, Modal, Button, Tag, Select } from "antd";

const { Option } = Select;

const ClearanceList = ({ studentsData }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const Acadamic = [
    { id: 1, year: 2012 },
    { id: 2, year: 2011 },
    { id: 3, year: 2010 },
  ];
  const campuses = [
    { id: 1, name: "computerscience" },
    { id: 2, name: "Electrical" },
    { id: 3, name: "informationscience" },
    { id: 4, name: "Accounting" },
  ];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Acadamic year", dataIndex: "year", key: "year" },
    { title: "Department", dataIndex: "department", key: "department" },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => showClearanceModal(record)}>
          Issue Clearance
        </Button>
      ),
    },
  ];

  const showClearanceModal = (record) => {
    setSelectedStudent(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Perform the necessary logic for issuing clearance, such as updating database, etc.
    console.log(`Clearance issued for ${selectedStudent.name}`);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedStudent(null);
    setIsModalVisible(false);
  };

  const handleCampusChange = async (value) => {
    setSelectedCampus(value);
    setSelectedYear(null); // Reset selected year when campus changes
  };

  const handleYearChange = async (value) => {
    setSelectedYear(value);
  };

  const getFilteredStudentRecords = (campus, year) => {
    console.log(campus, year);
    console.log(
      "test ",
      studentsData.filter((student) => student.year)
    );
    if ((campus, year)) {
      return studentsData.filter(
        (student) => student.department == campus && student.year == year
      );
    } else if (campus) {
      return studentsData.filter((student) => student.department == campus);
    } else {
      return studentsData;
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-12 bg-white p-5 rounded-md">
      <div className="list-sub mb-10 ">
        <div className="list-filter">
          <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            placeholder="--Select Department ---"
            style={{ width: 240 }}
            onChange={handleCampusChange}
          >
            {campuses?.map((item, i) => (
              <Option key={item.id} value={item.name} lable={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          {selectedCampus && (
            <Select
              bordered={false}
              className="!rounded-[6px] border-[#EAECF0] border-[2px]"
              style={{ width: 240 }}
              placeholder="--Select Acadamic Year---"
              onChange={handleYearChange}
            >
              {Acadamic?.map((item, i) => (
                <Option key={item.key} value={item.year} lable={item.year}>
                  {item.year}
                </Option>
              ))}
            </Select>
          )}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={getFilteredStudentRecords(selectedCampus, selectedYear)}
        pagination={{ position: ["bottomCenter"] }}
      />

      <Modal
        title="Clearance Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
        onCancel={handleCancel}
      >
        {selectedStudent && (
          <div>
            <p>{`Are you sure you want to issue clearance for ${selectedStudent.name}?`}</p>
            {selectedStudent.paymentStatus === "Paid" ? (
              <Tag color="green">Payment Status: Paid</Tag>
            ) : (
              <Tag color="red">Payment Status: Unpaid</Tag>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

const studentsData = [
  {
    id: 1,
    name: "John Doe",
    year: 2012,
    department: "computerscience",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    name: "Job Smith",
    year: 2011,
    department: "informationscience",
    paymentStatus: "Unpaid",
  },
  {
    id: 3,
    name: "Aman Weye",
    year: 2011,
    department: "Electrical",
    paymentStatus: "Unpaid",
  },
  {
    id: 4,
    name: "Sole Exo",
    year: 2011,
    department: "Accounting",
    paymentStatus: "Paid",
  },
];

const PaymentStatus = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
      {/* <SiderGenerator />
<div className="list-header mb-2 ml-100">
  <h1 className="text-2xl  font-[600] font-jakarta">Graduate List</h1>
</div> */}
      <ClearanceList studentsData={studentsData} />
    </div>
  );
};

export default PaymentStatus;
