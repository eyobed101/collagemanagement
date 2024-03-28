import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Popconfirm,
} from "antd";
import moment from "moment";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { api } from "../constants";
import axiosInstance from "@/configs/axios";

const { Option } = Select;

const mockData = [
  {
    key: "1",
    studentId: "2021001",
    courseNo: "CSE101",
    result: "69",
    testDate: moment("2022-01-15"),
    resultDate: moment("2022-01-20"),
    status: "Pass",
    programType: "Undergraduate",
  },
  {
    key: "2",
    studentId: "2021002",
    courseNo: "MAT201",
    result: "89",
    testDate: moment("2022-02-10"),
    resultDate: moment("2022-02-15"),
    status: "Pass",
    programType: "Undergraduate",
  },
  {
    key: "3",
    studentId: "2021003",
    courseNo: "PHY2013",
    result: "74",
    testDate: moment("2022-02-10"),
    resultDate: moment("2022-02-15"),
    status: "Pass",
    programType: "Undergraduate",
  },
  {
    key: "4",
    studentId: "2021004",
    courseNo: "INTRO2012",
    result: "46",
    testDate: moment("2022-02-10"),
    resultDate: moment("2022-02-15"),
    status: "Fail",
    programType: "Undergraduate",
  },
  // Add more mock data as needed
];

const Remedial = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeStart = (date, dateString) => {
    // Update the state or form values
    console.log("onChange ", dateString);
    setStartDate(dateString);
  };

  const onChangeEnd = (date, dateString) => {
    // Update the state or form values
    console.log("onChange is ", dateString);
    setEndDate(dateString);
  };

  const isEditing = (record) => record.key === editingKey;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/Remedials`);
        setDataSource(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studId",
      editable: true,
    },
    {
      title: "Course No",
      dataIndex: "courseNo",
      editable: true,
    },
    {
      title: "Result",
      dataIndex: "result",
      editable: true,
    },
    {
      title: "Test Date",
      dataIndex: "testDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
      editable: true,
    },
    {
      title: "Result Date",
      dataIndex: "resultDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      editable: true,
    },
    {
      title: "Program Type",
      dataIndex: "programType",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="primary"
              size="small"
              onClick={() => save(record.key)}
              style={{ marginRight: 8, color: "#4279A6" }}
            >
              Save
            </Button>
            <Button size="small" onClick={cancelEditing}>
              Cancel
            </Button>
          </span>
        ) : (
          <span>
            <Button
              type="link"
              size="small"
              onClick={() => edit(record)}
              style={{ marginRight: 8, color: "#4279A6" }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
              onConfirm={() => handleDelete(record)}
            >
              <Button
                type="link"
                danger
                size="small"
                style={{ marginRight: 8, color: "red" }}
              >
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
  };

  const handleOk = async () => {
    const values = form.getFieldsValue();

    // Log the values to the console
    console.log("Form values:", values);
    try {
      // Make a POST request to the API endpoint
      const postData = {
        studId: values.studId,
        courseNo: values.courseNo,
        result: parseInt(values.result),
        testDate: moment(startDate).format("YYYY-MM-DD"),
        status: values.status,
        resultDate: moment(endDate).format("YYYY-MM-DD"),
        programType: values.programType,
      };
      console.log("Response iss", postData);
      const response = await axiosInstance.post(`/api/Remedials`, postData);
      console.log("POST request successful:", response.data);

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("POST request failed:", error);
    }

    setVisible(false);
  };

  const handleEdit = async () => {
    const values = form.getFieldsValue();
    console.log("Form Edit :", values);
    try {
      // Make a POST request to the API endpoint
      const postData = {
        studId: values.studId,
        courseNo: values.courseNo,
        result: parseInt(values.result),
        testDate: moment(values.testDate).format("YYYY-MM-DD"),
        status: values.status,
        resultDate: moment(values.endDate).format("YYYY-MM-DD"),
        programType: values.programType,
      };
      console.log("Response iss", postData);
      const response = await axiosInstance.put(`/api/Remedials`, postData);
      console.log("Put request successful:", response.data);
      // setDataSource(response.data)

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("POST request failed:", error);
    }
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const handleSearch = (value) => {
    const filteredData = dataSource.filter(
      (record) => record.studId.toLowerCase() === value.toLowerCase()
    );
    setDataSource(filteredData);
  };

  const edit = (record) => {
    const testDate = moment(record.testDate, "YYYY-MM-DD");
    const resultDate = moment(record.resultDate, "YYYY-MM-DD");

    form.setFieldsValue({
      ...record,
      testDate: testDate,
      resultDate: resultDate,
    });
    // form.setFieldsValue(record);
    setEditingKey(record.studId);
    // handleOk();
    setVisible(true); // Open the modal for editing
  };

  const save = (key) => {
    form.validateFields().then(async (values) => {
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData[index] = {
          ...newData[index],
          ...values,
          testDate: moment(values.testDate),
          resultDate: moment(values.resultDate),
        };
        const response = await axiosInstance.put(`/api/Remedials`, newData);
        console.log("PUT request successful:", response.data);
        setDataSource(newData);
        setEditingKey("");
      }
    });
  };

  const cancelEditing = () => {
    setEditingKey("");
  };

  const handleDelete = async (record) => {
    console.log("delete", record);
    const response = await axiosInstance.put(`/api/Remedials`, record);
    console.log("Delete request successful:", response.data);
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
  };

  const onChangeResult = (e) => {
    const result = e.target.value;
    const status = result > 50 ? "Pass" : "Fail";
    form.setFieldsValue({ status });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md">
      {/* <SiderGenerator /> */}
      <div className="list-header ml-100">
        <h1 className="text-2xl  font-[600] font-jakarta">Remedial </h1>
      </div>
      <div className="shadow-md p-4 rounded-md list-sub">
        {/* {handleGrade()} */}

        <div className="list-filter">
          <Input.Search
            placeholder="Search by Student ID"
            onSearch={handleSearch}
            style={{ width: "30%" }}
          />
        </div>
        <Button
          type="primary"
          onClick={showModal}
          style={{
            marginBottom: 16,
            margingLeft: 20,
            marginTop: 20,
            backgroundColor: "#4279A6",
            justifySelf: "flex-end",
            display: "flex",
          }}
        >
          Add Record
        </Button>
      </div>
      <Table
        style={{ color: "#4279A6" }}
        dataSource={dataSource}
        columns={columns}
        bordered
        loading={loading}
        rowKey={(record) => record.studId}
        pagination={{ pageSize: 10 }}
        className="shadow-md p-4 rounded-md"
      />
      <Modal
        title={editingKey ? "Edit Record" : "Create Record"}
        visible={visible}
        onCancel={handleCancel}
        onOk={editingKey ? handleEdit : handleOk}
        okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Student ID"
            name="studId"
            rules={[{ required: true, message: "Please input student ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Course No"
            name="courseNo"
            rules={[{ required: true, message: "Please input course number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Result"
            name="result"
            rules={[{ required: true, message: "Please input result!" }]}
          >
            <Input onChange={onChangeResult} />
          </Form.Item>
          <Form.Item
            label="Test Date"
            name="testDate"
            rules={[{ required: true, message: "Please select test date!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              value={startDate && moment(startDate)}
              onChange={onChangeStart}
            />
          </Form.Item>
          <Form.Item
            label="Result Date"
            name="resultDate"
            rules={[{ required: true, message: "Please select result date!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              value={endDate && moment(endDate)}
              onChange={onChangeEnd}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select style={{ width: "100%" }}>
              <Option value="Pass">Pass</Option>
              <Option value="Fail">Fail</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Program Type"
            name="programType"
            rules={[{ required: true, message: "Please select program type!" }]}
          >
            <Select style={{ width: "100%" }}>
              <Option value="Regular">Regular</Option>
              <Option value="Extension">Extension</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Remedial;
