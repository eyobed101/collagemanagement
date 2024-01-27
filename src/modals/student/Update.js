import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Select, Input, DatePicker, message, Tabs, Table } from "antd";
import moment from "moment";
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
import { fetchParents, fetchClass } from "../funcs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import PhoneInput from "react-phone-number-input";

const { Option } = Select;
const { Search } = Input;

const gender = ["Male", "Female", "Other"];

function UpdateStudents() {
  const valueRef = useRef();
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phone, setPhones] = useState("");
  const [classOption, setClassOption] = useState([]);
  const [file, setFile] = useState("");
  const [courseData, setClassCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const { state } = useLocation();
  const { data } = state;
  const [allPhone, setAllPhone] = useState(data.phone);
  const [selectedRowKeys, setSelectedRowKeys] = useState(data.course);
  const school = useSelector((state) => state.user.profile.school);

  console.log(data);
  const [input, setInputs] = useState(data.phone);
  const [updateStudent, setUpdateStudent] = useState({
    DOB: data.DOB,
    avater: data.avater,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    sex: data.sex,
    class: data.class,
    course: selectedRowKeys,
    className: data.className,
    phone: data.phone,
    studentId: data.studentId,
    school_id: data.school_id,
  });

  const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Object]";
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
  ];

  const handleUpdate = async () => {
    var users;
    if (isObject(updateStudent.class)) {
      users = await getClassID(updateStudent.class.key);
      updateStudent.class = updateStudent.class.key;
    } else {
      users = await getClassID(updateStudent.class);
    }

    setLoading(true);
    if (!file) {
      setDoc(
        doc(firestoreDb, "schools", `${school}/students`, data.key),
        {
          ...updateStudent,
          course: users.course,
          className: users.level + users.section,
        },
        {
          merge: true,
        }
      )
        .then((_) => {
          setLoading(false);
          message.success("Data is updated successfuly");
          navigate("/list-student");
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
        (snapshot) => {
          const percentR = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            valueRef.current = url;
            if (valueRef.current != null) {
              updateStudent.avater = valueRef.current;

              if (updateStudent.avater !== null) {
                setDoc(
                  doc(firestoreDb, "schools", `${school}/students`, data.key),
                  { ...updateStudent, course: users.course },
                  {
                    merge: true,
                  }
                )
                  .then((response) => {
                    setLoading(false);
                    message.success("Data is updated successfuly");
                    navigate("/list-student");
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

  const getClassID = async (ID) => {
    const docRef = doc(firestoreDb, "schools", `${school}/class`, ID);
    var data = "";
    await getDoc(docRef).then((response) => {
      data = response.data();
      data.key = response.id;
    });
    return data;
  };

  const handleGender = (value) => {
    setUpdateStudent({ ...updateStudent, sex: value });
  };

  const handleDob = (value) => {
    setUpdateStudent({ ...updateStudent, DOB: JSON.stringify(value) });
  };

  const onRemove = () => {
    setFile("");
  };

  const setPhone = (e, index) => {
    // allPhone[index] = e.target.value;
    allPhone[index] = e;
    setPhones(e);

    setUpdateStudent({ ...updateStudent, phone: allPhone });
  };

  const onChange = (e) => {
    setUpdateStudent({ ...updateStudent, [e.target.name]: e.target.value });
  };
  const getSubjectData = async (ID) => {
    const docRef = doc(firestoreDb, "subject", ID);
    var data = "";
    await getDoc(docRef).then((response) => {
      data = response.data();
      data.key = response.id;
    });
    return data;
  };
  const getCourses = async (courses) => {
    const children = [];
    const q = query(collection(firestoreDb, "schools", `${school}/courses`));
    const Snapshot = await getDocs(q);
    Snapshot.forEach((doc) => {
      var datas = doc.data();
      children.push({
        ...datas,
        key: doc.id,
      });
    });
    for (var i = 0; i < children.length; i++) {
      children[i] = {
        ...children[i],
        subject: await getSubjectData(children[i].subject),
      };
    }
    var parentsAre = await fetchParents(data.phone);
    setParents(parentsAre);
    setClassCourses(children);
  };
  const getClass = async () => {
    const children = [];

    const q = query(collection(firestoreDb, "schools", `${school}/class`));
    const Snapshot = await getDocs(q);
    Snapshot.forEach((doc) => {
      var datas = doc.data();
      children.push({
        ...datas,
        key: doc.id,
      });
    });
    setClassOption(children);
    getCourses(data.course);
    setCourseLoading(false);
  };

  const handlesection = async (value) => {
    setUpdateStudent({ ...updateStudent, class: value });
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

  useEffect(() => {
    getClass();
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-[100vh] p-2 -mt-14">
      <div className="mb-6 items-center">
        <h1 className="text-[1.5rem] font-jakarta text-[#344054]">
          {" "}
          Edit Student
        </h1>
        <Button
          className=" !bg-[#E7752B] hover:!text-[white] -mt-14 float-right !rounded-[8px] !text-[white]"
          icon={<FontAwesomeIcon className="pr-2" icon={faCheck} />}
          onClick={async () => await handleUpdate()}
        >
          Confirm
        </Button>
      </div>
      <div className="p-6 bg-[#FFF] border-[1px] border-[#D0D5DD] rounded-lg">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div>
              <h3 className="text-[#475467] text-sm font-jakarta  ">
                Student Picture
              </h3>
            </div>
            <div className="rounded-full  border-[#E7752B] bg-[white]">
              <img
                className="w-[8vw] h-[8vw] border-[2px] rounded-full"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : data.avater
                    ? data.avater
                    : "img-5.jpg"
                }
              />
            </div>
          </div>
          <div className="flex flex-col justify-center ml-10">
            <span className="text-[#475467] text-sm font-jakarta justify-center flex items-stretch ">
              This will be displayed to you when you view this profile
            </span>

            <div className="flex flex-row mt-2 ">
              <button className="p-2 bg-[#E7752B] rounded-[8px] text-white mr-4">
                <input
                  type="file"
                  id="browse"
                  name="files"
                  style={{ display: "none" }}
                  onChange={handleFile}
                  accept="/image/*"
                />
                <input type="hidden" id="filename" />
                <input
                  type="button"
                  value="Change Photo"
                  id="fakeBrowse"
                  onClick={HandleBrowseClick}
                />
              </button>
              <button
                className="p-2 border-[#E7752B] border-[1px] rounded-[8px] text-[#E7752B]"
                onClick={onRemove}
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-10">
          <div className="flex flex-col w-[40%] mr-10">
            <div className="">
              <p className="!pb-[6px] font-jakarta">First Name</p>
              <Input
                className="!rounded-[6px] !border-[2px]"
                name="first_name"
                placeholder="Eneter First Name"
                defaultValue={updateStudent.first_name}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div>
              <p className="pb-[6px] mt-[35px] font-jakarta">Class</p>
              <Select
                bordered={false}
                placeholder="Select Class"
                className="!rounded-[6px] !border-[2px]"
                defaultValue={data.class.key}
                onChange={handlesection}
                optionLabelProp="label"
                style={{
                  width: "100%",
                }}
              >
                {classOption.map((item, index) => (
                  <Option
                    key={item.key}
                    value={item.key}
                    label={item.level + item.section}
                  >
                    {item.level + item.section}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <p className="pb-[6px] mt-[35px] font-jakarta">Date of Birth</p>
              <DatePicker
                style={{ width: "100%" }}
                className="!rounded-[6px] !border-[2px]"
                onChange={handleDob}
                defaultValue={
                  updateStudent.DOB ? moment(JSON.parse(updateStudent.DOB)) : ""
                }
              />
            </div>
          </div>
          <div className="flex flex-col w-[40%]  mr-10">
            <div>
              <p className="pb-[6px] font-jakarta">Last Name</p>
              <Input
                name="last_name"
                placeholder="Enter Last Name"
                className="!rounded-[6px] !border-[2px]"
                defaultValue={updateStudent.last_name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <p className="pb-[6px] mt-[35px] font-jakarta">Sex </p>
              <Select
                bordered={false}
                className="!rounded-[6px] !border-[2px]"
                placeholder="Select Gender"
                onChange={handleGender}
                defaultValue={updateStudent.sex}
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
          </div>
          <div className="flex flex-col w-[40%] mr-10">
            <div>
              <label className="py-4">Student Id</label>
              <Input
                name="studentId"
                className="!rounded-[6px] !border-[2px] !mt-4"
                placeholder="Enter Student Id"
                defaultValue={updateStudent.studentId}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <p className="pb-[6px] mt-[35px] font-jakarta">Email</p>
              <Input
                name="email"
                className="!rounded-[6px] !border-[2px]"
                placeholder="Enter Email Address"
                defaultValue={updateStudent.email}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        <h1 className="text-[1.5rem] font-jakarta text-[#344054]">Guardian</h1>
        <div className="p-6 bg-[#FFF] border-[1px] border-[#D0D5DD] rounded-lg">
          {input.map((item, index) => {
            return (
              <div className="mt-5">
                <h1 className="text-lg font-[500]">Guardian {index + 1}</h1>
                <PhoneInput
                  placeholder="Enter Guardian Contact"
                  className="py-1 border-[2px] bg-white px-2 mb-2 mt-6 !rounded-lg"
                  style={{ marginTop: 6, width: "30%" }}
                  value={item}
                  country="ET"
                  onChange={(e) => setPhone(e, index)}
                />
              </div>
            );
          })}
          <Button
            className="!rounded-lg mt-10"
            onClick={() => {
              setInputs([...input, 0]);
              setAllPhone([...allPhone, phone]);
            }}
          >
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateStudents;
