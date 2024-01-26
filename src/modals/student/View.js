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
import { firestoreDb } from "../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  startAt,
  orderBy,
} from "firebase/firestore";
import { Select } from "antd";
import PhoneInput from "react-phone-number-input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MailOutlined } from "@ant-design/icons";
import { faEnvelope, faPenAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import Liner from "../../graph/Liner";
import BarGraph from "../../graph/BarGraphStudent";
import { fetchSubject, fetchParents } from "../funcs";
import moment from "moment";
import { Card, Progress } from "antd";
import Grid from "@mui/material/Grid";
import "./style.css";

function ViewStudent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [courses, setCourses] = useState([]);
  const [guardian, setGuardian] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const { data } = state;
  const [age, setAge] = useState();
  const [teacherData, setTeacherData] = useState([data]);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const getClassData = async (id) => {
    const q = query(
      collection(firestoreDb, "courses"),
      where("course_id", "in", id)
    );
    const querySnapshot = await getDocs(q);
    var temporary = [];
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      temporary.push(data);
    });
    var fil = temporary.filter(async function (doc) {
      doc.subject = await fetchSubject(doc.subject);
      return doc;
    });
    console.log("temporary: " + fil);
    setCourses(temporary);
    var guardians = await fetchParents(data.phone);
    setGuardian(guardians);
    setLoadingCourse(false);
  };

  useEffect(() => {
    var today = new Date();
    var birthDate = new Date(JSON.parse(data.DOB));
    var calage = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calage--;
    }
    getClassData(data.class.course);
    setAge(calage);
    getAttendace();
  }, []);

  const getAttendace = async () => {
    var temporary = [];
    data.class.course?.map(async (item, i) => {
      const q = query(
        collection(firestoreDb, "attendanceanddaily", `${item}/attendace`),
        where("studentId", "==", data.key)
      );
      const snap = await getDocs(q);

      snap.forEach((doc) => {
        var data = doc.data();
        data.key = doc.id;
        temporary.push(data);
      });
    });

    setTimeout(() => {
      temporary?.map((item, index) => {
        var month = new Date(item.date).getMonth();
        attendanceData[month].absentDays.push(item.date);
      });
    }, 500);
  };

  const handleUpdate = () => {
    navigate("/update-student", { state: { data } });
  };

  const teacherColumn = [
    {
      title: "Age",
      dataIndex: "DOB",
      key: "DOB",
      width: "20%",
      render: (item) => {
        return <span>{age}</span>;
      },
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      width: "20%",
    },
    {
      title: "",
      dataIndex: "phone",
      key: "phone",

      render: (item) => {
        return <span></span>;
      },
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },

    // {
    //   title: "Location",
    //   dataIndex: "working_since",
    //   key: "working_since",
    //   render: (item) => {
    //     return <span>Lideta</span>;
    //   },
    // },
  ];

  const columns = [
    {
      title: "Guardians",
      dataIndex: "guardian",
      key: "guardian",
      render: (item, index) => {
        return <h1>Guardian </h1>;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (item) => {
        return <div>{item}</div>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
    <div className="-mt-20 h-[100vh] overflow-scroll main scroll-smooth ">
      <div className="flex flex-row justify-between  pt-10">
        <div className="flex flex-row justify-between">
          <div className="rounded-full border-[2px] border-[#E7752B] bg-[white]">
            <img
              className="w-[10vw] h-[7vw] border-[2px] rounded-full"
              src={data.avater ? data.avater : "img-5.jpg"}
              alt="profile"
            />
          </div>
          <div className="flex flex-col justify-center align-baseline mt-2 ml-5 w-[100%] ">
            <div className="flex flex-row">
              <h3 className="text-lg font-bold font-jakarta capitalize">
                {data.first_name + " " + data.last_name}
              </h3>
              <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta  text-[#667085] p-[1px] ml-2">
                ID: {data.studentId}
              </h4>
            </div>
            <a className="border-[0px] border-[#E7752B] font-jakarta items-center rounded-lg flex flex-row  text-[#E7752B] hover:text-[#E7752B] ">
              <MailOutlined className="mr-2" />
              Contacts
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center  align-middle">
          <div className="flex flex-row">
            <h3 className="text-lg font-semibold font-jakarta">Class</h3>
            <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta  text-[#667085] p-[1px] ml-2">
              {data.class?.level + data.class?.section}
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
            <Button
              className="btn-confirm  !text-[#E7752B]"
              onClick={handleUpdate}
            >
              <FontAwesomeIcon
                icon={faPen}
                className="text-[#E7752B] mr-2 hover:text-[#E7752B]"
              />
              Edit
            </Button>
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item xs={12} sm={12} md={4}>
                <Card
                  bordered={true}
                  className="w-[100%] min-h-[419px] h-[100%]"
                  title={
                    <h1 className="text-[#475467] font-[600] mb-[10px]">
                      {" "}
                      Daily Report
                    </h1>
                  }
                >
                  <div className="flex flex-row w-[100%] mt-[25%] flex-wrap justify-around">
                    <div className="flex flex-col items-center  justify-center text-[#98A2B3]">
                      <h1 className="text-[20px] text-[#98A2B3] ">
                        Data Not Available Yet
                      </h1>
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  bordered={true}
                  className="w-[100%] min-h-[419px]"
                  title={
                    <h1 className="text-[#475467] text-lg font-[600] mb-[10px]">
                      Conduct
                    </h1>
                  }
                >
                  <div className="flex flex-row w-[100%] mt-[25%] flex-wrap justify-around">
                    <div className="flex flex-col items-center  justify-center text-[#98A2B3]">
                      <h1 className="text-[20px] text-[#98A2B3] ">
                        Data Not Available Yet
                      </h1>
                    </div>
                  </div>
                  {/* <div>
                    <div>
                      <h1 className="text-[18px] text-[#32D583] font-semibold">
                        Good
                      </h1>
                      <Progress
                        strokeColor={"#32D583"}
                        percent={(100 * 6) / 10}
                        showInfo={false}
                        // success={{
                        //   percent: (100 * 6) / 10,
                        // }}
                      />
                      <h1 className="text-[14px] ">Total</h1>
                    </div>
                  </div>
                  <Liner /> */}
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  bordered={true}
                  className="w-[100%] min-h-[419px]"
                  title={
                    <h1 className="text-[#475467] text-lg font-[600] mb-[10px]">
                      Performance
                    </h1>
                  }
                >
                  <div className="flex flex-row w-[100%] mt-[25%] flex-wrap justify-around">
                    <div className="flex flex-col items-center  justify-center text-[#98A2B3]">
                      <h1 className="text-[20px] text-[#98A2B3] ">
                        Data Not Available Yet
                      </h1>
                    </div>
                  </div>
                  {/* <div>
                    <div>
                      <h1 className="text-[18px] text-[#FDB022] font-semibold">
                        Average
                      </h1>
                      <Progress
                        strokeColor={"#FDB022"}
                        percent={(100 * 10) / 20}
                        showInfo={false}
                      />
                      <h1 className="text-[14px] ">Total</h1>
                    </div>
                  </div>
                  <Liner /> */}
                </Card>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12}>
                <Card bordered={true} className="w-[100%]  ">
                  <BarGraph />
                </Card>
              </Grid> */}
            </Grid>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span className="text-base font-[500] text-center  font-jakarta">
                Profile
              </span>
            }
            key="1"
          >
            <Button
              className="btn-confirm  !text-[#E7752B]"
              onClick={handleUpdate}
            >
              <FontAwesomeIcon
                icon={faPen}
                className="text-[#E7752B] mr-2 hover:text-[#E7752B]"
              />
              Edit
            </Button>
            <div className="flex flex-row justify-between border-[0px] border-[#e5e5e5] text-[#344054]">
              <div className="flex flex-col justify-start align-middle text-[#344054]">
                <span className="text-base text-center text-[#344054] font-jakarta">
                  Grade
                </span>
                <h1 className="text-[48px] text-center text-[#344054] font-bold font-jakarta">
                  {data.class?.level}
                </h1>
              </div>
              <div className="flex flex-col justify-center  align-middle text-[#344054] ">
                <span className="text-base font-jakarta  text-center text-[#344054]">
                  Sibilings
                </span>
                <h1 className="text-[48px] text-[#344054] text-center font-bold font-jakarta ">
                  2
                </h1>
              </div>
              <div className="flex flex-col justify-center  align-middle text-[#344054]">
                <span className="text-base font-jakarta text-center text-[#344054]">
                  Rank
                </span>
                <h1 className="text-[48px] text-[#344054] text-center font-bold font-jakarta">
                  4
                </h1>
              </div>
              <div className="flex flex-col justify-center mr-[40%] align-middle text-[#344054]">
                <span className="text-base font-jakarta text-center text-[#344054]">
                  Conduct
                </span>
                <h1 className="text-[48px] text-[#344054] text-center font-bold font-jakarta">
                  A
                </h1>
              </div>
            </div>
            <h1 className="text-[#344054] font-jakarta text-xl font-bold mt-4 mb-8">
              Student Information
            </h1>

            <Table
              className="mb-10"
              dataSource={teacherData}
              columns={teacherColumn}
              pagination={false}
            />
            <div className="mb-10">
              <h1 className="text-[#344054] font-jakarta text-xl font-bold mb-8">
                Guardian Information
              </h1>
              <Table
                dataSource={guardian}
                columns={columns}
                pagination={{ position: ["bottomCenter"] }}
              />
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span className="text-base text-center font-[500] font-jakarta">
                Attendance{" "}
              </span>
            }
            key="2"
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
        </Tabs>
      </div>
    </div>
  );
}

export default ViewStudent;
