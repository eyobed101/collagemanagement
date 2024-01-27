import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

import {
  Input,
  Button,
  Select,
  message,
  TimePicker,
  Tabs,
  Table,
  Spin,
} from "antd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  where,
  query,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestoreDb, storage } from "../../../firebase";
import moment from "moment";
import {
  removeSingleCourseFromClass,
  addSingleCourseToTeacher,
  addSingleClassToTeacher,
  addSingleClassToCourses,
  removeSingleCourseToTeacher,
  fetchSubject,
  addSingleCourseToClass,
} from "../funcs";

const { Option } = Select;

function UpdateCourse() {
  const { state } = useLocation();
  const { data } = state;
  const navigate = useNavigate();
  const uid = useSelector((state) => state.user.profile);
  const school = useSelector((state) => state.user.profile.school);
  const [input, setInput] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjectData, setSubjectData] = useState();
  const [teachers, setTeachers] = useState([]);
  const [singleClass, setSingleClass] = useState("");
  const [subject, setSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(data.subject?.name);
  const [selectedLevel, setSelectedLevel] = useState(
    data.class ? data.class.level + data.class.section : ""
  );
  const [loading, setLoading] = useState(false);
  const [teacherView, setTeacherView] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [updateCourse, setUpdateCourse] = useState({
    course_name: data.course_name,
    subject: data.subject,
    grade: data.grade,
    section: data.section,
    teachers: data.teachers,
    class: data?.class ? data.class.key : "",
    schedule: data.schedule,
    description: data.description,
    school_id: data.school_id,
  });
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);

    updateCourse.teachers = newSelectedRowKeys;
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
  };

  const days = ["Monday", "Thusday", "Wednsday", "Thursday", "Friday"];

  useEffect(() => {
    var arrayData = [];
    getCourseData();

    setTimeout(() => {
      setLoading(true);
    }, 2000);

    data.teachers?.map((item) => {
      arrayData.push(item.key);
    });
    setSelectedRowKeys(arrayData);
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    updateCourse.course_name = data.subject + " " + data.grade + data.section;
    updateCourse.teachers?.map((item, i) => {
      if (typeof item === "object") {
        updateCourse.teachers[i] = item.key;
      }
    });
    setDoc(
      doc(firestoreDb, "schools", `${school}/courses`, data.key),
      updateCourse,
      { merge: true }
    )
      .then((_) => {
        setLoading(false);
        //add Course To Teacher when updating
        updateCourse.teachers.map((items) => {
          if (!data.teachers.includes(items)) {
            addSingleCourseToTeacher(data.key, items, school);
            if (data.class) {
              addSingleClassToTeacher(updateCourse.class, items, school);
            }
          }
        });
        // if teacher is in data but not in updateCourse then remove it from the teacher
        data.teachers.map((items) => {
          if (!updateCourse.teachers.includes(items)) {
            console.log("removed", data.key, items.key);
            removeSingleCourseToTeacher(data.key, items.key, school);
          }
        });

        removeSingleCourseFromClass(data.class.key, data.key, school);
        // updateCourse?.class.map((item, index) => {
        addSingleCourseToClass(updateCourse.class, data.key, school);
        // });
        message.success("Data is updated successfuly");
        navigate("/list-course");
      })
      .catch((error) => {
        message.error("Data is not updated");
        console.log(error);
      });
  };

  const getCourseData = async () => {
    const children = [];
    const teachersArrary = [];
    const q = query(collection(firestoreDb, "schools", `${school}/class`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      var datas = doc.data();
      children.push({
        ...datas,
        key: doc.id,
      });
    });
    const qTeachers = query(
      collection(firestoreDb, "schools", `${school}/teachers`)
    );
    const queryTeachers = await getDocs(qTeachers);
    queryTeachers.forEach((doc) => {
      var datas = doc.data();
      teachersArrary.push({
        ...datas,
        key: doc.id,
      });
    });
    setClasses(children);
    setTeachers(teachersArrary);
  };

  const getClasstID = async (ID) => {
    const docRef = doc(firestoreDb, "schools", `${school}/class`, ID);
    var data = "";
    await getDoc(docRef).then((response) => {
      data = response.data();
      data.key = response.id;
    });
    return data;
  };
  const setClassesData = async (ID) => {
    const classData = await getClasstID(ID);
    const subject = await fetchSubject(updateCourse.subject);
    setSubjectData(subject);
    setSingleClass(classData);
  };

  useEffect(() => {
    setClassesData(updateCourse.class);
  }, []);

  const handleCourse = (e) => {
    setUpdateCourse({ ...updateCourse, [e.target.name]: e.target.value });
  };

  const handleClass = async (value) => {
    const classData = await getClasstID(value);
    setSelectedLevel(classData.level + classData.section);
    setUpdateCourse({ ...updateCourse, class: value });
  };

  const handleScheduler = (value, i) => {
    updateCourse.schedule[i].day = value;
    console.log(updateCourse);
  };

  const handleSchedulerTime = (value, i) => {
    console.log(value, i);
    const timeValue = [];
    value.map((item, i) => {
      timeValue.push(JSON.stringify(item._d));
    });
    updateCourse.schedule[i].time = timeValue;
  };

  const handleNewScheduler = (value, i) => {
    if (typeof value === "string") {
      updateCourse.schedule[data.schedule.length + i].day = value;
    } else {
      const timeValue = [];
      value.map((item, i) => {
        timeValue.push(JSON.stringify(item._d));
      });
      updateCourse.schedule[data.schedule.length + i].time = timeValue;
    }
  };

  const handleGrade = (e) => {
    setUpdateCourse({ ...updateCourse, grade: e.target.value });
  };
  const handleSection = (e) => {
    setUpdateCourse({ ...updateCourse, section: e.target.value });
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      width: "50%",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      width: "50%",
    },
  ];

  return (
    <>
      {loading ? (
        <div className="bg-[#F9FAFB] min-h-[100vh] py-4">
          <div className="flex flex-row justify-between w-[100%] -mt-20 border-b-[1px] p-">
            <div className="flex flex-row justify-between h-[83px] ">
              <div className="rounded-full  border-[2px] border-[#D0D5DD] mr-10 h-[83px]">
                <img
                  className="w-[78px] h-[78px] rounded-full  bg-[white] "
                  src="logo512.png"
                  alt="profile"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-[600] font-jakarta text-[#1D2939]">
                  {data.course_name}
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-center align-end">
              <div className="flex flex-row justify-end">
                <h3 className="text-lg font-semibold font-jakarta text-[#344054]">
                  Class
                </h3>
                <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta text-[#667085] p-[1px] ml-2">
                  {singleClass.level
                    ? singleClass?.level + singleClass?.section
                    : data.course_name + " " + data.grade + data.section}
                </h4>
              </div>
              <div className="flex flex-row">
                <h3 className="text-lg font-semibold font-jakarta">Subject</h3>
                <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta  text-[#667085] p-[1px] ml-2">
                  {subjectData?.name ? subjectData?.name : data.subject}
                </h4>
              </div>
              <div className="flex flex-row mt-4 pb-4 justify-end ">
                <Button
                  style={{
                    borderRadius: "8px",
                    borderWidth: 1,
                  }}
                  icon={
                    <FontAwesomeIcon
                      className="pl-2"
                      icon={faCheck}
                      pull={"right"}
                      beat
                      style={{ paddingTop: 4 }}
                    />
                  }
                  className=" !text-[white] !bg-[#E7752B] items-center rounded-lg hover:!text-white"
                  onClick={handleUpdate}
                >
                  Finalize Review
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-[32px]">
            <p className="text-xl font-semibold text-[#344054] text-left font-jakarta mb-[12px]">
              Edit Course
            </p>

            <div className="bg-[#FFFFFF] !rounded-[8px] border-[2px] p-[24px]">
              <div className="py-2 flex flex-col justify-around">
                <div className="w-[100%]">
                  <h4 className="text-base font-jakarta text-[#344054] mb-[6px] font-semibold mt-2">
                    Description
                  </h4>
                  <Input.TextArea
                    name="description"
                    className="border-[2px] !rounded-[6px]"
                    rows={6}
                    defaultValue={updateCourse.description}
                    onChange={(e) => handleCourse(e)}
                  />
                </div>
                <div className="flex flex-col mt-[24px]">
                  <span
                    className="text-sm font-jakarta font-[500]"
                    //style={{ fontFamily:'Plus Jakarta Sans', fontWeight:'500',lineHeight:'24px',fontSize:14}}
                  >
                    Subject
                  </span>
                  <Input
                    className="!rounded-[6px] mt-2 border-[2px] border-[#EAECF0]"
                    value={updateCourse.subject}
                    style={{
                      width: "40%",
                    }}
                  />
                </div>
                <div className="flex flex-row w-[40%]">
                  <div className="pb-[6px] pt-[12px] w-[100%]">
                    <h3
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontWeight: "500",
                        lineHeight: "20px",
                        fontSize: 14,
                      }}
                    >
                      Grade
                    </h3>
                    <Input
                      type="number"
                      defaultValue={updateCourse.grade}
                      style={{
                        width: "98%",
                        borderRadius: "8px",
                        borderWidth: 2,
                      }}
                      onChange={handleGrade}
                      placeholder="Grade"
                    />
                  </div>
                  <div className="pb-[6px] pt-[12px] w-[100%]">
                    <h3
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontWeight: "500",
                        lineHeight: "20px",
                        fontSize: 14,
                      }}
                    >
                      Section
                    </h3>
                    <Input
                      defaultValue={updateCourse.section}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        borderWidth: 2,
                      }}
                      onChange={handleSection}
                      placeholder="Grade"
                    />
                  </div>
                </div>
                <div className="w-[40%] mt-[12px]">
                  <div>
                    <span className="text-sm font-jakarta font-[500]">
                      Class
                    </span>
                    <Select
                      bordered={false}
                      className="!rounded-[6px] mt-2 border-[2px] border-[#EAECF0]"
                      style={{
                        width: "100%",
                      }}
                      placeholder="select Classes"
                      onChange={handleClass}
                      optionLabelProp="label"
                      defaultValue={updateCourse.class}
                    >
                      {classes.map((item, index) => (
                        <Option
                          key={item.key}
                          value={item.key}
                          label={item.level + " " + item.section}
                        >
                          {item.level + " " + item.section}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 mb-10">
              <div className="assign-header">
                <h4 className="font-[600] font-jakarta text-[#344054] text-lg">
                  Edit Teachers
                </h4>
              </div>
              {teacherView ? (
                <Table
                  dataSource={teachers}
                  rowSelection={rowSelection}
                  columns={columns}
                  pagination={false}
                />
              ) : (
                <Spin />
              )}
            </div>
            <div className="mb-20 !rounded-[8px] ">
              <h4
                // className="text-xl pt-2"
                className="textbase pt-2 font-jakarta font-semibold text-lg text-[#344054] mb-[24px]"
              >
                Edit Schedule
              </h4>
              <div className="p-6 pb-20  rounded-[8px] bg-[white] border-[2px]">
                <h2 className="text-lg py-2">
                  Class{"  "}
                  {singleClass?.level}
                  {singleClass?.section}
                </h2>
                <div className="flex flex-row justify-between">
                  <div className="border-[0px] w-[100%] py-2 text-left border-[#F2F4F7]">
                    <p className="text-[#344054] font-[600] text-[16px]">
                      {" "}
                      Period
                    </p>
                  </div>
                  <div className="border-t-[0px] border-b-[0px] w-[100%] p-2 text-left border-r-[0px] rounded-none border-[#F2F4F7]">
                    <p className="text-[#344054] font-[600] text-[16px]">
                      {" "}
                      Start time
                    </p>
                  </div>

                  <div className="border-[0px] w-[100%] p-2 text-left rounded-l-none border-l-[0px]  border-[#F2F4F7]">
                    <p className="text-[#344054] font-[600] text-[16px]">
                      {" "}
                      End time
                    </p>
                  </div>
                </div>

                {data.schedule?.map((item, i) => (
                  <div className="border-[#F2F4F7] border-[0px] mt-1 rounded-lg">
                    <Select
                      bordered={false}
                      style={{ width: "30%", marginRight: "3%" }}
                      className="border-[2px] !rounded-lg"
                      placeholder="First Select Days"
                      onChange={(e) => handleScheduler(e, i)}
                      defaultValue={item.day}
                    >
                      {days.map((item, index) => (
                        <Option key={index} value={item} label={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                    <TimePicker.RangePicker
                      style={{ width: "67%" }}
                      className="!rounded-lg !border-[2px]"
                      format={"hh:mm a"}
                      showTime={{ use12Hours: true }}
                      defaultValue={
                        item.time.length
                          ? [
                              moment(JSON.parse(item.time[0])),
                              moment(JSON.parse(item.time[1])),
                            ]
                          : []
                      }
                      onChange={(e) => handleSchedulerTime(e, i)}
                    />
                  </div>
                ))}
                {input.map((item, i) => (
                  <div className="border-[#F2F4F7] border-[0px] mt-1 rounded-lg">
                    <Select
                      bordered={false}
                      style={{ width: "30%", marginRight: "3%" }}
                      className="border-[2px] !rounded-lg"
                      placeholder="First Select Days"
                      onChange={(e) => handleNewScheduler(e, i)}
                    >
                      {days.map((item, index) => (
                        <Option key={index} value={item} label={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                    <TimePicker.RangePicker
                      status="warning"
                      style={{ width: "67%" }}
                      className="!rounded-lg !border-[2px]"
                      format={"hh:mm"}
                      use12Hours
                      onChange={(e) => handleNewScheduler(e, i)}
                    />
                  </div>
                ))}
                <Button
                  style={{
                    float: "right",
                    marginBottom: 10,
                    marginTop: 20,
                    borderRadius: 8,
                    borderWidth: 2,
                  }}
                  onClick={() => {
                    setInput([...input, 0]);
                    setUpdateCourse({
                      ...updateCourse,
                      schedule: [
                        ...updateCourse.schedule,
                        { day: "", time: [] },
                      ],
                    });
                  }}
                >
                  Add New
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex  flex-col justify-center align-middle  min-h-[100vh]">
          <Spin
            tip={<p className="text-lg">Loading Course...</p>}
            className="text-[#E7752B] "
            size="large"
            wrapperClassName="text-[#E7752B]"
          />
        </div>
      )}
    </>
  );
}

export default UpdateCourse;