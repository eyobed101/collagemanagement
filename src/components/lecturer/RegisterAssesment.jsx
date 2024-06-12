import React, { useState, useEffect } from "react";
import {Select, Input, Button, Row, Col, message } from "antd";
import axiosInstance from "@/configs/axios";

const { Option } = Select;

const AssessmentRegistration = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [assessmentType, setAssessmentType] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [section, setSection] = useState([]);
  const [empId, setempId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const excludedResponse = await axiosInstance.get(
          `/api/InstCourseAssgts`
        ); // Replace with your course API endpoint
        setSection(excludedResponse.data);
        console.log("exc", excludedResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    const postData = {
      courseNo: course,
      termId: semester,
      empId: empId,
      assessmentTitle: assessmentTitle,
      assessmentWeight: weight,
    };
    // Add your save logic here
    console.log(postData);

    await axiosInstance
      .post(`/api/AssessmentWeights`, postData)
      .then((response) => {
        console.log("Assesment created successfully:", response.data);
        message.success("Assessment Created Successfully");
      })
      .catch((error) => {
        console.error("Error creating Assesment:", error);
        message.error("Error creating Assesment");
      });

    // Clear form fields after saving
    setAcademicYear("");
    setSemester("");
    setCourse("");
    setAssessmentType("");
    setAssessmentTitle("");
    setWeight("");
  };

  const handleCourse = async (value) => {
    setCourse(value);
    const selectedItem = section.find((item) => item.courseNo === value);
    setempId(selectedItem.empId);
    console.log("test", selectedItem.empId);
  };

  return (
    <div className="mt-8 flex flex-col gap-6 bg-white p-5 rounded-md min-h-[100vh] ">
      {/* <SiderGenerator /> */}
      <div className="list-header mb-2 ml-100">
        <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">
          Register Assesment Weight
        </h1>
      </div>

      {/* <hr className="mt-4 border-2 border-[#C2C2C2] ml-5"/> */}

      <div className="list-sub mb-10 ml-[2%] bg-white rounded-md border-[#C1C1C1] shadow-lg">
        <div
          className="w-[20%] mt-2 h-10 bg-[#4d6a90] font-semibold mb-5 rounded-tl-md text-white text-center justify-center flex items-center"
          style={{ marginLeft: "-10px" }}
        >
          Create Assessment
        </div>

        <div className="list-filter p-5">
          <Row gutter={16} style={{ marginTop: "2%" }}>
            <Col span={8}>
              <Select
                value={academicYear}
                onChange={(value) => setAcademicYear(value)}
                placeholder="Academic Year"
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              >
                <Option value="" fontWeight="bold">
                  Select Section
                </Option>
                {section.map((department, index) => (
                  <Option key={index} value={department.sectionId}>
                    {department.sectionId}
                  </Option>
                ))}
                {/* Add more academic years as needed */}
              </Select>
            </Col>
            <Col span={8}>
              <Select
                value={semester}
                onChange={(value) => setSemester(value)}
                placeholder="Semester"
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              >
                <Option value="" fontWeight="bold">
                  Select Term
                </Option>

                {section.map((department, index) => (
                  <Option key={index} value={department.termId}>
                    {department.termId}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                value={course}
                onChange={handleCourse}
                placeholder="Course"
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              >
                <Option value="" fontWeight="bold">
                  Select Course
                </Option>

                {section.map((department, index) => (
                  <Option key={index} value={department.courseNo}>
                    {department.courseNo}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "5%" }}>
            <Col span={8}>
              <Select
                value={assessmentType}
                onChange={(value) => setAssessmentType(value)}
                placeholder="Assessment Type"
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              >
                <Option value="" fontWeight="bold">
                  Select Assessment type
                </Option>

                <Option value="Test">Test</Option>
                <Option value="presentation">Presentation</Option>
                <Option value="Midterm">Midterm</Option>
                <Option value="Final">Final</Option>
                {/* Add more assessment types as needed */}
              </Select>
            </Col>
            <Col span={8}>
              <Input
                value={assessmentTitle}
                onChange={(e) => setAssessmentTitle(e.target.value)}
                placeholder="Assessment Title"
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              />
            </Col>
            <Col span={6}>
              <Input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight"
                type="number"
                className="px-8 py-3 w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              />
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              type="primary"
              onClick={handleSave}
              style={{
                // marginBottom: 16,
                margingRight: 20,
                marginTop: 60,
                padding: 20,
                backgroundColor: "#4279A6",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                fontWeight: "bold",
              }}
            >
              Save
            </Button>
            <Button
              type="primary"
              style={{
                marginTop: 60,
                marginLeft: 10,
                padding: 20,
                backgroundColor: "#FFF",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                color: "black",
                border: "2px solid #C1C1C1",
                fontWeight: "650",
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
