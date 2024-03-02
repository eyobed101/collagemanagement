import React, { useState , useEffect} from 'react';
import { Table, Button, Input, DatePicker, Popconfirm, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

const generateRandomTermId = () => {
  const currentYear = new Date().getFullYear();
  const randomSuffix = Math.random().toString(36).substring(2, 4).toUpperCase();
  return `LTFO/${randomSuffix}/${currentYear}/${currentYear + 1}`;
};


const AddTerm = () => {
  
  const [data, setData] = useState([]);
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
      dataIndex: 'acadYear',
      editable: true,
      render: (text, record) => renderCell(text, record, 'acadYear'),
    },
    {
      title: 'Program Type',
      dataIndex: 'programType',
      editable: true,
      render: (_, record) => (
        isEditing(record) ? (
          <Select
            defaultValue={record.programType}
            onChange={(value) => handleInputChange({ target: { value } }, record, 'programType')}
          >
            <Option value="Regular">Regular</Option>
          </Select>
        ) : record.programType
      ),
    },
    {
      title: 'Program',
      dataIndex: 'program',
      editable: true,
      render: (_, record) => (
        isEditing(record) ? (
          <Select
            defaultValue={record.program}
            onChange={(value) => handleInputChange({ target: { value } }, record, 'program')}
          >
            <Option value="Degree">Degree</Option>
          </Select>
        ) : record.program
      ),
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
  const newTermId = generateRandomTermId();
  const newData = {
    key: String(data.length + 1),
    termId: newTermId,
    termName: '',
    academicYear: '',
    programType: 'Regular',
    program: 'Degree',
    startDate: moment(),
    endDate: moment(),
    centerId: '', 
  };
  setData([...data, newData]);
  setEditingKey(newData.key);
};


  const save = (key) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    const item = newData[index];
    console.log(newData)

    newData.splice(index, 1, {
      ...item,
      ...{ key },
      ...{ endDate: moment(item.endDate) },
      ...{ centerId: item.selectedCenterId },
    });

    axios.post('http://localhost:5169/api/Terms/Terms', newData[index])
      .then(response => {
console.log(response)      
})
      .catch(error => {
        console.error('Error updating term data:', error);
      });

    setData(newData);
    setEditingKey('');
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
      <Table dataSource={data} columns={columns} rowKey="key" bordered pagination={false} />
    </div>
  );
}
export default AddTerm;
