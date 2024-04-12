import React, { useState } from 'react';
import { Select, Button, Table, Input , Form } from 'antd';

const { Option } = Select;

const MaintainAssessment = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  // Mock student data
  const mockStudentData = [
    { key: '1', id: 'UGR/1885/21', fullName: 'John Doe', midExam: 19, assessment: 12, presentation: 8, finalExam: 37, acadamic: '2021/22', course: 'Section A| Introduction to Computer' },
    { key: '2', id: 'UGR/1897/21', fullName: 'Jane Smith', midExam: 20, assessment: 11, presentation: 7, finalExam: 24, acadamic: '2021/22', course: 'Section B| Introduction to Computer' },
    // Add more student data here
  ];

  const handleShowData = () => {
    // Filter student data based on selected academic year, course, and semester
    // Here, you should fetch the data from your API based on the selected filters
    // For demo purposes, filtering the mock data
    const filteredData = mockStudentData.filter(student => {
      return student.acadamic === academicYear && student.course === course;
    });
    setStudentData(filteredData);
  };

  const handleAcademic = value => {
    setAcademicYear(value);
  };

  const handleCourse = value => {
    setCourse(value);
  };

  const handleSemester = value => {
    setSemester(value);
  };

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = key => {
    const newData = [...studentData];
    const index = newData.findIndex(item => key === item.key);

    if (index > -1) {
      const item = newData[index];
      setStudentData(newData);
      setEditingKey('');
    }
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'ID No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Mid Exam',
      dataIndex: 'midExam',
      key: 'midExam',
      editable: true,
    },
    {
      title: 'Assessment',
      dataIndex: 'assessment',
      key: 'assessment',
      editable: true,
    },
    {
      title: 'Presentation',
      dataIndex: 'presentation',
      key: 'presentation',
      editable: true,
    },
    {
      title: 'Final Exam',
      dataIndex: 'finalExam',
      key: 'finalExam',
      editable: true,
    },
    {
      title: 'Total',
      key: 'total',
      render: (text, record) =>
        record.midExam + record.assessment + record.presentation + record.finalExam,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="#"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => ({
    ...col,
    onCell: record => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave: save,
    }),
  }));

  return (
    <div className="mb-8 flex flex-col gap-12 bg-white p-5 rounded-md ">
      <div className="list-header mb-2 ml-100">
        <h1 className="text-2xl font-[600] font-jakarta ml-[2%] mb-[2%] mt-[2%]">
          Maintain Assessment
        </h1>
      </div>
      <div className="list-sub mb-10 ml-[2%] ">
        <div style={{ marginTop: '20px', marginBottom: '16px', flexDirection: 'row', justifyContent: 'flex-start', display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20%' }}>
            <label>Academic Year</label>
            <Select
              value={academicYear}
              onChange={handleAcademic}
              placeholder="Select Academic Year"
              style={{ marginRight: '8px', width: 350, height: 40 }}
            >
              {/* Add academic year options */}
              <Option value="2021/22">2021/22</Option>
              <Option value="2022/23">2022/23</Option>
              <Option value="2023/24">2023/24</Option>
            </Select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Course</label>
            <Select
              value={course}
              onChange={handleCourse}
              placeholder="Select Course"
              style={{ marginRight: '8px', width: 350, height: 40 }}
            >
              {/* Add course options */}
              <Option value="Section A| Introduction to Computer">Section A| Introduction to Computer</Option>
              <Option value="Section B| Introduction to Computer">Section B| Introduction to Computer</Option>
              <Option value="Section C| Introduction to Computer">Section C| Introduction to Computer</Option>
            </Select>
          </div>
        </div>
        <div style={{ marginBottom: '16px', flexDirection: 'row', justifyContent: 'flex-start', flex: 1, display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20%' }}>
            <label>Semester</label>
            <Select
              value={semester}
              onChange={handleSemester}
              placeholder="Select Semester"
              style={{ marginRight: '8px', width: 350, height: 40 }}
            >
              {/* Add semester options */}
              <Option value="1">Semester 1</Option>
              <Option value="2">Semester 2</Option>
            </Select>
          </div>
          <Button type="primary" onClick={handleShowData} style={{ marginBottom: 16, margingRight: '20%', marginTop: 20, backgroundColor: '#4279A6', justifySelf: 'flex-end', }}>Show Data</Button>
        </div>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={studentData}
          columns={mergedColumns}
          bordered
        />
      </div>
    </div>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useForm();
  const { getFieldDecorator } = form;

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default MaintainAssessment;
