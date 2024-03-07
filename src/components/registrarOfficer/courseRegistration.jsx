import React, { useEffect, useState } from "react";
import courseTableData from "@/data/courses";
import addDropTableData from "@/data/addrop";
import axios from "axios";

const StudentCourseRegistration = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});
  const [sectionStudEnroll, setSectionStudEnroll] = useState([])
  const [secCourseAss, setSecCourseAss] = useState([])
  const [program, setProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [term, setTerm] = useState("");
  const [department, setDepartment] = useState("");
  const [coursesAssigned, setCoursesAssigned] = useState(0);
  const [todaysDate, setTodaysDate] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [coursesUnderSection, setCoursesUnderSection] = useState(["Mathimatics", "Biology", "Software Designing", "Introduction to Economics", "World Business"]);

  const studentsUnderSection = ["(RVGODAcE0) Kebede Fantu Temesgen", "(RVGODAcE0) Gemechu Kassa Geleta", "(RVGODAcE0) Abel Dessalegn Sambi","(RVGODAcE0) Robert Madu Alex", "(RVGODAcE0) Mickel Samuel David"];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:5169/api/Section");
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    const fetchSectionStudentEnroll = async () => {
      try {
        const response = await axios.get("http://localhost:5169/api/SectionStudEnroll");
        setSectionStudEnroll(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }

    }
    const fetchSecCourseAss = async () => {
      try {
        const response = await axios.get("http://localhost:5169/api/SecCourseAssgts");
        setSecCourseAss(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }

    }

    fetchSections();
    fetchSectionStudentEnroll();
    fetchSecCourseAss();
  }, []);

  const handleSectionChange = (event) => {

    const selectedData = event.target.options[event.target.selectedIndex].getAttribute('data')

    setSelectedSection({
      ...JSON.parse(selectedData)
    });

    setTodaysDate(new Date().toLocaleDateString());
  };

  const handleCourseClick = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((selectedCourse) => selectedCourse !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleClearSelectedCourses = () => {
    
    const updatedCourses = coursesUnderSection.filter(
      (course) => !selectedCourses.includes(course)
    );

    setSelectedCourses([]);

    setCoursesUnderSection(updatedCourses);
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md">
      <div className="px-5">
        <h2 className="text-lg font-semibold mb-2 text-[#434343]">
          Section Selection
        </h2>
        <div className="mb-4">
          <select
            className="px-8 py-3 w-full bg-blue-gray-50 border-[2px] border-[#676767] text-black block shadow-md sm:text-sm rounded-md"

            onChange={handleSectionChange}
          >
   
            <option value="">Select Section</option>
                {sections?.map(
                  (section) => (
                    <option key={section.sectionID} data={JSON.stringify(section)} value={section.sectionName}>
                      {section.sectionName}
                    </option>
                  )
                )}
          </select>
        </div>
      </div>

      {/* Information Section */}
      <div className="shadow-md rounded-md p-5">
        <h2 className="text-lg font-semibold mb-2 text-[#434343]">
          Information
        </h2>
        <div className="grid grid-cols-1  sm:grid-cols-3 mb-5">
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Program:
            </label>
            <div className="text-lg border p-2">{selectedSection.program ? selectedSection.program:""}</div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Program Type
            </label>
            <div className="text-lg border p-2">{selectedSection.sectionId ? selectedSection.programType:""}</div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Academic Year:
            </label>
            <div className="text-lg border p-2">{selectedSection.acadYear ? selectedSection.acadYear:""}</div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Department:
            </label>
            <div className="text-lg border p-2">{selectedSection ? department:""}</div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Courses Assigned:
            </label>
            <div className="text-lg border p-2">{selectedSection.secCourseAssgts ? selectedSection.secCourseAssgts.length: ""}</div>
          </div>
          <div className="mb-4 border border-[#676767] shadow-md p-2 mr-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600">
              Today's Date:
            </label>
            <div className="text-lg border p-2">{selectedSection.sectionId ? todaysDate : ""}</div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border shadow-md p-5 rounded-md">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Students Under Selected Section
          </h2>
          <div className="border-2 border-[#676767] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-md rounded-md">
            {selectedSection.sectionId ? sectionStudEnroll.filter((section) => section.sectionId === selectedSection.sectionId).map((student, index) => (
              <div
                key={index}
                className="border mb-2 p-2 cursor-pointer text-black"
              >
                {student.studId}
              </div>
            )):"Section has not been selected"}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Courses Under This Section
          </h2>
          <div className="border-2 border-[#676767] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-md rounded-md">
            {selectedSection.sectionId ? secCourseAss.filter((section) => section.sectionId === selectedSection.sectionId).map((course, index) => (
              <div
                key={index}
                // className="border mb-2 p-2 cursor-pointer text-black"
                onClick={() => handleCourseClick(course)}
                className={`border mb-2 p-2 cursor-pointer text-black ${
                  selectedCourses.includes(course) ? 'bg-gray-300' : ''
                }`}
              >
                {course.courseNo}
              </div>
            )): "Section has not been selected" }
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border shadow-md rounded-md p-5">
          <div className="flex justify-between mb-4 border border-[#676767] rounded-md shadow-md p-2 mr-4">
            <label className="block text-sm font-medium text-gray-600">
              Number of Students:
            </label>
            <div className="text-lg font-semibold border px-5">
              {selectedSection.sectionId ? sectionStudEnroll.filter((section) => section.sectionId === selectedSection.sectionId).length:"0"}
            </div>
          </div>
          <div className="flex justify-between mb-4 border border-[#676767] rounded-md shadow-md p-2 mr-4">
            <label className="block text-sm font-medium text-gray-600">
              Number of Courses:
            </label>
            <div className="text-lg font-semibold border px-5">
              {selectedSection.sectionId ? secCourseAss.filter((section) => section.sectionId === selectedSection.sectionId).length : "0"}
            </div>
          </div>
          <div className="flex justify-between mb-4 border border-[#676767] rounded-md shadow-md p-2 mr-4">
            <label className="block text-sm font-medium text-gray-600">
              Courses Assigned:
            </label>
            <div className="text-lg font-semibold border px-5">{selectedSection ? coursesAssigned:"0"}</div>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-0 bg-green-500 font-bold text-white rounded-md" onClick={handleClearSelectedCourses}
>
              Clear Selected Course{" "}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentCourseRegistration;
