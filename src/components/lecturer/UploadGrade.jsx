import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import * as XLSX from 'xlsx';

const UploadGrade = ({ studentRecords, setStudentRecords }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      // Update student records based on uploaded data
      const updatedRecords = [...studentRecords];
      excelData.forEach((row) => {
        const studentIndex = updatedRecords.findIndex((student) => student.id === row.id);
        if (studentIndex !== -1) {
          updatedRecords[studentIndex].grade = row.grade;
        }
      });

      setStudentRecords(updatedRecords);
      message.success('Grades updated successfully.');
    };

    reader.onerror = () => {
      message.error('Failed to upload file.');
    };

    reader.readAsArrayBuffer(file);
  };

  const beforeUpload = (file) => {
    setFileList([file]);
    return false; // Prevent default upload behavior
  };

  return (
    <div>
      <Upload beforeUpload={beforeUpload} fileList={fileList}>
        <Button>Select File</Button>
      </Upload>
      <Button onClick={() => handleUpload(fileList[0])}>Upload</Button>
    </div>
  );
};

export default UploadGrade;

// const columns = [
//   {
//     title: 'S.No',
//     dataIndex: 'id',
//     key: 'id',
//     render: (text, record, index) => index + 1
//   },
//   {
//     title: 'ID No',
//     dataIndex: 'id',
//     key: 'id'
//   },
//   {
//     title: 'Full Name',
//     dataIndex: 'fullName',
//     key: 'fullName'
//   },
//   {
//     title: '25%',
//     dataIndex: 'score1',
//     key: 'score1'
//   },
//   {
//     title: '15%',
//     dataIndex: 'score2',
//     key: 'score2'
//   },
//   {
//     title: '10%',
//     dataIndex: 'score3',
//     key: 'score3'
//   },
//   {
//     title: '50%',
//     dataIndex: 'score4',
//     key: 'score4'
//   },
//   {
//     title: 'Total (100%)',
//     key: 'total',
//     render: (text, record) => {
//       const total = record.score1 + record.score2 + record.score3 + record.score4;
//       return <span>{total}</span>;
//     }
//   },
//   {
//     title: 'Grade',
//     key: 'grade',
//     render: (text, record) => {
//       const total = record.score1 + record.score2 + record.score3 + record.score4;
//       if (total === null) return '';
//       if (total >= 90) return 'A';
//       if (total >= 80) return 'B';
//       if (total >= 70) return 'C';
//       if (total >= 60) return 'D';
//       return 'F';
//     }
//   },
//   {
//     title: 'NG',
//     key: 'ng',
//     render: (text, record) => {
//       const total = record.score1 + record.score2 + record.score3 + record.score4;
//       if (total === null) return 'NG';
//       if (total < 40) return 'NG';
//       return '';
//     }
//   },
//   {
//     title: 'IA',
//     key: 'ia',
//     render: (text, record) => {
//       const total = record.score1 + record.score2 + record.score3 + record.score4;
//       if (total === null) return 'IA';
//       if (total < 40) return '';
//       return 'IA';
//     }
//   },
//   {
//     title: 'F',
//     key: 'f',
//     render: (text, record) => {
//       const total = record.score1 + record.score2 + record.score3 + record.score4;
//       if (total === null) return 'F';
//       if (total < 40) return 'F';
//       return '';
//     }
//   }
// ];
