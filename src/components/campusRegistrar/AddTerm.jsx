import React, { useState, useEffect } from 'react';
import { Table, Button, Input, DatePicker,Popconfirm } from 'antd';
import moment from 'moment';
import axios from 'axios';

const AddTerm = () => {
  const [term , setTerm] = useState([])
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([
    {
      key: '1',
      termId: 'T001',
      termName: 'Term 1',
      academicYear: '2022-2023',
      startDate: moment('2022-09-01'),
      endDate: moment('2022-12-31'),
    },
    // Add more sample data as needed
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7032/api/Terms');
        setTerm(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const columns = [
    {
      title: 'Term ID',
      dataIndex: 'termId',
      editable: true,
      render: (text, record) => renderCell(text, record, 'termId'),
    },
    {
      title: 'Term Name',
      dataIndex: 'name',
      editable: true,
      render: (text, record) => renderCell(text, record, 'name'),
    },
    {
      title: 'Academic Year',
      dataIndex: 'acadYear',
      editable: true,
      render: (text, record) => renderCell(text, record, 'acadYear'),
    },
    {
      title: 'Program Type',
      dataIndex: 'programType',
      editable: true,
      render: (text, record) => renderCell(text, record, 'programType'),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      editable: true,
      render: (_, record) =>  (
        <DatePicker
        value={moment(record.startDate)}
        onChange={onchange}
      />),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      editable: true,
      render: (_, record) =>  (
        <DatePicker
        value={moment(record.endDate)}
        onChange={onchange}
      />),
    },
    {
      title: 'Center ID',
      dataIndex: 'centerId',
      editable: true,
      render: (text, record) => renderCell(text, record, 'centerId'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" style={{backgroundColor:'#4279A6'}} onClick={() => save(record.key)}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button onClick={() => edit(record.key)}>Edit</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: String(data.length + 1),
      termId: '',
      name: '',
      acadYear: '',
      programType: '',
      centerId:'',
      startDate: moment(),
      endDate: moment(),
    };
    setData([...data, newData]);
    setEditingKey(newData.key);
  };

  const handleDelete = (key) => {
    const newData = data.filter(item => item.key !== key);
    setData(newData);
  };


  const edit = (key) => {
    setEditingKey(key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = (key) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...{ key }, ...{ endDate: moment(item.endDate) } });
    setData(newData);
    setEditingKey('');
  };

  const renderCell = (text, record, dataIndex, inputType = 'text') => {
    console.log("date  ", moment(record[dataIndex].date) )
    const editing = isEditing(record);
    return editing ? (
      <div>
        {inputType === 'date' ? (
      <DatePicker
 style={{ width: '100%' }}
      onChange={onchange}
      picker='date'
/>
        ) : (
          <Input value={text} onChange={(e) => handleInputChange(e, record, dataIndex)} />
        )}
      </div>
    ) : (
      inputType === 'date' ? (
        moment(text).format('YYYY-MM-DD')
      ) : (
        text
      )
    );
  };

  const handleInputChange = (e, record, dataIndex) => {
    const newData = [...data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      newData[index][dataIndex] = e.target.value;

      if (dataIndex === 'startDate' || dataIndex === 'endDate') {
        newData[index][dataIndex] = moment(e.target.value, 'YYYY-MM-DD');
      }

      setData(newData);
    }
  };


  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 , backgroundColor:'#4279A6' }} >
        Add New Term
      </Button>
      <Table dataSource={term} columns={columns}  bordered  loading={loading}
      rowKey={(record) => record.termId}
      pagination={{ pageSize: 10 }} />
     
        </div>
  );
};

export default AddTerm;
