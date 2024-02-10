import React, { useState } from "react";

const StudentCourseExemption = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([
    "Course 1",
    "Course 2",
    "Course 3",
    // Add more courses as needed
  ]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [suggestedStudents, setSuggestedStudents] = useState([]);

  const students = [
    { id: 1, name: "Alice Doe", department: "Computer Science" },
    { id: 2, name: "Bob Smith", department: "Mathematics" },
    { id: 3, name: "Charlie Brown", department: "Physics" },
    { id: 4, name: "David Johnson", department: "Chemistry" },
    { id: 5, name: "Gemechis Williams", department: "Biology" },
    { id: 6, name: "Zele Williams", department: "Biology" },
    { id: 7, name: "Tadele Williams", department: "PHP" },
    { id: 8, name: "Eva Williams", department: "Chemistry" },
  ];

  const handleSearch = () => {
    const foundStudent = students.find(
      (student) => student.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (foundStudent) {
      setSelectedStudent(foundStudent);
      setSuggestedStudents([]);
    } else {
      setSelectedStudent(null);
    }
  };

  const handleInputChange = (e) => {
    const inputLetter = e.target.value.trim().toLowerCase();

    setSearchQuery(e.target.value);

    const suggestions = students.filter((student) =>
      student.name.toLowerCase().startsWith(inputLetter)
    );

    setSuggestedStudents(suggestions);
  };

  const handleSelectSuggestion = (selectedName) => {
    console.log(selectedName);
    const foundStudent = students.find(
      (student) => student.name === selectedName
    );

    if (foundStudent) {
      setSelectedStudent(foundStudent);
      setSearchQuery(foundStudent.name); // Update input value with selected student name
      setSuggestedStudents([]);
    }
  };

  const handleAddCourse = (course) => {
    setSelectedCourses([...selectedCourses, course]);
  };

  const handleSaveTransaction = () => {
    console.log("Transaction saved:", {
      student: selectedStudent,
      selectedCourses,
    });
  };
  const handleClearTransaction = () => {
    setSelectedCourses([]);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 bg-white p-5 rounded-md">
      {/* Search Bar with Suggestions */}
      <div className="flex justify-between mb-4 border border-[#C2C2C2] rounded relative">
        <input
          type="text"
          placeholder="Search by student name"
          className="px-8 py-3 w-full border-none bg-transparent text-black block shadow-sm sm:text-sm rounded-md"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        />
        {suggestedStudents.length > 0 && (
          <ul className="absolute top-full left-0 w-full max-h-48 overflow-y-auto bg-white border-[2px] border-[#C2C2C2] shadow-sm rounded-md list-none p-0 m-0">
            {suggestedStudents.map((student) => (
              <li
                key={student.id}
                className="cursor-pointer p-2 text-black border"
                onMouseDown={() => handleSelectSuggestion(student.name)}
              >
                {student.name}
              </li>
            ))}
          </ul>
        )}
        <button
          className="px-4 py-3 bg-[#4279A6] text-white rounded ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Student Information */}
      {selectedStudent && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Information
          </h2>
          <div className="grid grid-cols-1  sm:grid-cols-3 mb-5">
            <div className="mb-4 border border-[#c2c2c2] rounded-md  p-2 mr-4">
              <label className="block text-sm font-medium text-gray-600">
                Student ID:
              </label>
              <div className="text-md border p-2">{selectedStudent.id}</div>
            </div>
            <div className="mb-4 border border-[#c2c2c2] rounded-md p-2 mr-4">
              <label className="block text-sm font-medium text-gray-600">
                Student Name:
              </label>
              <div className="text-md border  p-2">{selectedStudent.name}</div>
            </div>
            <div className="mb-4 border border-[#c2c2c2] rounded-md p-2 mr-4">
              <label className="block text-sm font-medium text-gray-600">
                Department:
              </label>
              <div className="text-md border p-2">
                {selectedStudent.department}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Available Courses
          </h2>
          <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-sm rounded-md">
            {availableCourses.map((course, index) => (
              <div
                key={index}
                className="border mb-2 p-2 cursor-pointer text-black"
                onClick={() => handleAddCourse(course)}
              >
                {course}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#434343]">
            Selected Courses
          </h2>
          <div className="border-[2px] border-[#C2C2C2] p-4 overflow-y-auto min-h-[200px] max-h-48 shadow-sm rounded-md">
            {selectedCourses.map((course, index) => (
              <div key={index} className="border mb-2 p-2 text-black">
                {course}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex">
              <button
                className="px-4 py-3 bg-orange-500 text-white rounded"
                onClick={handleClearTransaction}
              >
                Clear{" "}
              </button>
            </div>

            <div className="flex">
              <button
                className="px-4 py-3 bg-green-500 text-white rounded"
                onClick={handleSaveTransaction}
              >
                Save Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseExemption;
