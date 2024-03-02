import React, { useState , useEffect} from 'react';
import { Table, Button, Input, DatePicker, Popconfirm, Select } from 'antd';
import moment from 'moment';

const AddTerm = () => {
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

  const [editingKey, setEditingKey] = useState('');
  const [studyCenters, setStudyCenters] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:5169/api/Terms')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching term data:', error);
      });

      axios.get('http://localhost:5169/api/StudyCenters')
      .then(response => {
        setStudyCenters(response.data);
      })
      .catch(error => {
        console.error('Error fetching study center data:', error);
      });
  }, []);

  const isEditing = (record) => record.key === editingKey;

  const handleCenterChange = (value, record) => {
    const newData = [...data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      newData[index].selectedCenterId = value;
      setData(newData);
    }
  };

  const columns = [
    {
      title: 'Study Center',
      dataIndex: 'selectedCenterId',
      editable: true,
      render: (text, record) => (
        isEditing(record) ? (
          <Select
            style={{ width: '100%' }}
            defaultValue={text}
            onChange={(value) => handleCenterChange(value, record)}
          >
            {studyCenters.map(center => (
              <Option key={center.CenterId} value={center.CenterId}>{center.CenterName}</Option>
            ))}
          </Select>
        ) : (
          studyCenters.find(center => center.CenterId === text)?.CenterName
        )
      ),
    },
    
    {
      title: 'Term Name',
      dataIndex: 'name',
      editable: true,
      render: (text, record) => renderCell(text, record, 'name'),
    },
    {
      title: 'Academic Year',
      dataIndex: 'academicYear',
      editable: true,
      render: (text, record) => renderCell(text, record, 'academicYear'),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      editable: true,
      render: (_, record) => (
        <DatePicker
          value={moment(record.startDate)}
          onChange={(date) => handleDateChange(date, record, 'startDate')}
        />
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      editable: true,
      render: (_, record) => (
        <DatePicker
          value={moment(record.endDate)}
          onChange={(date) => handleDateChange(date, record, 'endDate')}
        />
      ),
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
            <Button type="primary" style={{ backgroundColor: '#4279A6' }} onClick={() => save(record.key)}>
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
      termName: '',
      academicYear: '',
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

  // const save = (key) => {
  //   const newData = [...data];
  //   const index = newData.findIndex((item) => key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, { ...item, ...{ key }, ...{ endDate: moment(item.endDate) } });
  //   setData(newData);
  //   setEditingKey('');
  // };

  const renderCell = (text, record, dataIndex, centerNameIndex, inputType = 'text') => {
  const editing = isEditing(record);

  const dateValue = record[dataIndex] && record[dataIndex].date;

  return editing ? (
    <div>
      {inputType === 'date' ? (
        <DatePicker
          style={{ width: '100%' }}
          defaultValue={dateValue ? moment(dateValue) : null}
          onChange={(date) => handleDateChange(date, record, dataIndex)}
          picker='date'
        />
      ) : inputType === 'select' ? (
        <Select
          style={{ width: '100%' }}
          defaultValue={text}
          onChange={(value) => handleCenterChange(value, record)}
        >
          {studyCenters.map(center => (
            <Option key={center.CenterId} value={center.CenterId}>{center.CenterName}</Option>
          ))}
        </Select>
      ) : (
        <Input value={text} onChange={(e) => handleInputChange(e, record, dataIndex)} />
      )}
    </div>
  ) : (
    inputType === 'date' ? (
      dateValue ? moment(dateValue).format('YYYY-MM-DD') : ''
    ) : inputType === 'select' ? (
      studyCenters.find(center => center.CenterId === text)?.CenterName
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
  const handleDateChange = (date, record, dataIndex) => {
    const newData = [...data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      newData[index][dataIndex] = date;
      setData(newData);
    }
  };

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, backgroundColor: '#4279A6' }} >
        Add New Term
      </Button>
      <Table dataSource={term} columns={columns}  bordered  loading={loading}
      rowKey={(record) => record.termId}
      pagination={{ pageSize: 10 }} />
     
        </div>
  );
}
export default AddTerm;
