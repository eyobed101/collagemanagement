import React, { useState } from 'react';
import { Table, Modal, Button, Form, Input, Select, Tag } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";

const { Option } = Select;

const DepartmentHead = () => {
   const dispatch = useDispatch();
  // Sample data for students, courses, lectures, and grades
  const academicYears = ['2022', '2023', '2024'];
  const terms = ['Fall', 'Spring', 'Summer'];
  const sections = ['A', 'B', 'C', 'D'];
  
  const [selectedYear , setSelectedYear] = useState('');
  const [selectedTerm , setSelectedTerm] = useState('');
  const [selectedSection , setSelectedSection] = useState('');

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 100000);
  };

  const generateStudentsData = () => {
    const studentsData = [];
    academicYears.forEach((year) => {
      terms.forEach((term) => {
        sections.forEach((section) => {
          studentsData.push({ id: generateUniqueId(), academicYear: year, term, section });
        });
      });
    });
    return studentsData;
  };

  const generateCoursesData = () => {
    const coursesData = [];
      studentsData.forEach((student) => {
        coursesData.push({ name: 'Math', academicYear: student.academicYear });
        coursesData.push({ name: 'Science', academicYear: student.academicYear });
        coursesData.push({ name: 'Physics', academicYear: student.academicYear });
        coursesData.push({ name: 'Hebrew', academicYear: student.academicYear });

        // Add more course data as needed
    });
    return coursesData;
  };


  const generateLecturesData = () => {
    const lecturesData = [];
    academicYears.forEach((year) => {
      terms.forEach((term) => {
        sections.forEach((section) => {
          lecturesData.push({
            lectureName: 'Jon',
            courseName: 'Math',
            section,
            academicYear: year,
            term,
          });
          lecturesData.push({
            lectureName: 'Abel',
            courseName: 'Science',
            section,
            academicYear: year,
            term,
          });
          lecturesData.push({
            lectureName: 'Ayele',
            courseName: 'Physics',
            section,
            academicYear: year,
            term,
          });
          lecturesData.push({
            lectureName: 'Tomas',
            courseName: 'Hebrew',
            section,
            academicYear: year,
            term,
          });
        });
      });
    });
    return lecturesData;
  };

  const getRandomGrade = () => {
    const grades = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
    return grades[Math.floor(Math.random() * grades.length)];
  };
  


  const generateGradesData = () => {
    const gradesData = [];
    academicYears.forEach((year) => {
      terms.forEach((term) => {
        sections.forEach((section) => {
          studentsData.forEach((student) => {
            // Adjust the filtering conditions based on your data structure
            const filteredLectures = lecturesData.filter(
              (lecture) =>
                lecture.academicYear === year &&
                lecture.term === term &&
                lecture.section === section
            );
  
            filteredLectures.forEach((lecture) => {
              gradesData.push({
                lectureName: lecture.lectureName,
                courseName: lecture.courseName,
                grade: getRandomGrade(),
                studentId: student.id,
                academicYear: year,
                term,
                section,
              });
            });
          });
        });
      });
    });
    return gradesData;
  };

  const [studentsData, setStudentsData] = useState(generateStudentsData());
  const [coursesData, setCoursesData] = useState(generateCoursesData());
  const [lecturesData, setLecturesData] = useState(generateLecturesData());
  const [gradesData, setGradesData] = useState(generateGradesData());
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);


  React.useEffect(() => {
    // console.log('gradesData:', gradesData);
    setGradesData(generateGradesData());

  }, []);
  React.useEffect(() => {
    console.log('gradesData:', gradesData);
  }, [gradesData]);
  

  const showModal = (record) => {
    // Implement your logic to fetch and set grade data based on the selected student
    // For demonstration, using a simple filtering logic here
    const { academicYear, term , section  } = record;

    console.log("news  ", record)
    console.log("grade ", gradesData)
    console.log("lecture ", lecturesData)
    console.log("course ", coursesData)
    // console.log("s ", gradesData)

    const filteredGrades = gradesData.filter(
        (grade) =>
          grade.studentId === record.id &&
          grade.academicYear === academicYear &&
          grade.term === term &&
          grade.section === section
      );

      setFilteredGrades(filteredGrades);
  
    //   setGradesData(filteredGrades);
    // setGradesData(filteredGrades);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleYearChang = (year) => {
    // setIsModalVisible(false);
    setSelectedYear(year)
  };
  const handleTermChang = (term) => {
    // setIsModalVisible(false);
    setSelectedTerm(term)
  };
  const handleSectionChang = (section) => {
    // setIsModalVisible(false);
    setSelectedSection(section)
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Academic Year', dataIndex: 'academicYear', key: 'academicYear' },
    { title: 'Term', dataIndex: 'term', key: 'term' },
    { title: 'Section', dataIndex: 'section', key: 'section' },
  ];

  const gradeColumns = [
    { title: 'Lecture Name', dataIndex: 'lectureName', key: 'lectureName' },
    { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
  ];

  const getFilteredStudentRecords = ( year ,term , section) => {
    console.log(year ,term ,section);
    console.log("test is ", studentsData)
     console.log("test is filter" , studentsData.filter(
        (grade) =>
          grade.academicYear === year &&
          grade.term === term &&
          grade.section === section
      ))
    if (year , term , section)  {
    //   setSelectedname(studentRecords[term].filter((student) => student.department == campus && student.acadamicYear == year && student.section == section ));
      return studentsData.filter(
        (grade) =>
          grade.academicYear === year &&
          grade.term === term &&
          grade.section === section
      );
    } 
    else {
      return studentsData;
    }
  };
  const handlelogout =() =>{
    dispatch(userAction.logout());
  }

  return (
    <div>

   
    <div className="list-filter">
        <Select
          bordered={false}
          className="!rounded-[6px] border-[#EAECF0] border-[2px]"
          placeholder="--Select Acadamic year ---"
          style={{ width: 220 }}
          onChange={handleYearChang}
        >
          {academicYears?.map((item, i) => (
            <Option key={item} value={item} lable={item}>
              {item}
            </Option>
          ))}
        </Select>

        {selectedYear && (
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: 220 }}
            placeholder="--Select A term of Year---"
            onChange={handleTermChang}
          >
            {terms?.map((item, i) => (
              <Option key={item} value={item} lable={item}>
                {item}
              </Option>
            ))}
          </Select>
          )}
           
        {selectedYear && selectedTerm && (
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: 220 }}
            placeholder="--Select A Section of Student---"
            onChange={handleSectionChang}
          >
            {sections?.map((item, i) => (
              <Option key={item} value={item} lable={item}>
                {item}
              </Option>
            ))}
          </Select>
          )}
      </div>
      <div style={{marginTop:30}}/>
      <Table
        onRow={(record) => {
          return {
            onClick: () => showModal(record),
          };
        }}
        columns={columns}
        dataSource={getFilteredStudentRecords(selectedYear , selectedTerm ,selectedSection)}
        pagination={{ position: ['bottomCenter'] }}
      />
      <Modal
        title="Grades"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <Table columns={gradeColumns} dataSource={filteredGrades} />
        <Tag color="blue">Pending Approval</Tag>
      </Modal>
    </div>
  );
};

export default DepartmentHead;
