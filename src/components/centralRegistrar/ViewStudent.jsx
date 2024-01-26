import React, { useEffect, useState } from "react";
import {
  Button,
  Tabs,
  Table,
  Tag,
  Calendar,
  Typography,
  DatePicker,
  Badge,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import HtmlCanvas from "./BarChart/htmlCanvas";
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MailOutlined } from "@ant-design/icons";
import { faEnvelope, faPenAlt, faPen } from "@fortawesome/free-solid-svg-icons";
// import Liner from "../../graph/Liner";
// import BarGraph from "../../graph/BarGraphStudent";
import moment from "moment";
import { Card, Progress } from "antd";
import Grid from "@mui/material/Grid";
import "./style.css";
import ChartStaff from "./BarChart/staffGraph/Chart";

function ViewCenterStudent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [guardian, setGuardian] = useState([]);
  const [open, setOpen] = useState(false);
  const { data } = state;


  const columns = [
    {
      title: (
        <p className="font-jakarta font-[600] text-[16px] text-[#344054]">
          Name
        </p>
      ),
      dataIndex: "name",
      key: "name",
      render: (_, text) => <p>{text}</p>,
    },
    {
      title: <p className="font-jakarta  font-[600]">ID</p>,
      key: "id",
      dataIndex: "id",
      render: (value) => {
        return <p>{value}</p>;
      },
    },
    {
      title: <p className="font-jakarta  font-[600]">Grade</p>,
      dataIndex: "cgpa",
      key: "cgpa",
      render: (item) => {
        return <h1>{item}</h1>;
      },
    },
    {
      title: <p className="font-jakarta  font-[600]">Academic Year</p>,
      dataIndex: "acadamicYear",
      key: "acadamicYear",
      render: (item) => {
        return <h1>{item}</h1>;
      },
    },
    {
      title: <p className="font-jakarta  font-[600]">Department</p>,
      dataIndex: "department",
      key: "department",
      render: (item) => {
        return <h1>{item}</h1>;
      },
    },
    {
        title: <p className="font-jakarta  font-[600]">Curriculum</p>,
        dataIndex: "curricula",
        key: "curricula",
        render: (item) => {
          return <h1>{item}</h1>;
        },
      },
  ];


  const getListData = (currentDate, value) => {
    let listData;
    // console.log(value)
    value.forEach((element) => {
      const Dates = new Date(element);

      if (
        Dates.getDate() === currentDate.date() &&
        Dates.getMonth() === currentDate.month()
      ) {
        listData = [
          {
            type: "#eb3131",
            content: Dates.getDate(),
          },
        ];
      }
    });
    return listData || [];
  };

  const dateCellRender = (date, value) => {
    const listData = getListData(date, value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Tag color={item.type}>{item.content}</Tag>
          </li>
        ))}
      </ul>
    );
  };

  const [attendanceData, setAttendanceData] = useState([
    {
      month: "January",
      defaultDate: new Date().getFullYear() + "-1-1",
      absentDays: [],
    },
    {
      month: "February",
      defaultDate: new Date().getFullYear() + "-2-1",
      absentDays: [],
    },
    {
      month: "March",
      defaultDate: new Date().getFullYear() + "-3-1",
      absentDays: [],
    },
    {
      month: "April",
      defaultDate: new Date().getFullYear() + "-4-1",
      absentDays: [],
    },
    {
      month: "May",
      defaultDate: new Date().getFullYear() + "-5-1",
      absentDays: [],
    },
    {
      month: "June",
      defaultDate: new Date().getFullYear() + "-6-1",
      absentDays: [],
    },
    {
      month: "July",
      defaultDate: new Date().getFullYear() + "-7-1",
      absentDays: [],
    },
    {
      month: "Augest",
      defaultDate: new Date().getFullYear() + "-8-1",
      absentDays: [],
    },
    {
      month: "September",
      defaultDate: new Date().getFullYear() + "-9-1",
      absentDays: [],
    },
    {
      month: "October",
      defaultDate: new Date().getFullYear() + "-10-1",
      absentDays: [],
    },
    {
      month: "November",
      defaultDate: new Date().getFullYear() + "-11-1",
      absentDays: [],
    },
    {
      month: "December",
      defaultDate: new Date().getFullYear() + "-12-1",
      absentDays: [],
    },
  ]);

  return (
    <div className="-mt-10  overflow-scroll main scroll-smooth ">
      <div className="flex flex-row justify-between  pt-10">
        <div className="flex flex-row justify-between">
          <div className="rounded-full border-[2px] border-[#15C9CE] ">
            <img
              className="w-[10vw] h-[10vw] border-[2px] rounded-full"
              src={"../../../assets/logo1.png"}
            //   alt="profile"
            />
          </div>
          <div className="flex flex-col justify-center align-baseline mt-2 ml-5 w-[100%] ">
            <div className="flex flex-row">
              <h3 className="text-lg font-bold font-jakarta capitalize">
                {data.name}
              </h3>
              <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta items-center rounded-lg flex flex-row  text-[#15C9CE] hover:text-[#15C9CE] p-[1px] ml-2">
                {/* ID: {data.studentId} */}
                <MailOutlined className="mr-2" />
              Contacts
              </h4>
            </div>
            {/* <a className="border-[0px] border-[#15C9CE] font-jakarta items-center rounded-lg flex flex-row  text-[#15C9CE] hover:text-[#15C9CE] ">
              <MailOutlined className="mr-2" />
              Contacts
            </a> */}
          </div>
        </div>
        <div className="flex flex-col justify-center  align-middle">
          <div className="flex flex-row">
            <h3 className="text-lg font-semibold font-jakarta">Class</h3>
            <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta  text-[#667085] p-[1px] ml-2">
              {data.department}
            </h4>
          </div>
        </div>
      </div>
      <div className="tab-content">
        <Tabs defaultActiveKey="0">
          <Tabs.TabPane
            tab={
              <span className="text-base  text-center font-[500] font-jakarta">
                Overview
              </span>
            }
            key="0"
          >
          <div className="mb-5" >
            <h1 className="text-[20px] text-[#333 ] ">
             Class Conduct
             </h1>
             <h4 className="text-[14px] text-[#98A2B3] ">
                      Attendance and Performance Available through out the year
                </h4>
         </div>
         <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#F9FAFB",
            width: "100%",
          }}
         >
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={12} sm={12} md={3}>
                <Card
                  bordered={true}
                  className="w-[100%] min-h-[419px] h-[100%]"
                  title={
                    <h1 className="text-[#475467] font-[600] mb-[10px]">
                      {" "}
                      Attendance
                    </h1>
                  }
                >
                  <div className="flex flex-row w-[100%] flex-wrap justify-around">
              <div className=" flex flex-col justify-center mt-10">
                <Progress
                  type="circle"
                  strokeColor={"#16f929"}
                  percent={95}
                  trailColor={"#15C9CE"}
                  width={"9rem"}
                />
              </div>
              <div className="flex flex-col justify-center  ">
                <h1 className="!font-jakarta text-[16px] flex flex-row mt-20">
                  {" "}
                  <a className="w-5 mr-2 h-2 mt-2 bg-[#16f929] rounded-lg"></a>
                  124 days present
                </h1>
                <h1 className="!font-jakarta text-[16px] flex flex-row">
                  {" "}
                  <a className="w-5 mr-2 h-2 mt-2 bg-[#15C9CE] rounded-lg"></a>
                  6 days Absent
                </h1>
              </div>
            </div>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={9}>
                <Card
                  bordered={true}
                  className="w-[100%] min-h-[419px]"
                  title={
                    <h1 className="text-[#475467] text-lg font-[600] mb-[10px]">
                      Performance
                    </h1>
                  }
                >
                  <div className="flex py-15 justify-center align-bottom items-center">
                  <div>
            <div className="flex flex-row justify-center align-bottom items-center">
              {/* <div style={{ flexDirection:'row' , flex:1 , justifyContent:'flex-start'}}> */}
                <h1 className="text-base text-[#98A2B3]">Student Performance Eval</h1>
                {/* <FontAwesomeIcon className="pr-2 mb-1 ml-2" icon={faArrowDownLong} /> */}
                {/* //<h1 className="text-[16px] text-[#98A2B3]">{students.length}</h1> */}
            </div>
            <div className="flex flex-row justify-start align-bottom items-center">
            <h1 className="text-xl text-[#98A2B3]">Available Soon</h1>
                </div>
            </div>
            {/* <Liner datas={students} /> */}
            <div className="mt-[19%]">
            <ChartStaff  title="" aspect={2 / 1} />
            </div>
                  </div>
                 
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Card bordered={true} className="w-[100%]  "
                 title={
                  <div>
                  <h1 className="text-[#475467] text-lg font-[600] mb-[10px]">
                    Grade
                  </h1>
                  <h4 className="text-[#475467] text-lg font-[600] mb-[10px]">
                  Average result Based on subjects 
                </h4>
                </div>
                }
                >
                  {/* <BarGraph /> */}
                  <div className="flex flex-row w-[100%] flex-wrap justify-around">
                  <div className="flex flex-row ml-[50%] !justify-end bg-white p-4 ">
                    <div className="flex items-center mr-5">
                      <div
                        className="bg-[#15C9CE] w-[2rem] h-[0.5rem] mr-1"
                        style={{ borderRadius: "10px" }}
                      />
                      <span>Grade</span>
                    </div>
                    <div className="flex items-center mr-5">
                      <div
                        className="bg-[#f5c702] w-[2rem] h-[0.5rem] mr-1"
                        style={{ borderRadius: "10px" }}
                      />
                      <span color="gold">Average</span>
                    </div>
                    <div className="flex items-center mr-5">
                      <div
                        className="bg-[#C2BCF2] w-[2rem] h-[0.5rem] mr-1"
                        style={{ borderRadius: "10px" }}
                      />
                      <span color="lime">Highest</span>
                    </div>
                  </div>
                    <HtmlCanvas/>
                  </div>
                </Card>
              </Grid>
            </Grid>
            </div>
            

          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="text-base text-center font-[500] font-jakarta">
                Attendance{" "}
              </span>
            }
            key="1"
          >
            <div className="st-at">
              <div>
                <div className="flex justify-between mb-4 ">
                  <div className="flex py-4 items-center">
                    <DatePicker
                      picker="year"
                      className="!rounded-[6px] border-[2px]"
                    />
                  </div>
                  <div className="flex flex-row justify-end bg-white p-4 ">
                    <div className="flex items-center mr-5">
                      <div
                        className="bg-[#fc0303] w-[2rem] h-[0.5rem] mr-1"
                        style={{ borderRadius: "10px" }}
                      />
                      <span>Absent</span>
                    </div>
                    <div className="flex items-center mr-5">
                      <div
                        className="bg-[#f5c702] w-[2rem] h-[0.5rem] mr-1"
                        style={{ borderRadius: "10px" }}
                      />
                      <span color="gold">Holydays</span>
                    </div>
                    <div className="flex items-center mr-5">
                      <div
                        className="bg-[#c7c4b7] w-[2rem] h-[0.5rem] mr-1"
                        style={{ borderRadius: "10px" }}
                      />
                      <span color="lime">No Class</span>
                    </div>
                  </div>
                </div>

                <div className="calender-card">
                  {attendanceData?.map((item, index) => (
                    <div key={index} className="site-calendar-card">
                      <Calendar
                        value={moment(item.defaultDate)}
                        headerRender={() => {
                          return (
                            <div style={{ padding: 8, textAlign: "center" }}>
                              <Typography.Title level={4}>
                                {" "}
                                {item.month}
                              </Typography.Title>
                            </div>
                          );
                        }}
                        dateCellRender={(date) =>
                          dateCellRender(date, item.absentDays)
                        }
                        fullscreen={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="text-base font-[500] text-center  font-jakarta">
                Assignment
              </span>
            }
            key="2"
          >
        </Tabs.TabPane>
        <Tabs.TabPane
            tab={
              <span className="text-base font-[500] text-center  font-jakarta">
                Grade
              </span>
            }
            key="3"
          >
        </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default ViewCenterStudent;
