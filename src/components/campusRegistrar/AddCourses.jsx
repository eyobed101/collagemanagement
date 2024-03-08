import React, { useState , useEffect} from 'react';
import { Form, Input, Select, Radio, Button, Table , Row , Col } from 'antd';
import axios from 'axios';
// import 'antd/dist/antd.css';

const { Option } = Select;

const AddCourse = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [data , setData] = useState([]);

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
    fetchDepartments();
  }, []);

  const onFinish = async (values) => {
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);


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
    { title: 'Has Lab', dataIndex: 'hasLab', key: 'hasLab' },
  ];

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
          <Option value="Degree">Degree</Option>
          <Option value="Masters">Masters</Option>
        </Select>
      </Form.Item>
      <Form.Item name="hasPrereq" label="Has Prereq" rules={[{ required: true }]}>
        <Radio.Group>
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
      <h2>Course Table</h2>
      <Table dataSource={tableData} columns={columns} rowKey="key" bordered pagination={false} />
    </div>
  );
};

export default AddCourse;
