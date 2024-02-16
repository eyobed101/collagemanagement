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
