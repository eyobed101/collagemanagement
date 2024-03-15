import React, { useState , useEffect , useRef } from 'react';
import { Modal, Form, Select, Button, Table, Space,Input,Popconfirm , DatePicker } from 'antd';

import axios from 'axios';
import moment from 'moment';
import { api } from '../constants';

const { Option } = Select;

const Curriculum = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCurriculumModalVisible, setIsCurriculumModalVisible] = useState(false);
  const [isEditCurriculumModalVisible, setIsEditCurriculumModalVisible] = useState(false);
  const [curriculum , setCurriculum] = useState([])
  const [data , setData] = useState([]);
  const [studyCenters, setStudyCenters] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [approvedDate , setApprovedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // Ref for accessing form instance


  useEffect(() => {

    const fetchDepartments =() =>{
    axios.get(`${api}/api/Departments`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching department data:', error);
      });

    }

    const fetchStudyCenters = () =>{
      axios.get(`${api}/api/StudyCenters`)
      .then(response => {
        setStudyCenters(response.data);
      })
      .catch(error => {
        console.error('Error fetching study center data:', error);
      });

    }
    fetchDepartments()
    fetchStudyCenters()

     
  }, []);

  const showCurriculumModal = () => {
    setIsCurriculumModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/api/Curricula`);
        setCurriculum(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isEditing = (record) => record.key === editingKey;


  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsCurriculumModalVisible(false);
  }; 

  const onChangeApproved = (date, dateString) => {
    // Update the state or form values
    console.log('onChange is ', dateString)
    setApprovedDate(dateString);

   };

   const onChangeStart = (date, dateString) => {
    // Update the state or form values
    console.log('onChange is ', dateString)
    setStartDate(dateString);

   };

   const onChangeEnd = (date, dateString) => {
    // Update the state or form values
    console.log('onChange is ', dateString)
    setEndDate(dateString);

   };

  const handleCurriculumOk = async () => {
    const values = form.getFieldsValue();

    // Log the values to the console
    console.log('Form values:', values);
    try {
      // Make a POST request to the API endpoint
      const postData = {
        "dcode": parseInt(values.dcode), 
        "courseNo": values.courseNo,
        "approvedDate":moment(approvedDate).format('YYYY-MM-DD'), 
        "program": values.program,
        "effectiveSdate": moment(startDate).format('YYYY-MM-DD'),
        "effectiveEdate": moment(endDate).format('YYYY-MM-DD'),
        "campusId": values.campusId ,
       };
      console.log("Response iss" , postData)
      const response = await axios.post(`${api}/api/Curricula`, [postData]);
      console.log('POST request successful:', response.data);
      
      showCurriculumModal(false);

      // You can handle success, e.g., show a success message or redirect to another page
    }  catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Config:", error.config);
      showCurriculumModal(false);

    }
showCurriculumModal(false);
setEditingKey(null)
  };    

 

  const handleDelete = async (record) => {
    console.log("handle   ", record)
    const postData = {
      "courseNo": record.courseNo,
      "dcode": parseInt(record.dcode), 
      "program": record.program,
      "approvedDate":moment(record.approvedDate).format('YYYY-MM-DD'), 
      "effectiveSdate": moment(record.effectiveSdate).format('YYYY-MM-DD'),
      "effectiveEdate": moment(record.effectiveEdate).format('YYYY-MM-DD'),
      "campusId": record.campusId ,
     };

     const response = await axios.delete(`${api}/api/Curricula`, postData);
     console.log('Delete request successful:', response.data);

  };

  const edit = (record) => {
    console.log(record)
    const approvedDate = moment(record.approvedDate, 'YYYY-MM-DD');
    const effectiveSdate = moment(record.effectiveSdate, 'YYYY-MM-DD');
    const effectiveEdate = moment(record.effectiveEdate, 'YYYY-MM-DD'); 

    form.setFieldsValue({
      ...record,
      approvedDate: approvedDate,
      effectiveSdate: effectiveSdate,
      effectiveEdate: effectiveEdate,
    });
    // form.setFieldsValue(record);
    setEditingKey(record.courseNo);

    // handleOk();
    setIsCurriculumModalVisible(true)


    console.log("okay ",record)
  };

  const onchange = (date, dateString) => {
    console.log(dateString);
    // Handle date changes as needed
  };


  const columns = [
    {
      title: 'Course No',
      dataIndex: 'courseNo',
      key: 'courseNo',
    },
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
    {
      title: 'Approved Date',
      dataIndex: 'approvedDate',
      key: 'approvedDate',
    },
    {
      title: 'Program ',
      dataIndex: 'program',
      key: 'program',
    },
    {
      title: 'Effective Start Date',
      dataIndex: 'effectiveSdate',
      key: 'effectiveSdate',
    },
    {
      title: 'Effective End Date',
      dataIndex: 'effectiveEdate',
      key: 'effectiveEdate',
    },
    {
      title: 'Campus Id',
      dataIndex: 'campusId',
      key: 'campusId',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" style={{ backgroundColor: '#4279A6' }} onClick={() => save(record.key)}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button onClick={() => edit(record)}>Edit</Button>
            <Popconfirm title="Sure to delete?" 
             okText="Yes" cancelText="No"
             okButtonProps={{ style: { backgroundColor: '#4279A6' } }}
            onConfirm={() => handleDelete(record)}>
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const handleEdit = async(values) => {

    form.validateFields().then(async(values) => {
      const updatedDataSource = curriculum.map((record) => {
        if (record.courseNo === values.courseNo) {
          return { ...record, ...values };
        }
        return record;
      });


    console.log('Form Edit :', updatedDataSource);
    const postData = {
      "courseNo": values.courseNo,
      "dcode": parseInt(values.dcode), 
      "program": values.program,
      "approvedDate":(approvedDate ? moment(approvedDate).format('YYYY-MM-DD'):moment(values.approvedDate).format('YYYY-MM-DD')), 
      "effectiveSdate":(startDate?  moment(startDate).format('YYYY-MM-DD'): moment(values.effectiveSdate).format('YYYY-MM-DD')),
      "effectiveEdate": (endDate?  moment(endDate).format('YYYY-MM-DD') :moment(values.effectiveEdate).format('YYYY-MM-DD')),
      "campusId": values.campusId ,
     };
       
     const testDate =moment(values.effectiveSdate).format('YYYY-MM-DD');
     const url = "https://localhost:7032/api/Curricula"
     console.log("test ", postData , testDate);
      await axios.put(url, postData)
      .then(response => {
        console.log('Department updated successfully:', response.data);
        setData(updatedData);
        setEditingKey('');
        setIsEditCurriculumModalVisible(false);
        
      })
      .catch(error => {
        console.error('Error creating department:', error);
      });
     setIsCurriculumModalVisible(false)
     setEditingKey(null)
    });
  };

  return (
    <div  className="bg-[#F9FAFB] min-h-[100vh]  ">
          {/* <SiderGenerator navigate={navigate}/> */}
    <div className="list-sub mb-10 ml-[2%]">
   <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
        Curriculum List
      </p>
      <Button type="primary" style={{ background: "#4279A6", }} onClick={showCurriculumModal}>
        New Curriculum
      </Button>

      <Modal 
      title = {editingKey ? 'Edit Curriculum' : 'Create New Curriculum'}
      visible={isCurriculumModalVisible}
      okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
      onOk={editingKey ? handleEdit : handleCurriculumOk} onCancel={handleCancel}>
        <Form form={form} onFinish={editingKey ? handleEdit : handleCurriculumOk} layout="vertical">
        <Form.Item name="courseNo" label="Course No" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
            label="Approved Date"
            name="approvedDate"
            rules={[{ required: true, message: 'Please select Approved date!' }]}
          >
            <DatePicker
            value={approvedDate && moment(approvedDate)} 
            style={{ width: '100%' }}  onChange={onChangeApproved} />
          </Form.Item>
      <Form.Item
            label="Effective Start Date"
            name="effectiveSdate"
            rules={[{ required: true, message: 'Please select Start date!' }]}
          >
            <DatePicker 
             value={startDate && moment(startDate)} 
            style={{ width: '100%' }}  onChange={onChangeStart}  />
          </Form.Item>
          <Form.Item
            label="Effective End Date"
            name="effectiveEdate"
            rules={[{ required: true, message: 'Please select End date!' }]}
          >
            <DatePicker 
                         value={endDate && moment(endDate)} 
            style={{ width: '100%' }}   onChange={onChangeEnd} />
          </Form.Item>
          <Form.Item name="dcode" label="Department" rules={[{ required: true }]}>
          <Select key="dcode">
          {data.map(center => (
            <Option key={center.did} value={center.did}>
              {center.dname}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="program" label="Program " rules={[{ required: true }]}>
        <Select>
        <Option value="TVET">TVET</Option>
        <Option value="Diploma">Diploma</Option>
          <Option value="Degree">Degree</Option>
          <Option value="Masters">Masters</Option>
          <Option value="PHD">PHD</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Study Center" name="campusId" required>
        <Select key="centerId">
          {studyCenters.map(center => (
            <Option key={center.CenterId} value={center.CenterId}>
              {center.CenterId}
            </Option>
          ))}
        </Select>
        </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={curriculum} columns={columns}  bordered  loading={loading}
      rowKey={(record) => record.termId}
      pagination={{ pageSize: 10 }} />
      {/* <Table columns={courseColumns} dataSource={courses} style={{ marginTop: 20 }} pagination={{ position: ['bottomCenter'] }} /> */}

    </div>
    </div>

  );
};

export default Curriculum;

