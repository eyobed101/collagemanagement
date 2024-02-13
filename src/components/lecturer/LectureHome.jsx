import React, { useState } from 'react';
import { Table, Select, InputNumber, Input , DatePicker ,Form ,Button } from 'antd';
import moment from 'moment';


const { Option } = Select;

const CreateSubject = () => {
  // State variables
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [updateReason, setUpdateReason] = useState('');
  const [data , setData] =  useState([
    {
      key: '1',
      studentName: 'John Doe',
      studentId: '001',
      courseNo: 'CS101',
      courseGrade: 90, 
      gradeLetter:'A+',
      dateSubmitted: '2023-01-15',
      updateReason: 'Improved performance',
      term: 'GOTE/I/2020/2021',
    },
    {
      key: '2',
      studentName: 'Jane JOb',
      studentId: '002',
      courseNo: 'CS102',
      courseGrade : 70, // Sample grade
      gradeLetter:'B',
      dateSubmitted: '2023-01-15',
      updateReason: 'Improved performance',
      term: 'GOTE/I/2020/2021',
    },
  ]);

  // Table columns
  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Course Number',
      dataIndex: 'courseNo',
      key: 'courseNo',
    },
    {
      title: 'Course Grade',
      dataIndex: 'courseGrade',
      key: 'courseGrade',
      render: (text, record) => (
        <EditableGradeCell
          value={text}
          onChange={(value) => handleGradeChange(value, record)}
        />
        
      ),
    },
    {
      title: 'Grade Letter',
      dataIndex: 'gradeLetter',
       key: 'gradeLetter',
    },
    {
      title: 'Date Submitted',
      dataIndex: 'dateSubmitted',
      key: 'dateSubmitted',
      render: (_, record) =>  (
      <DatePicker
      value={moment(record.dateSubmitted)}
      onChange={onchange}
    />),
    },
    {
      title: 'Update Reason',
      dataIndex: 'updateReason',
      key: 'updateReason',
      render: (_, record) => (
        <Input
          value={record.updateReason}
          onChange={e => handleUpdateReasonChange(e.target.value, record)}
        />
      ),
    },
    {
      title: 'Term',
      dataIndex: 'term',
      key: 'term',
    },
  ];
  const handleUpdateReasonChange = (value, record) => {
    record.updateReason = value;
  };
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
      <Form.Item name="grade" label="Grade" style={{marginTop:20}}>
        <InputNumber
        
       placeholder={value}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      </Form.Item>
    );
  };
  
  const handleGradeChange = (value, record) => {
    // Update the course grade for the corresponding student record
    record.courseGrade = value;
    
    // Calculate the letter grade based on the course grade
    const letterGrade = calculateLetterGrade(value);
    
    // Update the student records with the new data
    const updatedRecords = data.map(student => {
      if (student.studentId === record.studentId) {
        return { ...student, courseGrade: value, gradeLetter: letterGrade };
      }
      return student;
    });
    setData(updatedRecords);
  };

  // Function to calculate letter grade based on course grade
  const calculateLetterGrade = grade => {
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
  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
    {/* <SiderGenerator /> */}
<div className="list-header mb-2 ml-100">
  <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%]">Grade Changes</h1>
</div>
<div className="list-sub mb-10 ml-[2%] ">
 {/* {handleGrade()} */}
  <div className="list-filter">

      <Select
        placeholder="Select Student ID"
        className="!rounded-[6px] border-[#4279A6] border-[2px]"
        onChange={value => setSelectedStudentId(value)}
        style={{ width: "70%", marginBottom: 16 , marginTop:10 }}
      >
        {/* Option items for each student ID */}
        {data.map(student => (
          <Option key={student.studentId} value={student.studentId}>
            {student.studentId}
          </Option>
        ))}
      </Select>

      </div>
 </div>
      
      {/* Table displaying student data */}
      <Table
      style={{ marginTop: 20 , color: '#4279A6' }}
        columns={columns}
        dataSource={selectedStudentId ? data.filter(student => student.studentId === selectedStudentId) : null}
        pagination={{ position: ["bottomCenter"] }}
      />

<Button   type="primary" style={{margin:20 , backgroundColor:'green' , justifySelf:'flex-end', display:'flex' }} >
        Save Changes
      </Button>
    </div>
  );
};

export default CreateSubject;

