import React, { useState , useEffect} from "react";
import { Space, Table, Tag, Card, Select ,Modal , Input ,Button } from "antd";
import Grid from "@mui/material/Grid";
import axios from 'axios';


// import ChartStudent from "../../graph/studentGraph/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker } from "antd";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
// import Icon from "react-eva-icons";
import ChartStudent from "@/graph/studentGraph/Chart";

const { RangePicker } = DatePicker;
const { Option } = Select;

const RootHome = () => {
  var isDaily = "white";
  const [isMale, setIsMale] = useState("none");
  const [datavalue, setDatavalue] = useState([]);
  const [isFemale, setIsFemale] = useState("none");
  const [isAll, setIsAll] = useState("none");
  const [attendStudents, setAttendStudents] = useState();
  const [datas, setData] = useState([]);
  // const [datas1, setData1] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modifiedUserData, setModifiedUserData] = useState({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUser1, setSelectedUser1] = useState(null);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [modifiedUserData1, setModifiedUserData1] = useState({});
  const [isDeleteModalVisible1, setIsDeleteModalVisible1] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studyCenters, setStudyCenters] = useState([]);





  useEffect(() => {
    // Fetch or set your user data here
    // For demonstration purposes, I'm using static data
    const data = [
           {
          key: "1",
          name: "John Brown",
          email: "john@admas.com",
          role: "Campus head",
          center: "campus1"
        },
        {
          key: "2",
          name: "kebede ayele",
          email: "kebede@admas.com",
          role: "Campus head",
          center: "campus3"
        },
        {
          key: "3",
          name: "Tomas nahom",
          email: "tomas@admas.com",
          role: "Center registrar head",
          center: "campus2"
        },
    ];

    setData(data);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7032/api/StudyCenters');
        setStudyCenters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <a style={{ color: "black", fontWeight: "bold" }}>{text}</a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Center",
      dataIndex: "center",
      key: "center",
    },
  {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEditUser(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDeleteUser(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
 

   
 
  
  const columns1 = [
    { title: 'Center ID', dataIndex: 'CenterId', key: 'CenterId' },
    { title: 'Center Name', dataIndex: 'CenterName', key: 'CenterName' },
    { title: 'Regional Center Name', dataIndex: 'RegionalCenterName', key: 'RegionalCenterName' },
    { title: 'Region', dataIndex: 'Region', key: 'Region' },
    { title: 'Current Center This', dataIndex: 'CurrentCenterThis', key: 'CurrentCenterThis' },
    { title: 'Center Type', dataIndex: 'CenterType', key: 'CenterType' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEditUser1(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDeleteUser1(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  
  

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModifiedUserData({ ...user });
    setIsModalVisible(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  
  const handleEditUser1 = (user) => {
    setSelectedUser1(user);
    setModifiedUserData1({ ...user });
    setIsModalVisible1(true);
  };

  const handleDeleteUser1 = (user) => {
    setSelectedUser1(user);
    setIsDeleteModalVisible1(true);
  };

  const handleModalOk = () => {
    // Handle your logic to update the user data
    // For demonstration purposes, I'm updating the data in state
    const updatedData = datas.map((user) =>
      user.key === selectedUser.key ? { ...user, ...modifiedUserData } : user
    );
    setData(updatedData);
    setIsModalVisible(false);
    setSelectedUser(null);
    setModifiedUserData({});
  };
  
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setModifiedUserData({});
  };

  const handleDeleteModalOk = () => {
    // Handle your logic to delete the user data
    // For demonstration purposes, I'm updating the data in state
    const updatedData = datas.filter((user) => user.key !== selectedUser.key);
    setData(updatedData);
    setIsDeleteModalVisible(false);
    setSelectedUser(null);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedUser(null);
  };

  const handleModalOk1 = () => {
    // Handle your logic to update the user data
    // For demonstration purposes, I'm updating the data in state
    const updatedData = datas1.map((user) =>
      user.key === selectedUser1.key ? { ...user, ...modifiedUserData } : user
    );
    setData1(updatedData);
    setIsModalVisible1(false);
    setSelectedUser1(null);
    setModifiedUserData1({});
  };
  
  const handleModalCancel1 = () => {
    setIsModalVisible1(false);
    setSelectedUser1(null);
    setModifiedUserData1({});
  };

  const handleDeleteModalOk1 = () => {
    // Handle your logic to delete the user data
    // For demonstration purposes, I'm updating the data in state
    const updatedData = datas1.filter((user) => user.key !== selectedUser1.key);
    setData1(updatedData);
    setIsDeleteModalVisible1(false);
    setSelectedUser1(null);
  };

  const handleDeleteModalCancel1 = () => {
    setIsDeleteModalVisible1(false);
    setSelectedUser1(null);
  };

  


  const Dates = [
    {
      id: 1,
      label: (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "block",
            }}
          >
            {/* <Icon name="checkmark-outline" fill={isDaily} size="medium" /> */}
          </div>
          <span style={{ marginLeft: 10 }}>Daily</span>
        </div>
      ),
      value: "Daily",
    },
    {
      id: 2,
      label: (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "block",
            }}
          >
            {/* <Icon name="checkmark-outline" fill={isDaily} size="medium" /> */}
          </div>
          <span style={{ marginLeft: 10 }}>Weekly</span>
        </div>
      ),
      value: "Weekly",
    },
    {
      id: 3,
      label: (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "block",
            }}
          >
            {/* <Icon name="checkmark-outline" fill={isDaily} size="medium" /> */}
          </div>
          <span style={{ marginLeft: 10 }}>Monthly</span>
        </div>
      ),
      value: "Monthly",
    },
    {
      id: 4,
      label: (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "block",
            }}
          >
            {/* <Icon name="checkmark-outline" fill={"#15C9CE"} size="medium" /> */}
          </div>
          <span style={{ marginLeft: 10 }}>Annually</span>
        </div>
      ),
      value: "Annually",
    },
  ];

  const Genders = [
    {
      id: 1,
      label: (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: isMale,
            }}
          >
            {/* <Icon name="checkmark-outline" fill={"DC5FC9"} size="medium" /> */}
          </div>
          <span style={{ marginLeft: 10 }}>Male</span>
        </div>
      ),
      value: "Male",
      icon: "arrow-ios-downward-outline",
    },
    {
      id: 2,
      label: (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: isFemale,
            }}
          >
            {/* <Icon name="checkmark-outline" fill={"DC5FC9"} size="medium" /> */}
          </div>
          <span style={{ marginLeft: 10 }}>Female</span>
        </div>
      ),
      value: "Female",
      icon: "arrow-ios-downward-outline",
    },
    {
      id: 3,
      label: (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: isAll,
            }}
          >
            {/* <Icon name="checkmark-outline" fill={"#15C9CE"} size="medium" /> */}
          </div>
          <span style={{ marginLeft: 10 }}>All Genders</span>
        </div>
      ),
      value: "All Genders",
      icon: "arrow-ios-downward-outline",
    },
  ];

  return (
    <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   backgroundColor: "#FFF",
      //   width: "100%",
      // }}
      className="  flex flex-col gap-12"
    >
      <p className="!font-jakarta text-left text-[#000000] text-[20px] font-bold align-middle  mb-2 ml-5">
        Root Admin Dashboard
      </p>
      <div className=" ml-4">
        <div style={{ display: "flex" }}>
          <RangePicker
            format={"YYYY-MM-DD"}
            className="!mr-2 !rounded-lg  !border-0 hover:!border-0 !text-[#98A2B3] !shadow-none hover:!shadow-none"
            //   onChange={(e) =>handledata(e)}
          />
          <Select
            defaultValue={Dates[0]}
            // placeholder={Genders[2]}
            options={Dates}
            //  onChange={handleFilterAnuallly}
            styles={{
              control: (base) => ({
                ...base,
                border: 0,
                // This line disable the blue border
                boxShadow: "none",
                color: "#98A2B3",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                color: state.isSelected ? "#15C9CE" : "#344054",
                fontSize: 14,
                fontWeight: "bold",
                backgroundColor: "#FFF",
                borderColor: "white",
                borderWidth: 0,
                borderRadius: 15,
                width: "50%",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                text: "#98A2B3",
                font: "#3599B8",
                primary25: "#4279A6",
                primary: "#4279A6",
                color: "#98A2B3",
              },
            })}
            className="!mr-2 !rounded-lg  !border-0 hover:!border-0 !text-[#667085]"
          />
          <Select
            defaultValue={Genders[2]}
            placeholder={Genders[2]}
            options={Genders}
            // onChange={handleFilterGender}

            // components={{ Option: IconOption }}
            styles={{
              control: (base) => ({
                ...base,
                border: 0,
                // This line disable the blue border
                boxShadow: "none",
                color: "#98A2B3",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                color: state.isSelected ? "#15C9CE" : "#344054",
                display: state.isSelected
                  ? setIsAll("block")
                  : setIsAll("none"),
                backgroundColor: state.isSelected ? "#FFFFFF" : "#FFFFFF",
                fontSize: 14,
                fontWeight: "bold",
                borderColor: "white",
                width: "40%",
              }),
              placeholder: () => ({
                color: "#667085",
                fontSize: 20,
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                primary25: "#FFF",
                primary: "#FFF",
                neutral50: "#667085",
              },
            })}
            className=" !rounded-lg ml-[-2px] !border-0 hover:!border-0  !border-[white]"
          />
        </div>
      </div>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Card bordered={false} className="w-[100%] mb-10">
            <div className="flex flex-row justify-start align-bottom items-center"></div>
            <div className="flex flex-row justify-start align-bottom items-center mt-1">
            <h1 className="text-3xl text-[#344054] ">
           Registered Users</h1>
            <h4 className="text-base text-[#0B1354]">/ {attendStudents}   </h4>
                <FontAwesomeIcon className="pr-2  mb-2 ml-5 text-[#0ceb20]" icon={faArrowUp} />
                <h4 className="text-sm text-[#0ceb20]" style={{marginLeft:-4}}> 
               20 %</h4>
                </div>
                <h4 className="text-base text-[#344054] font-normal mb-5">Students that has been registered for the past year</h4>
            <div className="flex" >
                  <ChartStudent title="" aspect={4 /1} datas = {datavalue} />
                  </div>

          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card bordered={false} className="w-[100%] min-h-[419px]">
            <div className="flex flex-row justify-start align-bottom items-center">
              {/* <div style={{ flexDirection:'row' , flex:1 , justifyContent:'flex-start'}}> */}
              <h1 className="text-base text-[#344054] font-normal">
                {" "}
                Users Registeration
              </h1>
            </div>
            <Table
              columns={columns}
              dataSource={datas}
              style={{ marginTop: 20 }}
              pagination={{ position: ["bottomCenter"] }}
            />
            ;
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card bordered={false} className="w-[100%] min-h-[419px]">
            <div>
              <div className="flex flex-row justify-start align-bottom items-center">
                {/* <div style={{ flexDirection:'row' , flex:1 , justifyContent:'flex-start'}}> */}
                <h1 className="text-base text-[#344054] font-normal">
                  {" "}
                  Campus Registeration
                </h1>
              </div>
              <Table
      dataSource={studyCenters}
      columns={columns1}
      loading={loading}
      rowKey={(record) => record.CenterId}
      pagination={{ pageSize: 10 }}
    />
              ;
              {/* <div className="flex flex-row justify-start align-bottom items-center">
                <h1 className="text-base text-[#98A2B3]">Registerar Data</h1> 
            </div>
            <div className="flex flex-row justify-start align-bottom items-center">
            <h1 className="text-xl text-[#98A2B3]">Available Soon</h1>
                </div> */}
            </div>
            {/* <Liner datas={students} /> */}
            {/* <div className="mt-[19%]">
            <ChartStaff  title="" aspect={2 / 1} />
            </div> */}
          </Card>
        </Grid>
      </Grid>
      <Modal  
        title="Edit User"
        visible={isModalVisible}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <label>Name:</label>
        <Input
          value={modifiedUserData.name}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, name: e.target.value })}
        />
        <label>Email:</label>
        <Input
          value={modifiedUserData.email}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, email: e.target.value })}
        />
        <label>Role:</label>
        <Input
          value={modifiedUserData.role}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, role: e.target.value })}
        />
         {/* <label>Password:</label>
        <Input
          value={modifiedUserData.password}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, password: e.target.value })}
        /> */}
         <label>Center:</label>
        <Input
          value={modifiedUserData.center}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, center: e.target.value })}
        />
      </Modal>

      <Modal
        title="Delete User"
        visible={isDeleteModalVisible}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
      >
        <p>Are you sure you want to delete {selectedUser?.name}?</p>
      </Modal>

      <Modal  
        title="Edit Center"
        visible={isModalVisible1}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
        onOk={handleModalOk1}
        onCancel={handleModalCancel1}
      >
        <label>Name:</label>
        <Input
          value={modifiedUserData1.name}
          onChange={(e) => setModifiedUserData1({ ...modifiedUserData1, name: e.target.value })}
        />
        <label>ID :</label>
        <Input
          value={modifiedUserData1.id}
          onChange={(e) => setModifiedUserData1({ ...modifiedUserData1, id: e.target.value })}
        />
        <label>Location:</label>
        <Input
          value={modifiedUserData1.location}
          onChange={(e) => setModifiedUserData1({ ...modifiedUserData1, location: e.target.value })}
        />
         <label>Password:</label>
        <Input
          value={modifiedUserData.password}
          onChange={(e) => setModifiedUserData({ ...modifiedUserData, password: e.target.value })}
        />
      </Modal>

      <Modal
        title="Delete Campus"
        visible={isDeleteModalVisible1}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
        onOk={handleDeleteModalOk1}
        onCancel={handleDeleteModalCancel1}
      >
        <p>Are you sure you want to delete {selectedUser1?.name}?</p>
      </Modal>
    </div>
  );
};
export default RootHome;
