import React, { useState } from 'react';
import { Space, Table, Button, InputNumber,Col, DatePicker, Drawer, Form, Input, Row, Select ,Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Mock data
const { Option } = Select;
const drawerWidth = 240;
const campuses = [
  { id: 1, name: 'computerscience' },
  { id: 2, name: 'informationscience' },
  { id: 3, name: 'Electricalscience' },
  { id: 4, name: 'Accounting' },
  { id: 5, name: 'Management' },
  // Add more campuses as needed
];

const Term =[
    { id: 1, term: 1},
    { id: 2, term: 2},
    { id: 3, term: 3},
]
const Section = [
    { id: 1, section: 1},
    { id: 2, section: 2},
    { id: 3, section: 3},
    { id: 4, section: 4},
    // Add more campuses as needed
  ];

const courserecords ={
    1: [
        { id: 1, name: "Principal of accounting" ,acadamicYear :2011,  department :'informationscience' },
        { id: 2, name: "Economics",acadamicYear :2011,  department :'informationscience'},
        { id: 3, name: "Global trends" ,acadamicYear :2011,  department :'informationscience'},
        { id: 4,  name: "English",acadamicYear :2011,  department :'informationscience'},
        { id: 5, name: "Introduction to Computer Science" ,acadamicYear :2011, department :'computerscience'},
        { id: 6,  name: "Intro to programming",acadamicYear :2011, department :'computerscience'},
        { id: 7,  name: "Maths of Computer Science",acadamicYear :2011, department :'computerscience'},
        { id: 8,  name: "Geography",acadamicYear :2011, department :'computerscience'},
        { id: 9, name: "Intro to database", acadamicYear :2009, department :'Management'},
        { id: 10,  name: "Statistics", acadamicYear :2009, department :'Management'},
        { id: 11,  name: "Electronic", acadamicYear :2009,  department :'Management'},
        { id: 12,  name: "Antroplogy", acadamicYear :2009,  department :'Management'},
        { id: 13,  name: "Chemistry",acadamicYear :2010,  department :'Electricalscience'},
        { id: 14,  name: "Physics",acadamicYear :2010,  department :'Electricalscience'},
        { id: 26,  name: "Intro to programming",acadamicYear :2011, department :'computerscience'},
        { id: 15,  name: "Dynamics" ,acadamicYear :2010,  department :'Electricalscience'},
        { id: 16,  name: "Power",acadamicYear :2010,  department :'Electricalscience'},
        { id: 35, name: "Introduction to Computer Science" ,acadamicYear :2011, department :'computerscience'},
    ], 
}

const GradeEntry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCampus, setSelectedCampus] = useState(null)
  const [selectedTerm, setSelectedTerm] = useState(Term[0].term);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedCourse , setSelectedCourse] = useState(null);

  const [studentRecords, setStudentRecords ] = useState({
    1: [
      { id: 101, name: 'Student 1', section :1 , department :'computerscience' , course: selectedCourse , grade :'80' ,letterGrade : 'A'},
      { id: 102, name: 'Student 2',  section :1 ,department :'Electricalscience' , course: selectedCourse , grade :'75' ,letterGrade :'B+' },
      { id: 103, name: 'Student 3',  section :1 ,department :'Management' , course: selectedCourse , grade :'70'  ,letterGrade : 'B'},
      { id: 104, name: 'Student 4',   section :2 ,department :'Accounting' , course: selectedCourse , grade :'90' ,letterGrade : 'A+' }, 
      { id: 105, name: 'Student 5',  section :2 ,department :'computerscience' , course: selectedCourse , grade :'81',letterGrade : 'A-'  },
      { id: 106, name: 'Student 6',  section :3 ,department :'Management' ,  course: selectedCourse , grade :'92',letterGrade : 'A+' }, 
      { id: 107, name: 'Student 7',  section :2 ,department :'Information Science' , course: selectedCourse , grade :'64' ,letterGrade : 'C+'  },
      { id: 108, name: 'Student 8',  section :3 ,department :'Electricalscience' , course: selectedCourse , grade :'78' ,letterGrade : 'B+' },  
      // Add more students for Campus 1
    ],
  });  

  const columns = [
    {
      title: (
        <p className="font-jakarta font-[600] text-[16px] text-[#344054]">
          Name
        </p>
      ),
      dataIndex: "name",
      key: "name",
 
    },
    {
      title: <p className="font-jakarta  font-[600]">ID</p>,
      key: "id",
      dataIndex: "id",
    },
    {
      title: <p className="font-jakarta  font-[600]">Department</p>,
      dataIndex: "department",
      key: "department",
    },
    {
        title: <p className="font-jakarta  font-[600]">Course</p>,
        dataIndex: "course",
        key: "course",
      },
      {
        title: 'Assessment',
        dataIndex: 'grade',
        key: 'grade',
        render: (text, record) => (
          <EditableGradeCell
            value={text}
            onChange={(value) => handleGradeChange(value, record)}
          />
          
        ),
      },
      { title: 'Grade', dataIndex: 'letterGrade', key: 'letterGrade' },
  ];

  

  
  // Function to convert numerical grade to letter grade


  const EditableGradeCell = ({  value: initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue);
    const [editing, setEditing] = useState(false);

    const handleInputChange = (newValue) => {
      setValue(newValue);
    };
  
    const handleBlur = () => {
      setEditing(false);
      onChange(value);
    };
  
    const handleFocus = () => {
      setEditing(true);
    };
  
  
    return (
      <Form.Item name="grade" label="Grade" style={{marginTop:20  }}>
        <InputNumber
       placeholder={value}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        
        // style={{ width: '100%' }} // Ensure the input takes the full width

      />
      </Form.Item>
    );
  };
  
  const convertToLetterGrade = (grade) => {
    if (grade > 85) {
      return 'A+';
    } else if (grade > 80) {
      return 'A-';
    } else if (grade > 75) {
      return 'B+';
    } else if (grade > 70) {
      return 'B';
    } else if (grade > 65) {
      return 'B-';
    } else if (grade > 60) {
      return 'C+';
    } else if (grade > 50) {
      return 'C';
    } else {
      return 'F';
    }
  };


  const handleGradeChange = (value, record) => {
    // Update the grade for the corresponding student record
    const updatedStudent = { ...record, grade: value };
  
    // Calculate and update the letter grade
    updatedStudent.letterGrade = convertToLetterGrade(value);
  
    // Update the studentRecords state with the new data
    const updatedRecords = { ...studentRecords };

    updatedRecords[1] = updatedRecords[1].map((student) => {
      if (student.id === record.id) {
        console.log('New grade:', value);
        console.log('Corresponding record id :', updatedRecords);
      
        // setSelectedletter(updatedRecords[1])
        return updatedStudent;
      }
      console.log('New grade:', value);
      console.log('Corresponding record:', student);
      return student;
    });
  
     setStudentRecords(updatedRecords);
  
    // You can perform any necessary operations here
   
  };

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  const [windowSize, setWindowSize] = useState(getWindowSize());
  React.useEffect(() => {
    // Actions to perform after state update
    console.log("selectedCourse updated:", selectedCourse);
  }, [selectedCourse]);


  const handleView = (data) => {
    navigate("/view-student", { state: { data } });
  };
  const handleCampusChange = async(value) => {
    setSelectedCampus(value); 
  };
  const handleSectionChange = async (value) => {
    setSelectedSection(value);
  };
  const handleCourseChange = async (value) => {
    console.log("test is ",value);
    setSelectedCourse(value);

    const updatedStudentRecords = {
      1: studentRecords[1].map((student) => ({
        ...student,
        course: value,
      })),
    };
    setStudentRecords(updatedStudentRecords);
  };
  // const getFilteredStudentRecords = (term ,campus , section , course) => {
  //   console.log(campus ,term ,section ,course);
  //   console.log("test " ,studentRecords[1].filter((student) => student.department == campus ))
  //   if(term , campus , section , course) {
  //     return studentRecords[1].filter((student) => student.department == campus  && student.section == section  );
  //   }  
  //     else{
  //       return null;
  //     }
  // };
  const getFilteredStudentRecords = (term, campus, section, course) => {
    if (term && campus && section && course) {
        // Filter student records based on the selected criteria
        const filteredRecords = studentRecords[1].filter((student) => {
            return student.department === campus && student.section === section;
        });

        // Create a set to store unique student IDs
        const uniqueIds = new Set();

        // Filter out duplicate records based on student ID
        const uniqueFilteredRecords = filteredRecords.filter((student) => {
            if (uniqueIds.has(student.id)) {
                // If the student ID is already in the set, it's a duplicate
                return false;
            } else {
                // Otherwise, add the student ID to the set and return true
                uniqueIds.add(student.id);
                return true;
            }
        });

        return uniqueFilteredRecords;
    } else {
        return null;
    }
};

  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
        {/* <SiderGenerator /> */}
    <div className="list-header mb-2 ml-100">
      <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%]">Grade Entry</h1>
    </div>
    <div className="list-sub mb-10 ml-[2%] ">
     {/* {handleGrade()} */}
      <div className="list-filter">
      
        <h1>Active Term :  Term {selectedTerm}</h1> 
         {selectedTerm  && ( 
            <Select
            bordered={false}
            className="!rounded-[6px] border-[#4279A6] border-[2px]"
            placeholder="--Select Department of the Student ---"
            style={{ width: 280 }}
            onChange={handleCampusChange}
          >
            {campuses?.map((item, i) => (
              <Option key={item.id} value={item.name} lable={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          )}
 
           {selectedCampus  && selectedTerm && (
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#4279A6] border-[2px]"
            style={{ width: 260,marginLeft:20 }}
            placeholder="--Select Section of the Student---"
            onChange={handleSectionChange}
          >
            {Section?.map((item, i) => (
              <Option key={item.key} value={item.section} lable={item.section}>
                {item.section}
              </Option>
            ))}
          </Select>
          )}
            {selectedCampus  && selectedTerm && (
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#4279A6] border-[2px]"
            style={{ width: 260 , marginLeft:20 }}
            placeholder="--Select Course To Grade---"
            value={selectedCourse}
            onChange={handleCourseChange}
          >
            {courserecords[1]?.map((item, i) => (
              <Option key={item.key} value={item.name} lable={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          )}
    
      </div>
 </div>

      <div className='ml-[2%]'>
       
          <div className="" >
        <div style={{flex:1 , flexDirection:'row' , justifyContent:'space-between' ,display:'flex' , paddingRight:20}}>
          <h4 className="text-base  font-[600] font-jakarta ">Student Records for  Term {selectedTerm} </h4>
          <h4 className="text-base  font-[600] font-jakarta ">Course That Grade will be given  {selectedCourse} </h4>
          <h4 className="text-base  font-[600] font-jakarta ">Section Of The Students {selectedSection} </h4>

          </div>
            <Table
        style={{ marginTop: 20 , color: '#4279A6' }}
        columns={columns}
        dataSource={getFilteredStudentRecords(selectedTerm ,selectedCampus,  selectedSection ,selectedCourse)}
        pagination={{ position: ["bottomCenter"] }}
      />

<Button   type="primary" style={{ marginBottom: 16 , margingLeft:20, marginTop :20, backgroundColor:'#4279A6' , justifySelf:'flex-end', display:'flex' }} >
        Submit
      </Button>
          </div>
      </div>
    </div> 
  );
};

export default GradeEntry;





// const studentRecords = {
//   1: [
//     { id: 101, name: 'Student 1', section :1 , department :'computerscience' , course: selectedCourse , grade :'80' ,letterGrade : 'A-'},
//     { id: 102, name: 'Student 2',  section :1 ,department :'Electricalscience' , course: selectedCourse , grade :'75' ,letterGrade : 'B+'  },
//     { id: 103, name: 'Student 3',  section :1 ,department :'Management' , course: selectedCourse , grade :'70'  ,letterGrade : 'B' },
//     { id: 104, name: 'Student 4',   section :2 ,department :'Accounting' , course: selectedCourse , grade :'90' ,letterGrade : 'A+'  }, 
//     { id: 105, name: 'Student 5',  section :2 ,department :'computerscience' , course: selectedCourse , grade :'81',letterGrade : 'A-'   },
//     { id: 106, name: 'Student 6',  section :3 ,department :'Management' ,  course: selectedCourse , grade :'92',letterGrade : 'A+'  }, 
//     { id: 107, name: 'Student 7',  section :2 ,department :'Information Science' , course: selectedCourse , grade :'64' ,letterGrade : 'B-'  },
//     { id: 108, name: 'Student 8',  section :3 ,department :'Electricalscience' , course: selectedCourse , grade :'78' ,letterGrade : 'B+' },  
//     // Add more students for Campus 1
//   ],
// };  