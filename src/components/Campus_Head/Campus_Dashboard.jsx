import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Progress, Select } from "antd";
import { DatePicker, Space } from "antd";

import Grid from "@mui/material/Grid";
//  import { firestoreDb } from "../../firebase";
import { Button } from "antd";
import ChartStudent from "../../graph/studentGraph/Chart";
import ChartStaff from "../../graph/staffGraph/Chart";
import ChartTeacher from "../../graph/teacherGraph/Chart";

// import { userAction } from "../../redux/user";
// import { async } from "@firebase/util";
import "../../modals/attendance/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
// import Icon from 'react-eva-icons'
import CampusHome from "./CampusHome";
// import "../../Auth/stylle.css"
//  import Select ,{components} from 'react-select'

//  const { Option } = Select;

const { RangePicker } = DatePicker;
export default function CampusDash() {
  const page = React.useRef();

  //   const [students, setStudents] = useState([]);
  var datas = [
    { name: "Sept", Total: 0, totalday: "2", howmuch: 0 },
    { name: "Oct", Total: 0, totalday: "3", howmuch: 0 },
    { name: "Nov", Total: 0, totalday: "19", howmuch: 0 },
    { name: "Dec", Total: 0, totalday: "23", howmuch: 0 },
    { name: "Jan", Total: 0, totalday: "12", howmuch: 0 },
    { name: "Feb", Total: 0, totalday: "21", howmuch: 0 },
    { name: "Mar  ", Total: 0, totalday: "16", howmuch: 0 },
    { name: "Apr", Total: 0, totalday: "6", howmuch: 0 },
    { name: "May", Total: 0, totalday: "28", howmuch: 0 },
    { name: "June", Total: 0, totalday: "13", howmuch: 0 },
    { name: "July", Total: 0, totalday: "17", howmuch: 0 },
    { name: "Aug", Total: 0, totalday: "14", howmuch: 0 },
  ];

  var datasteach = [
    { name: "Sept", Total: 0, pages: "Sep", howmuch: 0, totalday: 12 },
    { name: "Oct", Total: 0, pages: "", howmuch: 0, totalday: 17 },
    { name: "Nov", Total: 0, pages: "", howmuch: 0, totalday: 9 },
    { name: "Dec", Total: 0, pages: "", howmuch: 0, totalday: 21 },
    { name: "Jan", Total: 0, pages: "", howmuch: 0, totalday: 5 },
    { name: "Feb", Total: 0, pages: "", howmuch: 0, totalday: 7 },
    { name: "Mar  ", Total: 0, pages: "", howmuch: 0, totalday: 13 },
    { name: "Apr", Total: 0, pages: "", howmuch: 0, totalday: 14 },
    { name: "May", Total: 0, pages: "", howmuch: 0, totalday: 25 },
    { name: "June", Total: 0, pages: "", howmuch: 0, totalday: 11 },
    { name: "July", Total: 0, pages: "", howmuch: 0, totalday: 6 },
    { name: "Aug", Total: 0, pages: "Aug", howmuch: 0, totalday: 2 },
  ];

  const [Filters, setFilter] = useState("");
  var filtersrange = "Daily";
  var filtergen = "All Gender";
  const [datavalue, setDatavalue] = useState([]);
  const [teachvalue, setTeachvalue] = useState([]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  // const [isDaily , setIsDaily] = useState("none");
  const [Daily, setDaily] = useState("");
  const [isWeekly, setIsWeekly] = useState("");
  const [isMonthly, setIsMonthly] = useState("");
  const [isAnually, setIsAnually] = useState("");
  const [DailyTeach, setDailyTeach] = useState("");
  const [isWeeklyTeach, setIsWeeklyTeach] = useState("");
  const [isMonthlyTeach, setIsMonthlyTeach] = useState("");
  const [isAnuallyTeach, setIsAnuallyTeach] = useState("");
  const [isMale, setIsMale] = useState("none");
  const [isFemale, setIsFemale] = useState("none");
  const [isAll, setIsAll] = useState("none");
  const [malegender, setmalegender] = useState("");
  const [femalegender, setFemalegender] = useState("");
  const [Allgender, setAllgender] = useState("");
  const [FilterGender, setFilterGender] = useState("");
  const [male, setMale] = useState([]);
  const [female, setfemale] = useState([]);
  const [teachermale, setmaleteacher] = useState([]);
  const [teacherfemale, setfemailteacher] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [studentAttendance, setstudentAttendance] = useState([]);
  const [attendStudents, setAttendStudents] = useState();
  // const school = useSelector((state) => state.user.profile.school);
  const [classes, setClasses] = useState([]);

  var isDaily = "white";
  var Student = [];
  const stud = [];
  const value = new Date();
  const date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
  const month =
    value.getMonth() + 1 < 10
      ? "0" + (value.getMonth() + 1)
      : value.getMonth() + 1;
  const year = value.getFullYear();

  const filterDate = year + "-" + month + "-" + date;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthsnames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var rangtimes = undefined;

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
            {/* <Icon name = "checkmark-outline" 
      fill={isDaily}
      size="medium"
      /> */}
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
            {/* <Icon name = "checkmark-outline" 
      fill={isDaily}
      size="medium"
      /> */}
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
            {/* <Icon name = "checkmark-outline" 
       fill={isDaily}
      size="medium"
      /> */}
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
            {/* <Icon name = "checkmark-outline" 
       fill={"#15C9CE"}
      size="medium"
      /> */}
          </div>
          <span style={{ marginLeft: 10 }}>Annually</span>
        </div>
      ),
      value: "Annually",
    },
  ];

  const studentss = [
    {
      id: 1,
      label: (
        <div style={{ display: "flex" }}>
          <span>Campus </span>
        </div>
      ),
      value: "Student Attendance",
    },
    {
      id: 2,
      label: (
        <div style={{ display: "flex" }}>
          <span>Student Attendances</span>
        </div>
      ),
      value: "Student Attendances",
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
            {/* <Icon name = "checkmark-outline" 
         fill={"DC5FC9"}
        size="medium"
        /> */}
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
            {/* <Icon name = "checkmark-outline"
         fill={"DC5FC9"}
        size="medium"
        /> */}
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
            {/* <Icon name = "checkmark-outline" 
        fill={"#15C9CE"}
        size="medium"
        /> */}
          </div>
          <span style={{ marginLeft: 10 }}>All Genders</span>
        </div>
      ),
      value: "All Genders",
      icon: "arrow-ios-downward-outline",
    },
  ];

  const handleselect = ({ item }) => {
    return (
      <div className="flex items-center">
        <div className="w-3 h-3 mr-1 text-wtf-majorelle">
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full stroke-current fill-transparent"
          >
            <path
              d="M17.335 8.333 10 15.667l-3.333-3.334"
              stroke="#7047EB"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-strokeLinejoin="round"
            ></path>
          </svg>
          <span className="text-wtf-majorelle font-medium">{item}</span>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#FFF",
        width: "100%",
      }}
      className="mb-8 flex bg-white p-5 rounded-md"
    >
      <p className="!font-jakarta text-left text-[#000000] text-[20px] font-bold align-middle  mb-8 ml-5">
        Campus Head Dashboard
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
                primary25: "#FFF",
                primary: "#FFF",
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
              <h1 className="text-3xl text-[#344054] ">Registered Users</h1>
              <h4 className="text-base text-[#0B1354]">/ {attendStudents} </h4>
              <FontAwesomeIcon
                className="pr-2  mb-2 ml-5 text-[#0ceb20]"
                icon={faArrowUp}
              />
              <h4 className="text-sm text-[#0ceb20]" style={{ marginLeft: -4 }}>
                20 %
              </h4>
            </div>
            <h4 className="text-base text-[#344054] font-normal mb-5">
              Students that has been registered for the past year
            </h4>
            <div className="flex">
              <ChartStudent title="" aspect={4 / 1} datas={datavalue} />
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Card bordered={false} className="w-[100%] min-h-[419px]">
            <div>
              <CampusHome />
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
