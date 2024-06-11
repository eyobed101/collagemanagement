import React, { useState, useEffect } from "react";
import { Select, Table, Button, message, notification } from "antd";
import axios from "axios";
import { api } from "../constants";
import axiosInstance from "@/configs/axios";

const { Option } = Select;

const CourseOffering = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [mainTableData, setMainTableData] = useState([]);
  const [otherTableData, setOtherTableData] = useState([]);
  const [termOptions, setTermOptions] = useState([]);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [excludedCourses, setExcludedCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionResponse = await axiosInstance.get(`/api/Section`);
        setSections(sectionResponse.data);

        const courseResponse = await axiosInstance.get(`/api/Courses`);
        setCourses(courseResponse.data);

        const curriculumResponse = await axiosInstance.get(`/api/Curricula`);
        setCurriculum(curriculumResponse.data);
        console.log("curr", curriculumResponse.data);

        const assignedCourse = await axiosInstance.get(
          `/api/SecCourseAssgts`
        );
        setExcludedCourses(assignedCourse.data);

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
    fetchData();
  }, []);


  const handleSectionChange = (value) => {

    setSelectedSection(JSON.parse(value));
    setOtherTableData([]);
  };

  // const selectedSectionObject = sections.find(
  //   (section) => section.sectionId === selectedSection
  // );
  // const selectedSectionId = selectedSectionObject
  //   ? selectedSectionObject.sectionId
  //   : null;

  const handleAssignCourses = async () => {
    try {
      if (termOptions.length === 0) {
        message.error("No active terms available for course assignment.");
        return;
      }

      // Assuming you want the first active term, modify as needed
      const termId = termOptions[0].termId;

      // const selectedSectionData = sections.find(
      //   (data) => data.sectionId === selectedSection
      // );
      // const sectionId = selectedSectionData
      //   ? selectedSectionData.sectionId
      //   : "";

      console.log("test ", termId);
      // console.log("selected", sectionId);
      console.log(
        "selected line",
        otherTableData.map((record) => record.courseNo)
      );

      // Iterate over each course in otherTableData and make individual POST requests
      for (const record of otherTableData) {
        // Prepare the data for the post request
        const postData = {
          courseNo: record.courseNo,
          sectionId: selectedSection.sectionId,
          termId: termId,
          // instrId: "AD/C/04/23",
        };

        console.log("POST", postData);

        // Perform the post request
        try {
          // Perform the post request
          const response = await axiosInstance.post(
            `/api/SecCourseAssgts`,
            [postData],
            {
              headers: {
                "Content-Type": "application/json", // Set Content-Type to application/json
              },
            }
          );

          console.log("Post request successful:", response.data);
          // message.success("post  course assignment.");

        } catch (error) {
          console.error("Error assigning courses:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const errorMessage = Object.values(error.response.data.errors).join(
              "; "
            );
            // message.error(`Error assigning courses: ${errorMessage}`);
          } else {
            console.log("");
            // message.error("Error assigning courses. Please try again.");
          }
        }
      }

      // message.success("Courses assigned successfully!");
      notification.success({
        message: "Successful",
        description: "Courses assigned successfully!",
      });

      // Clear the otherTableData after successful assignment
      setOtherTableData([]);
    } catch (error) {
      console.error("Error assigning courses:", error);
      // message.error("Error assigning courses. Please try again.");
      notification.error({
        message: "Failed",
        description: `Error assigning courses: ${error.message || error}`,
      });
    }
  };

  const mergedCurriculum = curriculum.map((curriculumItem) => {
    const matchingCourse = courses.find(
      (course) => course.courseNo === curriculumItem.courseNo
    );
    if (matchingCourse) {
      return { ...curriculumItem, courseName: matchingCourse.courseName };
    }
    return curriculumItem;
  });

  const handleSectionProgramChange = (value) => {
    setSelectedProgram(value);
  };

  const handleRowClick = (record) => {
    const courseAlreadyAssigned = otherTableData.some(
      (data) => data.courseNo === record.courseNo
    );
    if (!courseAlreadyAssigned) {
      const updatedMainTableData = mainTableData.filter((data) => {
        // Check if the course matches the selected section and program
        const matchesSection = data.dcode === selectedSection.dcode;
        const matchesProgram = data.program === selectedProgram;
        // Only keep the course if it doesn't match the selected section and program
        return !(
          matchesSection &&
          matchesProgram &&
          data.courseNo === record.courseNo
        );
      });
      setMainTableData(updatedMainTableData);
      setOtherTableData([...otherTableData, { ...record }]);
    }
  };

  const columns = [
    { title: "Course ID", dataIndex: "courseNo", key: "courseNo" },
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleRowClick(record)}>Assign</Button>
      ),
    },
  ];

  const otherTableColumns = [
    { title: "Course ID", dataIndex: "courseNo", key: "courseNo" },
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
  ];

  return (
    <div className="mb-8 flex flex-col gap-6 bg-white p-5 rounded-md shadow-md">
      <div>
        <Select
          placeholder="Select Section"
          style={{ width: 200, marginBottom: 16, height:"45px" }}
          onChange={handleSectionChange}
        >
          {sections.map((section) => (
            <Option key={section.sectionId} value={JSON.stringify(section)}>
              {section.sectionName}
            </Option>
          ))}
        </Select>
        {selectedSection && (
          <Select
            placeholder="Select Program"
            style={{ width: 200, marginBottom: 16, marginLeft: 30 , height:"45px"}}
            onChange={handleSectionProgramChange}
          >
            <Option value="TVET">TVET</Option>
            <Option value="Degree">Degree</Option>
            <Option value="Masters">Masters</Option>
          </Select>
        )}
      </div>
      
      <h2
        style={{
          color: "black",
          padding: "10px",
          fontSize: "21px",
          borderRadius: "8px",
          fontWeight:"bold",
          opacity:"25",
          backdropFilter:true,
        }}
      >
        Courses
      </h2>
      <hr className="mb-4 border-2 border-[#C2C2C2]"/>

      <div className="bg-white p-5 rounded-md shadow-md">

        <Table
          dataSource={mergedCurriculum.filter((course) => { 
            return (
              course.dcode === selectedSection.dcode &&
              course.program === selectedProgram &&
              !excludedCourses.some((assigned) => 
                assigned.courseNo === course.courseNo && assigned.sectionId === selectedSection.sectionId
              )
            );
          })}
          columns={columns}
          rowKey="courseNo"
          bordered
          pagination={false}
        />
      </div>
      {/* <p className="!font-jakarta text-left text-[#3b608e] text-[17px] mt-8 font-bold align-middle">
        Offered Courses{" "}
      </p> */}
      <h2
        style={{
          color: "black",
          padding: "10px",
          fontSize: "21px",
          borderRadius: "8px",
          fontWeight:"bold",
          opacity:"25",
          backdropFilter:true,
        }}
      >
       Offered Courses
      </h2>
      <hr className="mb-4 border-2 border-[#C2C2C2]"/>

      <div className="bg-white p-5 rounded-md shadow-md">
        <Table
          dataSource={otherTableData}
          columns={otherTableColumns}
          rowKey="courseNo"
          bordered
          pagination={false}
        />
      </div>
      <Button
        onClick={handleAssignCourses}
        type="primary"
        style={{
          marginBottom: 16,
          backgroundColor: "#4279A6",
          padding: "12px 24px",
          height: "auto",
          maxWidth: "15%",
          marginLeft: "auto",
        }}
      >
        Assign Courses
      </Button>
    </div>
  );
};

export default CourseOffering;
