import React, { useState , useEffect } from 'react';
import { Table, Button, Modal, Form, Input,DatePicker,  Select, Popconfirm } from 'antd';
import moment from 'moment';
import axios from 'axios';



const { Option } = Select;
const AddSection = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [studyCenter, setStudyCenters] = useState([]);
  const [department, setDepartment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [createDate, setCreateDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());


  const isEditing = (record) => record.key === editingKey;

  const onChangeEnd = (date, dateString) => {
    // Update the state or form values
    console.log('onChange is ', dateString)
    setCreateDate(dateString);

   };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7032/api/Section');
        setDataSource(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {

    const SetData = async () => {
      await axios.get('https://localhost:7032/api/StudyCenters')
      .then(response => {
        setStudyCenters(response.data);
      })
      .catch(error => {
        console.error('Error fetching study centers:', error);
      });
    };

    const fetchDepartments = async () => {
      await axios.get('https://localhost:7032/api/Departments')
        .then(response => {
          setDepartment(response.data);
        })
        .catch(error => {
          console.error('Error fetching department data:', error);
        });

    };

    SetData();
    fetchDepartments();

   
       
  }, []);

  

  const columns = [
    {
      title: 'Section ID',
      dataIndex: 'sectionId',
      editable: true,

    },
    {
      title: 'Section Name',
      dataIndex: 'sectionName',
      editable: true,

    },
    {
      title: 'Department',
      dataIndex: 'dcode',
      editable: true,
      render: (text, record) => {
        const departments = department.find(item => item.did === text);
        return departments ? departments.dname : text;
      },

    },
    {
      title: 'Acadamic Year',
      dataIndex: 'acadYear',
       editable: true,

    },
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      render: (date) => moment(date).format('YYYY-MM-DD'),
      editable: true,

    },
    {
      title: 'Program',
      dataIndex: 'program',
      editable: true,

    },
    {
      title: 'Program Type',
      dataIndex: 'programType',
      editable: true,

    },
    {
      title: 'Center',
      dataIndex: 'campusId',
      editable: true,

    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" size="small"  onClick={() => save(record.key)} style={{ marginRight: 8 , color: '#4279A6' }}>
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
            <Popconfirm title="Sure to delete?" 
             okText="Yes" cancelText="No"
             okButtonProps={{ style: { backgroundColor: '#4279A6' } }}
            onConfirm={() => handleDelete(record)}>
              <Button type="link" danger size="small"  style={{ marginRight: 8 , color: 'red' }}>
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingKey(null);
    form.resetFields();
  };

  const handleEdit =  () => {
    form.validateFields().then(async(values) => {
      const updatedDataSource = dataSource.map((record) => {
        if (record.sectionId === values.sectionId) {
          return { ...record, ...values };
        }
        return record;
      });


    console.log('Form Edit :', updatedDataSource);
    try {
      // Make a POST request to the API endpoint
      const postData = {
        "sectionId": values.sectionId,
        "campusId": values.campusId,
        "sectionName":values.sectionName,          
        "dateCreated": moment(values.dateCreated).format('YYYY-MM-DD'),
        "acadYear": values.acadYear,
        "program": values.program,
        "programType": values.programType, 
        "dcode": parseInt(values.dcode),
  
       };
      console.log("Response iss" , postData)
      const response = await axios.put('https://localhost:7032/api/Section', postData);
      console.log('Put request successful:', response.data);

      // setDataSource(response.data)
      // console.log("start " , moment(startDate).format('YYYY-MM-DD'))
      

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error('POST request failed:', error);
    }
  });

  form.resetFields();
  setVisible(false);


  };

  const handleOk = async() => {
    const values = form.getFieldsValue();

    // Log the values to the console
    console.log('Form values:', values);
    try {
      // Make a POST request to the API endpoint
      const postData = {
        "sectionId": values.sectionId,
        "campusId": values.campusId,
        "sectionName":values.sectionName,          
        "dateCreated": moment(createDate).format('YYYY-MM-DD'),
        "acadYear": values.acadYear,
        "program": values.program,
        "dcode": values.dcode,
        "programType": values.programType,    
       };
      console.log("Response iss" , postData)
      const response = await axios.post('https://localhost:7032/api/Section', postData);
      console.log('POST request successful:', response.data);

 

      // setDataSource(response.data)

      setVisible(false);
      form.resetFields();

      

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error('POST request failed:', error);
    }

    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleSearch = (value) => {
    const filteredData = dataSource.filter(record => record.sectionId.toLowerCase() === value.toLowerCase());

    console.log("test " , value , filteredData);
    setDataSource(filteredData);
  };

  const edit = (record) => {
    console.log("edit " , record)
    const dateCreated = moment(record.dateCreated, 'YYYY-MM-DD');

    form.setFieldsValue({
      ...record,
      dateCreated: dateCreated,
    });
    // form.setFieldsValue(record);
    setEditingKey(record.sectionId);
    // handleOk();  
    setVisible(true)  // Open the modal for editing
  };


  const save = (key) => {
    form.validateFields().then(async(values) => {
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData[index] = {
          ...newData[index],
          ...values,
          approvedDate: moment(values.approvedDate),
          // resultDate: moment(values.resultDate),
        };
        const response = await axios.put('https://localhost:7032/api/Section', newData);
        console.log('Put request successful:', response.data);
        setDataSource(newData);
        setEditingKey('');
      }
    });
  };

  const cancelEditing = () => {
    setEditingKey('');
  };



  const handleDelete = async (record) => {
    console.log('delete', record)
    const postData = {
      "sectionId": record.sectionId,
      "campusId": record.campusId,
      "sectionName":record.sectionName,          
      "dateCreated": moment(record.dateCreated).format('YYYY-MM-DD'),
      "acadYear": record.acadYear,
      "program": record.program,
      "dcode": parseInt(record.dcode),
      "programType": record.programType,   
     };
     console.log('delete', postData)
    const response = await axios.delete('https://localhost:7032/api/Section', postData);
    console.log('Delete request successful:', response.data);

    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
  };

  return (
        <div className="bg-[#F9FAFB] min-h-[100vh]  ">
        {/* <SiderGenerator /> */}
    <div className="list-header mb-2 ml-100">
      <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%]">Sections</h1>
    </div>
    <div className="list-sub mb-10 ml-[2%] ">
     {/* {handleGrade()} */}
     
      <Button type="primary" onClick={showModal} style={{  marginBottom: 16 , margingLeft:20, marginTop :20, backgroundColor:'#4279A6' , justifySelf:'flex-end', display:'flex' }}>
       Create New Section  
      </Button>
      <div className="list-filter">
      <Input.Search
        placeholder="Search by Section ID"
        onSearch={handleSearch}
        style={{ width: "30%", marginBottom: 16, marginLeft: 16 }}
      />
      </div>
      </div>
      <Table 
      style={{ marginTop: 20 , color: '#4279A6' }}
      dataSource={dataSource} columns={columns} 
      bordered  loading={loading}
      rowKey={(record) => record.sectionId}
      pagination={{ pageSize: 10 }} />
      <Modal
        title={editingKey ? 'Edit Record' : 'Create Record'}
        visible={visible}
        onCancel={handleCancel}
        onOk={editingKey ? handleEdit : handleOk}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Section ID"
            name="sectionId"
            rules={[{ required: true, message: 'Please input Sectiont ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Section Name"
            name="sectionName"
            rules={[{ required: true, message: 'Please input Section number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Acadamic Year"
            name="acadYear"
            rules={[{ required: true, message: 'Please input Acadamic Year!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date Created"
            name="dateCreated"
            rules={[{ required: true, message: 'Please select date created!' }]}
          >
                   <DatePicker
         value={createDate && moment(createDate)} 
            style={{ width: '100%' }} onChange={onChangeEnd}  />
          </Form.Item>
          <Form.Item
            label="Department"
            name="dcode"
            rules={[{ required: true, message: 'Please select department!' }]}
           >
              <Select key="dcodeId">
          {department.map(department => (
            <Option key={department.did} value={department.did}>
              {department.dname}
            </Option>
          ))}
        </Select>
        
           </Form.Item>
           <Form.Item label="Study Center" name="campusId" required>
        <Select key="centerId">
          {studyCenter.map(center => (
            <Option key={center.CenterId} value={center.CenterId}>
              {center.CenterId}
            </Option>
          ))}
        </Select>
      </Form.Item>
          <Form.Item
            label="Program"
            name="program"
            rules={[{ required: true, message: 'Please select Program !' }]}
          >
            <Select style={{ width: '100%' }}>
              <Option value="Degree">Degree</Option>
              <Option value="Masters">Masters</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Program Type"
            name="programType"
            rules={[{ required: true, message: 'Please select program type!' }]}
          >
            <Select style={{ width: '100%' }}>
              <Option value="Regular">Regular</Option>
              <Option value="Extension">Extension</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddSection;





