import React, { useState , useEffect} from 'react';
import { Form, Input, Select, Radio, Button, Table , Row , Col ,Modal ,Checkbox , Popconfirm , message} from 'antd';
import axios from 'axios';

// import 'antd/dist/antd.css';

const { Option } = Select;

const AddCourse = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [form] = Form.useForm();
  const [secondForm] = Form.useForm(); 
  const [editingKey, setEditingKey] = useState('');
  const [tableData, setTableData] = useState([]);
  const [data , setData] = useState([]);

  const isEditing = (record) => record.key === editingKey;


  useEffect(() => {
    const fetchDepartments = async () => {
      await axios.get('https://localhost:7032/api/Departments')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching department data:', error);
        });

      };

        const fetchDatas = async () => {
          await axios.get('https://localhost:7032/api/CoursePrerequisites')
            .then(response => {
              setModalData(response.data);
            })
            .catch(error => {
              console.error('Error fetching department data:', error);
            });

    };
    
    fetchDepartments();
    fetchDatas();
  }, []);

  

  const handleHasPrereqChange = (value) => {
    if (value === true) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  const handleEdit = () => {
    secondForm.validateFields().then(async (values) => {
      const updatedDataSource = modalData.map((record) => {
        if (record.courseNo === values.courseNo) {
          return { ...record, ...values };
        }
        return record;
      });
  
      console.log('Form Edit:', updatedDataSource);
      try {
        // Make a PUT request to the API endpoint
        const postData = [{
          "courseNo": values.courseNo,
          "courseNoPre": values.courseNoPre,
          "dname": parseInt(values.dcode),
          "preRequisiteMandatory": values.preRequisiteMandatory,
        }];
        console.log("Response iss", postData);
        console.log("Response ",editingKey)
       if(editingKey == 'delete'){
        const response = await axios.delete(`https://localhost:7032/api/CoursePrerequisites/${values.courseNo}/${values.courseNoPre}/${parseInt(values.dcode)}`, postData);
        console.log('delete request successful:', response.data);
       } 
        const response = await axios.put(`https://localhost:7032/api/CoursePrerequisites/${values.courseNo}/${values.courseNoPre}/${parseInt(values.dcode)}`, postData);
        console.log('Put request successful:', response.data);
      } catch (error) {
        console.error('PUT request failed:', error);
        // Handle the rejection by showing an error message or taking appropriate action
      }
    }).catch(error => {
      console.error('Form validation failed:', error);
      // Handle form validation errors
    });
  };
  

  const handleModalOk = async () => {
    try {
      const formData = await secondForm.validateFields();
      // Post data to 'https://localhost:7032/api/CoursePrerequisites' if checkbox is selected
      const postData = [{
        "courseNo": formData.courseNo,
        "courseNoPre": formData.courseNoPre,
        "dname": parseInt(formData.dcode), 
        "preRequisiteMandatory": formData.preRequisiteMandatory,
      }] ;
      console.log("test ", postData)
      if (formData.checkbox) {
       await axios.post('https://localhost:7032/api/CoursePrerequisites', postData)
          .then(response => {
            console.log('POST request successful:', response.data);
            // Close the modal
            setModalVisible(false);
          })
          .catch(error => {
            console.error('POST request failed:', error.message);
          });
      } else {
        // Close the modal if checkbox is not selected
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Validation Error:', error);
    }
  };

  const handleModalCancel = () => {
    // Close the modal
    setModalVisible(false);
  };


  const onFinish = async (values) => {
    console.log("finsig")
    try {
      // Make a POST request to the API endpoint
      const postData = {
        "courseNo": values.courseNo,
        "courseName": values.courseName,
        "creditHour": values.creditHour,
        "acadTermLevel": values.acadTermLevel,
        "acadYearLevel": values.acadYearLevel,
        "dcode": parseInt(values.dcode), 
        "hasPreReq": (values.hasPreReq  == true ?"Yes" :"No"),
        "program": values.program,
        "hasLab": (values.hasLab  == true ?"Yes" :"No"),
        "courseOrder": values.courseOrder,
        "conthr": values.contacthour,
        "contacthour": values.contacthour ,
        "thesis": (values.thesis == true ?"Yes" :"No" )
      };
      console.log("Response iss" , postData)
      const response = await axios.post('https://localhost:7032/api/Courses', postData);
      console.log('POST request successful:', response.data);
      

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error('POST request failed:', error);
// Reset form fields after submission
}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7032/api/Courses');
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onFinishType = (values) => {
    console.log('Received values:', values);
  };

  const edit = (record) => {
    console.log("edit " , record)

    secondForm.setFieldsValue({
      ...record,
    });
    // form.setFieldsValue(record);
    setEditingKey(record.courseNo);
    // handleOk();  
  };


  const save = (key) => {
    form.validateFields().then(async(values) => {
      const newData = [...modalData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData[index] = {
          ...newData[index],
          ...values
         // resultDate: moment(values.resultDate),
        };
        const response = await axios.put('https://localhost:7032/api/CoursePrerequisites', newData);
        console.log('Put request successful:', response.data);
        setModalData(newData);
        setEditingKey('');
      }
    });
  };

  const cancelEditing = () => {
    setEditingKey('');
  };



  const handleDelete =  (record) => {
    console.log('delete is', record);

    secondForm.setFieldsValue({
      ...record,
    });

    setEditingKey('delete');



    // message.info('delete', )
    // const postData = {
    //   "courseNo": record.courseNo,
    //   "courseNoPre": record.courseNoPre,
    //   "dname": parseInt(record.dcode), 
    //   "preRequisiteMandatory": record.preRequisiteMandatory,   
    //  };
    //  console.log('delete', postData)
    // const response = await axios.delete('https://localhost:7032/api/CoursePrerequisites', postData);
    // console.log('Delete request successful:', response.data);

    // const newData = modalData.filter((item) => item.key !== record.key);
    // setModalData(newData);
  };


  const columns = [
    { title: 'Course No', dataIndex: 'courseNo', key: 'courseNo' },
    { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
    { title: 'Credit Hour', dataIndex: 'creditHour', key: 'creditHour' },
    // { title: 'Contact Hour', dataIndex: 'contactHour', key: 'contactHour' },
    { title: 'Acad Term Level', dataIndex: 'acadTermLevel', key: 'acadTermLevel' },
    { title: 'Acad Year Level', dataIndex: 'acadYearLevel', key: 'acadYearLevel' },
    // { title: 'Course Order', dataIndex: 'courseOrder', key: 'courseOrder' },
    {
      title: 'Department',
      dataIndex: 'dcode',
      key: 'dcode',
      render: (text, record) => {
        // Assuming record.department contains the 'did' field
        const departmentInfo = data.find((item) => item.did === record.dcode);
        return departmentInfo ? departmentInfo.dname : text;
      },
    },
    { title: 'Program', dataIndex: 'program', key: 'program' },
    { title: 'Has Prereq', dataIndex: 'hasPreReq', key: 'hasPreReq' },
    { title: 'Has Lab', dataIndex: 'hasLab', key: 'hasLab'
  },
  ];

  const column1 =[
    { title: 'Course No', dataIndex: 'courseNo', editable: true,
  },
    { title: 'Course No PreRequest', dataIndex: 'courseNoPre', editable: true,
  },
    { title: 'Department', dataIndex: 'dname',  editable: true,

    render: (text, record) => {
      // Assuming record.department contains the 'did' field
      const departmentInfo = data.find((item) => item.did === record.dname);
      return departmentInfo ? departmentInfo.dname : text;
   },  },
   {
    title: 'Action',
    dataIndex: 'action',
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Button type="primary" size="small"  onClick={() => save(record)} style={{ marginRight: 8 , color: '#4279A6' }}>
            Save
          </Button>
          <Button size="small" onClick={cancelEditing}>
            Cancel
          </Button>
        </span>
      ) : (
        <span>
          <Button type="link" size="small" onClick={() => edit(record)}  style={{ marginRight: 8 , color: '#4279A6' }}>
            Edit
          </Button>
          <Button type="link" size="small" onClick={() => handleDelete(record)}  style={{ marginRight: 8 , color: 'red' }}>
            delete
          </Button>
          {/* <Popconfirm title="Sure to delete?" 
           okText="Yes" cancelText="No"
           okButtonProps={{ style: { backgroundColor: '#4279A6' } }}
          onConfirm={() => handleDelete(record)}>
            <Button type="link" danger size="small"  style={{ marginRight: 8 , color: 'red' }}>
              Delete
            </Button>
          </Popconfirm> */}
        </span>
      );
    },
  },

  ]

  return (
    <div>
   <Form form={form} onFinish={onFinish} layout="vertical">
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item name="courseNo" label="Course No" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="courseName" label="Course Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="creditHour" label="Credit Hour" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="contacthour" label="Contact Hour" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="courseOrder" label="Course Order" rules={[{ required: true }]}>
        <Input  type="number" />
      </Form.Item>
      <Form.Item name="thesis" label="Has Thesis" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
    
    </Col>
    <Col span={12}>
    <Form.Item name="acadTermLevel" label="Acad Term Level" rules={[{ required: true }]}>
        <Input  type="number" />
      </Form.Item>
      <Form.Item name="acadYearLevel" label="Acad Year Level" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item name="dcode" label="Department" rules={[{ required: true }]}>
      <Select key="dcode">
          {data.map(department => (
            <Option key={department.did} value={department.did}>
              {department.dname}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="program" label="Program" rules={[{ required: true }]}>
        <Select>
        <Option value="TVET">TVET</Option>
          <Option value="Diploma">Masters</Option>
          <Option value="Degree">Degree</Option>
          <Option value="Masters">Masters</Option>
          <Option value="PHD">PHD</Option>
        </Select>
      </Form.Item>
      <Form.Item name="hasPreReq" label="Has PreReq" rules={[{ required: true }]}>
        <Radio.Group onChange={(e) => handleHasPrereqChange(e.target.value)} >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="hasLab" label="Has Lab" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
     
    </Col>
  </Row>
  <Form.Item>
    <Button type="primary" style={{ backgroundColor: '#4279A6' }} htmlType="submit">
      Add Course
    </Button>
  </Form.Item>
  
</Form>

<Modal
        title= {editingKey ? "Edit Course Prerequisities":"Course Prerequisites"} 
        visible={modalVisible}
        onOk={editingKey ? handleEdit : handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 

      >
    <Table dataSource={modalData} columns={column1} rowKey="key" bordered pagination={false} />
    <div style={{marginTop:"10%"}} />
        <Form
          form={secondForm}
          onFinish={onFinishType}
        >
          {/* Second form items for CoursePrerequisites */}
          <Form.Item name="courseNo" label="Course No" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="courseNoPre" label="Course No Pre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="dcode" label="Department" rules={[{ required: true }]}>
          <Select key="dcode">
          {data.map(department => (
            <Option key={department.did} value={department.did}>
              {department.dname}
            </Option>
          ))}
        </Select>  
          </Form.Item>
          <Form.Item name="preRequisiteMandatory" label="Prerequisite" rules={[{ required: true }]}>
          <Select >
          <Option value="Optional">Optional</Option>
          <Option value="Mandatory">Mandatory</Option>
         </Select>
          </Form.Item>
          <Form.Item name="checkbox" valuePropName="checked">
            <Checkbox>Post values</Checkbox>
          </Form.Item>
        </Form>
      </Modal>


      <h2>Course Table</h2>
      <Table dataSource={tableData} columns={columns} rowKey="key" bordered pagination={false} />
    </div>
  );
};

export default AddCourse;
