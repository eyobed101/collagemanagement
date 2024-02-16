import React, { useState } from 'react';
import { Table, Tag, Input, Space } from 'antd';

const { Search } = Input;
import { SearchOutlined} from "@mui/icons-material";


const mockData = [
  { studentId: 101, studentName: 'John Doe', department:'computerscience' , section:'CSC2023/24', courseId: 'C101', creditHours: 3 },
  { studentId: 101, studentName: 'John Doe',department:'computerscience' , section:'CSC2023/24', courseId: 'C102', creditHours: 4 },
  { studentId: 102, studentName: 'Jane Smith',department:'computerscience' , section:'CSC2023/24', courseId: 'C101', creditHours: 3 },
  { studentId: 103, studentName: 'Bob Johnson', department:'computerscience' , section:'CSC2023/24',courseId: 'C103', creditHours: 5 },
  { studentId: 103, studentName: 'Bob Johnson', department:'computerscience' , section:'CSC2023/24', courseId: 'C104', creditHours: 4 },
  // Add more mock data as needed
];

const columns = [
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    key: 'studentId',
  },
  {
    title: 'Student Name',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Section',
    dataIndex: 'section',
    key: 'section',
  },
  {
    title: 'Course ID',
    dataIndex: 'courseId',
    key: 'courseId',
    render: (text) => <Tag color="blue">{text}</Tag>,
  },
  {
    title: 'Credit Hours',
    dataIndex: 'creditHours',
    key: 'creditHours',
  },
];

const StudentCourses = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const studentCourses = mockData.reduce((acc, current) => {
    if (!acc[current.studentId]) {
      acc[current.studentId] = [];
    }
    acc[current.studentId].push(current);
    return acc;
  }, {});

  const dataSource = Object.keys(studentCourses).map((studentId) => ({
    studentId: parseInt(studentId),
    studentName: studentCourses[studentId][0].studentName,
    department:studentCourses[studentId][0].department,
    section:studentCourses[studentId][0].section,
    courses: studentCourses[studentId],
    totalCourses: studentCourses[studentId].length,
  }));

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search Student ID`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </button>
          <button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  return (
    <div className="bg-[#F9FAFB] min-h-[100vh]  ">
    {/* <SiderGenerator /> */}
<div className="list-header mb-2 ml-100">
  <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%]">Courses that are taken</h1>
</div>
<div className="list-sub mb-10 ml-[2%] ">
      <Table
        columns={[
          ...columns.map((col) => ({
            ...col,
            ...getColumnSearchProps(col.dataIndex),
          })),
        ]}
        dataSource={dataSource}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              columns={columns}
              dataSource={record.courses}
              pagination={false}
              size="small"
            />
          ),
          rowExpandable: (record) => record.totalCourses > 0,
        }}
      />
    </div>
    </div>
  );
};

export default StudentCourses;
