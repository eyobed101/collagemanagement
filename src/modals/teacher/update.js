import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "react-eva-icons";
import {
  Button,
  Select,
  Input,
  DatePicker,
  Tag,
  message,
  Tabs,
  Table,
  Spin,
} from "antd";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  where,
  query,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestoreDb, storage } from "../../../firebase";
import { useSelector } from "react-redux";
import {
  fetchSubject,
  fetchClass,
  fetchclassFromCourse,
  addSingleTeacherToCourse,
} from "../funcs";
import { MailOutlined } from "@ant-design/icons";
import "./style.css";

const { Option } = Select;
const gender = ["Male", "Female", "Other"];

function TeacherUpdate() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = state;

  const valueRef = useRef();
  const [subjects, setSubjects] = useState([]);
  const [classOption, setClassOption] = useState([]);
  const [courseOption, setCourseOption] = useState([]);
  const [subjectloaded, setSubjectLoaded] = useState(false);
  const [file, setFile] = useState("");
  const school = useSelector((state) => state.user.profile.school);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeysCourse, setSelectedRowKeysCourse] = useState([]);
  const [updateTeacher, setUpdateTeacher] = useState({
    avater: data.avater,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    class: data.class,
    course: data.course,
    phone: data.phone,
    DOB: data.DOB,
    sex: data.sex,
    working_since: data.working_since,
    school_id: data.school_id,
  });
  // class object is not updating properly so fix it

  const handleUpdate = () => {
    if (!file) {
      setDoc(
        doc(firestoreDb, "schools", `${school}/teachers`, data.key),
        { ...updateTeacher, course: selectedRowKeysCourse },
        {
          merge: true,
        }
      )
        .then((_) => {
          selectedRowKeysCourse.map((items) => {
            addSingleTeacherToCourse(data.key, items);
          });
          message.success("Data is updated successfuly");
          navigate("/list-teacher");
        })
        .catch((error) => {
          message.error("Data is not updated");
          console.log(error);
        });
    } else {
      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (err) => {
          message.error("Couldnt Upload Image");
          console.log(err); 
        },
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            valueRef.current = url;
            if (valueRef.current != null) {
              updateTeacher.avater = valueRef.current;

              if (updateTeacher.avater !== null) {
                setDoc(
                  doc(firestoreDb, "schools", `${school}/teachers`, data.key),
                  { ...updateTeacher, course: selectedRowKeysCourse },
                  {
                    merge: true,
                  }
                )
                  .then((response) => {
                    message.success("Data is updated successfuly");
                    navigate("/list-teacher");
                  })
                  .catch((error) => {
                    message.error("Data is not updated");
                    console.log(error);
                  });
              }
            }
          });
        }
      );
    }
  };

  const handleChangeTeacher = (e) => {
    setUpdateTeacher({ ...updateTeacher, [e.target.name]: e.target.value });
  };

  const handleGender = (value) => {
    setUpdateTeacher({ ...updateTeacher, sex: value });
  };
  const handleDob = (value) => {
    setUpdateTeacher({ ...updateTeacher, DOB: JSON.stringify(value) });
  };
  const handleWork = (value) => {
    setUpdateTeacher({
      ...updateTeacher,
      working_since: JSON.stringify(value),
    });
  };

  const onRemove = () => {
    setFile("");
  };
  const getClass = async () => {
    const children = [];
    const q = query(collection(firestoreDb, "schools", `${school}/class`));
    const Snapshot = await getDocs(q);
    Snapshot.forEach((doc) => {
      var datas = doc.data();
      datas.key = doc.id;
      children.push(datas);
    });
    setClassOption(children);
  };

  const getCourse = async () => {
    const children = [];

    const q = query(collection(firestoreDb, "schools", `${school}/courses`));
    const Snapshot = await getDocs(q);
    Snapshot.forEach((doc) => {
      var datas = doc.data();
      datas.key = doc.id;
      getData(datas).then((response) => children.push(response));
    });
    var courseId = [];
    data.course.map((course) => {
      courseId.push(course.course_id);
    });
    setSelectedRowKeysCourse(courseId);
    setTimeout(() => {
      getSubjectTeacher();
    }, 3000);
    setCourseOption(children);
    setLoading(false);
  };

  const getID = () => {
    if (data?.class) {
      var classArr = [];
      var courseArr = [];
      data?.class?.map((item) => {
        classArr.push(item.key);
      });
      data?.course?.map((item) => {
        courseArr.push(item.key);
      });
      setUpdateTeacher({ ...updateTeacher, class: classArr });
      setUpdateTeacher({ ...updateTeacher, course: courseArr });
      // setSelectedRowKeysCourse(courseArr);
    }
  };
  const getSubjectTeacher = async () => {
    const coursess = [];
    const q = query(collection(firestoreDb, "schools", `${school}/subject`));
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      var datas = doc.data();
      courseOption.map((item) => {
        if (data.course.includes(item.course_id)) {
          if (item.subject.name == datas.name) {
            console.log(item);
            coursess.push({
              ...datas,
              key: doc.id,
            });
            setSubjectLoaded(true);
          } else {
            setSubjectLoaded(true);
          }
        }
      });
    });
    await setSubjects(coursess);
  };

  const getData = async (data) => {
    data.class = await fetchClass(data.class);
    data.subject = await fetchSubject(data.subject);
    return data;
  };

  const handleFilterSubject = async (value) => {
    if (value) {
      const q = query(
        collection(firestoreDb, "schools", `${school}/courses`),
        where("subject", "==", value)
      );
      var temporary = [];
      const snap = await getDocs(q);
      snap.forEach(async (doc) => {
        var data = doc.data();
        data.key = doc.id;
        getData(data).then((response) => temporary.push(response));
      });
      setTimeout(() => {
        setCourseOption(temporary);
      }, 2000);
    }
  };

  const handleFilterClass = async (value) => {
    if (value) {
      const q = query(
        collection(firestoreDb, "schools", `${school}/courses`),
        where("class", "==", value)
      );
      var temporary = [];
      const snap = await getDocs(q);
      snap.forEach(async (doc) => {
        var data = doc.data();
        data.key = doc.id;
        getData(data).then((response) => temporary.push(response));
      });
      setTimeout(() => {
        setCourseOption(temporary);
      }, 2000);
    }
  };

  function HandleBrowseClick() {
    var fileinput = document.getElementById("browse");
    fileinput.click();
  }

  function handleFile(event) {
    var fileinput = document.getElementById("browse");
    var textinput = document.getElementById("filename");
    textinput.value = fileinput.value;
    setFile(event.target.files[0]);
  }
  const getClassToSet = async (courses) => {
    var temporary = [];
    courses.map(async (item) => {
      var set = await fetchclassFromCourse(item);
      temporary.push(set.class);
    });
    await setUpdateTeacher({
      ...updateTeacher,
      class: temporary,
    });
  };

  const onSelectChange = (course) => {
    setSelectedRowKeysCourse(course);
    getClassToSet(course);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeysCourse,
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
          setSelectedRowKeysCourse(newSelectedRowKeys);
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
          setSelectedRowKeysCourse(newSelectedRowKeys);
        },
      },
    ],
  };

  const columns = [
    {
      title: "Course",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (item) => {
        return <div>{item.name}</div>;
      },
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      render: (item) => {
        return (
          <div>
            {item.level}
            {"   "}
            {item.section}
          </div>
        );
      },
    },
  ];
  const getClassToSetClass = async (courses) => {
    var temporary = [];
    courses.map(async (item) => {
      var set = await fetchclassFromCourse(item.key, school);
      temporary.push(set.class);
    });
    await setUpdateTeacher({
      ...updateTeacher,
      class: temporary,
    });
  };

  useEffect(() => {
    console.log(data);
    getClass();
    getCourse();
    getID();
    getClassToSetClass(data.course);
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]">
      <div className="w-[100%] -mt-20">
        <div className=" flex flex-row  pb-2 -mt-4 justify-between  py-7 ">
          <div className=" flex flex-row  w-[40%] justify-between ">
            <div className="rounded-full border-[2px] border-[#E7752B] bg-[white]">
              <img
                src={data.avater ? data.avater : "img-5.jpg"}
                alt="profile"
                className="w-[8vw] h-[6vw] rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center  mt-2 ml-5 w-[100%]">
              <div className="flex flex-row">
                <h3 className="text-lg font-bold font-jakarta text-[#344054] ">
                  {data.first_name + " " + data.last_name}
                </h3>
              </div>
              <div className="flex flex-row align-bottom text-[#E7752B] items-center">
                <MailOutlined className="mr-2" />
                <h3 className="text-md text-[#E7752B] mb-0 font-jakarta">
                  Contact
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row justify-end">
              <h3 className="text-lg font-[500] font-jakarta text-[#344054] border-r-2 pr-2">
                Class
              </h3>

              {data.class != "" ? (
                <h4
                  className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta text-[#667085] 
                p-[1px] ml-2"
                >
                  {data?.class?.map(
                    (item, i) => item.level + item.section + ","
                  )}
                </h4>
              ) : (
                <a className="ml-2 pt-1">Not Assigned</a>
              )}
            </div>

            <div className="flex flex-row ">
              <h3 className="text-lg font-[500] font-jakarta text-[#344054] border-r-2 pr-2">
                Subjects
              </h3>
              <div>
                <div>
                  {data?.course ? (
                    <h4 className="border-l-[2px] pl-2 text-lg font-[500] font-jakarta text-[#667085] p-[1px] ml-2">
                      {data.course.map((item) => {
                        <h1>{item.subject}</h1>;
                      })}
                    </h4>
                  ) : (
                    <a className="ml-2 pt-1">Not Assigned</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <p className="text-base text-center font-jakarta -mb-2">
                Edit Profile
              </p>
            }
            key="1"
          >
            <Button
              icon={<FontAwesomeIcon className="pr-2" icon={faCheck} />}
              className="!border-[#E7752B] !border-[2px] !text-[#E7752B] hover:shadow-[#E7752B] hover:shadow-sm float-right -mt-20 !rounded-lg"
              onClick={handleUpdate}
            >
              Finalize review
            </Button>

            <h1 className="text-xl font-bold font-jakarta mt-5 text-[#344054] ">
              Edit Profile
            </h1>
            <div className="p-2 border-[1px] rounded-lg bg-[#FFF] ">
              <div className="mt-[32px]">
                <div className="ml-5 flex flex-row">
                  <div>
                    <h2 className="text-[14px] font-[500] font-jakarta text-[#475467] text-center">
                      Teacher Picture
                    </h2>
                    <div className="rounded-full border-[2px] border-[#E7752B] bg-[white] w-[78px]">
                      <img
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : data.avater
                            ? data.avater
                            : "img-5.jpg"
                        }
                        className="rounded-full w-[78px] h-[78px] !p-0"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center ml-3">
                    <span className="font-jakarta text-[12px] mb-2">
                      This will be displayed to you when you view this profile
                    </span>

                    <div className="img-btn">
                      {/* <input type="file" onChange={handleChange} accept="/image/*" /> */}
                      <button className="border-[2px] border-[#E7752B] text-[12px] rounded-lg bg-[#E7752B] text-white">
                        <input
                          type="file"
                          id="browse"
                          name="files"
                          style={{ display: "none" }}
                          onChange={handleFile}
                          accept="/image/*"
                        />
                        <input type="hidden" id="filename" readonly="true" />
                        <input
                          type="button"
                          value="Change Photo"
                          id="fakeBrowse"
                          onClick={HandleBrowseClick}
                        />
                      </button>
                      <button
                        className="border-[2px] border-[#E7752B] text-[12px] rounded-lg text-[#E7752B]"
                        onClick={onRemove}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 pb-20 pl-5 pr-5 pt-10">
                  <div className="py-2">
                    <h1 className="text-[#344054] pb-[6px] font-jakarta">
                      First Name
                    </h1>
                    <Input
                      className="!border-[2px] !rounded-lg border-solid"
                      defaultValue={updateTeacher.first_name}
                      name="first_name"
                      onChange={(e) => handleChangeTeacher(e)}
                    />
                  </div>
                  <div className="py-2">
                    <h1 className="text-[#344054] pb-[6px] font-jakarta">
                      Last Name
                    </h1>
                    <Input
                      className="!border-[2px] !rounded-lg border-solid"
                      defaultValue={updateTeacher.last_name}
                      name="last_name"
                      onChange={(e) => handleChangeTeacher(e)}
                    />
                  </div>
                  <div className="py-2">
                    <h1 className="text-[#344054] pb-[6px] font-jakarta">
                      Phone
                    </h1>
                    <Input
                      className="!border-[2px] !rounded-lg border-solid"
                      defaultValue={updateTeacher.phone}
                      name="phone"
                      onChange={(e) => handleChangeTeacher(e)}
                    />
                  </div>
                  <div className="py-2">
                    <h1 className="text-[#344054] pb-[6px] font-jakarta">
                      Email
                    </h1>
                    <Input
                      className="!border-[2px] !rounded-lg border-solid"
                      defaultValue={updateTeacher.email}
                      name="email"
                      onChange={(e) => handleChangeTeacher(e)}
                    />
                  </div>
                  <div>
                    <h1 className="text-[#344054]  font-jakarta">
                      Date Of Birth
                    </h1>
                    <DatePicker
                      className="!border-[2px] !rounded-lg border-solid"
                      style={{ width: "100%" }}
                      onChange={handleDob}
                      defaultValue={
                        updateTeacher.DOB
                          ? moment(JSON.parse(updateTeacher.DOB))
                          : ""
                      }
                    />
                  </div>
                  <div className="-mt-2">
                    <h1 className="text-[#344054] pb-[6px] font-jakarta">
                      Sex
                    </h1>
                    <Select
                      bordered={false}
                      className="!border-[2px]  !rounded-lg border-solid"
                      defaultValue={updateTeacher.sex}
                      placeholder="Select Gender"
                      onChange={handleGender}
                      optionLabelProp="label"
                      style={{
                        width: "100%",
                      }}
                    >
                      {gender.map((item, index) => (
                        <Option key={item.index} value={item} label={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="-mt-2">
                    <h1 className="text-[#344054] pb-[6px] font-jakarta">
                      Working Since
                    </h1>

                    <DatePicker
                      className=" w-[100%]  !rounded-lg border-solid !border-[2px]"
                      onChange={handleWork}
                      defaultValue={
                        updateTeacher.working_since
                          ? moment(JSON.parse(updateTeacher.working_since))
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <p className="text-base  text-center font-jakarta -mb-2 ">
                Edit Course
              </p>
            }
            key="2"
          >
            <Button
              icon={<FontAwesomeIcon className="pr-2" icon={faCheck} />}
              className="!border-[#E7752B] !border-[2px] !text-[#E7752B] hover:shadow-[#E7752B] hover:shadow-sm float-right -mt-20 !rounded-lg"
              onClick={handleUpdate}
            >
              Finalize review
            </Button>

            <div>
              <div>
                <h1 className="text-xl font-bold font-jakarta mt-5 text-[#344054]">
                  Assigned Courses
                </h1>
                <div className="tch-cr-list">
                  <div>
                    <Select
                      placeholder={"Subject"}
                      onChange={handleFilterSubject}
                    >
                      {subject?.map((item, i) => (
                        <Option key={item.key} value={item.key}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                    <Select placeholder={"Class"} onChange={handleFilterClass}>
                      {classOption?.map((item, i) => (
                        <Option key={item.key} value={item.key}>
                          {item.level + item.section}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Input
                      style={{ width: 200 }}
                      className="mr-3 rounded-lg"
                      placeholder="Search"
                      prefix={
                        <SearchOutlined className="site-form-item-icon" />
                      }
                    />
                  </div>
                </div>
                <Table
                  loading={loading}
                  rowSelection={rowSelection}
                  dataSource={courseOption}
                  columns={columns}
                  pagination={{ position: ["bottomCenter"] }}
                />
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default TeacherUpdate;
