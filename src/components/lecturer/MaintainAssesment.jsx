import React, { useState, useEffect } from 'react';
import { Select, Button, Table, Input, Modal, Form , message} from 'antd';
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
  const [updateDatas, setUpdateData] = useState([])
  const [studentMarks , setStudentMarks] = useState([])
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axiosInstance.get('/api/StudentMarks');
        //  setAssessment(response.data);
        setStudentMarks(response.data)
        console.log("assessment is with", response.data);
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

  // const handleShowData = () => {
  //   // Filter student data based on selected academic year, course, and semester
  //   // Here, you should fetch the data from your API based on the selected filters
  //   // For demo purposes, filtering the mock data
  //   const filteredData = studentData.filter(student => {
  //     return student.academic === academicYear && student.course === course;
  //   });
  //   setStudentData(filteredData);
  // };

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

  const save = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    
    const assessmentDate = `${year}-${month}-${day}`;

    form
      .validateFields()
      .then(async values => {
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
        setUpdateData([...updateDatas , assessments]);
        for(let i=0 ; i< assessments.length ; i++ ){
          await axiosInstance.put(`/api/StudentMarks`, assessments[i]  )
          .then(response => {
            console.log('Assesment deleted successfully:', response.data);
            message.success("Student mark Deleted Successfully")        
          })
          .catch(error => {
            console.error('Error creating Assesment:', error);
            message.error("Error creating student mark")
      
          });
        }
        
  

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


  const EditAssessmentModal = ({ visible, onCancel, onSave, rowData }) => {
    const [secondform] = Form.useForm();
  
    // Handle save action
    const handleSave = () => {
      secondform.validateFields().then((values) => {
        onSave({ ...rowData, ...values });
      });
    };
  
    return (
      <Modal
        visible={visible}
        title="Edit Assessment"
        onCancel={onCancel}
        onOk={handleSave}
      >
        <Form form={secondform} layout="vertical" initialValues={rowData}>
          <Form.Item label="StudId" name="StudId" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          {/* Add form items for each assessment */}
          {Object.entries(rowData)
            .filter(([key]) => key !== 'No' && key !== 'StudId' && key !== 'Total')
            .map(([key, value]) => (
              <Form.Item key={key} label={key} name={key} rules={[{ required: true}]}>
                <Input type='number' />
              </Form.Item>
            ))}
        </Form>
      </Modal>
    );
  };


  const CreateAssessmentModal = ({ visible, onCancel, onSave, studentData }) => {
    const [form] = Form.useForm();
  
    const handleSave = () => {
      form.validateFields().then((values) => {
        onSave(values);
      });
    };
  
    return (
      <Modal
        visible={visible}
        title="Create Student Marks"
        onCancel={onCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="StudId" name="StudId" rules={[{ required: true }]}>
            <Select>
              {/* Populate dropdown options */}
              {studentData.map(student => (
                <Option key={student.StudId} value={student.StudId}>
                  {student.StudId}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Add form items for each assessment */}
          {assessment.map(item => (
            <Form.Item key={item.key} label={`${item.assessmentTitle} (${item.assessWeight}%)`} name={item.assessmentTitle} rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    );
  };


  const [createModalVisible, setCreateModalVisible] = useState(false);
      const [selectedStudentId, setSelectedStudentId] = useState(null);

const handleCreate = () => {

  setCreateModalVisible(true);
  setSelectedStudentId([])
};

const handleCreateSave = async (values) => {
  // Here you can save the new student marks
  // values object will contain StudId and assessment scores
  console.log("Creating new student marks", values);
  const updatedAssessmentWeights = assessment.map((assessmentItem) => {
    const assessmentName = assessmentItem.assessmentTitle;
    const assessmentWeight = values[assessmentName];
    console.log("what" , assessmentWeight )
    if (typeof assessmentWeight === 'string') {
      // Convert string to number if it's a string
      values[assessmentName] = parseFloat(assessmentWeight);
    }

    const studentMark = studentData.find(student => 
      student.StudId === values.StudId 
    );
  
    // Add an ID to updatedAssessmentWeights
    const courseNo = studentMark ? studentMark.CourseNo : null;
    const termID = studentMark ? studentMark.TermId : null;
    const instID = studentMark ? studentMark.SubmitBy : null;


    return {
      studID: values.StudId,
      courseNo: courseNo, // Assuming you have access to course here
      termID: termID, // Assuming you have access to semester here
      instID: instID, // Assuming this is a constant for now
      assessmentDate: '2024-04-19', // Assuming this is a constant for now
      assessmentName: assessmentItem.assessmentTitle,
      assessmentWeight: values[assessmentName] || 0,
     };
  });

  let total = 0;
  updatedAssessmentWeights.forEach((assessment) => {
    total += assessment.assessmentWeight || 0;
  });

  console.log("Total:", total);

  // Update updateData state with the updated assessment weights
  // setUpdateData([...studentMarks ,updatedAssessmentWeights]);
  console.log("Updated assessment weights  created" , updatedAssessmentWeights)  
  for(let i=0 ; i< updatedAssessmentWeights.length ; i++ ){
    await axiosInstance.post(`/api/StudentMarks/`,  updatedAssessmentWeights[i]  )
    .then(response => {
      console.log('Assesment Created successfully:', response.data);
      message.success("Student mark created Successfully")        
    })  
    .catch(error => {
      console.error('Error creating Assesment:', error);
      // message.error("Error creating student mark")

    });
  }
  
  setCreateModalVisible(false);
};
  


  const MyTableData = ({ data }) => {
    // Extract unique assessment names
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

     
  
    const handleEdit = (record) => {
      setSelectedRowData(record);
      setModalVisible(true);
    };

    const handleDelete = async(record) => {
      // setSelectedRowData(record);
      const updatedAssessmentWeights = assessment.map((assessmentItem) => {
        const assessmentName = assessmentItem.assessmentTitle;
        const assessmentWeight = record[assessmentName];
        console.log("what" , assessmentWeight )
        if (typeof assessmentWeight === 'string') {
          // Convert string to number if it's a string
          record[assessmentName] = parseFloat(assessmentWeight);
        }

        const studentMark = studentMarks.find(student => 
          student.studID === record.StudId && student.assessmentName === assessmentName
        );
      
        // Add an ID to updatedAssessmentWeights
        const id = studentMark ? studentMark.id : null;
        const courseNo = studentMark ? studentMark.courseNo : null;
        const termID = studentMark ? studentMark.termID : null;
        const instID = studentMark ? studentMark.instID : null;


        return {
          id:id,
          studID: record.StudId,
          courseNo: courseNo, // Assuming you have access to course here
          termID: termID, // Assuming you have access to semester here
          instID: instID, // Assuming this is a constant for now
          assessmentDate: '2024-04-19', // Assuming this is a constant for now
          assessmentName: assessmentItem.assessmentTitle,
          assessmentWeight: record[assessmentName] || 0,
         };
      });
    
      let total = 0;
      updatedAssessmentWeights.forEach((assessment) => {
        total += assessment.assessmentWeight || 0;
      });
    
      console.log("Total:", total);
    
      // Update updateData state with the updated assessment weights
      // setUpdateData([...studentMarks ,updatedAssessmentWeights]);
      console.log("Updated assessment weights" , updatedAssessmentWeights[0])    
      for(let i=0 ; i< updatedAssessmentWeights.length ; i++ ){
        await axiosInstance.delete(`/api/StudentMarks`, updatedAssessmentWeights[i]  )
        .then(response => {
          console.log('Assesment deleted successfully:', response.data);
          message.success("Student mark Deleted Successfully")        
        })
        .catch(error => {
          console.error('Error creating Assesment:', error);
          message.error("Error creating student mark")
    
        });
      }
      

      // setModalVisible(true);
    };
  
    const handleModalCancel = () => {
      setModalVisible(false);
    };
  
    const handleModalSave = async (updatedData) => {
      // Update updateData state with the updated assessment weights
      console.log("test" , updatedData);

      const updatedAssessmentWeights = assessment.map((assessmentItem) => {
        const assessmentName = assessmentItem.assessmentTitle;
        const assessmentWeight = updatedData[assessmentName];
        console.log("what" , assessmentWeight )
        if (typeof assessmentWeight === 'string') {
          // Convert string to number if it's a string
          updatedData[assessmentName] = parseFloat(assessmentWeight);
        }

        const studentMark = studentMarks.find(student => 
          student.studID === updatedData.StudId && student.assessmentName === assessmentName
        );
      
        // Add an ID to updatedAssessmentWeights
        const id = studentMark ? studentMark.id : null;
        const courseNo = studentMark ? studentMark.courseNo : null;
        const termID = studentMark ? studentMark.termID : null;
        const instID = studentMark ? studentMark.instID : null;


        return {
          id:id,
          studID: updatedData.StudId,
          courseNo: courseNo, // Assuming you have access to course here
          termID: termID, // Assuming you have access to semester here
          instID: instID, // Assuming this is a constant for now
          assessmentDate: '2024-04-19', // Assuming this is a constant for now
          assessmentName: assessmentItem.assessmentTitle,
          assessmentWeight: updatedData[assessmentName] || 0,
         };
      });
    
      let total = 0;
      updatedAssessmentWeights.forEach((assessment) => {
        total += assessment.assessmentWeight || 0;
      });
    
      console.log("Total:", total);
    
      // Update updateData state with the updated assessment weights
      // setUpdateData([...studentMarks ,updatedAssessmentWeights]);
      console.log("Updated assessment weights" , updatedAssessmentWeights)    

      for(let i=0 ; i< updatedAssessmentWeights.length ; i++ ){
        await axiosInstance.put(`/api/StudentMarks/`,[updatedAssessmentWeights[i]]  )
        .then(response => {
          console.log('Assesment created successfully:', response.data);
          message.success("Student mark Created Successfully")        
        })
        .catch(error => {
          console.error('Error creating Assesment:', error);
          message.error("Error creating student mark")
    
        });
      }


      // Update studentMarks state with the updated assessment weights
     
      // Update the studentMarks state with the updated array
    
      // Log the updated data
    
      // Hide the modal
      setModalVisible(false);
    };

    
    
    
  
    const uniqueAssessmentNames = [...new Set(data.map((item) => item.assessmentName))];
  
    // Generate table data
    const tableData = [];
    const uniqueStudIDs = new Set(data.map((item) => item.studID));
    let index = 0;
    uniqueStudIDs.forEach((studID) => {
      const rowData = {
        No: ++index,
        StudId: studID,
      };
      let total = 0; // Initialize total
      uniqueAssessmentNames.forEach((assessmentName) => {
        const assessmentWeight =
          data.find((item) =>  item.studID === studID && item.assessmentName === assessmentName)?.assessmentWeight || "";
        rowData[assessmentName] = assessmentWeight;
        // Add assessment weight to total
        total += parseFloat(assessmentWeight || 0);
      });
      rowData["Total"] = total; // Add total to rowData
      tableData.push(rowData);
    });



  
    // Generate columns for table
    const columns = [
      {
        title: 'No',
        dataIndex: 'No',
        key: 'No',
        editable: false,
      },
      {
        title: 'StudId',
        dataIndex: 'StudId',
        key: 'StudId',
        editable: false,
      },
      ...uniqueAssessmentNames.map((assessmentName) => ({
        title: assessmentName,
        dataIndex: assessmentName,
        key: assessmentName,
        editable: true,
      })),
      {
        title: 'Total',
        dataIndex: 'Total',
        key: 'Total',
        editable: false,
      },
      {
        title: 'Grade',
        dataIndex: 'Grade',
        key: 'Grade',
        render: (text, record) => {
          // Determine grade based on total score
          const total = record.Total;
          let grade;
          if (total >= 90) {
            grade = 'A+';
          } else if (total >= 85) {
            grade = 'A';
          } else if (total >= 80) {
            grade = 'A-';
          }  else if (total >= 75) {
            grade = 'B+';
          }  else if (total >= 70) {
            grade = 'B';
          }  else if (total >= 65) {
            grade = 'B-';
          }  else if (total >= 60) {
            grade = 'C+';
          } else if (total >= 50) {
            grade = 'C';
          } else if (total >= 45) {
            grade = 'D';
          }         
          else {
            grade = 'F';
          }
          return grade;
        },
      },
      {
        title: 'NG',
        dataIndex: 'ng',
        key: 'ng',
        render: (text, record) => {
          if (record['Total'] === null || record['Final'] === null) return 'NG';
          return '';
        }
      },
      {
        title: 'IA',
        dataIndex: 'ia',
        key: 'ia',
        render: (text, record) => {
          if (record['Total'] === null || record['Total'] < 30) return 'IA';
          return '';
        }
      },
      {
        title: 'F',
        dataIndex: 'f',
        key: 'f',
        render: (text, record) => {
          if (record['Total'] < 40) return 'F';
          return '';
        }
      },
     
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {/* <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button> */}
          </>
        ),
      },
      
    ];
    
  
    return <> 
        <div style={{ overflowX: 'auto' }}>
     <Table columns={columns} dataSource={tableData}  scroll={{x : true}}/>
     </div>

    {selectedRowData && (
        <EditAssessmentModal
          visible={modalVisible}
          onCancel={handleModalCancel}
          onSave={handleModalSave}
          rowData={selectedRowData}
        />
      )}
    </> 
    
  };
  
  const uniqueTerm = new Set(assessment.map((course) => course.termID));
  const uniquecourse = new Set(assessment.map((course) => course.courseNo));


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
                      {/* Add academic year options */}
          {[...uniquecourse].map((course , index) => (
                    <Option key={index} value={course}>
                      {course}
                    </Option>
                  ))}
            </Select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Semister</label>
            <Select
              value={semester}
              onChange={handleSemester}
              placeholder="Select Course"
              style={{ marginRight: '8px', width: 350, height: 40 }}
            >
            {[...uniqueTerm].map((course , index) => (
                    <Option key={index} value={course}>
                      {course}
                    </Option>
                  ))}
            </Select>
          </div>
        </div>
        {/* <Button type="primary" onClick={handleShowData} style={{ marginBottom: 16, margingRight: '20%', marginTop: 20, backgroundColor: '#4279A6', justifySelf: 'flex-end' }}>Show Data</Button> */}
       
        <Button type="primary" onClick={handleCreate} style={{ marginBottom: 16, margingRight: '20%', marginTop: 20, backgroundColor: '#4279A6', justifySelf: 'flex-end' }}>Create Student Marks</Button>

       {/* {studentMarks.length > 0 ?       
       : */}
        {/* <Table
          dataSource={studentData}
          columns={columns}
          bordered
          rowClassName="editable-row"
        /> */}
         <MyTableData data={studentMarks}  /> 
         <CreateAssessmentModal
            visible={createModalVisible}
            onCancel={() => setCreateModalVisible(false)}
             onSave={handleCreateSave}
           studentData={studentData}
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
