import React, { useEffect, useState } from "react";
import styled from "styled-components";
import addDropTableData from "@/data/addrop";
import axios from "axios";
import { apiurl } from "../constants";
import { tailspin } from "ldrs";
import axiosInstance from "@/configs/axios";
import { Modal, Form, Select, Input, Button, notification } from "antd";

const TableRow = styled.tr`
  background-color: ${({ isOdd }) => (isOdd ? "#f0f0f0" : "white")};
  padding: 10px;
`;

const TableCell = styled.td`
  padding: 8px;
  border: 2px solid #e2e8f0;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 2px solid #e2e8f0;
  border-collapse: collapse;
  padding: 12px;
  text-align: left;
  background-color: #f0f0f0;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  margin-top: 12px;
`;

const ModalWrapper = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  z-index: 999;
  width: 30%;
  font-family: "Arial", sans-serif; /* Specify your desired font type */
`;

const ModalOverlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const StyledButton = styled.button`
  padding: 3px 16px;
  border: 0.5px #4279a6 solid;
  background-color: none;
  color: white;
  // border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Arial", sans-serif; /* Specify your desired font type */
  font-size: 16px; /* Specify your desired font size */
  color: #4279a6;

  &:hover {
    background-color: #4278a6;
    color: white;
  }
`;

const StudentStatusManagement = () => {
  const [students, setStudents] = useState([]);
  const [sectionStudEnroll, setSectionStudEnroll] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [studStatus, setStudStatus] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStatus, setNewStatus] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterSection, setFilterSection] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [changeReason, setChangeReason] = useState("Pass");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get(`/api/Departments`);
        setDepartments(response.data);
        console.log("Departiments", response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    const fetchSections = async () => {
      try {
        const response = await axiosInstance.get(`/api/Section`);
        setSections(response.data);
        console.log("Sections", response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    const fetchSectionStudentEnroll = async () => {
      try {
        const response = await axiosInstance.get(`/api/SectionStudEnroll`);
        setSectionStudEnroll(response.data);
        console.log("sectionStudEnroll", response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    const fetchApplicants = async () => {
      try {
        const response = await axiosInstance.get(`/api/Applicants`);
        setStudents(response.data);
        console.log("Students", response.data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };
    const fetchStudentStatus = async () => {
      try {
        const response = await axiosInstance.get(`/api/StudentStatus`);
        setStudStatus(response.data);
        console.log("status", response.data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };

    fetchDepartments();
    fetchSections();
    fetchApplicants();
    fetchStudentStatus();
    fetchSectionStudentEnroll();
  }, []);

  const showModal = (student) => {
    setSelectedStudent(student);
    form.setFieldsValue({
      status: student.currentStatus,
      reason: "", // Assuming no initial reason
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSectionChange = (event) => {
    const selectedData = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data");

    setSelectedSection({
      ...JSON.parse(selectedData),
    });
  };

  const handleUpdateStatus = async (values) => {
    // Prevent the default form submission which is handled by antd Form
    const { status: newStatus, reason: changeReason } = values;
    console.log("laoaoa", selectedStudent.statusChangeDate);
    const encodedStudId = encodeURIComponent(selectedStudent.studId);
    const StudentStatusChange = selectedStudent.statusChangeDate;

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let day = String(currentDate.getDate()).padStart(2, "0");
    let formattedDate = `${year}-${month}-${day}`;

    const updatedStatus = {
      StudId: selectedStudent.studId,
      CurrentStatus: newStatus,
      PrevStatus: selectedStudent.currentStatus,
      StatusChangeDate: formattedDate,
      ChangeReason: changeReason,
      ReadmissionDate: null,
    };

    console.log("Updating status to:", updatedStatus);

    try {
      const response = await axiosInstance.put(
        `/api/StudentStatus/update`,
        updatedStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            StudId: selectedStudent.studId,
            StatusChangeDate: selectedStudent.statusChangeDate,
          },
        }
      );
      if (response.status === 200) {
        notification.success({
          message: "Update Successful",
          description: "Student status updated successfully!",
        });
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: `Error updating student status: ${error.message || error}`,
      });
    }
    setIsModalOpen(false);
  };

  const uniqueDepartments = [
    ...new Set(students.map((student) => student.department)),
  ];
  const uniqueSections = [
    ...new Set(students.map((student) => student.section)),
  ];

  const filteredStudents = students.filter((student) => {
    return (
      (!filterDepartment || student.department === filterDepartment) &&
      (!filterSection || student.section === filterSection)
    );
  });

  const totalPages =
    itemsPerPage > 0 ? Math.ceil(filteredStudents.length / itemsPerPage) : 1;
  const validPageNumber = Math.max(1, Math.min(currentPage, totalPages));
  const visibleStudents = filteredStudents.slice(
    (validPageNumber - 1) * itemsPerPage,
    validPageNumber * itemsPerPage
  );

  function renderStudentDataCells(status) {
    const studentDetails = students.find(
      (stud) => stud.studId === status.studId
    );
    return (
      <>
        <TableCell>{status.studId}</TableCell>
        <TableCell>
          {studentDetails
            ? `${studentDetails.fname} ${studentDetails.mname || ""} ${
                studentDetails.lname
              }`
            : ""}
        </TableCell>
        <TableCell>{studentDetails ? studentDetails.sex : ""}</TableCell>
        <TableCell>{studentDetails ? studentDetails.program : ""}</TableCell>
        <TableCell>{status.prevStatus || " "}</TableCell>
        <TableCell>{status.currentStatus || " "}</TableCell>
        <TableCell>{status.changeReason || " "}</TableCell>
        <TableCell>
          <Button onClick={() => showModal(status)}>Edit</Button>
        </TableCell>
      </>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-6 bg-white p-5 rounded-md">
      <div className="flex flex-wrap justify-start mt-4">
        <div style={{ width: "25%", minWidth: "200px", marginRight: "20px" }}>
          <select
            className="px-8 py-3 w-full font-semibold bg-blue-gray-50 border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm rounded-md"
            value={selectedDepartment ? selectedDepartment.dname : ""}
            onChange={(e) =>
              setSelectedDepartment(
                departments.find((dept) => dept.dname === e.target.value)
              )
            }
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.dname}>
                {dept.dname}
              </option>
            ))}
          </select>
        </div>
        <div style={{ width: "25%", minWidth: "200px" }}>
          <select
            className="px-8 py-3 w-full font-semibold bg-blue-gray-50 border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm rounded-md"
            onChange={handleSectionChange}
          >
            <option value="">Select Section</option>

            {selectedDepartment ? (
              sections
                .filter((section) => section.dcode === selectedDepartment.did)
                .map((section) => (
                  <option
                    key={section.sectionId}
                    value={section.sectionName}
                    data={JSON.stringify(section)}
                  >
                    {section.sectionName}
                  </option>
                ))
            ) : (
              <option disabled>Select a Department first</option>
            )}
          </select>
        </div>
      </div>
      <div className="border-2 px-5 py-4 rounded-md shadow-md">
        <StyledTable>
          <thead className="border-2 px-5 py-4 rounded-md shadow-md">
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Full Name</TableHeader>
              <TableHeader>Gender</TableHeader>
              <TableHeader>Program</TableHeader>
              <TableHeader>Previous Status</TableHeader>
              <TableHeader>Current Status</TableHeader>
              <TableHeader>Change Reason</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {selectedDepartment
              ? selectedSection
                ? studStatus
                    .filter((status) =>
                      sectionStudEnroll.some(
                        (stud) =>
                          stud.studId === status.studId &&
                          stud.sectionId === selectedSection.sectionId
                      )
                    )
                    .map((status, index) => (
                      <TableRow key={index} isOdd={index % 2 !== 0}>
                        {renderStudentDataCells(status)}
                      </TableRow>
                    ))
                : studStatus
                    .filter((status) =>
                      sectionStudEnroll.some(
                        (stud) =>
                          stud.studId === status.studId &&
                          stud.departmentId === selectedDepartment.did
                      )
                    )
                    .map((status, index) => (
                      <TableRow key={index} isOdd={index % 2 !== 0}>
                        {renderStudentDataCells(status)}
                      </TableRow>
                    ))
              : studStatus.map((status, index) => (
                  <TableRow key={index} isOdd={index % 2 !== 0}>
                    {renderStudentDataCells(status)}
                  </TableRow>
                ))}
          </tbody>
        </StyledTable>

        <div className="flex justify-between mt-4">
          <div>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-[#4279A6] text-white rounded"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-[#4279A6] text-white rounded"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>

        <Modal
          title="Update Student Status"
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form form={form} onFinish={handleUpdateStatus} layout="vertical">
            <Form.Item
              name="status"
              label="New Status"
              rules={[
                { required: true, message: "Please select a new status!" },
              ]}
            >
              <Select placeholder="Select a status">
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Graduated">Graduated</Select.Option>
                <Select.Option value="Drop out">Drop out</Select.Option>
                <Select.Option value="Withdrawl">Withdrawl</Select.Option>
                <Select.Option value="Re admision">Re admision</Select.Option>
                <Select.Option value="Warning">Warning</Select.Option>
                <Select.Option value="Dismissal">Dismissal</Select.Option>

                {/* Add more status options as needed */}
              </Select>
            </Form.Item>
            <Form.Item
              name="reason"
              label="Cause of Change"
              rules={[
                {
                  required: true,
                  message: "Please input the reason for status change!",
                },
              ]}
            >
              <Input placeholder="Enter the reason for change" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{backgroundColor:"#4279A6"}}>
                Update Status
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      {success && (
        <div
          id="alert-border-3"
          class="flex items-center mt-5 p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ms-3 text-sm font-medium">Submission successful!</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-3"
            aria-label="Close"
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      {error && (
        <div
          id="alert-border-2"
          class="flex items-center mt-5 p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ms-3 text-sm font-medium">Error: {error}</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-2"
            aria-label="Close"
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentStatusManagement;
