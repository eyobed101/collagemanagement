import React, { useState } from "react";
import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Tag,
  Space,
  DatePicker,
  Popconfirm,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import { api } from "../constants";
import axiosInstance from "@/configs/axios";

const { Option } = Select;

const DepartmentCourse = () => {
  const dispatch = useDispatch();
  // Sample data for students, courses, lectures, and grades

  const [form] = Form.useForm();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [assgtDate, setAssigtDate] = useState("");
  const [termOptions, setTermOptions] = useState("");

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [modifiedSubjectData, setModifiedSubjectData] = useState({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 100000);
  };

  const handleEdit = () => {
    const valuesis = form.getFieldsValue();

    form.validateFields().then(async (values) => {
      console.log("Values from form:", values);
      const updatedDataSource = lecturesData.map((record) => {
        if (record.empId === values.empId) {
          return { ...record, ...values };
        }
        return record;
      });

      console.log("test ", valuesis);
      console.log("Form Edit :", updatedDataSource);

      try {
        // Make a POST request to the API endpoint
        const postData = {
          courseNo: valuesis.courseNo,
          empId: valuesis.empId,
          sectionId: valuesis.sectionId,
          termId: valuesis.termId,
          assgtDate: assgtDate
            ? moment(assgtDate).format("YYYY-MM-DD")
            : moment(valuesis.assgtDate).format("YYYY-MM-DD"),
        };

        console.log("Response iss", postData, valuesis.courseNo);
        const response = await axiosInstance.put(
          `/api/InstCourseAssgts`,
          postData
        );
        console.log("Put request successful:", response.data);
      } catch (error) {
        console.error("POST request failed:", error);
      }
    });

    form.resetFields();
    setVisible(false);
  };

  const onChange = (date, dateString) => {
    // Update the state or form values
    console.log("onChange is ", dateString);
    setAssigtDate(dateString);
  };

  const handleCancel = () => {
    setIsModalVisible1(false);
    setEditingKey(null);
    form.resetFields();
  };

  const cancelEditing = () => {
    setEditingKey("");
  };

  const handleDelete = async (record) => {
    console.log("delete", record);
    const postData = {
      courseNo: record.courseNo,
      empId: record.empId,
      sectionId: record.sectionId,
      termId: record.termId,
      assgtDate: moment(record.assgtDate).format("YYYY-MM-DD"),
    };
    console.log("delete", postData);
    const response = await axiosInstance.delete(
      `/api/InstCourseAssgts`,
      postData
    );
    console.log("Delete request successful:", response.data);

    const newData = dataSource.filter((item) => item.key !== record.key);
    setLecturesData(newData);
  };

  //   const generateStudentsData = () => {
  //     const studentsData = [];
  //     academicYears.forEach((year) => {
  //       terms.forEach((term) => {
  //         sections.forEach((section) => {
  //           studentsData.push({ id: generateUniqueId(), academicYear: year, term, section });
  //         });
  //       });
  //     });
  //     return studentsData;
  //   };

  //   const generateCoursesData = () => {
  //     const coursesData = [];
  //     academicYears.forEach((year) => {
  //         terms.forEach((term) => {
  //         coursesData.push({ name: 'Math', academicYear: year, term});
  //         coursesData.push({ name: 'Science', academicYear: year , term });
  //         coursesData.push({ name: 'Physics', academicYear: year, term });
  //         coursesData.push({ name: 'Hebrew', academicYear: year, term});

  //         // Add more course data as needed
  //     });
  // });
  //     return coursesData;
  //   };

  // const generateLecturesData = () => {
  //   const lecturesData = [];
  //   academicYears.forEach((year) => {
  //     terms.forEach((term) => {
  //       sections.forEach((section) => {
  //         lecturesData.push({
  //           lectureName: 'Jon',
  //           courseName: 'Math',
  //           section,
  //           academicYear: year,
  //           term,
  //         });
  //         lecturesData.push({
  //           lectureName: 'Abel',
  //           courseName: 'Science',
  //           section,
  //           academicYear: year,
  //           term,
  //         });
  //         lecturesData.push({
  //           lectureName: 'Ayele',
  //           courseName: 'Physics',
  //           section,
  //           academicYear: year,
  //           term,
  //         });
  //         lecturesData.push({
  //           lectureName: 'Tomas',
  //           courseName: 'Hebrew',
  //           section,
  //           academicYear: year,
  //           term,
  //         });
  //       });
  //     });
  //   });
  //   return lecturesData;
  // };

  // const getRandomGrade = () => {
  //   const grades = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
  //   return grades[Math.floor(Math.random() * grades.length)];
  // };

  // const generateGradesData = () => {
  //   const gradesData = [];
  //   academicYears.forEach((year) => {
  //     terms.forEach((term) => {
  //       sections.forEach((section) => {
  //         studentsData.forEach((student) => {
  //           // Adjust the filtering conditions based on your data structure
  //           const filteredLectures = lecturesData.filter(
  //             (lecture) =>
  //               lecture.academicYear === year &&
  //               lecture.term === term &&
  //               lecture.section === section
  //           );

  //           filteredLectures.forEach((lecture) => {
  //             gradesData.push({
  //               lectureName: lecture.lectureName,
  //               courseName: lecture.courseName,
  //               grade: getRandomGrade(),
  //               studentId: student.id,
  //               academicYear: year,
  //               term,
  //               section,
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  //   return gradesData;
  // };

  const [studentsData, setStudentsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [lecturesData, setLecturesData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [termData, setTermData] = useState([]);

  const [gradesData, setGradesData] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const lectureResponse = await axiosInstance.get(
          `/api/InstCourseAssgts`
        );
        setLecturesData(lectureResponse.data);

        const courseResponse = await axiosInstance.get(`/api/SecCourseAssgts`); // Replace with your course API endpoint
        setCoursesData(courseResponse.data);

        // const sectionResponse = await axios.get(`${api}/api/Section`); // Replace with your course API endpoint
        // setSectionData(sectionResponse.data);

        // const Response = await axios.get(`${api}/api/Employees`); // Replace with your course API endpoint
        // setStudentsData(Response.data);

        // const Responses = await axios.get(`${api}/api/Terms`); // Replace with your course API endpoint
        // setTermData(Responses.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTerms = async () => {
      try {
        const response = await axiosInstance.get(`/api/Terms`);
        const currentTerms = response.data.filter(
          (term) => new Date(term.endDate) > Date.now()
        );
        setTermOptions(currentTerms);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };

    fetchTerms();

    setGradesData([]);
    fetchData();
  }, []);
  React.useEffect(() => {
    console.log("gradesData:", gradesData);
  }, [gradesData]);

  const showModal = () => {
    // Implement your logic to fetch and set grade data based on the selected student
    // For demonstration, using a simple filtering logic here
    // console.log("test   ",record)
    setIsModalVisible1(true);
  };

  const handleOk = async () => {
    const values = form.getFieldsValue();

    // Log the values to the console
    console.log("Form values:", values);
    try {
      // Make a POST request to the API endpoint
      const postData = {
        courseNo: values.courseNo,
        empId: values.empId,
        sectionId: values.sectionId,
        termId: values.termId,
        assgtDate: assgtDate
          ? moment(assgtDate).format("YYYY-MM-DD")
          : moment(values.assgtDate).format("YYYY-MM-DD"),
      };
      console.log("Response iss", postData);
      const response = await axiosInstance.post(
        `/api/InstCourseAssgts`,
        postData
      );
      console.log("POST request successful:", response.data);
      //  setDataSource(response.data)

      setIsModalVisible1(false);
      form.resetFields();

      // You can handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("POST request failed:", error);
    }
    setIsModalVisible1(false);
  };

  const columns = [
    { title: "Lecture  Name", dataIndex: "empId", editable: true },
    { title: "Course  Name", dataIndex: "courseNo", editable: true },
    {
      title: "Assignment Date",
      dataIndex: "assgtDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
      editable: true,
    },
    { title: "Term", dataIndex: "termId", editable: true },
    { title: "Section", dataIndex: "sectionId", editable: true },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="primary"
              size="small"
              onClick={() => save(record.key)}
              style={{ marginRight: 8, color: "#4279A6" }}
            >
              Save
            </Button>
            <Button size="small" onClick={cancelEditing}>
              Cancel
            </Button>
          </span>
        ) : (
          <span>
            <Button
              type="link"
              size="small"
              onClick={() => edit(record)}
              style={{ marginRight: 8, color: "#4279A6" }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
              onConfirm={() => handleDelete(record)}
            >
              <Button
                type="link"
                danger
                size="small"
                style={{ marginRight: 8, color: "red" }}
              >
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const edit = (record) => {
    console.log("edit ", record);
    const assgtDate = moment(record.assgtDate, "YYYY-MM-DD");

    form.setFieldsValue({
      ...record,
      assgtDate: assgtDate,
    });
    // form.setFieldsValue(record);
    setEditingKey(record.empId);
    // handleOk();
    setIsModalVisible1(true); // Open the modal for editing
  };

  const save = (key) => {
    form.validateFields().then(async (values) => {
      const newData = [...lecturesData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData[index] = {
          ...newData[index],
          ...values,
          assgtDate: moment(values.assgtDate),
          // resultDate: moment(values.resultDate),
        };
        const response = await axiosInstance.put(
          `/api/InstCourseAssgts`,
          newData
        );
        console.log("Put request successful:", response.data);
        setDataSource(newData);
        setEditingKey("");
      }
    });
  };

  // const gradeColumns = [
  //   // { title: 'Lecture Name', dataIndex: 'lectureName', key: 'lectureName' },
  //   { title: 'Course Name', dataIndex: 'name', key: 'name' },
  //   { title: 'Acadamic Year', dataIndex: 'academicYear', key: 'academicYear' },
  //   { title: 'Term', dataIndex: 'term', key: 'term' },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (text, record) => (
  //       <>
  //         <Button type="link" onClick={() => handleEditUser(record)}>
  //           Edit
  //         </Button>
  //         <Button type="link" onClick={() => handleDeleteUser(record)}>
  //           Delete
  //         </Button>
  //       </>
  //     ),
  //   },
  // ];

  const handleModalOk = () => {
    // Handle your logic to update the user data
    // For demonstration purposes, I'm updating the data in state
    const updatedData = filteredCourse.map((user) =>
      user.key === selectedSubject.key
        ? { ...user, ...modifiedSubjectData }
        : user
    );
    setFilteredCourse(updatedData);
    setIsModalVisible1(false);
    setSelectedSubject(null);
    setModifiedSubjectData({});
  };

  const handleModalCancel = () => {
    setIsModalVisible1(false);
    setSelectedSubject(null);
    setModifiedSubjectData({});
  };

  const handleDeleteModalOk = () => {
    // Handle your logic to delete the user data
    // For demonstration purposes, I'm updating the data in state
    const updatedData = filteredCourse.filter(
      (user) => user.key !== selectedSubject.key
    );
    setFilteredCourse(updatedData);
    setIsDeleteModalVisible(false);
    setSelectedSubject(null);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedSubject(null);
  };

  const handleYearChange = (year) => {
    // setIsModalVisible(false);
    setSelectedYear(year);
  };
  const handleTermChange = (term) => {
    // setIsModalVisible(false);
    setSelectedTerm(term);
  };
  const handleSectionChange = (section) => {
    // setIsModalVisible(false);
    setSelectedSection(section);
  };

  // const getFilteredStudentRecords = ( year ,term , section) => {
  //   console.log(year ,term ,section);
  //    console.log("test is filter" , lecturesData.filter(
  //       (grade) =>
  //         grade.academicYear === year &&
  //         grade.term === term &&
  //         grade.section === section
  //     ))
  //   if (year , term , section)  {
  //   //   setSelectedname(studentRecords[term].filter((student) => student.department == campus && student.acadamicYear == year && student.section == section ));
  //     return lecturesData.filter(
  //       (grade) =>
  //         grade.academicYear === year &&
  //         grade.term === term &&
  //         grade.section === section
  //     );
  //   }
  //   else if (year , term ){
  //       return lecturesData.filter(
  //           (grade) =>
  //             grade.academicYear === year &&
  //             grade.term === term
  //         );
  //   }
  //   else if (year ){
  //       return lecturesData.filter(
  //           (grade) =>
  //             grade.academicYear === year
  //         );
  //   }

  //   else {
  //     return lecturesData;
  //   }
  // };

  const onFinish = () => {
    console.log("onFinish");
  };

  const handleCourseChange = (value) => {
    const selectedCourse = coursesData.find(
      (course) => course.courseNo === value
    );
    if (selectedCourse) {
      form.setFieldsValue({
        termId: selectedCourse.termId,
        sectionId: selectedCourse.sectionId,
      });
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-6 bg-white p-5 rounded-md">
      <Button
        type="primary"
        onClick={showModal}
        style={{ fontWeight:"bold", backgroundColor: '#4279A6', padding: '12px 24px', height: 'auto', maxWidth:'20%'}}
      >
        Lecture Course Assignment
      </Button>
      <div className="list-filter">
        {/* <Select
          bordered={false}
          className="!rounded-[6px] border-[#EAECF0] border-[2px]"
          placeholder="--Select Acadamic year ---"
          style={{ width: 220 }}
          onChange={handleYearChange}
        >
          {academicYears?.map((item, i) => (
            <Option key={item} value={item} lable={item}>
              {item}
            </Option>
          ))}
        </Select>

        {selectedYear && (
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: 220 }}
            placeholder="--Select A term of Year---"
            onChange={handleTermChange}
          >
            {terms?.map((item, i) => (
              <Option key={item} value={item} lable={item}>
                {item}
              </Option>
            ))}
          </Select>
          )}
           
        {selectedYear &&  selectedTerm &&(
        <Select
            bordered={false}
            className="!rounded-[6px] border-[#EAECF0] border-[2px]"
            style={{ width: 220 }}
            placeholder="--Select A Section of Student---"
            onChange={handleSectionChange}
          >
            {sections?.map((item, i) => (
              <Option key={item} value={item} lable={item}>
                {item}
              </Option>
            ))}
          </Select>
          )} */}
      </div>

      <Table
        // onRow={(record) => {
        //   return {
        //     onClick: () => showModal(record),
        //   };
        // }}
        columns={columns}
        dataSource={lecturesData}
        pagination={{ position: ["bottomCenter"] }}
      />
      {/* <Modal
        title="Course Breakdown"
        visible={isModalVisible}
        okButtonProps={{ style: { backgroundColor: '#4279A6' } }} 
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <Table columns={gradeColumns} dataSource={filteredCourse} />
        <Tag color="">Pending Approval</Tag>
      </Modal> */}

      <Modal
        title={editingKey ? "Edit Record" : "Create Record"}
        visible={isModalVisible1}
        onCancel={handleCancel}
        onOk={editingKey ? handleEdit : handleOk}
        okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Course Name"
            name="courseNo"
            rules={[{ required: true, message: "Please input term ID!" }]}
          >
            <Select key="courseNo" onChange={handleCourseChange}>
              {coursesData.map((center) => (
                <Option key={center.courseNo} value={center.courseNo}>
                  {center.courseName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Emplpyee Name"
            name="empId"
            rules={[{ required: true, message: "Please employee Id" }]}
          >
            <Select key="empId">
              {studentsData.map((center) => (
                <Option key={center.empId} value={center.empId}>
                  {center.fname + "" + center.mname}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Section Name"
            name="sectionId"
            rules={[{ required: true, message: "Please give the Section " }]}
          >
            <Input />
            {/* <Select key="sectionId">
         {sectionData.map(center => (
            <Option key={center.sectionId} value={center.sectionId}>
              {center.sectionName}
            </Option>
          ))}
          </Select> */}
          </Form.Item>
          <Form.Item
            label="Term ID"
            name="termId"
            rules={[{ required: true, message: "Please give the termId!" }]}
          >
            <Input />

            {/* <Select key="termId">
           {termData.map(center => (
            <Option key={center.termId} value={center.termId}>
              {center.termId}
            </Option>
          ))}
          </Select> */}
          </Form.Item>
          <Form.Item
            label="Assignment Date"
            name="assgtDate"
            rules={[{ required: true, message: "Please select End date!" }]}
          >
            <DatePicker
              value={assgtDate && moment(assgtDate)}
              style={{ width: "100%" }}
              onChange={onChange}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Subject"
        visible={isDeleteModalVisible}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        okButtonProps={{ style: { backgroundColor: "#4279A6" } }}
      >
        <p>Are you sure you want to delete {selectedSubject?.name}?</p>
      </Modal>
    </div>
  );
};

export default DepartmentCourse;
