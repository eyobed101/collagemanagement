import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Table,
  Modal,
  Popconfirm,
  message,
  notification,
} from "antd";
import axiosInstance from "@/configs/axios";
import "./common.css"; 


const { Option } = Select;

const CourseList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const [courses, setCourses] = useState([]);
  const [modalData, setModalData] = useState([]);
  const editFormRef = useRef(null);

  const fetchData = async () => {
    try {
      const [coursesResponse, departmentsResponse, modalDataResponse] = await Promise.all([
        axiosInstance.get(`/api/Courses`),
        axiosInstance.get(`/api/Departments`),
        axiosInstance.get(`/api/CoursePrerequisites`),
      ]);

      setCourses(coursesResponse.data);
      setTableData(coursesResponse.data);
      setDepartments(departmentsResponse.data);
      setModalData(modalDataResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      const filteredCourses = courses.filter((course) => course.dcode === selectedDepartment.did);
      setTableData(filteredCourses);
    } else {
      setTableData(courses);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedProgram && selectedDepartment) {
      const filteredCourses = courses.filter(
        (course) => course.dcode === selectedDepartment.did && course.program === selectedProgram
      );
      setTableData(filteredCourses);
    }
  }, [selectedProgram]);

  const onFinishEdit = async (values) => {
    try {
      const updatedData = courses.map((item) =>
        item.courseNo === editingKey ? { ...item, ...values } : item
      );
      await axiosInstance.put(`/api/Courses/${editingKey}`, values);
      setCourses(updatedData);
      setEditingKey("");
      setIsEditModalVisible(false);
      notification.success({
        message: "Successful",
        description: "Course updated successfully!",
      });
    } catch (error) {
      console.error("Error updating course:", error);
      setIsEditModalVisible(false);
      notification.error({
        message: "Failed",
        description: `Error updating course: ${error.message || error}`,
      });
    }
  };

  const edit = (record) => {
    setEditingKey(record.courseNo);
    setIsEditModalVisible(true);
    if (editFormRef.current) {
      editFormRef.current.setFieldsValue(record);
    }
  };

  const cancelEdit = () => {
    setEditingKey("");
    setIsEditModalVisible(false);
  };

  const columns = [
    { title: "Course No", dataIndex: "courseNo", key: "courseNo" },
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    { title: "Credit Hour", dataIndex: "creditHour", key: "creditHour" },
    {
      title: "Department",
      dataIndex: "dcode",
      key: "dcode",
      render: (text, record) => {
        const departmentInfo = departments.find((item) => item.did === record.dcode);
        return departmentInfo ? departmentInfo.dname : text;
      },
    },
    { title: "Program", dataIndex: "program", key: "program" },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = record.courseNo === editingKey;
        return editable ? (
          <span>
            <Button type="primary" onClick={() => editFormRef.current.submit()}>
              Save
            </Button>
            <Button onClick={cancelEdit}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button onClick={() => edit(record)}>Edit</Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" style={{ marginRight: 8, color: "red" }}>
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const handleDelete = async (record) => {
    try {
      await axiosInstance.delete(`/api/Courses/${record.courseNo}`);
      setCourses(courses.filter((item) => item.courseNo !== record.courseNo));
      message.success("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      message.error(`Error deleting course: ${error.message || error}`);
    }
  };

  const editForm = (
    <Form
      ref={editFormRef}
      layout="vertical"
      onFinish={onFinishEdit}
      initialValues={{ courseNo: editingKey }}
    >
      <Form.Item label="Course Number" name="courseNo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Course Name" name="courseName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Credit Hour" name="creditHour" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Department" name="dcode" rules={[{ required: true }]}>
        <Select>
          {departments.map((department) => (
            <Option key={department.did} value={department.did}>
              {department.dname}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Program" name="program" rules={[{ required: true }]}>
        <Select>
          <Option value="Degree">Degree</Option>
          <Option value="TVET">TVET</Option>
          <Option value="Masters">Masters</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={cancelEdit}>Cancel</Button>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Modal
        title="Edit Course"
        visible={isEditModalVisible}
        onCancel={cancelEdit}
        footer={null}
      >
        {editForm}
      </Modal>
      <div className="mb-8 mt-6 min-h-[100vh] flex flex-col gap-6 bg-white p-5 rounded-md shadow-md">
        <div className="flex flex-wrap justify-between">
          <h2
            style={{
              color: "#464648",
              padding: "10px",
              fontSize: "21px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "bold",
              opacity: "25",
              backdropFilter: true,
            }}
          >
            Course Lists
          </h2>
          <div className="flex flex-wrap px-5 space-x-3">
            <div className="mb-2 space-y-4">
              <select
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
                onChange={(e) =>
                  setSelectedDepartment(
                    departments.find((dept) => dept.dcode === e.target.value)
                  )
                }
                value={selectedDepartment ? selectedDepartment.dcode : ""}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.dcode} value={dept.dcode}>
                    {dept.dname}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2 space-y-4">
              <select
                className="px-8 py-3 w-full bg-blue-gray-50  border-2 border-[#C1C1C1] font-semibold text-black block shadow-md sm:text-sm rounded-md"
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                <option value="">Select Program</option>
                {selectedDepartment ? (
                  <>
                    <option value="Degree">Degree</option>
                    <option value="TVET">TVET</option>
                    <option value="Masters">Masters</option>
                  </>
                ) : (
                  <option disabled>Select Department first</option>
                )}
              </select>
            </div>
          </div>
        </div>
        <hr className="mb-4 border-2 border-[#C2C2C2]" />
        <Table
          dataSource={tableData}
          columns={columns}
          rowKey="courseNo"
          bordered
          className="custom-table"
          pagination={{ pageSize: 10 }}

        />
      </div>
    </div>
  );
};

export default CourseList;
