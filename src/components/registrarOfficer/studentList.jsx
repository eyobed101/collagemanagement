import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Input, Tabs, Select } from "antd"; // Assuming you are using Ant Design as in your previous code
import axiosInstance from "@/configs/axios";
import styled from "styled-components";
import moment from "moment";

const { Search } = Input;

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

const StudentList = ({ sectionId }) => {
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
      SectionId: sectionStudEnroll
        .filter((section) => section.studId === student.studId)
        .map((sec) => {
          return sec.sectionId;
        })[0],
      dname: departments
        .filter((dept) => dept.did === student.dname)
        .map((dep) => {
          return dep.dname;
        }),
    };

    setEditingStudent(studentData);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    console.log('Closing modal');

    setIsModalVisible(false);
    setEditingStudent(null);
  };

  // const filteredApplicants = applicants
  //   .filter((student) => {
  //     if (!selectedDepartment) return true; // No department selected, show all applicants
  //     return student.dname === selectedDepartment.did;
  //   })
  //   .filter((student) => {
  //     const fullName = `${student.fname} ${student.mname || ""} ${
  //       student.lname
  //     }`.toLowerCase();
  //     return fullName.includes(searchText);
  //   });

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
      setIsModalVisible(false);
      setEditingStudent(null);
      fetchApplicant();
      // fetchStudents(); // Refetch students to show the updated data
    } catch (error) {
      console.error("Failed to update student", error);
    }
  };

  return (
    <div>
      <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md">
        <div className="flex justify-between w-full">
          <div className="mb-2">
            <select
              className="px-8 py-3 w-full bg-blue-gray-50 border-[#676767] text-black block shadow-md sm:text-sm rounded-md"
              onChange={(e) =>
                setSelectedDepartment(
                  departments.find((dept) => dept.dcode === e.target.value)
                )
              }
              value={selectedDepartment ? selectedDepartment.dcode : ""}
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept.dcode}>
                  {dept.dname}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <Search
              placeholder="Search by student name"
              onSearch={onSearch}
              className="w-full bg-blue-gray-50 sm:text-sm rounded-md"

              // style={{ width: 200, marginBottom: 16 }}
            />
          </div>
        </div>
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
                    backgroundColor: currentPage === page ? "#007bff" : "",
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

        <Modal
          title="Edit Student"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={700}
        >
          <Form initialValues={editingStudent} onFinish={handleEditSubmit}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Personal Info" key="1">
                <Form.Item
                  name="fname"
                  label="First Name"
                  rules={[
                    { required: true, message: "Please input first name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="mname"
                  label="Middle Name"
                  // Optional: Add rules if middle name is required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="lname"
                  label="Last Name"
                  rules={[
                    { required: true, message: "Please input last name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="doB"
                  label="Date of Birth"
                  rules={[
                    { required: true, message: "Please input date of birth!" },
                  ]}
                >
                  <Input
                    type="date"
                    format="YYYY-MM-DD"
                    getPopupContainer={(trigger) => trigger.parentElement}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name="sex"
                  label="Gender"
                  rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Select placeholder="Select Gender" allowClear>
                    <Select.Option value="M">Male</Select.Option>
                    <Select.Option value="F">Female</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="placeOfBirth"
                  label="Place Of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please select place of birth!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="nationality"
                  label="Nationality"
                  rules={[
                    { required: true, message: "Please select Nationality!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="maritalStatus" label="Marital Status">
                  <Select placeholder="Select Marital Status" allowClear>
                    <Select.Option value="SINGLE">SINGLE</Select.Option>
                    <Select.Option value="Married">Married</Select.Option>
                    <Select.Option value="Widowed">Widowed</Select.Option>
                  </Select>
                </Form.Item>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Contact Details" key="2">
                <Form.Item name="zone" label="Zone / Woreda">
                  <Input />
                </Form.Item>
                <Form.Item name="woreda" label="Kebele">
                  <Input />
                </Form.Item>
                <Form.Item name="town" label="Town">
                  <Input />
                </Form.Item>
                <Form.Item name="tel" label="Tel">
                  <Input />
                </Form.Item>
                <Form.Item name="pobox" label="PO box">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="persontoBeContacted"
                  label="Emergency Contact Name"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input email!" },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Education Background" key="3">
                <Form.Item name="prevEducation" label="Previous Education">
                  <Input />
                </Form.Item>
                <Form.Item name="prevInstitution" label="Previous Institution">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="prevMajorDepartment"
                  label="Previous Major Department"
                >
                  <Input />
                </Form.Item>
                <Form.Item name="prevEducCgpa" label="Previous Education CGPA">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="serviceyear" label="Service Year">
                  <Input type="number" />
                </Form.Item>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Department Preferences" key="4">
                <Form.Item
                  name="program"
                  label="Program"
                  rules={[
                    { required: true, message: "Please select a program!" },
                  ]}
                >
                  <Select
                    placeholder="Select Program"
                    onChange={(value) => handleInputChange("program", value)}
                  >
                    <Option value="Degree">Degree</Option>
                    <Option value="Diploma">TVET</Option>
                    <Option value="Masters">Masters</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="programType"
                  label="Program Type"
                  rules={[
                    {
                      required: true,
                      message: "Please select a program type!",
                    },
                  ]}
                >
                  <Select placeholder="Select Program Type" allowClear>
                    <Option value="Regular">Regular</Option>
                    <Option value="Distance">Distance</Option>
                    <Option value="Extension">Extension</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="dname"
                  label="Department"
                  rules={[
                    { required: true, message: "Please select a department!" },
                  ]}
                >
                  <Select
                    placeholder="Select Department"
                    onChange={handleDepartmentChange}
                  >
                    {departments.map((department) => (
                      <Option key={department.did} value={department.dcode}>
                        {department.dname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="SectionId"
                  label="Section"
                  rules={[
                    { required: true, message: "Please select a section!" },
                  ]}
                >
                  <Select showSearch allowClear>
                    {sections
                      .filter((section) => dep === section.dcode)
                      .map((section) => (
                        <Option
                          key={section.sectionId}
                          value={section.sectionId}
                        >
                          {section.sectionName}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                {/* <Form.Item
                  name="termId"
                  label="Term"
                  rules={[{ required: true, message: "Please select a term!" }]}
                >
                  <Select showSearch placeholder="Select Term" allowClear>
                    {activeTerms.map((term) => (
                      <Option key={term.termId} value={term.termId}>
                        {term.name} - {term.acadYear}
                      </Option>
                    ))}
                  </Select>
                </Form.Item> */}
                <Form.Item
                  name="appDate"
                  label="Application Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select the application date!",
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
                <Form.Item
                  name="approvedDate"
                  label="Approved Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select the approved date!",
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
                <Form.Item name="approved" label="Approved ?">
                  <Select placeholder="Select status">
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{backgroundColor:"#4279A6"}}>
                    Submit
                  </Button>
                </Form.Item>
              </Tabs.TabPane>
            </Tabs>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default StudentList;
