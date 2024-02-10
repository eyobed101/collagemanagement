import React, { useState } from 'react';
import { Form, Input, Select, Radio, Button, Table , Row , Col } from 'antd';
// import 'antd/dist/antd.css';

const { Option } = Select;

const AddCourse = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);

  const onFinish = (values) => {
    const newData = {
      key: Date.now(), // Using timestamp as key for uniqueness
      ...values,
    };
    setTableData([...tableData, newData]);
    form.resetFields(); // Reset form fields after submission
  };

  const columns = [
    { title: 'Course No', dataIndex: 'courseNo', key: 'courseNo' },
    { title: 'Course Name', dataIndex: 'courseName', key: 'courseName' },
    { title: 'Credit Hour', dataIndex: 'creditHour', key: 'creditHour' },
    // { title: 'Contact Hour', dataIndex: 'contactHour', key: 'contactHour' },
    { title: 'Acad Term Level', dataIndex: 'acadTermLevel', key: 'acadTermLevel' },
    { title: 'Acad Year Level', dataIndex: 'acadYearLevel', key: 'acadYearLevel' },
    // { title: 'Course Order', dataIndex: 'courseOrder', key: 'courseOrder' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Program', dataIndex: 'program', key: 'program' },
    { title: 'Has Prereq', dataIndex: 'hasPrereq', key: 'hasPrereq' },
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
      <Form.Item name="contactHour" label="Contact Hour" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="courseOrder" label="Course Order" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    
    </Col>
    <Col span={12}>
    <Form.Item name="acadTermLevel" label="Acad Term Level" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="acadYearLevel" label="Acad Year Level" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="department" label="Department" rules={[{ required: true }]}>
        <Select>
          <Option value="Computer Science">Computer Science</Option>
          <Option value="Accounting">Accounting</Option>
          <Option value="Management">Management</Option>

        </Select>
      </Form.Item>
      <Form.Item name="program" label="Program" rules={[{ required: true }]}>
        <Select>
          <Option value="Regular">Regular</Option>
          <Option value="Distance">Distance</Option>
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
