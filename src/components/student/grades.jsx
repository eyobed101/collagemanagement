import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";
  import React, { useEffect, useMemo, useState } from "react";
  import { useTable, usePagination } from "react-table";
  import styled from 'styled-components';
  import { FaStepForward, FaStepBackward, FaBackward } from "react-icons/fa";
  
  
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { gradeTableData } from "@/data";
import axiosInstance from "@/configs/axios";
  
  const generateAcademicYears = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, index) => currentYear - index);
  
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };
  
  const TableRow = styled.tr`
    background-color: ${({ isOdd }) => (isOdd ? '#f0f0f0' : 'white')};
    padding:10px
    `;
  
  export function Grades() {
    const [academicYearFilter, setAcademicYearFilter] = useState("");
    const [semesterFilter, setSemesterFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [grades, setGrades] = useState([]);
    const [getCourses, setGetCourses] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [academicYears, setAcademicYears] = useState([]);
    const [terms, setTerms] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState("");

    const [courses, setCourses] = useState([]);
  
    const columns = useMemo(
      () => [
        {
          Header: "No.",
          accessor: "index",
        },
        {
          Header: "Course Title",
          accessor: "courseTitle",
        },
        {
          Header: "Code",
          accessor: "courseCode",
        },
        {
          Header: "Credit Hour",
          accessor: "creditHour",
        },
        {
          Header: "Mark",
          accessor: "mark",
        },
        {
          Header: "Grade",
          accessor: "courseGrade",
        },
      ],
      []
    );
  
    useEffect(() => {
      const username = localStorage.getItem("username");
  
      const fetchGrades = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/Grades/${encodeURIComponent(username)}`,
            { params: { StudentId: username } }
          );
          setGrades(response.data);
          const newData = dataRegenerator(response.data);
          console.log("NEW", newData);
        } catch (error) {
          console.error("Error fetching grades:", error);
        }
      };
      const fetchGetCourses = async () => {
        try {
          const response = await axiosInstance.get(`/api/Courses`);
          setGetCourses(response.data);
          console.log("CC",response.data)
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      fetchGrades();
      fetchGetCourses();
  
      
    }, []);
  
    useEffect(() => {
      const newFilteredData = grades.filter((course) => {
        return (
          (!selectedYear || course.acadYear.toString() === selectedYear) &&
          (!selectedTerm || course.term.toString() === selectedTerm)
        );
      });
  
      setFilteredData(newFilteredData);
    }, [grades, selectedYear, selectedTerm]);

    function dataRegenerator(data) {
      const extractAcademicYear = (termId) => {
        const parts = termId.split("/");
        return parts[2] + "/" + parts[3]; // Assuming termId is always in the correct format
      };
  
      const extractTerm = (termId) => {
        const parts = termId.split("/");
        return parts[1]; // Assuming the second part is the term
      };
  
      const enhanceData = data.map((item) => ({
        ...item,
        acadYear: extractAcademicYear(item.termId),
        term: extractTerm(item.termId),
      }));
  
      const years = Array.from(new Set(enhanceData.map((item) => item.acadYear)));
      const termss = Array.from(new Set(enhanceData.map((item) => item.term)));
  
      setAcademicYears(years);
      setTerms(termss);
  
      return enhanceData;
    }
  
  
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      page,
      state: { pageIndex, pageSize },
      gotoPage,
      setPageSize,
    } = useTable(
      {
        columns,
        data: filteredData,
        initialState: { pageIndex: 0, pageSize: 5 },
        autoResetPage: false,
      },
      usePagination
    );
  
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" className="mb-8 p-6 bg-[#4279A6]/90">
            <Typography variant="h6" color="white">
              Course Lists
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="mb-4 px-2">
              <label className="mr-2">Academic Year:</label>
              <select
                className="p-1 mr-2 border rounded"
                onChange={(e) => setAcademicYearFilter(e.target.value)}
                value={academicYearFilter}
              >
                <option value="">All</option>
                {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
              </select>
  
              <label className="ml-4 mr-2">Semester:</label>
              <select
                className="p-1 mr-2 border rounded"
                onChange={(e) => setSemesterFilter(e.target.value)}
                value={semesterFilter}
              >
                <option value="">All</option>
                {terms.map((term, index) => (
                <option key={index} value={term}>
                  {term}
                </option>
              ))}
              </select>
            </div>
            <table
              className="w-full min-w-[640px] table-auto px-2"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left rounded bg-[#f0f0f0]"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="px-4" >
              {filteredData.map((grade, index) => (
                <tr
                  key={index}
                  className={index % 2 !== 0 ? "bg-gray-100" : ""}
                >
                  <td className="p-4 border-r-2 border-l-2 rounded">
                    {index + 1}
                  </td>{" "}
                  {/* Assuming you want a simple numeric index */}
                  <td className="p-4 border-r-2 border-l-2 rounded">
                    {getCourses.filter((course) => course.courseNo === grade.courseNo).map((cors) => {return cors.courseName})}
                  </td>
                  <td className="p-4 border-r-2 border-l-2 rounded">
                    {grade.courseNo}
                  </td>
                  <td className="p-4 border-r-2 border-l-2 rounded">
                  {getCourses.filter((course) => course.courseNo === grade.courseNo).map((cors) => {return cors.creditHour})}
                  </td>
                  <td className="p-4 border-r-2 border-l-2 rounded">
                  {grade.mark}

                  </td>
                  <td className="p-4 border-r-2 border-l-2 rounded">
                    {grade.courseGrade}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 px-4">
              <div>
                {/* <button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
                  {"First |"}
                </button>{" "} */}
                <button
                className="border-2 px-2 rounded-md"
                  onClick={() => gotoPage(pageIndex - 1)}
                  disabled={pageIndex === 0}
                >
                  {"< Previous"}
                </button>{" | "}
                <button
                className="border-2 px-2 rounded-md bg-green-200) {
                  
                }"
                  onClick={() => gotoPage(pageIndex + 1)}
                  disabled={pageIndex === Math.ceil(rows.length / pageSize) - 1}
                >
                  {"Next >"}
                </button>{" "}
                {/* <button
                  onClick={() =>
                    gotoPage(Math.max(0, Math.ceil(rows.length / pageSize) - 1))
                  }
                  disabled={pageIndex === Math.ceil(rows.length / pageSize) - 1}
                >
                  {"Last"}
                </button>{" "} */}
              </div>
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {Math.ceil(rows.length / pageSize)}
                </strong>{" "}
              </span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[5, 10, 20].map((size) => (
                  <option key={size} value={size}>
                    Show {size}
                  </option>
                ))}
              </select>
            </div>
          </CardBody>
        </Card>
        {/* <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Projects Table
            </Typography>
          </CardHeader>
          <CardBody  className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["companies", "members", "budget", "completion", ""].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "gray"}
                              className="h-1"
                            />
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            <EllipsisVerticalIcon
                              strokeWidth={2}
                              className="h-5 w-5 text-inherit"
                            />
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card> */}
      </div>
    );
  }
  
  export default Grades;
  