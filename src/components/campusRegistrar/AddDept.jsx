import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  Select,
  notification,
} from "antd";
import axios from "axios";
import moment from "moment";
import { api } from "../constants";
import axiosInstance from "@/configs/axios";
import "./common.css"; 


const { Option } = Select;

const AddDepartment = () => {
  const [data, setData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [spining, setSpining] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [departments, setDepartments] = useState([]);
  const editFormRef = useRef(null); // Ref for accessing form instance

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get(`/api/Departments`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching department data:", error);
        });
    };

    fetchData();
  }, []);

  const cancel = () => {
    setEditingKey("");
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
  };

  const columns = [
    {
      title: "Department Code",
      dataIndex: "dcode",
      key: "dcode",
    },
    {
      title: "Department Name",
      dataIndex: "dname",
      key: "dname",
    },
    {
      title: "Department Type",
      dataIndex: "depType",
      key: "depType",
    },
    {
      title: "Is Major",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" onClick={() => save(record.key)}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button onClick={() => edit(record)}>Edit</Button>
            <Popconfirm
              title="Sure to delete?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { backgroundColor: "#4279A6", marginRight:"4px" } }}
              onConfirm={() => handleDelete(record)}
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

  const edit = (record) => {
    console.log(record);
    // form.setFieldsValue(record);
    setEditingKey(record.did);
    // handleOk();
    setIsEditModalVisible(true);
    editFormRef.current.setFieldsValue(record);
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };

  const handleCreateOk = () => {
    setIsCreateModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const onFinishEdit = async (values) => {
    const updatedData = data.map((item) =>
      item.did === editingKey ? { ...item, ...values } : item
    );
    const postData = {
      did: editingKey,
      dcode: values.dcode,
      dname: values.dname,
      depType: values.depType,
      major: values.major,
      createdDate: moment(Date.now()).format("YYYY-MM-DD"),
    };

    console.log("test ", postData);
    await axiosInstance
      .put(`/api/Departments/` + editingKey, postData)
      .then((response) => {
        console.log("Department updated successfully:", response.data);
        setData(updatedData);
        setEditingKey("");
        setIsEditModalVisible(false);
        notification.success({
          message: "Successful",
          description: "Department updated successfully!",
        });
      })
      .catch((error) => {
        console.error("Error creating department:", error);
        setIsEditModalVisible(false);

        notification.error({
          message: "Failed",
          description: `Error updating departiment: ${error.message || error}`,
        });
      });
  };

  const onFinishCreate = async (values) => {
    setSpining(true);

    const departmentCode = Math.floor(Math.random() * 100);

    const newDepartment = {
      did: departmentCode,
      ...values,
    };
    console.log(newDepartment);

    await axiosInstance
      .post(`/api/Departments`, newDepartment)
      .then((response) => {
        // console.log("Department created successfully:", response.data);
        // setData(newDepartment);
        setSuccess(true);
        setError(null);
        setIsCreateModalVisible(false);
        setSpining(false);
        notification.success({
          message: "Successful",
          description: "Deaprtiment created successfully!",
        });
      })
      .catch((error) => {
        console.error("Error creating department:", error);
        setIsCreateModalVisible(false);
        notification.error({
          message: "Failed",
          description: `Error creating departiment: ${error.message || error}`,
        });
        setSuccess(false);
        setError(error.response.data);
        setSpining(false);
      });
  };

  const handleDelete = async (key) => {
    try {
      const response = await axiosInstance.delete(`/api/Departments`, {
        params: { department: key.did },
      });
      notification.success({
        message: "Delete Successful",
        description: "The department is deleted successfully!",
      });

      const newData = data.filter((item) => item.did !== key.did);
      setData(newData);
    } catch (error) {
      notification.error({
        message: "Error",
        description: `Error deleting department: ${error.message || error}`,
      });
    }
  };

  const isEditing = (record) => record.key === editingKey;

  const editForm = (
    <Form
      ref={editFormRef}
      layout="vertical"
      style={{ position: "relative" }}
      onFinish={onFinishEdit}
      initialValues={data.find((item) => item.did === editingKey)}
    >
      <Form.Item label="Department Code" name="dcode" required>
        <Input
          defaultValue={data.dcode}
          placeholder={data.dcode}
          style={{ width: "100%", height: "45px" }}
        />
      </Form.Item>
      <Form.Item label="Department Name" name="dname" required>
        <Input style={{ width: "100%", height: "45px" }} />
      </Form.Item>
      <Form.Item label="Department Type" name="depType" required>
        <Select style={{ width: "100%", height: "45px" }}>
          <Option value="Major">Major</Option>
          <Option value="Supportive">Supportive</Option>
          <Option value="Common">Common</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Is Major" name="major" required>
        <Select style={{ width: "100%", height: "45px" }}>
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{ backgroundColor: "#4279A6", marginRight: "5px" }}
          htmlType="submit"
        >
          Save
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </Form.Item>
      {spining ? (
        <l-tailspin
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          size="60"
          stroke="5"
          speed="0.9"
          color="#4279A6"
        ></l-tailspin>
      ) : (
        ""
      )}
    </Form>
  );

  const createForm = (
    <Form
      layout="vertical"
      onFinish={onFinishCreate}
      style={{ position: "relative" }}
    >
      <Form.Item
        label="Department Code"
        name="dcode"
        required
        rules={[
          { required: true, message: "Please enter Department Code!" },
          { len: 4, message: "Department Code must be exactly 4 characters!" },
        ]}
      >
        <Input maxLength={4} style={{ width: "100%", height: "45px" }} />
      </Form.Item>
      <Form.Item label="Department Name" name="dname" required>
        <Input style={{ width: "100%", height: "45px" }} />
      </Form.Item>
      <Form.Item label="Department Type" name="depType" required>
        <Select style={{ width: "100%", height: "45px" }}>
          <Option value="Major">Major</Option>
          <Option value="Supportive">Supportive</Option>
          <Option value="Common">Common</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Is Major" name="major" required>
        <Select style={{ width: "100%", height: "45px" }}>
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{ backgroundColor: "#4279A6", marginRight: "5px" }}
          htmlType="submit"
        >
          Create
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </Form.Item>
      {spining ? (
        <l-tailspin
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          size="60"
          stroke="5"
          speed="0.9"
          color="#4279A6"
        ></l-tailspin>
      ) : (
        ""
      )}
    </Form>
  );

  const editModal = (
    <Modal
      title="Edit Department"
      visible={isEditModalVisible}
      onOk={handleEditOk}
      onCancel={handleEditCancel}
      footer={null}
    >
      {editForm}
    </Modal>
  );

  const createModal = (
    <Modal
      title="Create Department"
      visible={isCreateModalVisible}
      onOk={handleCreateOk}
      onCancel={handleCreateCancel}
      footer={null}
    >
      {createForm}
    </Modal>
  );

  return (
    <div className="mb-8 mt-6 min-h-[100vh] flex flex-col gap-6 bg-white p-5 rounded-md shadow-md">
      <Button
        onClick={showCreateModal}
        type="primary"
        style={{
          marginBottom: 16,
          fontWeight: "bold",
          backgroundColor: "#4279A6",
          padding: "12px 24px",
          height: "auto",
          maxWidth: "20%",
        }}
      >
        Create New Department
      </Button>
      <hr className="mb-4 border-2 border-[#C2C2C2]"/>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="key"
        bordered
        className="custom-table"

        pagination={{ pageSize: 10 }}

      />
      {editModal}
      {createModal}
      {success && (
        <div
          id="alert-border-3"
          class="flex items-center mt-5 p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ms-3 text-sm font-medium">Submission successful!</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-3"
            aria-label="Close"
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      {error && (
        <div
          id="alert-border-2"
          class="flex items-center mt-5 p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ms-3 text-sm font-medium">Error: {error}</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-2"
            aria-label="Close"
          >
            <span class="sr-only">Dismiss</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDepartment;
