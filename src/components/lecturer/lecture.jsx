import React, { useState } from 'react';
import { Space, Table, Button, Col, DatePicker, Drawer, Form, Input, Row, Select ,Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import Icon from "react-eva-icons";
import { Layout, Menu } from "antd";
import { faAdd, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// Mock data
const { Option } = Select;
const drawerWidth = 240;
const campuses = [
  { id: 1, name: 'computerscience' },
  { id: 2, name: 'informationscience' },
  { id: 3, name: 'Electricalscience' },
  { id: 4, name: 'Accounting' },
  { id: 5, name: 'Management' },
  // Add more campuses as needed
];
const Acadamic = [
    { id: 1, year:2011},
    { id: 2, year: 2010 },
    { id: 3, year: 2009 },
    { id: 4, year: 2008 },
    { id: 5, year: 2007 },
    { id: 6, year: 2006 },
    { id: 7, year: 2005 },
    { id: 8, year: 2004 },
    // Add more campuses as needed
  ];

const Term =[
    { id: 1, term: 1},
    { id: 2, term: 2},
    { id: 3, term: 3},
]
const Section = [
    { id: 1, section: 1},
    { id: 2, section: 2},
    { id: 3, section: 3},
    { id: 4, section: 4},
    // Add more campuses as needed
  ];

const courserecords ={
    1: [
        { id: 1, name: "Principal of accounting" ,acadamicYear :2011,  department :'informationscience' },
        { id: 2, name: "Economics",acadamicYear :2011,  department :'informationscience'},
        { id: 3, name: "Global trends" ,acadamicYear :2011,  department :'informationscience'},
        { id: 4,  name: "English",acadamicYear :2011,  department :'informationscience'},
        { id: 13,  name: "Chemistry",acadamicYear :2010,  department :'Electricalscience'},
        { id: 14,  name: "Physics",acadamicYear :2010,  department :'Electricalscience'},
        { id: 15,  name: "Dynamics" ,acadamicYear :2010,  department :'Electricalscience'},
        { id: 16,  name: "Power",acadamicYear :2010,  department :'Electricalscience'},
    ],
    2: [
        { id: 5, name: "Introduction to Computer Science" ,acadamicYear :2011, department :'computerscience'},
        { id: 6,  name: "Intro to programming",acadamicYear :2011, department :'computerscience'},
        { id: 7,  name: "Maths of Computer Science",acadamicYear :2011, department :'computerscience'},
        { id: 8,  name: "Geography",acadamicYear :2011, department :'computerscience'},
    ],
    3:[
        { id: 9, name: "Intro to database", acadamicYear :2009, department :'Management'},
        { id: 10,  name: "Statistics", acadamicYear :2009, department :'Management'},
        { id: 11,  name: "Electronic", acadamicYear :2009,  department :'Management'},
        { id: 12,  name: "Antroplogy", acadamicYear :2009,  department :'Management'},
    ]
}
const studentRecords = {
  1: [
    { id: 101, name: 'Student 1', cgpa :'3.8', acadamicYear :2011, section :1 , department :'computerscience' , curricula:"tot13" },
    { id: 102, name: 'Student 2', cgpa :'2.8', acadamicYear :2010,  section :1 ,department :'Electricalscience' ,curricula:"tot13" },
    { id: 103, name: 'Student 3', cgpa :'3.8', acadamicYear :2009,  section :1 ,department :'Management' ,curricula:"tot13" },
    { id: 104, name: 'Student 4', cgpa :'2.8', acadamicYear :2010,  section :2 ,department :'Accounting' ,curricula:"tot13" }, 
    { id: 105, name: 'Student 5', cgpa :'3.8', acadamicYear :2011,  section :2 ,department :'computerscience' ,curricula:"tot13" },
    { id: 106, name: 'Student 6', cgpa :'2.8', acadamicYear :2010,  section :3 ,department :'Management' ,curricula:"tot13" }, 
    { id: 107, name: 'Student 7', cgpa :'3.8', acadamicYear :2009,  section :2 ,department :'Information Science' ,curricula:"tot13" },
    { id: 108, name: 'Student 8', cgpa :'2.8', acadamicYear :2008,  section :3 ,department :'Electricalscience' ,curricula:"tot13" },  
    // Add more students for Campus 1
  ],
  2: [
    { id: 201, name: 'Student 9', cgpa :'3.5', acadamicYear :2011,section :3,  department :'informationscience' ,curricula:"tot13" },
    { id: 202, name: 'Student 10', cgpa :'3.2', acadamicYear :2009,section :2 , department :'computerscience' ,curricula:"tot13" },
    { id: 203, name: 'Student 11', cgpa :'3.8', acadamicYear :2011,section :2 , department :'Accounting' ,curricula:"tot13" },
    { id: 204, name: 'Student 12', cgpa :'2.8', acadamicYear :2008,section :1 , department :'Electricalscience' ,curricula:"tot13" }, 
    { id: 205, name: 'Student 13', cgpa :'3.8', acadamicYear :2011,section :4 , department :'computerscience' ,curricula:"tot13" },
    { id: 206, name: 'Student 14', cgpa :'2.8', acadamicYear :2007,section :4 , department :'Management' ,curricula:"tot13" }, 
    { id: 207, name: 'Student 15', cgpa :'3.8', acadamicYear :2004,section :1 , department :'Accounting' ,curricula:"tot13" },
    { id: 208, name: 'Student 16', cgpa :'2.8', acadamicYear :2009,section :1 , department :'Electricalscience' ,curricula:"tot13" }, 
    { id: 209, name: 'Student 17', cgpa :'3.8', acadamicYear :2011, section :2 ,department :'Information Science' ,curricula:"tot13" },
    { id: 210, name: 'Student 18', cgpa :'2.8', acadamicYear :2010, section :3 ,department :'Electricalscience' ,curricula:"tot13" }, 
    // Add more students for Campus 2
  ],
  3: [
    { id: 301, name: 'Student 19', cgpa :'3.5', acadamicYear :2011,section :3 ,  department :'informationscience' ,curricula:"tot13" },
    { id: 302, name: 'Student 20', cgpa :'3.2', acadamicYear :2009,section :2 , department :'computerscience' ,curricula:"tot13" },
    { id: 303, name: 'Student 21', cgpa :'3.8', acadamicYear :2011,section :2 , department :'Accounting' ,curricula:"tot13" },
    { id: 304, name: 'Student 22', cgpa :'2.8', acadamicYear :2007,section :1 , department :'Electricalscience' ,curricula:"tot13" }, 
    { id: 305, name: 'Student 23', cgpa :'3.8', acadamicYear :2011,section :4 , department :'computerscience' ,curricula:"tot13" },
    { id: 306, name: 'Student 24', cgpa :'2.8', acadamicYear :2010,section :4 , department :'Management' ,curricula:"tot13" }, 
    { id: 307, name: 'Student 25', cgpa :'3.8', acadamicYear :2011,section :1 , department :'Accounting' ,curricula:"tot13" },
    { id: 308, name: 'Student 26', cgpa :'2.8', acadamicYear :2007,section :1 , department :'Electricalscience' ,curricula:"tot13" }, 
    { id: 309, name: 'Student 27', cgpa :'3.8', acadamicYear :2008, section :2 ,department :'Information Science' ,curricula:"tot13" },
    { id: 310, name: 'Student 28', cgpa :'2.8', acadamicYear :2010, section :3 ,department :'Accounting',curricula:"tot13" }, 
    // Add more students for Campus 2
  ],
  // Add more campuses as needed
};

const columns = [
    {
      title: (
        <p className="font-jakarta font-[600] text-[16px] text-[#344054]">
          Name
        </p>
      ),
      dataIndex: "name",
      key: "name",
 
    },
    {
      title: <p className="font-jakarta  font-[600]">ID</p>,
      key: "id",
      dataIndex: "id",
    },
    {
      title: <p className="font-jakarta  font-[600]">Grade</p>,
      dataIndex: "cgpa",
      key: "cgpa"
    },
    {
      title: <p className="font-jakarta  font-[600]">Academic Year</p>,
      dataIndex: "acadamicYear",
      key: "acadamicYear",
    },
    {
      title: <p className="font-jakarta  font-[600]">Department</p>,
      dataIndex: "department",
      key: "department",
    },
    {
        title: <p className="font-jakarta  font-[600]">Curriculum</p>,
        dataIndex: "curricula",
        key: "curricula",
      },
  ];


const Lecturer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedname, setSelectedname] = useState([]);
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  const [windowSize, setWindowSize] = useState(getWindowSize());
const [open, setOpen] = React.useState(
    windowSize.innerWidth <= 425 ? false : true
  );


  const handleView = (data) => {
    navigate("/view-student", { state: { data } });
  };


  const handleCampusChange = async(value) => {
    setSelectedCampus(value);
    setSelectedYear(null); // Reset selected year when campus changes
  };

  const handlelogout =() =>{
    dispatch(userAction.logout());
  }

  const handleYearChange = async (value) => {
    setSelectedYear(value);
  };
  const handleSchoolname = async (value) => {
    setSelectedname(value);
  };

  const handleTermChange = async (value) => {
    setSelectedTerm(value);
  };
  const handleSectionChange = async (value) => {
    setSelectedSection(value);
  };
  const handleCourseChange = async (value) => {
    setSelectedCourse(value);
  };

  const generateGraduateList = () => {
    // Implement logic to generate graduate list based on selected campus and year
    console.log('Generating graduate list...');
    handlelogout()
  };

  const checkPaymentStatus = () => {
    // Implement logic to check payment status for selected campus
    console.log('Checking payment status...');
  };

  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    position: windowSize.innerWidth <= 425 ? "fixed" : "",
    zIndex: 1000,
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const SiderGenerator = () => {
    const [openKeys, setOpenKeys] = useState([]);
    const Drawer = styled(MuiDrawer, {
        shouldForwardProp: (prop) => prop !== "open",
      })(({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }));

    const items = [
            getItem(
              <a
                // onClick={() => navigate("/department-view")}
                className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
              >
               Payment Status
              </a>,
   
            ),
            getItem(
              <a
                // onClick={() => navigate("/TermList")}
                className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
              >
                Grading System
              </a>,
        
            ),
            getItem(
              <a
                // onClick={() => navigate("/CourseRegistrationPending-view")}
                className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
              >
                View
              </a>,
            
            ),
            getItem(
                <a
                  // onClick={() => navigate("/CourseRegistrationPending-view")}
                  className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
                >
                  Graduate list
                </a>,
             
              ),
              getItem(
                <a
                   onClick={() => handlelogout()}
                  className="text-[#344054] font-[500] font-jakarta text-[16px] text-left mt-5 ml-5"
                >
                  Logout
                </a>,
             
              ),
      ];
    const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      
    };
      const currentURL = window.location.pathname;
      return (
        <Drawer variant="permanent" open={open}>
          {/* <DrawerHeader /> */}
          <div className="mt-6 ml-6 mb-2">
            {open ? (
              <div className="flex flex-row justify-start ml-1">
                <IconButton
                  onClick={handleDrawerClose}
                  sx={{
                    marginRight: 0,
                    marginLeft: 0,
                  }}
                >
                  <Icon
                    name="menu-arrow-outline"
                    fill="#667085"
                    size="large" // small, medium, large, xlarge
                    animation={{
                      type: "pulse", // zoom, pulse, shake, flip
                      hover: true,
                      infinite: false,
                    }}
                  />
                </IconButton>
                <img
                style={{marginLeft:10}}
                  src={("../../../assets/logo1.png")}
                  className="w-[58px] h-[37px] z-1"
                />
              </div>
            ) : (
              <div className="flex flex-row justify-start -ml-2">
                <IconButton
                  color="default"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 0,
                    marginLeft: 0,
                    ...(open && { display: "none" }),
                  }}
                >
                  <Icon
                    name="menu-outline"
                    fill="#667085"
                    size="large" // small, medium, large, xlarge
                    animation={{
                      type: "pulse", // zoom, pulse, shake, flip
                      hover: true,
                      infinite: false,
                    }}
                  />
                </IconButton>
              </div>
            )}
          </div>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
              width: 240,
              marginLeft: 10,
            }}
            items={items}
          />
        </Drawer>
      );
    
  };

  const getFilteredStudentRecords = (campus, year ,term , section) => {
    console.log(campus ,year ,term ,section);
    console.log("test " ,studentRecords[1].filter((student) => student.department == campus && student.acadamicYear == year))
    if (studentRecords[term]) {
    //   setSelectedname(studentRecords[term].filter((student) => student.department == campus && student.acadamicYear == year && student.section == section ));
      return studentRecords[term].filter((student) => student.department == campus && student.acadamicYear == year && student.section == section );
    } else {
      return [];
    }
  };
  
  const [selectedCourse , setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [opens, setOpens] = useState(false);
  const [newGrade, setNewGrade] = useState({
    studentname: selectedname,
    acadamicYear: selectedYear,
    department: selectedCampus,
    term:selectedTerm,
    courses: selectedCourse,
    Grade:"",
  });

  const showModal = () => {
    setOpens(true);
   
  };

  const handleOk = async () => {
          setOpens(false);    
          console.log ("Grade value   ", newGrade)
  };

  const handleCancel = () => {
    setOpens(false);
  };
  const handleSubject = (e) => {
    setNewGrade({ ...newGrade, [e.target.name]: e.target.value });
  };

  const handleGrade = () =>{ 
    return (
     <>
      {opens ? (
        <Modal
          open = {opens}
          title="Add Grade"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Exit
            </Button>,
            <Button key="submit" loading={loading} onClick={handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 30 }}
            layout="horizontal"
          >
              <Form.Item label="Name">        
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: '100%' }}
            placeholder="--Select Acadamic Year of the Student---"
            onChange={handleSchoolname}
          >
            {(getFilteredStudentRecords(selectedCampus ,selectedYear, selectedTerm ,selectedSection))?.map((item, i) => (
              <Option key={item.key} value={item.name} lable={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
              {/* <TextArea name="description" onChange={(e) => handleSubject(e)} /> */}
            </Form.Item>
            <Form.Item label="Department">
            <Input name="department" value={newGrade.department} placeholder= {selectedCampus} />
              {/* <TextArea name="description" onChange={(e) => handleSubject(e)} /> */}
            </Form.Item>
            <Form.Item label="Acadamic Year">
            <Input name="acadamicYear"  value={newGrade.acadamicYear} placeholder= {selectedYear}/>
              {/* <TextArea name="description" onChange={(e) => handleSubject(e)} /> */}
            </Form.Item>
            <Form.Item label="Term">
            <Input name="term" value={newGrade.term} placeholder= {selectedTerm}/>
              {/* <TextArea name="description" onChange={(e) => handleSubject(e)} /> */}
            </Form.Item>
            <Form.Item label="Courses">
            <Input name="courses" value={newGrade.courses} placeholder= {selectedCourse} />
              {/* <TextArea name="description" onChange={(e) => handleSubject(e)} /> */}
            </Form.Item>

            <Form.Item
              label="Grade"
              name="Grade"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="Grade" onChange={(e) => handleSubject(e)} />
            </Form.Item>
          
          </Form>
        </Modal>
      ) : null}
    </>
    );
  }


  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
        {/* <SiderGenerator /> */}
    <div className="list-header mb-2 ml-100">
      <h1 className="text-2xl  font-[600] font-jakarta ml-[20%]">Lecturer Managment System</h1>
    </div>
    <div className="list-sub mb-10 ml-[20%]">
     {handleGrade()}
      <div className="list-filter">
        <Select
          bordered={false}
          className="!rounded-[6px] border-[#EAECF0] border-[2px]"
          placeholder="--Select Department of the Student ---"
          style={{ width: 240 }}
          onChange={handleCampusChange}
        >
          {campuses?.map((item, i) => (
            <Option key={item.id} value={item.name} lable={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
        {selectedCampus && (
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: 220 }}
            placeholder="--Select Acadamic Year of the Student---"
            onChange={handleYearChange}
          >
            {Acadamic?.map((item, i) => (
              <Option key={item.key} value={item.year} lable={item.year}>
                {item.year}
              </Option>
            ))}
          </Select>
          )}

         {selectedCampus && selectedYear && ( 
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: 220 }}
            placeholder="--Select Term of the Student---"
            onChange={handleTermChange}
          >
            {Term?.map((item, i) => (
              <Option key={item.key} value={item.id} lable={item.term}>
                {item.term}
              </Option>
            ))}
          </Select>
          )}

           {selectedCampus && selectedYear && selectedTerm && (
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: 220 }}
            placeholder="--Select Section of the Student---"
            onChange={handleSectionChange}
          >
            {Section?.map((item, i) => (
              <Option key={item.key} value={item.section} lable={item.section}>
                {item.section}
              </Option>
            ))}
          </Select>
          )}
            {selectedCampus && selectedYear && selectedTerm && (
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: 220 }}
            placeholder="--Select Course To Grade---"
            onChange={handleCourseChange}
          >
            {courserecords[selectedTerm]?.map((item, i) => (
              <Option key={item.key} value={item.name} lable={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          )}
          {selectedCampus && selectedYear && selectedTerm && selectedSection && (
             <Button
        style={{
          borderRadius: "8px",
          borderWidth: 1,
        }}
        icon={<FontAwesomeIcon className="pr-2" icon={faAdd} />}
        className=" !text-[white] !bg-[#15C9CE] hover:!text-[white]"
        onClick={showModal}
      >
        Add Grade
      </Button>
        )}
      </div>
 </div>

      <div className='ml-[20%]'>
        {/* Display student records based on selected campus and year */}
        {/* {selectedCampus && selectedYear && ( */}
          <div className="" >
        
          <h2 className="text-xl  font-[600] font-jakarta ">Student Records for {selectedYear} </h2>
            <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => showModal(record), // click row
          };
        }}
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={getFilteredStudentRecords(selectedCampus, selectedYear, selectedTerm ,selectedSection)}
        pagination={{ position: ["bottomCenter"] }}
      />
          </div>
        {/* )} */}
      </div>
    </div> 
  );
};

export default Lecturer;
