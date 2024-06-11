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
  notification
} from "antd";
import moment from "moment";
import axios from "axios";
import { api } from "../constants";
import axiosInstance from "@/configs/axios";
import "./common.css"; 


const { Option } = Select;
const AddSection = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [studyCenter, setStudyCenters] = useState([]);
  const [department, setDepartment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [createDate, setCreateDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  const [activeTerm, setActiveTerm] = useState(null);
  const [campusCenterId, setcampusCenterId] = useState(null);

  const isEditing = (record) => record.key === editingKey;

  const onChangeEnd = (date, dateString) => {
    // Update the state or form values
    console.log("onChange is ", dateString);
    setCreateDate(dateString);
  };

  useEffect(() => {
    const fetchActiveTerm = async () => {
      try {
        const response = await axiosInstance.get(`/api/Terms`);
        const currentDate = new Date();

        // Find the active term
        const activeTermData = response.data.find((term) => {
          const startDate = new Date(term.startDate);
          const endDate = new Date(term.endDate);
          return currentDate >= startDate && currentDate <= endDate;
        });

        setActiveTerm(activeTermData);
        setcampusCenterId(activeTermData.centerId)
      } catch (error) {
        console.error("Error fetching active term:", error);
      }
    };

    fetchActiveTerm(); // Fetch active term when component mounts
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/Section`);
        setDataSource(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const SetData = async () => {
      await axiosInstance
        .get(`/api/StudyCenters`)
        .then((response) => {
          setStudyCenters(response.data);
        })
        .catch((error) => {
          console.error("Error fetching study centers:", error);
        });
    };

    const fetchDepartments = async () => {
      await axiosInstance
        .get(`/api/Departments`)
        .then((response) => {
          setDepartment(response.data);
        })
        .catch((error) => {
          console.error("Error fetching department data:", error);
        });
    };

    SetData();
    fetchDepartments();
  }, []);

  const sectionNameGenerator = (dept) => {

    const depart = department.filter((dep) => dep.dcode === dept ).map((deep) => {return deep.did})

    
    const sections = dataSource
      .filter((data) => data.dcode === depart[0])
      .map((section) => {
        return section;
      });

      console.log("Sections", sections);


    let firstDigit = 1;
    let lastDigit = sections.length > 0 ? sections.length : 1;
    let middleName = dept;


    return `${firstDigit}${middleName}${lastDigit+1}`;
  };

  const columns = [
    {
      title: "Section ID",
      dataIndex: "sectionId",
      editable: true,
    },
    {
      title: "Section Name",
      dataIndex: "sectionName",
      editable: true,
    },
    {
      title: "Department",
      dataIndex: "dcode",
      editable: true,
      render: (text, record) => {
        const departments = department.find((item) => item.did === text);
        return departments ? departments.dname : text;
      },
    },
    {
      title: "Acadamic Year",
      dataIndex: "acadYear",
      editable: true,
    },
    
    {
      title: "Program",
      dataIndex: "program",
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
    setEditingKey(null);
    form.resetFields();
  };

  const handleEdit = () => {
    form.validateFields().then(async (values) => {
      const updatedDataSource = dataSource.map((record) => {
        if (record.sectionId === values.sectionId) {
          return { ...record, ...values };
        }
        return record;
      });

      console.log("Form Edit :", updatedDataSource);
      try {
        // Make a POST request to the API endpoint
        const postData = {
          sectionId: campusCenterId,
          campusId: campusCenterId,
          sectionName: values.sectionName,
          dateCreated: moment(values.dateCreated).format("YYYY-MM-DD"),
          acadYear: values.acadYear,
          program: values.program,
          programType: values.programType,
          dcode: parseInt(values.dcode),
        };
        const response = await axiosInstance.put(`/api/Section`, postData);
        notification.success({
          message: "Successful",
          description: "Section updated successfully!",
        });

      } catch (error) {
        console.error("POST request failed:", error);
        notification.error({
          message: "Failed",
          description: `Error updating section: ${error.message || error}`,
        });
      }
    });

    form.resetFields();
    setVisible(false);
  };

  const handleOk = async () => {
    const values = form.getFieldsValue();

    const deprt = department
      .filter((dep) => dep.did === values.dcode)
      .map((deprt) => {
        return deprt;
      });
    // Log the values to the console
    const dname = sectionNameGenerator(deprt[0].dcode);

    console.log("Name", dname);
    try {
      // Make a POST request to the API endpoint
      const postData = {
        SectionId: `${campusCenterId}/${dname}/${values.acadYear}`,
        campusId: campusCenterId,
        sectionName: dname,
        dateCreated: moment(createDate).format("YYYY-MM-DD"),
        acadYear: values.acadYear,
        program: values.program,
        dcode: values.dcode,
        programType: values.programType,
      };
      console.log("Response iss", postData);
      const response = await axiosInstance.post(`/api/Section`, postData);
      notification.success({
        message: "Successful",
        description: "Section created successfully!",
      });
      // setDataSource(response.data)

      setVisible(false);
      form.resetFields();

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("POST request failed:", error);
      notification.error({
        message: "Failed",
        description: `Error creating section: ${error.message || error}`,
      });
      setVisible(false);
      form.resetFields();
    }

    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const handleSearch = (value) => {
    const filteredData = dataSource.filter(
      (record) => record.sectionId.toLowerCase() === value.toLowerCase()
    );

    console.log("test ", value, filteredData);
    setDataSource(filteredData);
  };

  const edit = (record) => {
    console.log("edit ", record);
    const dateCreated = moment(record.dateCreated, "YYYY-MM-DD");

    form.setFieldsValue({
      ...record,
      dateCreated: dateCreated,
    });
    // form.setFieldsValue(record);
    setEditingKey(record.sectionId);
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
          approvedDate: moment(values.approvedDate),
          // resultDate: moment(values.resultDate),
        };
        const response = await axiosInstance.put(`/api/Section`, newData);
        console.log("Put request successful:", response.data);
        setDataSource(newData);
        setEditingKey("");
      }
    });
  };

  const cancelEditing = () => {
    setEditingKey("");
  };

  const handleDelete = async (record) => {
    try {
      console.log("delete", record);
      const response = await axiosInstance.delete(`/api/Section`, {params:{section:encodeURIComponent(record.sectionId)}});
      console.log("Delete request successful:", response.data);
      notification.success({
        message: "Delete Successful",
        description: "The section is deleted successfully!",
      });
  
      const newData = dataSource.filter((item) => item.key !== record.key);
      setDataSource(newData);
    }catch(error) {
      notification.error({
        message: "Error",
        description: `Error deleting section: ${error.message || error}`,
      });
    }
   

    
  };

  return (
    <div className="mb-8 mt-6 min-h-[100vh] flex flex-col gap-6 bg-white p-5 rounded-md shadow-md">
      <div className="list-sub flex justify-between">
        <Button
          type="primary"
          onClick={showModal}
          style={{
            marginBottom: 16,
            fontWeight: "bold",
            backgroundColor: "#4279A6",
            padding: "12px 24px",
            height: "auto",
            width: "20%",
          }}
        >
          Create New Section
        </Button>
        
        <div className="list-filter">
          <Input.Search
            placeholder="Search by Section ID"
            onSearch={handleSearch}
            style={{
              // width: "30%",

              marginBottom: 16,
              paddingTop: "15px",
              height: "50px",
            }}
          />
        </div>
      </div>
      <hr className="mb-4 border-2 border-[#C2C2C2]"/>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        loading={loading}
        rowKey={(record) => record.sectionId}
        className="custom-table"

        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingKey ? "Edit Record" : "Create Record"}
        visible={visible}
        onCancel={handleCancel}
        onOk={editingKey ? handleEdit : handleOk}
        okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
      >
        {activeTerm ? (
          <Form form={form} onFinish={onFinish}>
            {/* <Form.Item
            label="Section ID"
            name="sectionId"
            rules={[{ required: true, message: 'Please input Sectiont ID!' }]}
          >
            <Input />
          </Form.Item> */}
            {/* <Form.Item
            label="Section Name"
            name="sectionName"
            rules={[
              { required: true, message: "Please input Section number!" },
            ]}
          >
            <Input />
          </Form.Item> */}
            <Form.Item
              label="Academic Year"
              name="acadYear"
              initialValue={activeTerm.acadYear}
              rules={[
                { required: true, message: "Please input Academic Year!" },
              ]}
            >
              <Input disabled style={{ width: "100%", padding:"12px" }}
 />
            </Form.Item>
            <Form.Item
              label="Date Created"
              name="dateCreated"
              rules={[
                { required: true, message: "Please select date created!" },
              ]}
            >
              <DatePicker
                value={createDate && moment(createDate)}
                onChange={onChangeEnd}
                style={{ width: "100%", padding:"12px" }}

              />
            </Form.Item>
            <Form.Item
              label="Department"
              name="dcode"
              rules={[{ required: true, message: "Please select department!" }]}
            >
              <Select key="dcodeId"  style={{ width: "100%", height:"45px" }}
>
                {department.map((department) => (
                  <Option key={department.did} value={department.did}>
                    {department.dname}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              label="Program"
              name="program"
              rules={[{ required: true, message: "Please select Program !" }]}
            >
              <Select style={{ width: "100%", height:"45px" }}>
                <Option value="TVET">TVET</Option>
                <Option value="Degree">Degree</Option>
                <Option value="Masters">Masters</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Program Type"
              name="programType"
              rules={[
                { required: true, message: "Please select program type!" },
              ]}
            >
              <Select style={{ width: "100%", height:"45px" }}>
                <Option value="Regular">Regular</Option>
                <Option value="Extension">Extension</Option>
                <Option value="Extension">Weekend</Option>
              </Select>
            </Form.Item>
          </Form>
        ) : (
          <p>No active term found.</p>
        )}
      </Modal>
    </div>
  );
};

export default AddSection;
