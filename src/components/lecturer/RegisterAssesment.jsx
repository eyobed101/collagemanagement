import React, { useState } from "react";
import { Select, Input, Button, Row, Col } from "antd";

const { Option } = Select;

const AssessmentRegistration = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [assessmentType, setAssessmentType] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [weight, setWeight] = useState("");

  const handleSave = () => {
    // Add your save logic here
    console.log({
      academicYear,
      semester,
      course,
      assessmentType,
      assessmentTitle,
      weight,
    });
    // Clear form fields after saving
    setAcademicYear("");
    setSemester("");
    setCourse("");
    setAssessmentType("");
    setAssessmentTitle("");
    setWeight("");
  };

  return (
    <div className="mb-8 flex flex-col gap-6 bg-white p-5 rounded-md">
      {/* <SiderGenerator /> */}
      <div className="list-header mb-2 ml-100">
        <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">
          Register Assesment Weight
        </h1>
      </div>
      <div className="list-sub mb-10 ml-[2%] ">
        {/* {handleGrade()} */}
        <div className="list-filter">
          <Row gutter={16} style={{ marginTop: "5%" }}>
            <Col span={8}>
              <label style={{ paddingBottom: 10, color: "#333", fontSize: 14 }}>
                Acadamic Year
              </label>
              <Select
                value={academicYear}
                onChange={(value) => setAcademicYear(value)}
                placeholder="Academic Year"
                style={{ width: "100%", height: 40 }}
              >
                <Option value="2022/23">2022/23</Option>
                <Option value="2023/24">2023/24</Option>
                {/* Add more academic years as needed */}
              </Select>
            </Col>
            <Col span={8}>
              <label style={{ paddingBottom: 10, color: "#333", fontSize: 14 }}>
                Semister
              </label>
              <Select
                value={semester}
                onChange={(value) => setSemester(value)}
                placeholder="Semester"
                style={{ width: "100%", height: 40 }}
              >
                <Option value="1">Semester 1</Option>
                <Option value="2">Semester 2</Option>
                {/* Add more semesters as needed */}
              </Select>
            </Col>
            <Col span={6}>
              <label style={{ paddingBottom: 10, color: "#333", fontSize: 14 }}>
                Course
              </label>
              <Select
                value={course}
                onChange={(value) => setCourse(value)}
                placeholder="Course"
                style={{ width: "100%", height: 40 }}
              >
                <Option value="CSE101">CSE101</Option>
                <Option value="ENG102">ENG102</Option>
                {/* Add more courses as needed */}
              </Select>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "5%" }}>
            <Col span={8}>
              <label style={{ paddingBottom: 10, color: "#333", fontSize: 14 }}>
                Assessment Type
              </label>
              <Select
                value={assessmentType}
                onChange={(value) => setAssessmentType(value)}
                placeholder="Assessment Type"
                style={{ width: "100%", height: 40 }}
              >
                <Option value="Midterm">Midterm</Option>
                <Option value="Final">Final</Option>
                {/* Add more assessment types as needed */}
              </Select>
            </Col>
            <Col span={8}>
              <label style={{ paddingBottom: 10, color: "#333", fontSize: 14 }}>
                Assessment Title
              </label>
              <Input
                value={assessmentTitle}
                onChange={(e) => setAssessmentTitle(e.target.value)}
                placeholder="Assessment Title"
                style={{ width: "100%", height: 40 }}
              />
            </Col>
            <Col span={6}>
              <label style={{ paddingBottom: 10, color: "#333", fontSize: 14 }}>
                Weight
              </label>
              <Input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight"
                type="number"
                style={{ width: "100%", height: 40 }}
              />
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "76%",
              marginTop: "2%",
            }}
          >
            <Button
              type="primary"
              onClick={handleSave}
              style={{
                marginBottom: 16,
                margingRight: 20,
                marginTop: 20,
                backgroundColor: "#4279A6",
                justifySelf: "flex-end",
                display: "flex",
              }}
            >
              Save
            </Button>
            <Button
              type="primary"
              style={{
                marginBottom: 16,
                margingLeft: 20,
                marginTop: 20,
                color: "#333",
                backgroundColor: "#FFF",
                justifySelf: "flex-end",
                display: "flex",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentRegistration;
