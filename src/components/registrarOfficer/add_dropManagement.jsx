import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { gradeEntryData } from "@/data";
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

const StyledForm = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
`;

const StyledLabel = styled.label`
  margin-right: 8px;
`;

const StyledSelect = styled.select`
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const AddDropManagement = () => {
  const [students, setStudents] = useState(gradeEntryData);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [filterAcademicYear, setFilterAcademicYear] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterSection, setFilterSection] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        (!filterAcademicYear || student.batch === filterAcademicYear) &&
        (!filterDepartment || student.department === filterDepartment) &&
        (!filterSection || student.section === filterSection)
    );
  }, [students, filterAcademicYear, filterDepartment, filterSection]);

  const paginatedStudents = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return filteredStudents.slice(start, end);
  }, [filteredStudents, pageIndex, pageSize]);

  const handleStudentSelection = (student) => {
    setSelectedStudent(student);
  };

  const handleGradeSubmission = () => {
    // Implement logic to submit grades to backend or perform further actions
    console.log("Grades submitted:", students);
  };

  const handleStatusSubmission = (status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              status: status,
            }
          : student
      )
    );
  };

  return (
    <div>
      <h2>Grade Management</h2>
      <div>
        <h3>Students Table</h3>
        <div>
          <label htmlFor="filterBatch">Filter by Batch:</label>
          <select
            className="p-1 mr-2 border rounded"
            id="filterBatch"
            name="filterBatch"
            value={filterAcademicYear}
            onChange={(e) => setFilterAcademicYear(e.target.value)}
          >
            <option value="">All</option>
            <option value="2021-2022">2021-2022</option>
            {/* Add more academic years as needed */}
          </select>

          <label htmlFor="filterDepartment">Filter by Department:</label>
          <select
            className="p-1 mr-2 border rounded"
            id="filterDepartment"
            name="filterDepartment"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All</option>
            <option value="Math">Computer Science</option>
            <option value="Science">Science</option>
            {/* Add more departments as needed */}
          </select>

          <label htmlFor="filterSection">Filter by Section:</label>
          <select
            className="p-1 mr-2 border rounded"
            id="filterSection"
            name="filterSection"
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
          >
            <option value="">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            {/* Add more sections as needed */}
          </select>
        </div>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Batch</TableHeader>
              <TableHeader>Department</TableHeader>
              <TableHeader>Section</TableHeader>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student, index) => (
              <TableRow
                key={student.id}
                isOdd={index % 2 !== 0}
                onClick={() => handleStudentSelection(student)}
              >
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.first_name}</TableCell>
                <TableCell>{student.last_name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.batch}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.section}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
        <div>
          <button onClick={() => setPageIndex(0)} disabled={pageIndex === 0}>
            {"<<"}
          </button>{" "}
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            {"<"}
          </button>{" "}
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={
              pageIndex === Math.ceil(filteredStudents.length / pageSize) - 1
            }
          >
            {">"}
          </button>{" "}
          <button
            onClick={() =>
              setPageIndex(
                Math.max(0, Math.ceil(filteredStudents.length / pageSize) - 1)
              )
            }
            disabled={
              pageIndex === Math.ceil(filteredStudents.length / pageSize) - 1
            }
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {Math.ceil(filteredStudents.length / pageSize)}
            </strong>{" "}
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedStudent && (
  <div>
    <h3>Status Change for {selectedStudent.first_name}</h3>
    <StyledForm>
      {/* Dropdown for selecting student status */}
      <div>
        <StyledLabel>Status</StyledLabel>
        <StyledSelect
          value={selectedStudent.status || ""}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="">Select Status</option>
          {["On leave", "Graduated", "Disqualified", "Unpaid", "Incomplete"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </StyledSelect>
      </div>

      {/* Submit button for status */}
      <StyledButton onClick={handleStatusSubmission}>
        Submit Status
      </StyledButton>
    </StyledForm>
  </div>
)}
    </div>
  );
};

export default AddDropManagement;
