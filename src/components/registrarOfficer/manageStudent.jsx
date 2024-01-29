import React, { useState } from 'react';
import styled from 'styled-components';

const TableRow = styled.tr`
  background-color: ${({ isOdd }) => (isOdd ? '#f0f0f0' : 'white')};
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

const StudentCourseRegistration = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', acadamicYear: 2022, department: 'Math', section: 'A', courses: [] },
    { id: 2, name: 'Jane Smith', acadamicYear: 2022, department: 'Science', section: 'B', courses: [] },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [allCourses, setAllCourses] = useState([
    { course: 'Math101', prerequisites: ['Science101'] },
    { course: 'Science101', prerequisites: [] },
    { course: 'English101', prerequisites: ['Math101'] },
  ]);

  const [filterAcademicYear, setFilterAcademicYear] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterSection, setFilterSection] = useState('');

  const handleStudentSelection = (student) => {
    setSelectedStudent(student);
    setSelectedCourses([]);
  };

  const isPrerequisitesFulfilled = (course) => {
    const passedPrerequisites = !course.prerequisites || course.prerequisites.every((prerequisite) =>
      selectedCourses.find((selectedCourse) => selectedCourse.course === prerequisite)
    );

    return passedPrerequisites;
  };

  const handleCourseSelection = () => {
    if (selectedCourse && !selectedCourses.includes(selectedCourse)) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
      setSelectedCourse('');
    }
  };

  const handleCourseRegistration = () => {
    if (selectedStudent && selectedCourses.length > 0) {
      const updatedStudents = students.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              courses: [...student.courses, ...selectedCourses],
            }
          : student
      );
      setStudents(updatedStudents);
      setSelectedCourses([]);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      (!filterAcademicYear || student.acadamicYear === filterAcademicYear) &&
      (!filterDepartment || student.department === filterDepartment) &&
      (!filterSection || student.section === filterSection)
  );

  return (
    <div>
      <h2>Student Course Registration</h2>
      <div>
        <label htmlFor="filterAcademicYear">Filter by Academic Year:</label>
        <select
        className="p-1 mr-2 border rounded"
          id="filterAcademicYear"
          name="filterAcademicYear"
          value={filterAcademicYear}
          onChange={(e) => setFilterAcademicYear(e.target.value)}
        >
          <option value="">All</option>
          <option value={2022}>2022</option>
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
          <option value="Math">Math</option>
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
          {/* Add more sections as needed */}
        </select>
      </div>

      <StyledTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Academic Year</TableHeader>
            <TableHeader>Department</TableHeader>
            <TableHeader>Section</TableHeader>
            <TableHeader>Courses</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <TableRow key={student.id} isOdd={index % 2 !== 0} onClick={() => handleStudentSelection(student)}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.acadamicYear}</TableCell>
              <TableCell>{student.department}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell>{student.courses.map((course) => course.course).join(', ')}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>

      {selectedStudent && (
        <StyledForm>
          <h3>Assign Courses to {selectedStudent.name}</h3>
          <div>
            <StyledLabel htmlFor="course">Select Course(s):</StyledLabel>
            <StyledSelect
              id="course"
              name="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select a Course</option>
              {allCourses.map((course) => (
                <option key={course.course} value={course.course}>
                  {course.course}
                </option>
              ))}
            </StyledSelect>

            <StyledButton onClick={handleCourseSelection}>Add Course</StyledButton>
          </div>

          <div>
            <h4>Selected Courses</h4>
            <ul>
              {selectedCourses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>

          <StyledButton onClick={handleCourseRegistration}>Register Selected Courses</StyledButton>
        </StyledForm>
      )}
    </div>
  );
};

export default StudentCourseRegistration;
