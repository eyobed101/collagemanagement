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
    const [filteredData, setFilteredData] = useState(gradeTableData);
  
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
          Header: "ECTS",
          accessor: "ects",
        },
        {
          Header: "Grade",
          accessor: "grade",
        },
      ],
      []
    );
  
    useEffect(() => {
      const newFilteredData = gradeTableData.filter((course) => {
        return (
          (!academicYearFilter || course.academicYear.toString() === academicYearFilter) &&
          (!semesterFilter || course.semester === semesterFilter)
        );
      });
  
      setFilteredData(newFilteredData);
      console.log(academicYearFilter)
      console.log(filteredData)
  
    }, [academicYearFilter, semesterFilter]);
  
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
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6 bg-[#4279A6]">
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
                {generateAcademicYears()}
              </select>
  
              <label className="ml-4 mr-2">Semester:</label>
              <select
                className="p-1 mr-2 border rounded"
                onChange={(e) => setSemesterFilter(e.target.value)}
                value={semesterFilter}
              >
                <option value="">All</option>
                {["First", "Second"].map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
            <table
              className="w-full min-w-[640px] table-auto px-2"
              {...getTableProps()}
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
              <tbody {...getTableBodyProps()} className="px-4" >
                {page.map((row, rowIndex)  => {
                  prepareRow(row);
                  return (
                    <TableRow
                      {...row.getRowProps()}
                      isOdd={rowIndex % 2 !== 0}
                      
                    >
                      {row.cells.map(cell => (
                        <td className="p-4 border-r-2 border-l-2 rounded" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </TableRow>
                  );
                })}
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
  