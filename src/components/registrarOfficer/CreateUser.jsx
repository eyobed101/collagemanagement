import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Input, Tabs, Select } from "antd";
import axiosInstance from "@/configs/axios";
import styled from "styled-components";
import moment from "moment";
import {notification} from "antd";


// import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const { Search } = Input;

const TableRow = styled.tr`
  background-color: ${({ isOdd }) => (isOdd ? "#f0f0f0" : "white")};
  padding: 10px;
`;

const TableCell = styled.td`
  padding: 8px;
  border: 2px solid #e2e8f0;
  border-collapse: collapse;
  text-align:center;
`;

const TableHeader = styled.th`
  border: 2px solid #e2e8f0;
  border-collapse: collapse;
  padding: 15px;
  text-align: left;
  background-color: #4279A6;
  color: white;
  text-align:center;

  &:first-child {
    border-top-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-radius:15px;
  min-width: 640px;
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

const CreateUser = ({ sectionId }) => {
  const [students, setStudents] = useState([]);
  const [sectionStudEnroll, setSectionStudEnroll] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [sections, setSections] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [applicants, setApplicants] = useState([]);
  const [dep, setDep] = useState(0);

  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [specialChar, setSpecialChar] = useState('!');
  const [twoDigits, setTwoDigits] = useState('01');
  const [generatedAccounts, setGeneratedAccounts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const pageNeighbours = 2;

  const [form] = Form.useForm();

  useEffect(() => {
    fetchDepartments();
    fetchSectionStudentEnroll();
    fetchApplicant();
    fetchSections();
    fetchTerms();
  }, [sectionId]);

  const fetchSectionStudentEnroll = async () => {
    try {
      const response = await axiosInstance.get(`/api/SectionStudEnroll`);
      setSectionStudEnroll(response.data);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };
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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const fetchTerms = async () => {
    try {
      const response = await axiosInstance.get(`/api/Terms`);
      setTerms(response.data);
    } catch (error) {
      console.error("Error fetching terms:", error);
    }
  };

  const fetchApplicant = async () => {
    try {
      const response = await axiosInstance.get(`/api/Applicants`);
      setApplicants(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  function formatDoB(date) {
    return date && moment(date, "YYYY-MM-DD").isValid()
      ? moment(date, "YYYY-MM-DD")
      : null;
  }

  const handleDepartmentChange = (value) => {
    const selectedDepartments = departments.find(
      (department) => department.dcode === value
    );
    setDep(selectedDepartments.did);
  };

  const showModal = (student) => {
    const studentData = {
      ...student,
      fullname: `${student.fname} ${student.mname || ""} ${student.lname}`,
    };

    setEditingStudent(studentData);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    console.log("Closing modal");

    setIsModalVisible(false);
    setEditingStudent(null);
  };


  const showCreateModal = () => setIsCreateVisible(true);
  const handleCreateCancel = () => setIsCreateVisible(false);

  const handleGenerateAccounts = () => {
    const accounts = currentItems.map(student => ({
      username: student.studId,
      email: student.email,
      password: `${student.fname}${student.lname}${specialChar}${twoDigits}`,
      centerId: student.centerId
    }));
    setGeneratedAccounts(accounts);
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(generatedAccounts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Accounts");
    const exportFileName = `${selectedDepartment.dname}Accounts.xlsx`;
    XLSX.writeFile(wb, exportFileName);
  };
  const handleSubmit = async () => {
    try {
        for (const account of generatedAccounts) {
            await axiosInstance.post('/api/Authenticate/student/register', account);
        }
        setIsCreateVisible(false);
        
        console.log('All accounts have been successfully registered.');
        notification.success({ message: 'Registration Success', description: 'All accounts have been successfully registered.' });
    } catch (error) {
        console.error('Failed to register accounts:', error);

        notification.error({ message: 'Registration Error', description: 'There was a problem registering accounts.' });

        setIsCreateVisible(false); 
    }
};
  

  const filteredApplicants = applicants
    .filter((student) => {
      if (selectedDepartment && Object.keys(selectedDepartment).length !== 0) {
        // Assuming student.departmentId needs to match selectedDepartment.did
        return student.dname === selectedDepartment.did;
      }
      return true;
    })
    .filter((student) => {
      // Always apply the search filter
      const fullName = `${student.fname} ${student.mname || ""} ${
        student.lname
      }`.toLowerCase();
      return fullName.includes(searchText);
    });

  // Pagination logic
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredApplicants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredApplicants.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generates the range of page numbers to be displayed
  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = [1];
      for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
      }
      pages.push(totalPages);

      // Insert ellipses
      if (startPage > 2) {
        pages.splice(1, 0, "...");
      }
      if (endPage < totalPages - 1) {
        pages.splice(pages.length - 1, 0, "...");
      }

      return pages;
    }

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  const handleSectionChange = (event) => {
    const selectedData = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data");
    console.log(selectedData);
    setSelectedSection({
      ...JSON.parse(selectedData),
    });
  };
  const activeTerms = terms.filter(
    (term) => new Date(term.endDate) > new Date()
  );

  const onSearch = (value) => {
    setSearchText(value.trim().toLowerCase());
  };

  const handleEditSubmit = async (values) => {
    const data = { ...editingStudent, ...values };
    console.log("LLL", activeTerms);

    const metaData = {
      StudId: data.studId,
      Fname: data.fname,
      Mname: data.mname,
      Lname: data.lname,
      Dname: dep,
      Sex: data.sex,
      SectionId: data.SectionId[0],
      TermId: activeTerms[0].termId,
      DoB: data.doB,
      PlaceOfBirth: data.placeOfBirth,
      Nationality: data.nationality,
      MaritalStatus: data.maritalStatus,
      PrevEducation: data.prevEducation,
      PrevInstitution: data.prevInstitution,
      PrevMajorDepartment: data.prevMajorDepartment,
      PrevEducCgpa: data.prevEducCgpa,
      Serviceyear: data.serviceyear,
      Program: data.program,
      ProgramType: data.programType,
      CenterId: data.centerId,
      Zone: data.zone,
      Woreda: data.woreda,
      Kebele: data.kebele,
      Town: data.town,
      Tel: data.tel,
      Pobox: data.pobox,
      Email: data.email,
      PersontoBeContacted: data.persontoBeContacted,
      AppDate: data.appDate,
      Approved: data.approved,
      ApprovedDate: data.approvedDate,
      Age: data.age,
      AgeInyear: data.ageInyear,
      Batch: data.batch,
    };

    console.log("IIIIIIIII", metaData);

    try {
      await axiosInstance.put(
        `/api/Applicants/${encodeURIComponent(data.studId)}`,
        metaData,
        {
          params: {
            SectionID: data.SectionId[0],
            TermId: activeTerms[0].termId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      notification.success({
        message: "Successful",
        description: "Student updating is successfull!",
      });
      setIsModalVisible(false);

      setEditingStudent(null);
      fetchApplicant();
      // fetchStudents(); // Refetch students to show the updated data
    } catch (error) {
      console.error("Failed to update student", error);
      notification.error({
        message: "Failed",
        description: `Error updating student ${error.message || error}`,
      });
    }
  };


  return (
    <div>
      <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md min-h-[100vh]">
        <div className="flex justify-between w-full">
          <div className="flex space-x-2">
          <div className="mb-2 space-y-4">
            <select
              className="px-8 py-3 w-full bg-blue-gray-50 border-x-2 border-y-2 font-semibold border-[#C2C2C2] text-black block shadow-md sm:text-sm rounded-md"
              onChange={(e) =>
                setSelectedDepartment(
                  departments.find((dept) => dept.dcode === e.target.value)
                )
              }
              value={selectedDepartment ? selectedDepartment.dcode : ""}
            >
              <option value={[]}>Select Department</option>
              {departments.map((dept, index) => (
                <option key={dept.dcode} value={dept.dcode}>
                  {dept.dname}
                </option>
              ))}
            </select>


          </div>
          <div className="mb-2 space-y-4">
            <select
              className="px-8 py-3 w-full bg-blue-gray-50 border-x-2 border-y-2 border-[#C2C2C2] font-semibold text-black block shadow-md sm:text-sm rounded-md"
              onChange={(e) =>
                setSelectedSection(
                  sections.find((sec) => sec.sectionId === e.target.value)
                )
              }
              value={selectedSection ? selectedSection.sectionId : ""}
            >
              
              <option value={[]}>Select Section</option>
              {selectedDepartment ?  sections.filter((sec) => sec.dcode === selectedDepartment.did).map((dept) => (
                <option key={dept.sectionId} value={dept.sectionId}>
                  {dept.sectionName}
                </option>
              )) : ""}
            </select>

          </div>
          
         
          </div>
         
          

          <div className="w-[25%]">
            <Search
              placeholder="Search by student name"
              onSearch={onSearch}
              className="w-full border-2 border-[#C2C2C2] sm:text-sm rounded-md"

            />
          </div>
        </div>
        <div className="w-[30%]">
        <button
              className="flex  px-8 py-4 font-semibold bg-[#4279A6] text-white  hover:bg-blue-600  shadow-md sm:text-sm rounded-md"
              onClick={showCreateModal}
              disabled={!selectedSection || (selectedSection && Object.keys(selectedSection).length === 0)}
            >
            {selectedSection && Object.keys(selectedSection).length !== 0 ? `Generate Accounts for ${selectedSection.sectionName}` : "Select Section to Generate"}
            </button>
            </div>
            <hr className="border-2 border-[#C2C2C2]"/>

        <div className="border-2 px-5 py-4 rounded-md shadow-md">
          <StyledTable>
            <thead className="border-2 px-5 py-4 rounded-md shadow-md">
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Full Name</TableHeader>
                <TableHeader>Sex</TableHeader>
                <TableHeader>Date of Birth</TableHeader>
                <TableHeader>Place of Birth</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {currentItems.map((student, index) => (
                <tr
                  key={student.studId}
                  className={index % 2 !== 0 ? "bg-gray-100" : ""}
                >
                  <TableCell>{student.studId}</TableCell>
                  <TableCell>{`${student.fname} ${student.mname || ""} ${
                    student.lname
                  }`}</TableCell>
                  <TableCell>{student.sex}</TableCell>
                  <TableCell>{student.doB}</TableCell>
                  <TableCell>{student.placeOfBirth}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => showModal(student)}>Edit</Button>
                  </TableCell>
                </tr>
              ))}
              {filteredApplicants.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
          <div
            className="pagination"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {fetchPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={index}
                  style={{ margin: "0 5px", alignSelf: "center" }}
                >
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  style={{
                    margin: "0 5px",
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: currentPage === page ? "#4279A6" : "",
                    color: currentPage === page ? "white" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
        {editingStudent &&
        <Modal
          title={editingStudent.fullname}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleEditSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              label="User Name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="User Name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { type: "email", message: "The input is not a valid email!" },
                { required: true, message: "Please input your email address!" },
              ]}
            >
              <Input type="email" placeholder="Email Address" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#4279A6" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        
}
      </div>
      <Modal
        title="Generate Custom Passwords"
        visible={isCreateVisible}
        onCancel={handleCreateCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleGenerateAccounts}>
          <Form.Item label="Special Character">
            <Input value={specialChar} onChange={e => setSpecialChar(e.target.value)} maxLength={1} />
          </Form.Item>
          <Form.Item label="Two Digits">
            <Input value={twoDigits} onChange={e => setTwoDigits(e.target.value)} maxLength={2} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className=" bg-blue-500 text-white  hover:bg-blue-600 mb-4">
            Generate
          </Button>
        </Form>
        <div className="flex justify-between">
          <Button onClick={handleExportToExcel} disabled={!generatedAccounts.length}>
            Export to Excel
          </Button>
          <Button onClick={handleSubmit} type="primary" disabled={!generatedAccounts.length} className=" bg-blue-500 text-white  hover:bg-blue-600">
            Submit All
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateUser;
