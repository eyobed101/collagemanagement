import React, { useState, useEffect } from 'react';
import { Select, Button, Table, Input, Modal, Form } from 'antd';
import axiosInstance from '@/configs/axios';

const { Option } = Select;

const MaintainAssessment = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [editedAssessment, setEditedAssessment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState([])
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axiosInstance.get('/api/StudentMarks');
        // setAssessment(response.data);
        console.log("assessment", response.data);
      } catch (error) {
        console.error('Error fetching assessment data:', error);
      }
    };

    fetchAssessment();
  }, []);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axiosInstance.get('/api/AssessmentWeights');
        setAssessment(response.data);
        console.log("assessment", response.data);
      } catch (error) {
        console.error('Error fetching assessment data:', error);
      }
    };

    fetchAssessment();
  }, []);

  useEffect(() => {
    const fetchCoursePending = async () => {
      try {
        const response = await axiosInstance.get('/api/CourseRegistrationPendings');
        setStudentData(response.data);
        console.log("studentData", response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchCoursePending();
  }, []);

  const handleShowData = () => {
    // Filter student data based on selected academic year, course, and semester
    // Here, you should fetch the data from your API based on the selected filters
    // For demo purposes, filtering the mock data
    const filteredData = studentData.filter(student => {
      return student.academic === academicYear && student.course === course;
    });
    setStudentData(filteredData);
  };

  const handleAcademic = value => {
    setAcademicYear(value);
  };

  const handleCourse = value => {
    setCourse(value);
  };

  const handleSemester = value => {
    setSemester(value);
  };

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    setEditingKey(record.key);
    setEditedAssessment(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const cancel = () => {
    setEditingKey('');
    setModalVisible(false);
  };

  const save = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    
    const assessmentDate = `${year}-${month}-${day}`;

    form
      .validateFields()
      .then(values => {
        const newData = [...studentData];
        const index = newData.findIndex(item => editedAssessment.key === item.key);

        if (index > -1) {
          const updatedItem = newData[index];
          newData.splice(index, 1, { ...updatedItem, ...values });
          setStudentData(newData);
          setEditingKey('');
          setModalVisible(false);
          newData[index].total = calculateTotal(updatedItem, values);

        }
        
        console.log("new" , newData)
        const assessments = [];
        newData.forEach(data => {
          const { StudId, CourseNo, TermId, SubmitBy, ...assessmentDetails } = data;
          Object.entries(assessmentDetails).forEach(([assessmentName, assessmentWeight]) => {
            // Skip keys that are not assessment names
            if (!["CourseNo", "DateRegistered", "DateSubmitted", "KeyNames", "Registered", "Section", "SectionId", "Stud", "SubmitBy", "SubmitByNavigation", "Term", "TermId", "total" ,"CourseNoNavigation"].includes(assessmentName)) {
              assessments.push({
                studId: StudId,
                courseNo: CourseNo,
                termId: TermId,
                instID : SubmitBy,
                assessmentDate : assessmentDate,
                assessmentName: assessmentName,
                assessmentWeight: parseFloat(assessmentWeight)
              });
            }
          });
        });               
        console.log("hawaii", assessments);
        setUpdateData([...updateData , assessments]);

      })
      .catch(errorInfo => {
        console.log('Save failed:', errorInfo);
      });
  };

  const calculateTotal = editedValues => {
    let total = 0;
    assessment.forEach(assessment => {
      const score = editedValues[assessment.assessmentTitle.toLowerCase().replace(/\s+/g, '')] || 0;
      total += parseFloat(score);
    });
    return total.toFixed(2);
  };

  const assessmentColumns = assessment.map(assessment => ({
    title: `${assessment.assessmentTitle} (${assessment.assessWeight}%)`,
    dataIndex: assessment.assessmentTitle.toLowerCase().replace(/\s+/g, ''),
    key: assessment.assessmentTitle.toLowerCase().replace(/\s+/g, ''),
    editable: true,
  }));

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'ID No',
      dataIndex: 'StudId',
      key: 'StudId',
    },
    ...assessmentColumns,
    {
      title: 'Total',
      key: 'total',
      render: (text, record) => {
        let total = 0;
        // assessment.forEach(assessment => {
        //   const score = record[assessment.assessmentTitle.toLowerCase().replace(/\s+/g, '')] || 0;
        //   total += ( assessment.assessWeight) ;
        // });
        return calculateTotal(record);
      },
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a href="#" onClick={save} style={{ marginRight: 8 }}>
              Save
            </a>
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];

  return (
    <div className="mb-8 flex flex-col gap-12 bg-white p-5 rounded-md ">
      <div className="list-header mb-2 ml-100">
        <h1 className="text-2xl font-[600] font-jakarta ml-[2%] mb-[2%] mt-[2%]">
          Maintain Assessment
        </h1>
      </div>
      <div className="list-sub mb-10 ml-[2%] ">
        <div style={{ marginTop: '20px', marginBottom: '16px', flexDirection: 'row', justifyContent: 'flex-start', display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Course</label>
            <Select
              value={course}
              onChange={handleCourse}
              placeholder="Select Course"
              style={{ marginRight: '8px', width: 350, height: 40 }}
            >
              {assessment.map((department) => (
                <Option key={department.courseNo} value={department.courseNo}>
                  {department.courseNo}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <Button type="primary" onClick={handleShowData} style={{ marginBottom: 16, margingRight: '20%', marginTop: 20, backgroundColor: '#4279A6', justifySelf: 'flex-end' }}>Show Data</Button>
        <Table
          dataSource={studentData}
          columns={columns}
          bordered
          rowClassName="editable-row"
        />
        <Modal
          title="Edit Assessment"
          visible={modalVisible}
          onOk={save}
          onCancel={cancel}
        >
          <Form form={form} layout="vertical">
            {assessment.map(item => (
              <Form.Item key={item.key} label={`${item.assessmentTitle} (${item.assessWeight}%)`} name={item.assessmentTitle.toLowerCase().replace(/\s+/g, '')}>
                <Input />
              </Form.Item>
            ))}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default MaintainAssessment;
