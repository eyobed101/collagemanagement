import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Form,
  Select,
  Button,
  Table,
  Space,
  Input,
  Popconfirm,
  DatePicker,
  message,
  notification,
} from "antd";

import axios from "axios";
import moment from "moment";
import { api } from "../constants";
import axiosInstance from "@/configs/axios";
import "./common.css";

const { Option } = Select;

const Curriculum = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCurriculumModalVisible, setIsCurriculumModalVisible] = useState(
    false
  );
  const [
    isEditCurriculumModalVisible,
    setIsEditCurriculumModalVisible,
  ] = useState(false);
  const [curriculum, setCurriculum] = useState([]);
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [studyCenters, setStudyCenters] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [approvedDate, setApprovedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filtereApiu, setFilteredApiu] = useState([]);
  const [selectedDCode, setSelectedDCode] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState([]);
  const [selectedProgramType, setSelectedProgramType] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [tableData, setTableData] = useState([]);


  // Function to filter courses based on selected department

  // Ref for accessing form instance

  useEffect(() => {
    const fetchDepartments = () => {
      axiosInstance
        .get(`/api/Departments`)
        .then((response) => {
          setData(response.data);
          setDepartments(response.data);
          console.log("Departments", response.data);
        })
        .catch((error) => {
          console.error("Error fetching department data:", error);
        });
    };

    const fetchCourses = () => {
      axiosInstance
        .get(`/api/Courses`)
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching course data:", error);
        });
    };

    const fetchStudyCenters = () => {
      axiosInstance
        .get(`/api/StudyCenters`)
        .then((response) => {
          setStudyCenters(response.data);
        })
        .catch((error) => {
          console.error("Error fetching study center data:", error);
        });
    };
    fetchDepartments();
    fetchStudyCenters();
    fetchCourses();
  }, []);

 

  const showCurriculumModal = () => {
    setIsCurriculumModalVisible(true);
  };

  const handleDepartmentChange = (value) => {
    // Filter courses based on the selected department code (dcode)
    const filteredCourses = courses.filter((course) => course.dcode === value);
    setFilteredCourses(filteredCourses);

    // Filter out the courses from filteredCourses that are already in the curriculum
    const filteredCoursesNotInCurriculum = filteredCourses.filter((course) => {
      // Check if the courseNo is not present in the curriculum
      return !curriculum.some(
        (curriculumCourse) => curriculumCourse.courseNo === course.courseNo
      );
    });

    setFilteredApiu(filteredCoursesNotInCurriculum);
    console.log("filter", filteredCoursesNotInCurriculum);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/Curricula`);
        setCurriculum(response.data);
        setTableData(response.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      const filteredCourses = curriculum.filter((course) => course.dcode === selectedDepartment.did);
      setTableData(filteredCourses);
    } else {
      setTableData(curriculum);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedProgram && selectedDepartment) {
      const filteredCourses = curriculum.filter(
        (course) => course.dcode === selectedDepartment.did && course.program === selectedProgram
      );
      setTableData(filteredCourses);
    }
  }, [selectedProgram]);

  const handleDCodeChange = (value) => {
    setSelectedDCode(value);
    // Reset other selections
    setSelectedProgram([]);
    setSelectedProgramType([]);
  };

  const filteredPrograms = selectedDCode
    ? curriculum.filter((course) => course.dcode === selectedDCode)
    : [];
  const uniquePrograms = [
    ...new Set(filteredPrograms.map((course) => course.program)),
  ];

  const handleProgramChange = (value) => {
    setSelectedProgram(value);
    setSelectedProgramType([]);
  };

  const filteredProgramTypes = selectedProgram
    ? curriculum.filter((course) => course.program === selectedProgram)
    : [];
  const uniqueProgramTypes = [
    ...new Set(filteredProgramTypes.map((course) => course.programType)),
  ];

  const isEditing = (record) => record.key === editingKey;

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsCurriculumModalVisible(false);
  };

  const onChangeApproved = (date, dateString) => {
    // Update the state or form values
    console.log("onChange is ", dateString);
    setApprovedDate(dateString);
  };

  const onChangeStart = (date, dateString) => {
    // Update the state or form values
    console.log("onChange is ", dateString);
    setStartDate(dateString);
  };

  const onChangeEnd = (date, dateString) => {
    // Update the state or form values
    console.log("onChange is ", dateString);
    setEndDate(dateString);
  };

  const handleCurriculumOk = async () => {
    const values = form.getFieldsValue();

    // Log the values to the console
    console.log("Form values:", values);
    try {
      // Make a POST request to the API endpoint
      const postData = {
        Dcode: parseInt(values.dcode),
        CourseNo: values.courseNo,
        ApprovedDate: moment(approvedDate).format("YYYY-MM-DD"),
        program: values.program,

        programType: values.programType,
        effectiveSdate: moment(startDate).format("YYYY-MM-DD"),
        effectiveEdate: moment(endDate).format("YYYY-MM-DD"),
        campusId: "ADHO",
        courseType: values.courseType,
      };
      console.log("Response iss", postData);
      const response = await axiosInstance.post(`/api/Curricula`, [postData]);
      console.log("POST request successful:", response.data);

      showCurriculumModal(false);
      // message.success("The curriculum of the is updated .");
      notification.success({
        message: "Successful",
        description: "The curriculum is created successfully!",
      });

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      if (error.response) {
        showCurriculumModal(false);

        notification.error({
          message: "Failed",
          description: `Error creating curriculum: ${error.message || error}`,
        });
        // // The request was made, but the server responded with a status code
        // // that falls out of the range of 2xx
        // console.error("Response data:", error.response.data);
        // console.error("Response status:", error.response.status);
        // console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        showCurriculumModal(false);

        notification.error({
          message: "Failed",
          description: `Error creating curriculum: ${
            error.message || error.request
          }`,
        });
        // The request was made but no response was received
      } else {
        showCurriculumModal(false);

        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        notification.error({
          message: "Failed",
          description: `Error creating curriculum: ${error.message || error}`,
        });
      }
      console.error("Config:", error.config);
      showCurriculumModal(false);
    }
    showCurriculumModal(false);
    setEditingKey(null);
  };

  const handleDelete = async (record) => {
    try {
      console.log("delete", record);
      const response = await axiosInstance.delete(`/api/Curricula`, {
        params: { curriculum: record.termId },
      });
      console.log("Delete request successful:", response.data);
      notification.success({
        message: "Delete Successful",
        description: "The curriculum is deleted successfully!",
      });

      // const newData = data.filter((item) => item.key !== record.key);
      // setDataSource(newData);
    } catch (error) {
      notification.error({
        message: "Error",
        description: `Error deleting curriculum: ${error.message || error}`,
      });
    }
  };

  const edit = (record) => {
    console.log(record);
    const approvedDate = moment(record.approvedDate, "YYYY-MM-DD");
    const effectiveSdate = moment(record.effectiveSdate, "YYYY-MM-DD");
    const effectiveEdate = moment(record.effectiveEdate, "YYYY-MM-DD");

    form.setFieldsValue({
      ...record,
      approvedDate: approvedDate,
      effectiveSdate: effectiveSdate,
      effectiveEdate: effectiveEdate,
    });
    // form.setFieldsValue(record);
    setEditingKey(record.courseNo);

    // handleOk();
    setIsCurriculumModalVisible(true);

    console.log("okay ", record);
  };

  const onchange = (date, dateString) => {
    console.log(dateString);
    // Handle date changes as needed
  };

  const columns = [
    {
      title: "Course No",
      dataIndex: "courseNo",
      key: "courseNo",
    },
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
    {
      title: "Program ",
      dataIndex: "program",
      key: "program",
    },

    {
      title: "Effective Start Date",
      dataIndex: "effectiveSdate",
      key: "effectiveSdate",
    },
    {
      title: "Effective End Date",
      dataIndex: "effectiveEdate",
      key: "effectiveEdate",
    },

    {
      title: "Course Type",
      dataIndex: "courseType",
      key: "courseType",
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
              style={{ backgroundColor: "#4279A6" }}
              onClick={() => save(record.key)}
            >
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button onClick={() => edit(record)}>Edit</Button>
            <Popconfirm
              title="Sure to delete?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
              onConfirm={() => handleDelete(record)}
            >
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const handleEdit = async (values) => {
    form.validateFields().then(async (values) => {
      const updatedDataSource = curriculum.map((record) => {
        if (record.courseNo === values.courseNo) {
          return { ...record, ...values };
        }
        return record;
      });

      console.log("Form Edit :", updatedDataSource);
      const postData = {
        courseNo: values.courseNo,
        dcode: parseInt(values.dcode),
        program: values.program,
        approvedDate: approvedDate
          ? moment(approvedDate).format("YYYY-MM-DD")
          : moment(values.approvedDate).format("YYYY-MM-DD"),
        effectiveSdate: startDate
          ? moment(startDate).format("YYYY-MM-DD")
          : moment(values.effectiveSdate).format("YYYY-MM-DD"),
        effectiveEdate: endDate
          ? moment(endDate).format("YYYY-MM-DD")
          : moment(values.effectiveEdate).format("YYYY-MM-DD"),
        campusId: values.campusId,
        courseType: values.courseType,
      };

      const testDate = moment(values.effectiveSdate).format("YYYY-MM-DD");
      const url = `/api/Curricula`;
      console.log("test ", postData, testDate);
      await axiosInstance
        .put(url, postData)
        .then((response) => {
          console.log("Department updated successfully:", response.data);
          setData(updatedData);
          setEditingKey("");
          setIsEditCurriculumModalVisible(false);
        })
        .catch((error) => {
          console.error("Error creating department:", error);
        });
      setIsCurriculumModalVisible(false);
      setEditingKey(null);
    });
  };

  return (
    <div className="flex flex-col gap-12 bg-white p-5 mt-5 rounded-md shadow-md">
      {/* <SiderGenerator navigate={navigate}/> */}
      <div className="flex flex-col list-sub mb-10 ml-[2%]">
        <div className="flex justify-between">
          <Button
            type="primary"
            style={{
              background: "#4279A6",
              marginBottom: "15px",
              padding: "12px 24px",
              height: "20%",
              fontWeight: "bold",
            }}
            onClick={showCurriculumModal}
          >
            New curriculum
          </Button>

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
                className="px-8 py-3 w-full bg-blue-gray-50  border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
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

        <hr className="mb-4 mt-10 border-2 border-[#C2C2C2]" />

        <Modal
          title={editingKey ? "Edit Curriculum" : "Create New Curriculum"}
          visible={isCurriculumModalVisible}
          okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
          onOk={editingKey ? handleEdit : handleCurriculumOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            onFinish={editingKey ? handleEdit : handleCurriculumOk}
            layout="vertical"
          >
            <Form.Item
              name="dcode"
              label="Department"
              rules={[{ required: true }]}
            >
              <Select
                onChange={handleDepartmentChange}
                style={{ width: "100%", height: "45px" }}
              >
                {data.map((center) => (
                  <Option key={center.did} value={center.did}>
                    {center.dname}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="courseNo"
              label="Course No"
              rules={[{ required: true }]}
            >
              <Select style={{ width: "100%", height: "45px" }}>
                {filtereApiu.map((course) => (
                  <Option key={course.courseNo} value={course.courseNo}>
                    {course.courseName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* <Form.Item name="courseNo" label="Course No" rules={[{ required: true }]}>
        <Input />
      </Form.Item> */}
            <Form.Item
              label="Approved Date"
              name="approvedDate"
              rules={[
                { required: true, message: "Please select Approved date!" },
              ]}
            >
              <DatePicker
                value={approvedDate && moment(approvedDate)}
                style={{ width: "100%", padding: "12px" }}
                onChange={onChangeApproved}
              />
            </Form.Item>
            <Form.Item
              label="Effective Start Date"
              name="effectiveSdate"
              rules={[{ required: true, message: "Please select Start date!" }]}
            >
              <DatePicker
                value={startDate && moment(startDate)}
                style={{ width: "100%", padding: "12px" }}
                onChange={onChangeStart}
              />
            </Form.Item>
            <Form.Item
              label="Effective End Date"
              name="effectiveEdate"
              rules={[{ required: true, message: "Please select End date!" }]}
            >
              <DatePicker
                value={endDate && moment(endDate)}
                style={{ width: "100%", padding: "12px" }}
                onChange={onChangeEnd}
              />
            </Form.Item>

            <Form.Item
              name="program"
              label="Program "
              rules={[{ required: true }]}
            >
              <Select style={{ width: "100%", height: "45px" }}>
                <Option value="TVET">TVET</Option>
                <Option value="Degree">Degree</Option>
                <Option value="Masters">Masters</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="programType"
              label="Program Type "
              rules={[{ required: true }]}
            >
              <Select style={{ width: "100%", height: "45px" }}>
                <Option value="Regular">Regular</Option>
                <Option value="Extension">Extension</Option>
                <Option value="Distance">Weekend</Option>
                {/* <Option value="Extension">Extension</Option> */}
                {/* <Option value="Degree">Degree</Option> */}
              </Select>
            </Form.Item>
            {/* <Form.Item label="Study Center" name="campusId" required>
        <Select key="centerId">
          {studyCenters.map(center => (
            <Option key={center.CenterId} value={center.CenterId}>
              {center.CenterId}
            </Option>
          ))}
        </Select>
        </Form.Item> */}
            <Form.Item
              name="courseType"
              label="Course Type"
              rules={[{ required: true }]}
            >
              <Select style={{ width: "100%", height: "45px" }}>
                <Option value="Major">Major</Option>
                <Option value="Supportive">Supportive</Option>
                <Option value="Common">Common</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Table
          dataSource={tableData}
          columns={columns}
          bordered
          loading={loading}
          rowKey={(record) => record.termId}
          className="custom-table"
          pagination={{ pageSize: 10 }}
        />
        {/* <Table columns={courseColumns} dataSource={courses} style={{ marginTop: 20 }} pagination={{ position: ['bottomCenter'] }} /> */}
      </div>
    </div>
  );
};

export default Curriculum;
