import React, { useEffect, useState } from 'react';
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




const ModalWrapper = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
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
  font-family: 'Arial', sans-serif; /* Specify your desired font type */
`;

const ModalOverlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

// ... (remaining code)

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Arial', sans-serif; /* Specify your desired font type */
  font-size: 16px; /* Specify your desired font size */

  &:hover {
    background-color: #45a049;
  }
`;

const ModalForm = ({student,isOpen, onClose, onCourseSelection, onCourseRegistration, selectedCourse, allCourses, selectedCourses }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [localSelectedCourses, setLocalSelectedCourses] = useState([]);

  useEffect(() => {
    setLocalSelectedCourses(selectedCourses);
  }, [selectedCourses]);

  const handleToggleAll = () => {
    setSelectAll(!selectAll);
    setLocalSelectedCourses(selectAll ? [] : allCourses.map(course => course.course));
  };

  const handleCourseSelection = (course) => {
    const updatedSelectedCourses = [...localSelectedCourses];
    const index = updatedSelectedCourses.indexOf(course);

    if (index !== -1) {
      updatedSelectedCourses.splice(index, 1);
    } else {
      updatedSelectedCourses.push(course);
    }

    setLocalSelectedCourses(updatedSelectedCourses);
  };
  

  const handleCourseRegistration = () => {
    // Perform course registration logic here
    // This function will be called when the "Register Selected Courses" button is clicked
    // You can use the selectedCourses array for further processing
    console.log('Selected Courses:', localSelectedCourses);
    // Close the modal after registration
    onClose();
  };  

  return (
    <>
      <ModalOverlay isOpen={isOpen} onClick={onClose} />
      <ModalWrapper isOpen={isOpen}>
        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
          Assign Courses to {student.name}
          <label style={{ marginLeft: '16px', padding: '8px'}}>
            <input type="checkbox" checked={selectAll} onChange={handleToggleAll} />
            Select All
          </label>
        </h3>
        <div style={{ marginBottom: '16px' }}>
          <div>
            <h4 style={{ marginBottom: '8px' }}>Select Courses</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
            {allCourses.map((course) => (
                <li key={course.course} style={{ marginBottom: '8px', padding: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      value={course.course}
                      checked={localSelectedCourses.includes(course.course)}
                      onChange={() => handleCourseSelection(course.course)}
                    />
                    <span style={{ marginLeft: '8px' }}>{course.course}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <StyledButton onClick={handleCourseRegistration} style={{ width: '100%' }}>
          Register Selected Courses
        </StyledButton>
      </ModalWrapper>
    </>
  );
};


const StudentCourseRegistration = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', acadamicYear: 2022, department: 'Math', section: 'A', courses: [] },
    { id: 2, name: 'Jane Smith', acadamicYear: 2022, department: 'Science', section: 'B', courses: [] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);


  const handleStudentSelection = (student) => {
    setSelectedRow(student.id === selectedRow ? null : student.id);
    setSelectedStudent(student);
    setSelectedCourses([]);
    setIsModalOpen(true);
  };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  // const handleStudentSelection = (student) => {
  //   setSelectedStudent(student);
  //   setSelectedCourses([]);
  // };

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
            <TableRow key={student.id}
            isOdd={index % 2 !== 0}
            onClick={() => handleStudentSelection(student)}
            className={selectedRow === student.id ? 'selected-row' : ''}>
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
        <>
         

          <ModalForm
            student={selectedStudent}
            isOpen={isModalOpen}
            onClose={() => {
              setSelectedRow(null);
              closeModal();
            }}
            onCourseSelection={handleCourseSelection}
            onCourseRegistration={handleCourseRegistration}
            selectedCourse={selectedCourse}
            allCourses={allCourses}
            selectedCourses={selectedStudent.courses}
          />
        </>
      )}
    </div>
  );
};

export default StudentCourseRegistration;
