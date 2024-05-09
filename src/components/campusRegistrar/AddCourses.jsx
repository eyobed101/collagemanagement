import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Table,
  Row,
  Col,
  Modal,
  Checkbox,
  Popconfirm,
  message,
  notification,
  Spin
} from "antd";
import axios from "axios";
import { api } from "../constants";
import axiosInstance from "@/configs/axios";

// import 'antd/dist/antd.css';

const { Option } = Select;

const AddCourse = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [form] = Form.useForm();
  const [secondForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [modalDataState, setModalDataState] = useState([]);
  const [courseNo, setCourseNo] = useState([]);
  const [program, setProgram] = useState(null);

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    const fetchDepartments = async () => {
      await axiosInstance
        .get(`/api/Departments`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching department data:", error);
        });
    };

    const fetchDatas = async () => {
      await axiosInstance
        .get(`/api/CoursePrerequisites`)
        .then((response) => {
          setModalData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching department data:", error);
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
    secondForm
      .validateFields()
      .then(async (values) => {
        const updatedDataSource = modalData.map((record) => {
          if (record.courseNo === values.courseNo) {
            return { ...record, ...values };
          }
          return record;
        });

        console.log("Form Edit:", updatedDataSource);
        try {
          // Make a PUT request to the API endpoint
          const postData = [
            {
              courseNo: values.courseNo,
              courseNoPre: values.courseNoPre,
              dname: parseInt(values.dcode),
              preRequisiteMandatory: values.preRequisiteMandatory,
            },
          ];
          console.log("Response iss", postData);
          console.log("Response ", editingKey);
          if (editingKey == "delete") {
            const response = await axiosInstance.delete(
              `/api/CoursePrerequisites/${values.courseNo}/${
                values.courseNoPre
              }/${parseInt(values.dcode)}`,
              postData
            );
            console.log("delete request successful:", response.data);
          }
          const response = await axiosInstance.put(
            `/api/CoursePrerequisites/${values.courseNo}/${
              values.courseNoPre
            }/${parseInt(values.dcode)}`,
            postData
          );
          notification.success({
            message: "Update Successful",
            description: "Course updated successfully!",
          });
          console.log("Put request successful:", response.data);
        } catch (error) {
          console.error("PUT request failed:", error);
          notification.error({
            message: "Update Failed",
            description: `Error updating course : ${error.message || error}`,
          });
          // Handle the rejection by showing an error message or taking appropriate action
        }
      })
      .catch((error) => {
        console.error("Form validation failed:", error);
        // Handle form validation errors
      });
  };

  const handleModalOk = async () => {
    try {
      const formData = await secondForm.validateFields();
      // Post data to 'https://localhost:7032/api/CoursePrerequisites' if checkbox is selected
      const postData = [
        {
          courseNo: formData.courseNo,
          courseNoPre: formData.courseNoPre,
          dname: parseInt(formData.dcode),
          preRequisiteMandatory: formData.preRequisiteMandatory,
        },
      ];
      console.log("test ", postData);
      if (formData.checkbox) {
        await axiosInstance
          .post(`/api/CoursePrerequisites`, postData)
          .then((response) => {
            console.log("POST request successful:", response.data);
            message.success("The course of the is updated response .");

            // Close the modal
            setModalVisible(false);

          })
          .catch((error) => {
            console.error("POST request failed:", error.message);
          });
      } else {
        // Close the modal if checkbox is not selected
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Validation Error:", error);
    }
  };

  const handleModalCancel = () => {
    // Close the modal
    setModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      // Make a POST request to the API endpoint
      const postData = {
        courseNo: values.courseNo,
        courseName: values.courseName,
        creditHour: values.creditHour,
        acadTermLevel: values.acadTermLevel,
        acadYearLevel: values.acadYearLevel,
        dcode: parseInt(values.dcode),
        hasPreReq: values.hasPreReq == true ? "Yes" : "No",
        program: values.program,
        hasLab: values.hasLab == true ? "Yes" : "No",
        courseOrder: values.courseOrder,
        conthr: values.contacthour,
        contacthour: values.contacthour,
        thesis: values.thesis == true ? "Yes" : "No",
      };
      const response = await axiosInstance.post(`/api/Courses`, postData);

      notification.success({
        message: "Successful",
        description: "Course created successfully!",
      });
      form.resetFields();

    } catch (error) {
      console.error("POST request failed:", error);
      notification.error({
        message: "Failed",
        description: `Error creating course: ${error.message || error}`,
      });
      form.resetFields();

    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/Courses`);
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onFinishType = (values) => {
    console.log("Received values:", values);
  };

  const edit = (record) => {
    console.log("edit ", record);

    secondForm.setFieldsValue({
      ...record,
    });
    // form.setFieldsValue(record);
    setEditingKey(record.courseNo);
    // handleOk();
  };

  const save = (key) => {
    form.validateFields().then(async (values) => {
      const newData = [...modalData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData[index] = {
          ...newData[index],
          ...values,
          // resultDate: moment(values.resultDate),
        };
        const response = await axiosInstance.put(
          `/api/CoursePrerequisites`,
          newData
        );
        console.log("Put request successful:", response.data);
        setModalData(newData);
        setEditingKey("");
      }
    });
  };

  const cancelEditing = () => {
    setEditingKey("");
  };

  const handleDelete = (record) => {
    console.log("delete is", record);

    secondForm.setFieldsValue({
      ...record,
    });

    setEditingKey("delete");
  };

  const handleProgramChange = (value) => {
    setProgram(value);
  };

  const handleDepartmentChange = (value) => {
    // Check if department is selected
    if (!value) {
      message.error("Please choose a department first");
      setModalData([...modalDataState]);
      return;
    }

    // Filter modalData based on selected department
    const filteredDatas = data.filter((department) => department.did === value);
    const departmentNames = filteredDatas.map((department) => department.dname);
    console.log("test d", value);

    const filteredData = modalDataState.filter((item) => item.dname === value);
    setModalData(filteredData);

    if (program) {
      const filteredCourses = tableData.filter(
        (course) => course.dcode === value && course.program === program
      );
      setCourseNo(filteredCourses);
    }

    console.log("test", courseNo);

    secondForm.setFieldsValue({
      dname: value,
    });
  };

  useEffect(() => {
    setModalDataState([...modalData]);
  }, [modalData]);

  useEffect(() => {
    console.log("Updated courseNo:", courseNo);
  }, [courseNo]);

  const columns = [
    { title: "Course No", dataIndex: "courseNo", key: "courseNo" },
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    { title: "Credit Hour", dataIndex: "creditHour", key: "creditHour" },

    {
      title: "Department",
      dataIndex: "dcode",
      key: "dcode",
      render: (text, record) => {
        // Assuming record.department contains the 'did' field
        const departmentInfo = data.find((item) => item.did === record.dcode);
        return departmentInfo ? departmentInfo.dname : text;
      },
    },
    { title: "Program", dataIndex: "program", key: "program" },

  ];

  const column1 = [
    { title: "Course No", dataIndex: "courseNo", editable: true },
    { title: "Course No PreRequest", dataIndex: "courseNoPre", editable: true },
    {
      title: "Department",
      dataIndex: "dname",
      editable: true,

      render: (text, record) => {
        // Assuming record.department contains the 'did' field
        const departmentInfo = data.find((item) => item.did === record.dname);
        return departmentInfo ? departmentInfo.dname : text;
      },
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
              onClick={() => save(record)}
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
            <Button
              type="link"
              size="small"
              onClick={() => handleDelete(record)}
              style={{ marginRight: 8, color: "red" }}
            >
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
  ];

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="mb-8 flex flex-col gap-12 bg-white p-5 rounded-md "
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="courseNo"
              label="Course No"
              rules={[{ required: true }]}
            >
              <Input style={{ width: "100%", height: "45px" }} />
            </Form.Item>
            <Form.Item
              name="courseName"
              label="Course Name"
              rules={[{ required: true }]}
            >
              <Input style={{ width: "100%", height: "45px" }} />
            </Form.Item>
            <Form.Item
              name="creditHour"
              label="Credit Hour"
              rules={[{ required: true }]}
            >
              <Input type="number" style={{ width: "100%", height: "45px" }} />
            </Form.Item>
            <Form.Item
              name="contacthour"
              label="Contact Hour"
              rules={[{ required: true }]}
            >
              <Input type="number" style={{ width: "100%", height: "45px" }} />
            </Form.Item>
            <Form.Item
              name="courseOrder"
              label="Course Order"
              rules={[{ required: true }]}
            >
              <Input type="number" style={{ width: "100%", height: "45px" }} />
            </Form.Item>
            <Form.Item
              name="thesis"
              label="Has Thesis"
              rules={[{ required: true }]}
            >
              <Radio.Group style={{ width: "100%", height: "45px" }}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="acadTermLevel"
              label="Acad Term Level"
              rules={[{ required: true }]}
            >
              <Input type="number" style={{ width: "100%", height: "45px" }} />
            </Form.Item>
            <Form.Item
              name="acadYearLevel"
              label="Acad Year Level"
              rules={[{ required: true }]}
            >
              <Input type="number" style={{ width: "100%", height: "45px" }} />
            </Form.Item>

            <Form.Item
              name="dcode"
              label="Department"
              rules={[{ required: true }]}
            >
              <Select
                key="dcode"
                onChange={handleDepartmentChange}
                style={{ width: "100%", height: "45px" }}
              >
                {data.map((department) => (
                  <Option key={department.did} value={department.did}>
                    {department.dname}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="program"
              label="Program"
              rules={[{ required: true }]}
            >
              <Select
                onChange={handleProgramChange}
                style={{ width: "100%", height: "45px" }}
              >
                <Option value="TVET">TVET</Option>
                <Option value="Degree">Degree</Option>
                <Option value="Masters">Masters</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="hasPreReq"
              label="Has PreReq"
              rules={[{ required: true }]}
            >
              <Radio.Group
                onChange={(e) => handleHasPrereqChange(e.target.value)}
                style={{ width: "100%", height: "45px" }}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="hasLab"
              label="Has Lab"
              rules={[{ required: true }]}
            >
              <Radio.Group style={{ width: "100%", height: "45px" }}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            style={{ backgroundColor: "#4279A6", height: "45px" }}
            htmlType="submit"
          >
            Add Course
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title={
          editingKey ? "Edit Course Prerequisities" : "Course Prerequisites"
        }
        visible={modalVisible}
        onOk={editingKey ? handleEdit : handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
      >
        <Table
          dataSource={modalData}
          columns={column1}
          rowKey="key"
          bordered
          pagination={false}
        />
        <div style={{ marginTop: "10%" }} />
        <Form form={secondForm} onFinish={onFinishType}>
          {/* Second form items for CoursePrerequisites */}
          <Form.Item
            name="courseNo"
            label="Course No"
            rules={[{ required: true }]}
          >
            <Input style={{ width: "100%", height: "45px" }} />
          </Form.Item>

          {/* Conditionally render courseNoPre field */}
          {courseNo.length > 0 && (
            <Form.Item
              name="courseNoPre"
              label="Course No Pre"
              rules={[{ required: true }]}
            >
              <Select
                key="courseNoPre"
                style={{ width: "100%", height: "45px" }}
              >
                {Array.from(
                  new Set(courseNo.map((course) => course.courseNo))
                ).map((courseNoValue) => (
                  <Option key={courseNoValue} value={courseNoValue}>
                    {
                      courseNo.find(
                        (course) => course.courseNo === courseNoValue
                      ).courseName
                    }
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="dcode"
            label="Department"
            rules={[{ required: true }]}
          >
            <Select key="dcode" style={{ width: "100%", height: "45px" }}>
              {data.map((department) => (
                <Option key={department.did} value={department.did}>
                  {department.dname}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="preRequisiteMandatory"
            label="Prerequisite"
            rules={[{ required: true }]}
          >
            <Select style={{ width: "100%", height: "45px" }}>
              <Option value="Optional">Optional</Option>
              <Option value="Mandatory">Mandatory</Option>
            </Select>
          </Form.Item>

          <Form.Item name="checkbox" valuePropName="checked">
            <Checkbox style={{ height: "45px" }}>Post values</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <h2
        style={{
          color: "black",
          padding: "10px",
          fontSize: "21px",
          borderRadius: "8px",
          marginBottom: "20px",
          backgroundColor:"#E9F4FC",
          textAlign:"center"
        }}
      >
        Course Table
      </h2>
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey="key"
        bordered
        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "8px" }}
      />
    </div>
  );
};

export default AddCourse;
