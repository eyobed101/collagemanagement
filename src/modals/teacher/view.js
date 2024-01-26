import React, { useEffect, useState } from "react";
import { Button, Select, Tabs, Table, Tag } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchSubject } from "../funcs";
import Icon from "react-eva-icons";

import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function TeacherView() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = state;
  const [teacherData, setTeacherData] = useState([data]);

  const [weekClass, setWeekClass] = useState();
  const [age, setAge] = useState();
  const [expriance, setExpriance] = useState();

  var getworkTime = data.working_since
    ? new Date(JSON.parse(data?.working_since))
    : "";
  const workTime = data.working_since
    ? getworkTime.getFullYear() +
      "-" +
      getworkTime.getMonth() +
      "-" +
      getworkTime.getDay()
    : null;

  useEffect(() => {
    data?.course.map((item, i) => {
      weekClassSum += item.schedule?.length;
    });
    var today = new Date();
    var birthDate = new Date(JSON.parse(data?.DOB));
    var calage = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calage--;
    }
    if (data?.working_since) {
      var weekClassSum = 0;

      var workDate = new Date(JSON.parse(data?.working_since));
      var calwork = today.getFullYear() - workDate.getFullYear();
      var m = today.getMonth() - workDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < workDate.getDate())) {
        calwork--;
      }
      setExpriance(calwork);
    }
    setWeekClass(weekClassSum);
    setAge(calage);
  }, []);

  const handleUpdate = () => {
    navigate("/update-teacher", { state: { data } });
  };
  const teacherColumn = [
    {
      title: "Age",
      dataIndex: "DOB",
      key: "DOB",
      render: (item) => {
        return <span>{age}</span>;
      },
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Working Since",
      dataIndex: "working_since",
      key: "working_since",
      render: (item) => {
        return <span>{workTime}</span>;
      },
    },
  ];

  const columns = [
    {
      title: "Course",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Subject",
      dataIndex: "course_name",
      key: "course_name",
      render: (item) => {
        if (item) {
          return <div>{item.split(" ")[0]}</div>;
        } else {
          return <div className="text-[#D0D5DD] font-light">No Data</div>;
        }
      },
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      render: (_, item) => {
        if (item) {
          return <div>{item.grade + item.section}</div>;
        } else {
          return <div className="text-[#D0D5DD] font-light">No Data</div>;
        }
      },
    },
  ];

  return (
    <>
      <div className="w-[100%] min-h-[100vh]  -mt-20">
        <div className=" flex flex-row  mb-1 -mt-4 justify-between  py-7 ">
          <div className="flex flex-row  w-[40%] justify-between ">
            <div className="rounded-full border-[2px] border-[#E7752B] bg-[white]">
              <img
                src={data.avater ? data.avater : "img-5.jpg"}
                alt="profile"
                className="w-[8vw] h-[6vw] border-[2px] rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center align-baseline mt-2 ml-5 w-[100%]">
              <div className="flex flex-row">
                <h3 className="text-lg font-bold font-jakarta capitalize">
                  {data.first_name + " " + data.last_name}
                </h3>
              </div>
              <div className="flex flex-row align-bottom">
                <div>
                  <Icon
                    name="message-square-outline"
                    fill="#E7752B"
                    size="large"
                    animation={{
                      type: "pulse",
                      hover: true,
                      infinite: false,
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-md text-[#E7752B] p-1 font-jakarta">
                    Contact
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row justify-end ">
              <h3 className="text-lg font-semibold  font-jakarta text-[#344054]">
                Class
              </h3>
              {/* <div className="flex flex-row">
              <h3 className="font-bold pr-2 border-r-[1px] font-serif">Class</h3> */}
              {data?.class?.level ? (
                <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta  text-[#667085] p-[1px] ml-2 ">
                  {data?.class?.map(
                    (item, i) => item.level + item.section + ","
                  )}
                </h4>
              ) : (
                <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta  text-[#667085] p-[1px] ml-2">
                  {data?.course?.map(
                    (item, i) => item.grade + item.section + ","
                  )}
                </h4>
              )}
            </div>

            <div className="flex flex-row  ">
              <h3 className="text-lg font-semibold font-jakarta text-[#344054]">
                Courses
              </h3>
              {data?.course ? (
                <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta  text-[#667085] p-[1px] ml-2">
                  {data?.course
                    ?.slice(0, 2)
                    .map((item, i) => item.course_name + ",")}
                </h4>
              ) : (
                <Tag>Teacher is not Assigned</Tag>
              )}
            </div>
          </div>
        </div>
        <div className="tab-content">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={
                <span className="text-base font-jakarta text-center ">
                  Profile
                </span>
              }
              key="1"
            >
              <Button
                className="float-right -mt-16 !text-[#E7752B]"
                icon={
                  <FontAwesomeIcon
                    className="pr-2 text-sm text-[#E7752B] bg-[white]"
                    icon={faPen}
                  />
                }
                onClick={handleUpdate}
              >
                Edit
              </Button>
              <div className="flex flex-row justify-between w-[50%] mb-10">
                <div>
                  <h1 className="text-4xl font-bold  font-jakarta mb-4 text-center">
                    7,8
                  </h1>
                  <span className="text-sm font-medium font-jakarta mb-8 text-center ">
                    Assigned Grade
                  </span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold font-jakarta text-center mb-4">
                    {data.course.length}
                  </h1>
                  <span className="text-sm font-medium mb-3 font-jakarta -ml-2  text-center">
                    Courses
                  </span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold font-jakarta  mb-4 text-center">
                    {/* {weekClass} */}1
                  </h1>
                  <span className="text-sm font-medium font-jakarta mb-4">
                    Classes/Week
                  </span>
                </div>
              </div>

              <Table
                dataSource={teacherData}
                columns={teacherColumn}
                pagination={false}
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span className="text-base font-jakarta text-center ">
                  Course
                </span>
              }
              key="2"
            >
              <Button
                color="#E7752B"
                className="float-right -mt-20 !text-[#E7752B]"
                icon={
                  <FontAwesomeIcon
                    className="pr-2 text-sm text-[#E7752B] bg-[white]"
                    icon={faPen}
                  />
                }
                onClick={handleUpdate}
              >
                Edit
              </Button>
              <div className="teacher-course-list">
                <div className="tch-cr-list">
                  <h1 className="text-xl font-bold font-jakarta">
                    Assigned Courses
                  </h1>
                </div>
                <Table
                  dataSource={data.course}
                  columns={columns}
                  pagination={false}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default TeacherView;
