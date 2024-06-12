import React, { useState, useEffect } from "react";
import {Select, InputNumber, Input, Button, Table, Row, Col, message } from "antd";
import axiosInstance from "@/configs/axios";

const { Option } = Select;

const GradeChangeSubmission = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [student, setStudent] = useState("");
  const [prevTotalMark, setPrevTotalMark] = useState("");
  const [prevGrade, setPrevGrade] = useState("");
  const [reason, setReason] = useState("");
  const [newTotalMark, setNewTotalMark] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [assessmentData, setAssessmentData] = useState([]);
  const [filteredAssessmentData, setFilteredAssessmentData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [assesment, setAssement] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState(studentData);
  const [GradeData, setGradeData] = useState([]);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axiosInstance.get("/api/AssessmentWeights");
        setAssement(response.data);
        console.log("assessment", response.data);
      } catch (error) {
        console.error("Error fetching assessment data:", error);
      }
    };

    fetchAssessment();
  }, []);

  useEffect(() => {
    const fetchCoursePending = async () => {
      try {
        const response = await axiosInstance.get("/api/Grades");
        // setStudentData(response.data);
        setGradeData(response.data);
        console.log("Grade data", response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchCoursePending();
  }, []);

  useEffect(() => {
    const fetchCoursePending = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/CourseRegistrationPendings"
        );
        setStudentData(response.data);
        console.log("studentData", response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchCoursePending();
  }, []);

  useEffect(() => {
    const fetchStudentMark = async () => {
      try {
        const response = await axiosInstance.get(`/api/StudentMarks`);

        // Filter assessment data based on studID, courseNo, and termID
        const filteredData = response.data.filter(
          (item) =>
            item.studID === student &&
            item.courseNo === course &&
            item.termID === semester
        );

        setAssessmentData(filteredData);
        console.log("test is", filteredData);
        const totalAssessmentWeight = filteredData.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue.assessmentWeight;
          },
          0
        );
        console.log("Total Assessment Weight Result:", totalAssessmentWeight);
        setPrevTotalMark(totalAssessmentWeight);

        setFilteredAssessmentData(filteredData);
        // Set filtered assessment data
        let grade;
        if (totalAssessmentWeight >= 90) {
          grade = "A+";
        } else if (totalAssessmentWeight >= 85) {
          grade = "A";
        } else if (totalAssessmentWeight >= 80) {
          grade = "A-";
        } else if (totalAssessmentWeight >= 75) {
          grade = "B+";
        } else if (totalAssessmentWeight >= 70) {
          grade = "B";
        } else if (totalAssessmentWeight >= 65) {
          grade = "B-";
        } else if (totalAssessmentWeight >= 60) {
          grade = "C+";
        } else if (totalAssessmentWeight >= 50) {
          grade = "C";
        } else if (totalAssessmentWeight >= 45) {
          grade = "D";
        } else {
          grade = "F";
        }
        setPrevGrade(grade);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentMark();
  }, [student, course, semester]);

  const assessmentDatas = [
    { assessmentTitle: "Mid Exam(25%)", prevResult: "19", newResult: "19" },
    { assessmentTitle: "Assignment(15%)", prevResult: "12", newResult: "12" },
    { assessmentTitle: "Presentation(10%)", prevResult: "7", newResult: "7" },
    { assessmentTitle: "Final Exam(50%)", prevResult: "33", newResult: "33" },
  ];

  const handleAddAssessment = () => {
    setAssessmentData([
      ...assessmentData,
      {
        key: assessmentData.length + 1,
        assessmentTitle: "",
        prevResult: "",
        newResult: "",
      },
    ]);
  };

  const handleSave = async () => {
    // Add your save logic here
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(today.getDate()).padStart(2, "0");

    const assessmentDate = `${year}-${month}-${day}`;

    const transposedData = [];

    for (let i = 0; i < assessmentData.length; i++) {
      transposedData.push({
        id: assessmentData[i].id,
        studID: assessmentData[i].studID,
        assessmentName: assessmentData[i].assessmentName,
        assessmentWeight: assessmentData[i].assessmentWeight,
        courseNo: assessmentData[i].courseNo,
        termID: assessmentData[i].termID,
        instID: assessmentData[i].instID,
        assessmentDate: assessmentDate,
      });
    }

    console.log("transe", transposedData);
    for (let i = 0; i < transposedData.length; i++) {
      await axiosInstance
        .put(`/api/StudentMarks/`, [transposedData[i]])
        .then((response) => {
          console.log("Assesment created successfully:", response.data);
          message.success("Student mark Created Successfully");
        })
        .catch((error) => {
          console.error("Error creating Assesment:", error);
          message.error("Error creating student mark");
        });
    }
    const grade = {
      studId: assessmentData[0].studID,
      courseNo: assessmentData[0].courseNo,
      prevGrade: prevGrade,
      currentGrade: newGrade,
      updateReason: reason,
      gradeReason: reason,
      dateUpdated: assessmentDate,
      updateSubmitBy: assessmentData[0].instID,
      updatedBy: assessmentData[0].instID,
      exempted: null,
      termId: assessmentData[0].termID,
    };

    console.log("grade change  ", grade);

    await axiosInstance
      .post(`/api/GradeChanges`, [grade])
      .then((response) => {
        console.log("Grade Changed successfully:", response.data);
        message.success("Grade Changed Successfully");
      })
      .catch((error) => {
        console.error("Error creating Grade Change", error);
        message.error("Error creating Grade Change");
      });

    const extractedData = {
      termId: assessmentData[0].termID,
      courseNo: assessmentData[0].courseNo,
      studId: assessmentData[0].studID,
      courseGrade: newGrade,
      submitBy: assessmentData[0].instID,
      dateSubmitted: assessmentDate,
      updated: "Yes",
      updateReason: reason,
      updateBy: assessmentData[0].instID,
      exempted: "No",
      reason: reason,
      mark: newTotalMark,
      thesisResult: null,
      thesisTitle: null,
    };

    console.log("grade total  ", extractedData);
    let GradeDatas;
    GradeDatas = GradeData.map((item) => {
      if (item.StudId === extractedData.studId) {
        return {
          ...item,
          TermId: extractedData.termId,
          CourseNo: extractedData.courseNo,
          CourseGrade: extractedData.courseGrade,
          SubmitBy: extractedData.submitBy,
          DateSubmitted: extractedData.dateSubmitted,
          Updated: extractedData.updated,
          UpdateReason: extractedData.updateReason,
          Exempted: extractedData.exempted,
          Reason: extractedData.reason,
          Mark: extractedData.mark,
          ThesisResult: extractedData.thesisResult,
          ThesisTitle: extractedData.thesisTitle,
        };
      }
      return item;
    });

    console.log("Updated GradeData", GradeDatas);

    for (let i = 0; i < GradeDatas.length; i++) {
      await axiosInstance
        .put(`/api/Grades`, [GradeDatas[i]])
        .then((response) => {
          console.log("Grade Updated successfully:", response.data);
          message.success(" Grade Updated Successfully");
        })
        .catch((error) => {
          console.error("Error creating Grade:", error);
          // message.error("Error creating Grade")
        });
    }

    // await axiosInstance.put(`/api/Grades`, extractedData)
    // .then(response => {
    //   console.log('Grade Updated successfully:', response.data);
    //   message.success(" Grade Updated Successfully")

    // })
    // .catch(error => {
    //   console.error('Error creating Grade:', error);
    //   message.error("Error creating Grade")

    // });
    // Clear form fields after saving
    setAcademicYear("");
    setCourse("");
    setSemester("");
    setStudent("");
    setPrevTotalMark("");
    setReason("");
    setAssessmentData([]);
    // setNewTotalMark('');
    // setNewGrade('');
  };

  const handleStudentChange = (value) => {
    setStudent(value);
    // Filter assessment data based on selected student
    // const filteredData = assessmentDatas.filter((item) => item.student === value);
    setFilteredAssessmentData(assessmentDatas);
    console.log("ass", assessmentDatas);
    // console.log("test  ", filteredData)
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Assessment Title",
      dataIndex: "assessmentName",
      key: "assessmentName",
    },
    {
      title: "Prev.Result",
      dataIndex: "assessmentWeight",
      key: "assessmentWeight",
      render: (_, record) => (
        <Input
          value={record.assessmentWeight}
          onChange={(e) => handlePrevResultChange(e, record.key)}
        />
      ),
    },
    {
      title: "New Result",
      dataIndex: "newResult",
      key: "newResult",
      render: (_, record) => (
        <Input
          value={record.newResult}
          onChange={(e) => handleNewResultChange(e, record)}
        />
      ),
    },
  ];

  const handleAssessmentTitleChange = (e, key) => {
    const { value } = e.target;
    const newData = assessmentData.map((item) =>
      item.key === key ? { ...item, assessmentTitle: value } : item
    );
    setAssessmentData(newData);
  };

  const handlePrevResultChange = (e, key) => {
    const { value } = e.target;
    const newData = assessmentData.map((item) =>
      item.key === key ? { ...item, prevResult: value } : item
    );
    setAssessmentData(newData);
  };

  const handleNewResultChange = (e, record) => {
    const { value } = e.target;
    if (value) {
      const newData = assessmentData.map((item) =>
        item.key == record.key && item.assessmentName == record.assessmentName
          ? { ...item, assessmentWeight: value }
          : item
      );

      const total = newData.reduce(
        (acc, curr) => acc + parseFloat(curr.assessmentWeight || 0),
        0
      );

      setAssessmentData(newData);
      console.log("best", newData);
      console.log("total", total);
      setNewTotalMark(total);

      let grade;
      if (total >= 90) {
        grade = "A+";
      } else if (total >= 85) {
        grade = "A";
      } else if (total >= 80) {
        grade = "A-";
      } else if (total >= 75) {
        grade = "B+";
      } else if (total >= 70) {
        grade = "B";
      } else if (total >= 65) {
        grade = "B-";
      } else if (total >= 60) {
        grade = "C+";
      } else if (total >= 50) {
        grade = "C";
      } else if (total >= 45) {
        grade = "D";
      } else {
        grade = "F";
      }
      setNewGrade(grade);
    }
  };

  const handleAcadamic = async (value) => {
    setAcademicYear(value);
  };
  const handleCourse = async (value) => {
    setCourse(value);
  };
  const handleSemister = async (value) => {
    setSemester(value);
  };

  const filterData = () => {
    if (!course || !semester) {
      setFilteredStudent([]);
      return;
    }

    const filtered = studentData.filter(
      (student) => student.CourseNo == course && student.TermId == semester
    );
    setFilteredStudent(filtered);
  };

  const uniqueTerm = new Set(assesment.map((course) => course.termID));
  const uniquecourse = new Set(assesment.map((course) => course.courseNo));

  useEffect(() => {
    filterData();
  }, [course, semester]);

  return (
    <div className="mt-8 flex flex-col gap-12 bg-white p-5 rounded-md shadow-md min-h-screen">
      {/* <SiderGenerator /> */}
      <div className="list-header mb-2 ml-100">
        <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">
          Submit Grade Change
        </h1>
      </div>
      <div className="list-sub mb-10 ml-[2%] ">
        {/* {handleGrade()} */}
        <div className="list-filter">
          {/* <Row gutter={16}> */}
          <div
            style={{
              marginTop: "20px",
              marginBottom: "16px",
              justifyContent: "flex-start",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "20%",
                marginRight: "12px",
              }}
            >
              {/* <label style={{ marginBottom: 10, color: "#333", fontSize: 14 }}>
                Course
              </label> */}
              <Select
                value={course}
                onChange={handleCourse}
                placeholder="Select Course"
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              >
                {/* Add academic year options */}
                <Option value="" fontWeight="bold">
                  Select Course
                </Option>
                {[...uniquecourse].map((course, index) => (
                  <Option key={index} value={course}>
                    {course}
                  </Option>
                ))}
              </Select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "20%",
                marginRight: "12px",
              }}
            >
              {/* <label style={{ marginBottom: 10, color: "#333", fontSize: 14 }}>
                Semister
              </label> */}
              <Select
                value={semester}
                onChange={handleSemister}
                placeholder="Term ID"
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              >
                <Option value="" fontWeight="bold">
                  Select Term
                </Option>
                {[...uniqueTerm].map((course, index) => (
                  <Option key={index} value={course}>
                    {course}
                  </Option>
                ))}
              </Select>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "20%" }}
            >
              {/* <label style={{ marginBottom: 10, color: "#333", fontSize: 14 }}>
                Student
              </label> */}
              <Select
                value={student}
                onChange={handleStudentChange}
                placeholder="Select Student Name"
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              >
                {/* Add academic year options */}
                <Option value="" fontWeight="bold">
                  Select Student
                </Option>
                {filteredStudent.map((department) => (
                  <Option key={department.StudId} value={department.StudId}>
                    {department.StudId}
                  </Option>
                ))}
              </Select>
            </div>
            {/* <Select
            value={student}
            onChange={handleStudentChange}
            placeholder="Student"
            style={{ width: '100%' }}
          >
          
          </Select> */}
          </div>

          <div
            style={{
              marginTop: "50px",
              marginBottom: "16px",
              flexDirection: "row",
              justifyContent: "flex-start",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
                padding: "10px",
                border: "2px solid #C1C1C1",
                borderRadius: "6px",
              }}
            >
              <label
                style={{
                  marginBottom: 10,
                  color: "#333",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Prev. Total Mark{" "}
                <span className="m-4 border-b-2 border-black">
                  {prevTotalMark}
                </span>
              </label>

              <label
                style={{
                  marginBottom: 10,
                  color: "#333",
                  fontSize: 14,
                  marginTop: 10,
                  fontWeight: "bold",
                }}
              >
                Prev. Grade{" "}
                <span className="m-4 border-b-2 border-black">{prevGrade}</span>
              </label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: 40,
              }}
            >
              <label
                style={{
                  marginBottom: 10,
                  color: "#333",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Reason
              </label>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{ width: 350, height: 80 }}
                placeholder="Examiner from outside"
              />
            </div>
          </div>
          <hr className="mt-4 border-2 border-[#C2C2C2]" />

          <Table
            columns={columns}
            dataSource={filteredAssessmentData}
            pagination={false}
            style={{ marginTop: "16px" }}
            className="custom-table"
            // pagination={{ pageSize: 10 }}
          />
          {/* <Button type="primary" onClick={handleAddAssessment}>
        Add Assessment
      </Button> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <div className="flex space-x-2">
            <InputNumber
              value={newTotalMark}
              onChange={(value) => setNewTotalMark(value)}
              placeholder="New Total Mark"
              style={{ width: "100%" , border:"2px solid #C1C1C1"}}
            />
            <Input
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              placeholder="New Grade"
              style={{ width: "100%" , border:"2px solid #C1C1C1"}}
            />
            </div>
            <Button
              type="primary"
              onClick={handleSave}
              style={{
                backgroundColor: "#4279A6",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                display: "flex",
                padding: "20px",
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeChangeSubmission;
