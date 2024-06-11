import React, { useState } from 'react';
import { Input, Button, List, Space, Select , Modal ,Form ,Table} from 'antd';

const { Option } = Select;

const GradingSystem = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [gradeRanges, setGradeRanges] = useState([]);
  const [score, setScore] = useState('');
  const [result, setResult] = useState('');

  const Acadamic = [
    { id: 1, year:2011},
    { id: 2, year: 2010 },
    { id: 3, year: 2009 },
    { id: 4, year: 2008 },
    { id: 5, year: 2007 },
    { id: 6, year: 2006 },
  ];

  const GradeValue =[
    {id:1 ,grade:'A+'},
    {id:2 ,grade:'A'},
    {id:3 ,grade:'A-'},
    {id:4 ,grade:'B+'},
    {id:5 ,grade:'B'},
    {id:6 ,grade:'B-'},
    {id:7 ,grade:'C+'},
    {id:8 ,grade:'C'},
    {id:9 ,grade:'D'},
    {id:10 ,grade:'F'},
    {id:11 ,grade:'NG'},
    {id:12 ,grade:'I'},
  ]

  const Grade = [
    { id: 1, year:2011 , curriculum :'tot1' },
    { id: 2, year: 2010 , curriculum :'tot1'},
    { id: 3, year: 2009 , curriculum :'tot1'},
    { id: 4, year: 2008 , curriculum :'tot2'},
    { id: 5, year: 2007 , curriculum :'tot2'},
    { id: 6, year: 2006 , curriculum :'tot3'},
  ]

  const [newGrade, setNewGrade] = useState({
    curriculum: selectedCurriculum,
    acadamicYear: selectedYear,
    Grade: selectedGrade,
    GradeRange:"",
  });

  const handleAddAcademicYear = () => {
    if (selectedYear !== '' && !academicYears.includes(selectedYear)) {
      setAcademicYears([...academicYears, selectedYear]);
    }
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleGrade = (value) => {
    setSelectedGrade(value);
  };
  const handleGradeValue = (value) => {
    setSelectedCurriculum(value);
  };

  const handleAddRange = () => {
    if (score !== '' && result !== '') {
      setGradeRanges([...gradeRanges, { score: Number(score), result }]);
      setScore('');
      setResult('');
    }
  };

  const handleScoreChange = (value) => {
    setScore(value);
  };

  const handleSubject = (e) => {
    setNewGrade({ ...newGrade, [e.target.name]: e.target.value });
  };


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    label: '',
    input: '',
  });

  const showModal = (label) => {
    setModalData({ label, input: '' });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (modalData.input !== '') {
      setGradeRanges([...gradeRanges, { label: modalData.label, score: Number(modalData.input) }]);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const calculateGrade = () => {
    const matchedYear = academicYears.find((year) => selectedYear === year);
    if (matchedYear) {
      const matchedRanges = gradeRanges.find((range) => score >= range.score);
      setResult(matchedRanges ? matchedRanges.result : 'N/A');
    } else {
      setResult('Academic year not found');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'AcadamicYear', dataIndex: 'year', key: 'year' },
    { title: 'Curriculum', dataIndex: 'curriculum', key: 'curriculum' },
    // Add more columns as needed
  ];

  return (
    <div className='flex flex-col gap-12 bg-white p-5 rounded-md'>
      <div>
        <label className='m-2'>Add Academic Year:</label>
        <Space>
          <Select
            style={{ width: 120 }}
            placeholder="Select Year"
            onChange={handleYearChange}
            value={selectedYear}
            className='h-[45px]'
          >
            {Acadamic.map((year) => (
              <Option key={year.id} value={year.year}>
                {year.year}
              </Option>
            ))}
          </Select>
        </Space>
      </div>
     
      <div>
        <Table 
        // onRow={(record, rowIndex) => {
        //     return {
        //       onClick: (event) => handleView(record), // click row
        //     };
        //   }}
        columns={columns} 
        dataSource={Grade}
         pagination={{ position: ['bottomCenter'] }} />
      </div>
      <div>
        <div>
        <Button type="primary" style={{ backgroundColor: "#4279A6", height:"45px" }}  onClick={() => showModal()}>
          Add Grade System
        </Button>
        <Modal
          visible={isModalVisible}
          title="Add Grading System"
          onOk={handleOk}
          okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel} className='p-5'>
              Exit
            </Button>,
            <Button key="submit" onClick={handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
          >
            <Form.Item
              label="Currculum"
              name="currculum"
              rules={[
                {
                  required: true,
                },
              ]}
            >
                  <Select
            style={{ width: '100%' }}
            placeholder="Select Curriculum"
            onChange={handleGradeValue}
            value={selectedCurriculum}
          >
            {Grade.map((year) => (
              <Option key={year.id} value={year.curriculum}>
                {year.curriculum}
              </Option>
            ))}
          </Select>
            </Form.Item>
            <Form.Item
              label="Grade Value"
              name="Gradevalue"
              rules={[
                {
                  required: true,
                },
              ]}
            >
                  <Select
            style={{ width: '100%' }}
            placeholder="Select Grade Value"
            onChange={handleGrade}
            value={selectedGrade}
          >
            {GradeValue.map((year) => (
              <Option key={year.id} value={year.grade}>
                {year.grade}
              </Option>
            ))}
          </Select>
            </Form.Item>
            <Form.Item label="Grade Range">
              <Input name="graderange" onChange={(e) => handleSubject(e)} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      </div>
    </div>
  );
};

export default GradingSystem;
