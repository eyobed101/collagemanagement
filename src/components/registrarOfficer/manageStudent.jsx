import React, { useEffect, useState } from "react";
import styled from "styled-components";
import addDropTableData from "@/data/addrop";
import axios from "axios";

const StudentStatusManagement = () => {
  const [students, setStudents] = useState([]);
  const [sectionStudEnroll, setSectionStudEnroll] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [studStatus, setStudStatus] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterSection, setFilterSection] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5169/api/Departments?sortOrder=name desc&pageNumber=1"
        );
        setDepartments(response.data);
        console.log(departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:5169/api/Section");
        setSections(response.data);
        console.log(sections);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    const fetchSectionStudentEnroll = async () => {
      try {
        const response = await axios.get("http://localhost:5169/api/SectionStudEnroll");
        setSectionStudEnroll(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }

    }

    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5169/api/Applicants"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };
    const fetchStudentStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5169/api/Applicants"
        );
        setStudStatus(response.data);
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

  const handleSectionChange = (event) => {
    const selectedData = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data");

    setSelectedSection({
      ...JSON.parse(selectedData),
    });
  };

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

  const ModalForm = () => {
    const statusOptions = [
      "Active",
      "Graduated",
      "Drop out",
      "Withdrawl",
      "Re admision",
      "Warning",
      "Dismissal",
    ];

    return (
      <div>
        <label className="block text-lg font-semibold mb-2 text-[#434343]">
          New Status
        </label>
        <select
          className="px-8 py-3 w-full border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm rounded-md mb-4"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setNewStatus(student.status);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setNewStatus("");
    setIsModalOpen(false);
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();

    if (selectedStudent) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, status: newStatus }
            : student
        )
      );
    }

    handleCloseModal();
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

  return (
    <div className="mt-12 mb-8 flex flex-col gap-6 bg-white p-5 rounded-md">
      <div className="flex flex-wrap justify-start mt-4">
        <div style={{ width: "25%", minWidth: "200px", marginRight: "20px" }}>
          <label className="block text-lg font-semibold mb-2 text-[#434343]">
            Select Department
          </label>
          <select
            className="px-8 py-3 w-full border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm rounded-md"
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
          <label className="block text-lg font-semibold mb-2 text-[#434343]">
            Section
          </label>
          <select
            className="px-8 py-3 w-full border-[2px] border-[#C2C2C2] text-black block shadow-sm sm:text-sm rounded-md"
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
        {/* <button
          className="px-4 py-2 bg-[#4279A6] text-white rounded"
          onClick={() => setCurrentPage(1)}
        >
          Apply Filters
        </button> */}
      </div>
      <div className="border-2 px-5 py-4 rounded-md shadow-md">
        <StyledTable>
          <thead className="border-2 px-5 py-4 rounded-md shadow-md">
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Department</TableHeader>
              <TableHeader>Section</TableHeader>
              <TableHeader>Program</TableHeader>
              <TableHeader>Term</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {sectionStudEnroll.filter((stud) => stud.sectionId === selectedSection.sectionId).filter((student) =>
    studStatus.some((status) => status.studId === student.studId)
  ).map((student, index) => (
              <TableRow key={index} isOdd={index % 2 !== 0}>
                <TableCell>{student.studId}</TableCell>
                {/* <TableCell>{student.fname}{" "}{student.mname}</TableCell>
                <TableCell>{departments.filter((dept)=> student.dname === dept.did).map((dep)=> dep.dname)}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>{student.program}</TableCell>
                <TableCell>{student.batch}</TableCell>
                <TableCell>
                  {student.status ? student.status : "Active"}
                </TableCell> */}
                <TableCell>
                  <StyledButton onClick={() => handleOpenModal(student)}>
                    Change
                  </StyledButton>
                </TableCell>
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

        {isModalOpen && (
          <ModalOverlay isOpen={isModalOpen}>
            <ModalWrapper isOpen={isModalOpen}>
              <ModalForm />
              <div>
                <StyledButton onClick={(e) => handleUpdateStatus(e)}>
                  Update Status
                </StyledButton>
              </div>
            </ModalWrapper>
          </ModalOverlay>
        )}
      </div>
    </div>
  );
};

export default StudentStatusManagement;
