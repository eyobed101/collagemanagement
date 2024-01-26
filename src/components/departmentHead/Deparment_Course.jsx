import React, { useState } from 'react';
import { Table, Modal, Button, Form, Input, Select, Tag ,Space } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";

const { Option } = Select;

const DepartmentCourse = () => {
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
    academicYears.forEach((year) => {
        terms.forEach((term) => {
        coursesData.push({ name: 'Math', academicYear: year, term});
        coursesData.push({ name: 'Science', academicYear: year , term });
        coursesData.push({ name: 'Physics', academicYear: year, term });
        coursesData.push({ name: 'Hebrew', academicYear: year, term});

        // Add more course data as needed
    });
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
  const [filteredCourse, setFilteredCourse] = useState([]);
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
    const { academicYear, term   } = record;

    console.log("news  ", record)
    console.log("lecture ", lecturesData)
    console.log("course ", coursesData)
    // console.log("s ", gradesData)

    const filteredGrades = coursesData.filter(
        (grade) =>
          grade.academicYear === academicYear &&
          grade.term === term 
      );

      setFilteredCourse(filteredGrades);
  
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

  const columns = [
    { title: 'Lecture  Name', dataIndex: 'lectureName', key: 'lectureName' },
    { title: 'Course  Name', dataIndex: 'courseName', key: 'courseName' },
    { title: 'Academic Year', dataIndex: 'academicYear', key: 'academicYear' },
    { title: 'Term', dataIndex: 'term', key: 'term' },
    { title: 'Section', dataIndex: 'section', key: 'section' },
  ];

  const gradeColumns = [
    // { title: 'Lecture Name', dataIndex: 'lectureName', key: 'lectureName' },
    { title: 'Course Name', dataIndex: 'name', key: 'name' },
    { title: 'Acadamic Year', dataIndex: 'academicYear', key: 'academicYear' },
    { title: 'Term', dataIndex: 'term', key: 'term' },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a>Edit {record.name}</a>
            <a>Delete</a>
          </Space>
        ),
      },
  ];

  const handlelogout =() =>{
    dispatch(userAction.logout());
  }

  const handleYearChange = (year) => {
    // setIsModalVisible(false);
    setSelectedYear(year)
  };
  const handleTermChange = (term) => {
    // setIsModalVisible(false);
    setSelectedTerm(term)
  };
  const handleSectionChange = (section) => {
    // setIsModalVisible(false);
    setSelectedSection(section)
  };

  const getFilteredStudentRecords = ( year ,term , section) => {
    console.log(year ,term ,section);
     console.log("test is filter" , lecturesData.filter(
        (grade) =>
          grade.academicYear === year &&
          grade.term === term &&
          grade.section === section
      ))
    if (year , term , section)  {
    //   setSelectedname(studentRecords[term].filter((student) => student.department == campus && student.acadamicYear == year && student.section == section ));
      return lecturesData.filter(
        (grade) =>
          grade.academicYear === year &&
          grade.term === term &&
          grade.section === section
      );
    } 
    else if (year , term ){
        return lecturesData.filter(
            (grade) =>
              grade.academicYear === year &&
              grade.term === term 
          );    
    }
    else if (year ){
        return lecturesData.filter(
            (grade) =>
              grade.academicYear === year
          );    
    }

    else {
      return lecturesData;
    }
  };

  

  return (
    <div>
    <div className="list-filter">
        <Select
          bordered={false}
          className="!rounded-[6px] border-[#EAECF0] border-[2px]"
          placeholder="--Select Acadamic year ---"
          style={{ width: 220 }}
          onChange={handleYearChange}
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
            onChange={handleTermChange}
          >
            {terms?.map((item, i) => (
              <Option key={item} value={item} lable={item}>
                {item}
              </Option>
            ))}
          </Select>
          )}
           
        {selectedYear &&  selectedTerm &&(
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: 220 }}
            placeholder="--Select A Section of Student---"
            onChange={handleSectionChange}
          >
            {sections?.map((item, i) => (
              <Option key={item} value={item} lable={item}>
                {item}
              </Option>
            ))}
          </Select>
          )}
      </div>

      <div style={{marginTop:20}}> 
        {/* <h1>Test Test test</h1> */}
      </div>
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
        title="Course Breakdown"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <Table columns={gradeColumns} dataSource={filteredCourse} />
        <Tag color="blue">Pending Approval</Tag>
      </Modal>
    </div>
  );
};

export default DepartmentCourse;
