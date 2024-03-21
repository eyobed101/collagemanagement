import React, { useState , useEffect} from 'react';
import { Table, Button, Input, DatePicker, Popconfirm, Select , Modal , Form , message} from 'antd';
import moment from 'moment';
import axios from 'axios';
import { api } from '../constants';

const AddTerm = () => {
  const [data, setData] = useState([]);
  const [loading , setLoading]= useState(false)
  const [editingKey, setEditingKey] = useState('');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [studyCenters, setStudyCenters] = useState([]);
  const [StartDate , setStartDate] = useState(null);
  const [EndDate , setEndDate] = useState(null);
  const [nextTerm, setNextTerm] = useState(""); // State to hold the next term


  

  const onChangeStart = (date, dateString) => {
    // Update the state or form values
    console.log('onChange ', dateString)
    setStartDate(dateString);

   };

   const onChangeEnd = (date, dateString) => {
    // Update the state or form values
    console.log('onChange is ', dateString)
    setEndDate(dateString);

   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/api/Terms`);
        console.log('Response:', response.data); // Log the response data
        setData(response.data);
        // console.log("Response" , response.data)
        // console.log("Response" )

      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    fetchData();
    console.log("Fetching data" ,data);
  }, []);


  useEffect(() => {
    // Calculate next term once data is fetched
    if (data.length > 0) {
      const previousTerm = getPreviousTerm(data);
      const calculatedNextTerm = getNextTerm(previousTerm);
      setNextTerm(calculatedNextTerm);
    }
  }, [data]);
  
  useEffect(() => {
  
    const SetData = async () => {
      try {
        const response = await axios.get(`${api}/api/StudyCenters`);
        setStudyCenters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    SetData();
  }, []);

  console.log("study" , studyCenters);
  const isEditing = (record) => record.key === editingKey;

  // const previousTerm = getPreviousTerm(data);


  function getPreviousTerm(terms) { 
    let currentDate = new Date();
    console.log("Current date:", data)
    let closestStartDate = new Date(terms[0].startDate);
    let closestTerm = terms[0];

    terms.forEach(term => {
        let termStartDate = new Date(term.startDate);
        if (Math.abs(termStartDate - currentDate) < Math.abs(closestStartDate - currentDate)) {
            closestStartDate = termStartDate;
            closestTerm = term;
        }
    });

    return closestTerm.name;
}

// Determine the previous term

function getNextTerm(previousTerm) {
  switch (previousTerm) {
      case 'I':
          return 'II';
      case 'II':
          return 'III';
      case 'III':
          return 'I';
      default:
          return 'I'; // If no previous term or unexpected value, default to 'I'
  }
}

  const columns = [
    {
      title: 'Term ID',
      dataIndex: 'termId',
      editable: true,
      // render: (text, record) => renderCell(text, record, 'termId'),
    },
    
    {
      title: 'Term Name',
      dataIndex: 'name',
      editable: true,
      // render: (text, record) => renderCell(text, record, 'name'),
    },
    {
      title: 'Academic Year',
      dataIndex: 'acadYear',
      editable: true,
      // render: (text, record) => renderCell(text, record, 'academicYear'),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (date) => moment(date).format('YYYY-MM-DD'),
      editable: true,
      // render: (_, record) => (
      //   <DatePicker
      //     // value={moment(record.startDate)}
      //     onChange={(date) => handleDateChange(date, record, 'startDate')}
      //   />
      // ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (date) => moment(date).format('YYYY-MM-DD'),
      editable: true,
      // render: (_, record) => (
      //   <DatePicker
      //     // value={moment(record.endDate)}
      //     onChange={(date) => handleDateChange(date, record, 'endDate')}
      //   />
      // ),
    },
    {
      title: 'Center ID',
      dataIndex: 'centerId',
      editable: true,
      // render: (text, record) => renderCell(text, record, 'centerId'),
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

 
  const handleCancel = () => {
    setVisible(false);
    setEditingKey(null);
    form.resetFields(); // Reset form fields

  };

  const handleEdit = async () => {
    const values = form.getFieldsValue();
    console.log('Form Edit :', values);
    try {
      // Make a POST request to the API endpoint
      const newRecord = {
        "termId": values.termId,
        "name": values.name,
        "acadYear": values.acadYear,
        "startDate":moment(StartDate ,'YYYY-MM-DD').toISOString(), // Format date as needed
        "endDate":moment(EndDate ,'YYYY-MM-DD').toISOString(), // Format date as needed
        "program": values.program,
        "programType": values.programType,
        "centerId":values.centerId, //
       };
      console.log("Response iss" , newRecord)
      const response = await axios.put(`${api}/api/Terms`, newRecord);
      console.log('Put request successful:', response.data);

      setData(response.data)

      setVisible(false);
      

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error('POST request failed:', error);
    }
  };

  const handleOk = async() => {
    const values = form.getFieldsValue();

    // Log the values to the console
    console.log('Form values:', values);
    try {
      // Make a POST request to the API endpoint
      const newRecord = {
        "termId":`${values.centerId}/${nextTerm}/${values.acadYear}`,
        "name": nextTerm,
        "acadYear": values.acadYear,
        "startDate":moment(StartDate).format('YYYY-MM-DD'), // Format date as needed
        "endDate":moment(EndDate).format('YYYY-MM-DD'), // Format date as needed
        "program": values.program,
        "programType": values.programType,
        "centerId":values.centerId, //
       };
      console.log("Response iss" , newRecord)
      const response = await axios.post(`${api}/api/Terms/Terms`, newRecord);
      console.log('POST request successful:', response.data);

      setData(response.data)

      setVisible(false);
      

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error('POST request failed:', error);
    }
  };


 

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

 

  const edit = (record) => {
    console.log(record)
    const startDate = moment(record.startDate, 'YYYY-MM-DD');
    const endDate = moment(record.endDate, 'YYYY-MM-DD'); 
    if (Date.now() >= startDate && Date.now() <= endDate) {
      form.setFieldsValue({
        ...record,
        startDate,
        endDate,
      });
      setEditingKey(record.termId);
      setVisible(true);
    } else {
      // Display a message or handle the case where editing is not allowed
      message.error('Editing is not allowed at this time.');
    }
  };


  const save = (key) => {
    form.validateFields().then(async(values) => {
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData[index] = {
          ...newData[index],
          ...values,
          startDate: moment(values.startDate),
          endDate: moment(values.endDate),
        };
        const response = await axios.put(`${api}/api/Terms`, newData);
        console.log('Put request successful:', response.data);
        setData(newData);
        setEditingKey('');
      }
    });
  };

  const cancelEditing = () => {
    setEditingKey('');
  };

  const handleDelete = async (record) => {
    console.log('delete', record)
    const response = await axios.put(`${api}/api/Terms`, record);
    console.log('Delete request successful:', response.data);

    const newData = data.filter((item) => item.key !== record.key);
    setDataSource(newData);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <div>
      <Button onClick={showModal} type="primary" style={{ marginBottom: 16, backgroundColor: '#4279A6' }} >
        Add New Term
      </Button>
      <Table dataSource={data} columns={columns}  bordered  
      rowKey={(record) => record.termId}
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
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select Start date!' }]}
          >
            <DatePicker 
                     value={StartDate && moment(StartDate)} 
                     getPopupContainer={(trigger) => trigger.parentElement}
            style={{ width: '100%' }} onChange={onChangeStart} />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select End date!' }]}
          >
            <DatePicker  
         value={EndDate && moment(EndDate)} 
            style={{ width: '100%' }} onChange={onChangeEnd}  />
          </Form.Item>
        
         {!editingKey && (
      <>      
          <Form.Item
            label="Acadamic Year"
            name="acadYear"
            rules={[{ required: true, message: 'Please input Acadamic Year' }]}
          >
            <Input />
          </Form.Item>          
          <Form.Item
            label="Program"
            name="program"
            rules={[{ required: true, message: 'Please select Program!' }]}
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
              <Option value="Distance">Distance</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Study Center" name="centerId" required>
        <Select key="centerId">
          {studyCenters.map(center => (
            <Option key={center.CenterId} value={center.CenterId}>
              {center.CenterId}
            </Option>
          ))}
        </Select>
      </Form.Item>
      </>
       )}
        </Form>
      </Modal>     
        </div>
  );
}
export default AddTerm;
