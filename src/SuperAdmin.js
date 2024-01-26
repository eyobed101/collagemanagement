import { useEffect, useState, useRef } from "react";
import {
  Input,
  Button,
  Select,
  Modal,
  message,
  TimePicker,
  Table,
  Tag,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faArrowRight,
  faCheck,
  faBan,
  faAdd
} from "@fortawesome/free-solid-svg-icons";
import uuid from "react-uuid";
import { API_PATH } from "../../src/components/subComponents/loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../src/components/modals/courses/style.css";
const { Option } = Select;

const SuperAdmin = () => {
  const navigate = useNavigate();
  const uid = useSelector((state) => state.user.profile);
  const school = useSelector((state) => state.user.profile.school);
  const [Employee, setEmployee] = useState([]);
  const [add_view, setadd_view] = useState(false);
  const [edit_view, setedit_view] = useState(false);
  const [loading, setLoading] = useState(true);
  const [coursesData, setCourseData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classSelected, setClassSelected] = useState(true);
  const [openedit, setOpenedit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deletable_data, setdeletable_data] = useState();
  const [selectedRowKeysCourses, setSelectedRowKeysCourse] = useState([]);
  const [editable_data, seteditable_data] = useState({});
  const [created_data, setcreated_data] = useState({});
  const [newEmployee, setNewEmployee] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    EmployeeId: "",
    Role: "",
    Centerid: "",
    created_data: "",
  });
  const onclick_edit = (value) => {
    console.log("value", value);
    setNewEmployee(value);
    setedit_view(true);
  };
  const onclick_delet = (value) => {
    console.log("value", value);
    setdeletable_data(value);
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const courseColumn = [
    {
      title: <p className="font-jakarta text-[#344054] font-[600]">FirstName</p>,
      dataIndex: "first_name",
      key: "first_name",
      render: (text, data) => {
        return (
          <p className="text-[14px] font-jakarta text-[#344054]">{text}</p>
        );
      },
    },
  ];

  const columns = [
    {
      title: (
        <p className="font-jakarta text-[#344054] font-[600]">Middle Name</p>
      ),
      dataIndex: "MiddleName",
      key: "MiddleName",
      render: (text, data) => {
        return (
          <p className="text-[14px] font-jakarta text-[#344054]">{text}</p>
        );
      },
    },
    {
      title: (
        <p className="font-jakarta text-[#344054] font-[600]">
         Last Name
        </p>
      ),
      dataIndex: "LastName",
      key: "LastName",
      render: (item) => {
        return <div className="text-[#344054]">{item}</div>;
      },
    },
    {
      title: <p className="font-jakarta text-[#344054] font-[600]">EmployeeId</p>,
      title: "EmployeeId",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
      render: (item) => {
        return <div className="text-[#344054]">{item}</div>;
      },
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
      render: (item) => {
        return <div className="text-[#344054]">{item}</div>;
      },
    },
    {
      title: "CenterId",
      dataIndex: "CenterId",
      key: "CenterType",
      render: (item) => {
        return <div className="text-[#344054]">{item}</div>;
      },
    },
  ];
  const getEmployee = async (level) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: `${API_PATH}/users`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);

    setTimeout(() => {
      setEmployee(response.data);
      setLoading(false);
    }, 200);
  };
  const postStudyCenters = async (level) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: `${API_PATH}/users`,
      method: "Post",
      headers: headersList,
      data: newEmployee,
    };
    axios
      .request(reqOptions)
      .then(function (response) {
        alert("user Add");
        getEmployee();
      })
      .catch(function async(error) {
        alert("something wrong");
      });
  };
  const editEmployee = async (level) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: `${API_PATH}/user/${newEmployee.EmployeeId}`,
      method: "Put",
      headers: headersList,
      data: newEmployee,
    };
    axios
      .request(reqOptions)
      .then(function (response) {
        alert("Employee edited");
        getEmployee();
      })
      .catch(function async(error) {
        alert("something wrong");
      });
  };

  const onSelectChanges = (newSelectedRowKeys) => {
    setSelectedRowKeysCourse(newSelectedRowKeys);
    setNewEmployee({ ...newEmployee, course: selectedRowKeysCourses });
  };
  const rowSelections = {
    selectedRowKeysCourses,
    onChange: onSelectChanges,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }

            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setNewEmployee({ ...newEmployee, StudyCenter: newSelectedRowKeys });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }

            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const handleEmployee = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="">
        {edit_view ? (
          <>
            <div>
              <div className="flex flex-row justify-between -mt-10 mb-8 z-0">
                <h1 className="text-2xl font-bold font-jakarta text-[#344054] "></h1>
                <Button
                  className="border-[2px] !border-[#E7752B] flex flex-row justify-center !text-[#E7752B] bg-white !rounded-lg !h-10 "
                  icon={<FontAwesomeIcon className="mr-2" icon={faCheck} />}
                  onClick={() => editEmployee()}
                >
                  Confirm
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-4 pb-10">
                <div className="py-4">
                  <label>First Name</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    value={newEmployee.FirstName}
                    name="FirstName"
                    placeholder="Enter FirstName"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>Middle Name</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    value={newEmployee.MiddleName}
                    name="MiddleName"
                    placeholder="Enter Middle Name"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>Last Name</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    name="LastName"
                    placeholder="Enter Last Name"
                    value={newEmployee.LastName}
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>Role</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    name="Role"
                    value={newEmployee.Role}
                    placeholder="Enter Role"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>CenterId </label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    name="CenterId"
                    value={newEmployee.Centerid}
                    placeholder="Enter Center Id"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>Employee Id</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    name="EmployeeId"
                    value={newEmployee.EmployeeId}
                    placeholder="Enter Employee ID"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
              </div>
              

              <div className="flex flex-row justify-between -mt-10 mb-8 z-0">
                <h1 className="text-2xl font-bold font-jakarta text-[#344054] "></h1>
                <Button
                  className="border-[2px] !border-[#E7752B] flex flex-row justify-center !text-[#E7752B] bg-white !rounded-lg !h-10 "
                  icon={<FontAwesomeIcon className="mr-2" icon={faBan} />}
                  onClick={() => setedit_view(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {add_view ? (
              <div>
                <div className="flex flex-row justify-between -mt-10 mb-8 z-0">
                  <h1 className="text-2xl font-bold font-jakarta text-[#344054] "></h1>
                  <Button
                    className="border-[2px] !border-[#E7752B] flex flex-row justify-center !text-[#E7752B] bg-white !rounded-lg !h-10 "
                    icon={<FontAwesomeIcon className="mr-2" icon={faCheck} />}
                    onClick={() => postStudyCenters()}
                  >
                    Confirm
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-4 pb-10">
                <div className="py-4">
                  <label>First Name</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    value={newEmployee.FirstName}
                    name="FirstName"
                    placeholder="Enter FirstName"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>Middle Name</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    value={newEmployee.MiddleName}
                    name="MiddleName"
                    placeholder="Enter Middle Name"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>Last Name</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    name="LastName"
                    placeholder="Enter Last Name"
                    value={newEmployee.LastName}
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>Role</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    name="Role"
                    value={newEmployee.Role}
                    placeholder="Enter Role"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>CenterId </label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    name="CenterId"
                    value={newEmployee.Centerid}
                    placeholder="Enter Center Id"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                <div className="py-4">
                  <label>Employee Id</label>
                  <Input
                    style={{ marginTop: 6 }}
                    className="py-6 mt-6 !rounded-lg !border-[2px]"
                    name="EmployeeId"
                    value={newEmployee.EmployeeId}
                    placeholder="Enter Employee ID"
                    onChange={(e) => handleEmployee(e)}
                  />
                </div>
                </div>

                <div className="flex flex-row justify-between -mt-10 mb-8 z-0">
                  <h1 className="text-2xl font-bold font-jakarta text-[#344054] "></h1>
                  <Button
                    className="!border-[#E7752B] !text-[white] hover:!text-[white] !rounded-[6px] shadow-md -z-0 !bg-[#E7752B]"
                    icon={<FontAwesomeIcon className="mr-2" icon={faBan} />}
                    onClick={() => setadd_view(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-row justify-between -mt-10 mb-8 z-0">
                  <h1 className="text-2xl font-bold font-jakarta text-[#344054] "></h1>
                  <Button
                    className="border-[2px] !border-[#E7752B] flex flex-row justify-center !text-[#E7752B] bg-white !rounded-lg !h-10 "
                    icon={<FontAwesomeIcon className="mr-2" icon={faAdd} />}
                    onClick={() => setadd_view(true)}
                  >
                    Add Employee
                  </Button>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    borderWidth: 1,
                    top: 95,
                    marginTop: 20,
                  }}
                >
                  <div
                    style={{
                      padding: 5,
                    }}
                  >
                    <div>
                      <Table
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: (event) => onclick_edit(record), // click row
                          };
                        }}
                        loading={loading}
                        style={{ marginTop: 20 }}
                        columns={columns}
                        dataSource={Employee}
                        pagination={{ position: ["bottomCenter"] }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SuperAdmin;
