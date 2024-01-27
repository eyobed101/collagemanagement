import React, { useEffect, useState } from "react";
import { Button, Select, Table, Input, DatePicker, Tag } from "antd";
import { useLocation } from "react-router-dom";
import { firestoreDb } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { SearchOutlined } from "@ant-design/icons";

function AttendanceView() {
  const { state } = useLocation();
  const { data } = state;
  const [Students, setStudents] = useState(data.class.student);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Students?.map(async (item, index) => {
      if (item.key) {
        Students[index].attendace = await getAttendace(item.key);
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getAttendace = async (ID) => {
    const q = query(
      collection(firestoreDb, "attendanceanddaily", `${data.key}/attendace`),
      where("studentId", "==", ID)
    );
    var temporary = [];

    const snap = await getDocs(q);
    snap.forEach((doc) => {
      var data = doc.data();
      data.key = doc.id;
      temporary.push(data);
    });
    return temporary;
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "class",
      key: "name",
      render: (_, record) => (
        <p>{record.first_name + " " + record.last_name}</p>
      ),
    },
    {
      title: "Id",
      dataIndex: "studentId",
      key: "studentId",
      render: (item, record) => {
        return <p>{item}</p>;
      },
    },

    {
      title: "Sex",
      dataIndex: "class",
      key: "name",
      render: (_, record) => (
        <p>{record.sex}</p>
      ),
    },

    {
      title: "Days Absent",
      dataIndex: "attendance",
      key: "attendance",
      render: (_, record) => (
        <a>
          {record.attendace ? record.attendace.length : 0}
        </a>
      ),
    },
  ];

  const getAttendaceFilter = async (date, ID) => {
    const q = query(
      collection(firestoreDb, "attendanceanddaily", `${data.key}/attendace`),
      where("date", "==", date),
      where("studentId", "==", ID)
    );
    var temporary = [];

    const snap = await getDocs(q);
    snap.forEach((doc) => {
      var data = doc.data();
      data.key = doc.id;
      temporary.push(data);
    });
    return temporary;
  };

  const onFilter = (value) => {
    setLoading(true);

    const date = value.date() < 10 ? "0" + value.date() : value.date();
    const month =
      value.month() + 1 < 10 ? "0" + (value.month() + 1) : value.month() + 1;
    const year = value.year();

    const filterDate = year + "-" + month + "-" + date;

    Students.map(async (item, index) => {
      Students[index].attendace = await getAttendaceFilter(
        filterDate,
        item.key
      );
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <div className="bg-[#F9FAFB] h-[100vh] px-8 -mt-14" >

        <h1 className="view-header">
          Attendance {data.class.level + data.class.section}
        </h1>
        <div className="list-header mb-5" />
        <div className="at-filters">
          <div>
            <DatePicker onChange={onFilter} placeholder={"Selecet Date"} />
          </div>
          <div>
            <Input
              style={{ width: 200 }}
              className="mr-3 rounded-lg"
              placeholder="Search"
              prefix={<SearchOutlined className="site-form-item-icon" />}
            />
          </div>
        </div>
        <div>
          <Table loading={loading} dataSource={Students} columns={columns} />
        </div>
      </div>
    </>
  );
}

export default AttendanceView;
