import React, { useState , useRef ,useEffect } from 'react';
import { Select, Button, Table } from 'antd';
import * as XLSX from 'xlsx';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import axios from 'axios';
import { api } from '../constants';
import axiosInstance from "@/configs/axios";


const { Option } = Select;

const GradeSubmission = () => {
  const [academicYear, setAcademicYear] = useState ('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [dataSource , setDataSource ] = useState([]);
  const [gradeValue , setGradeValue] = useState([]);
  const [data, setData] = useState([]);
  // const [, setData] = useState([]);

  const [courseNo , setCourseNo] = useState([]);
  const [term , setTermNo] = useState([]);
  const [empId , setempId] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
    
  try {
        const excludedResponse = await axiosInstance.get(
          `/api/InstCourseAssgts`
        ); // Replace with your course API endpoint
        setData(excludedResponse.data);
        console.log("exc", excludedResponse.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCoursePending = async () => {
    // 0919767497
  try {
        const courseResponse = await axiosInstance.get(
          `/api/CourseRegistrationPendings`
        ); // Replace with your course API endpoint
        setStudentData(courseResponse.data);
        console.log("course", courseResponse.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchCoursePending();
  }, []);


  
  // const generateExcel = () => {
  //   // Create a new workbook
  //   const workbook = XLSX.utils.book_new();
  
  //   // Define sheet data
  //   const sheetData = [
  //     ["No.", "StudID", "FullName", "Test 1(20%)", "Test 2(10%)", "mid", "Final", "total"],
  //     [1, 'ADO?0001/24', 'Diriba Megersa', 20, 7, 16, 45, 88],
  //     [2, 'ADO?0002/24', 'Kalkidan Misgn', 20, 8, 17, 35, 80],
  //     [3, 'ADO?0003/24', 'able mulu', 15, 9, 18, 36, 78],
  //     [4, 'ADO?0004/24', 'Tomas beyene', 8, 10, 19, 37, 74],
  //     [5, 'ADO?0005/24', 'sole Mola', 10, 6, 11, 38, 65],
  //     [6, 'ADO?0006/24', 'Bonsa Semere', 19, 7, 12, 39, 77],
  //     [7, 'ADO?0007/24', 'Taylor Perry', 17, 8, 13, 40, 78],
  //     [8, 'ADO?0008/24', 'Tiki Gelana', 12, 9, null, null, null]
  //   ];
  
  //   // Create worksheet
  //   const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  
  //   // Add the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
  //   // Generate blob from workbook
  //   const workbookBlob = XLSX.write(workbook, { type: 'blob' });
  
  //   // Create a temporary URL for the blob
  //   const workbookUrl = URL.createObjectURL(workbookBlob);
  
  //   // Create a link element to trigger download
  //   const link = document.createElement('a');
  //   link.href = workbookUrl;
  //   link.download = 'output.xlsx';
  //   document.body.appendChild(link);
  
  //   // Trigger the download
  //   link.click();
  
  //   // Clean up
  //   URL.revokeObjectURL(workbookUrl);
  // };

  const handleFileUploads = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
const workbook = XLSX.read(data, { type: 'array' });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Filter data based on row index
const firstPartIndex = 5; // Specify the row index for separation
const firstPart = jsonData.slice(0, firstPartIndex);
const secondPart = jsonData.slice(firstPartIndex);

// Transpose each part separately
const transposeData = (data) =>
  data[0].map((_, colIndex) => data.map((row) => row[colIndex]));

  const transposeDataBack = (data) =>
  data[0].map((_, colIndex) => data.map((row) => row[colIndex]));

  const filteredData = jsonData.filter(row => row.length > 0);


const transposedFirstPart = transposeData(firstPart);
const transposedSecondPart = transposeData(secondPart);
const transback = transposeDataBack(transposedSecondPart);



console.log("te" ,filteredData)

console.log('First Part:', firstPart);
console.log('Second Part:', secondPart);
console.log('Transposed First Part:', transposedFirstPart);
console.log('Transposed Second Part:', transposedSecondPart);
console.log('Transposed row Part:', transback);
  setDataSource(secondPart);
  setGradeValue(firstPart);


    // You can then set the state or perform any other operation with the data
    };
    reader.readAsArrayBuffer(file);
  };
  const transposeData = (courseNo, term, empId) => {
    const transposedData = [];
    // Assuming the first row contains headers, excluding them from transposition
    for (let i = 1; i < dataSource.length; i++) {
      const row = dataSource[i];
      const studID = row[1]; // Assuming StudID is always at index 1
      for (let j = 3; j < row.length - 1; j++) { // Skipping No., StudID, FullName, and total
        const weight = dataSource[0][j];
        const result = row[j];
        transposedData.push({ StudID: studID, weight: weight, result: result ,course: courseNo ,TermId: term , empId: empId });
      }
    }
    return transposedData;
  };

  const transposeDatas = (courseNo, term, empId) => {
    const transposedData = [];
    // Assuming the first row contains headers, excluding them from transposition
    for (let i = 1; i < dataSource.length; i++) {
      const row = dataSource[i];
      const studID = row[1]; // Assuming StudID is always at index 1
      const total = row[row.length - 1]; 
      // Assuming the "total" value is always at the end of the row

      let grade = '';
    if (total !== null) {
      if (total >= 85) grade = 'A';
      else if (total >= 80) grade = 'A-';
      else if (total >= 75) grade = 'B+';
      else if (total >= 70) grade = 'B';
      else if (total >= 60) grade = 'C+';
      else if (total >= 50) grade = 'C';
      else if (total >= 45) grade = 'D';
      else grade = 'F';
    }
      transposedData.push({ StudID: studID, total: total, letterGrade: grade ,course: courseNo, TermId: term, empId: empId });
    }
    return transposedData;
  };
  

  
  
  // const [transposedData, setTransposedData] = useState();
 
  const handleSubmitData = () => {
    const filteredData =  data
    .filter(item => item.courseNo === "AcFn 101") // Change the courseNo as needed
    .map(item => ({
      courseNo: item.courseNo,
      termId: item.termId,
      instrId: item.instrId
    }));

    if (filteredData.length > 0) {
      const firstItem = filteredData[0];
     
      console.log("sort is is ", transposeData(firstItem.courseNo, firstItem.termId, firstItem.instrId));
      console.log("sort is is ", transposeDatas(firstItem.courseNo, firstItem.termId, firstItem.instrId));

    } else {
      console.log("Filtered data is empty");
    }

  



  
  };

  const convertToLetterGrade = (grade) => {
    if (grade > 85) {
      return 'A+';
    } else if (grade > 80) {
      return 'A-';
    } else if (grade > 75) {
      return 'B+';
    } else if (grade > 70) {
      return 'B';
    } else if (grade > 65) {
      return 'B-';
    } else if (grade > 60) {
      return 'C+';
    } else if (grade > 50) {
      return 'C';
    } else {
      return 'F';
    }
  };

  const handleAcadamic = async (value) => {
    setAcademicYear(value);
  };
  const handleCourse = async(value) =>{
    setCourse(value);
  }
  const handleSemister = async (value) => {
       setSemester(value);
  }

  const MyTableComponent = ({ data }) => {
    // Separate columns and data
    const [columns, ...dataSource] = data;
  
    // Check if the "total" value exists in the column data
    const hasTotal = columns.includes('total');
    console.log('Has Total:', hasTotal);

    let antdColumns = columns.map((title, index) => {
      let columnDefinition = {
        title,
        dataIndex: index.toString(), // Use index as the dataIndex
        key: index.toString(),
      };

      return columnDefinition;
    });
  
    // Check if the "total" value exists in the column data
    if (hasTotal) {
        // Add new columns for Grade, NG, IA, and F
        const newColumns = [
          {
            title: 'Grade',
            key: 'grade',
            render: (text, record) => {
              const total = record[columns.indexOf('total')];
              if (total === null) return '';
              if (total >= 85) return 'A';
              if (total >= 80) return 'A-';
              if (total >= 75) return 'B+';
              if (total >= 70) return 'B';
              if (total >= 60) return 'C+';
              if (total >= 50) return 'C';
              if (total >= 45) return 'D';
              return 'F';
            }
          },
          {
            title: 'NG',
            key: 'ng',
            render: (text, record) => {
              const total = record[columns.indexOf('total')];
              if (total === null || total < 40) return 'NG';
              return '';
            }
          },
          {
            title: 'IA',
            key: 'ia',
            render: (text, record) => {
              const total = record[columns.indexOf('total')];
              if (total === null || total < 40) return 'IA';
              return '';
            }
          },
          {
            title: 'F',
            key: 'f',
            render: (text, record) => {
              const total = record[columns.indexOf('total')];
              if (total === null || total < 40) return 'F';
              return '';
            }
          }
        ];
    
        // Include new columns in the column definitions
        antdColumns = [...antdColumns, ...newColumns];
    }
    
   
  
    // Transform data for Antd Table
    const antdDataSource = dataSource.map((rowData, rowIndex) => {
      const rowDataObject = {};
      rowData.forEach((cellData, cellIndex) => {
        rowDataObject[cellIndex.toString()] = cellData; // Use index as the key
      });
      return { key: rowIndex.toString(), ...rowDataObject };
    });
  
    return <Table columns={antdColumns} dataSource={antdDataSource} />;
};


function generateTable(data, ref) {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  // Iterate over each row in the JSON data
  data.forEach(rowData => {
    const row = document.createElement('tr');

    // Iterate over each cell in the row
    rowData.forEach(cellData => {
      const cell = document.createElement('td');
      cell.textContent = cellData !== null ? cellData.toString() : ''; // Convert null to empty string
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  // Add the tbody to the table
  table.appendChild(tbody);

  // Assign the ref to the table
  if (ref) {
    ref.current = table;
  }

  return table;
}

const jsonData = [
  [null, 'Admas University'],
  [null, 'Office of the Registrar'],
  [null, 'Student Assessment sheet'],
  [null, 'CourseName: (AcFn 101) Introduction to Accounting'],
  [null, 'Term: ADOL/I/2024/2025', null, ' Semester:I', 'AcadYear: 2024/2025', null, null, 'Instructor: (EMi234) (Kalkidan)'],
  ['No.', 'StudID', 'FullName'],

  // Add more rows here if needed
];
useEffect(() => {
  generateTable(jsonData, tableRef);
}, [jsonData]);


 
  return (
    <div className="mb-8 flex flex-col gap-6 bg-white p-5 rounded-md">
    {/* <SiderGenerator /> */}
<div className="list-header mb-2 ml-100">
  <h1 className="text-2xl  font-[600] font-jakarta ml-[2%]  mb-[2%] mt-[2%]">Grade Submission</h1>
</div>
<div className="list-sub mb-10 ml-[2%] ">
 {/* {handleGrade()} */}
  <div className="list-filter"></div> 
       
  <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' , justifyContent: 'flex-start' , display:'flex' }}>

      <div style={{display:'flex' , flexDirection:'column', marginRight:'20%'}}>
      <label>Section</label>  
      <Select 
  value={academicYear} 
   onChange={handleAcadamic} 
  // placeholder="Select Academic Year"
  style={{ marginRight: '8px', width:350 , height:40 }}
>     {data.map(center => (
            <Option key={center.sectionId} value={center.sectionId}>
              {center.sectionId}
            </Option>
          ))}
</Select>
        </div>

        <div style={{display:'flex' , flexDirection:'column'}}>
      <label>Course</label> 
        <Select value={course} onChange={handleCourse} placeholder="Select Course" style={{
             marginRight: '8px',  width:350 , height:40 }}>
          {/* Add course options */}
          {data.map(center => (
            <Option key={center.courseNo} value={center.courseNo}>
              {center.courseNo}
            </Option>
          ))}
        </Select>
        </div>
      </div>
            <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' , justifyContent:'flex-start' , display:'flex' }}>
     
            

      <div style={{display:'flex' , flexDirection:'column', marginRight:'20%'}}>
      <label>Semister</label> 
        <Select value={semester} onChange={handleSemister} placeholder="Select Semester" 
        style={{ marginRight: '8px',  width:350 , height:40 }}>
          {/* Add semester options */}
          {data.map(center => (
            <Option key={center.termId} value={center.termId}>
              {center.termId}
            </Option>
          ))}

        </Select>
        </div>
        
        </div>
        <div style={{ marginTop:'20px',marginBottom: '16px' , flexDirection :'row' , justifyContent: 'flex-start' , display:'flex', backgroundColor: '#CFE4D9'}}>
        <input type="file" accept=".xlsx" onChange={handleFileUploads} />
\
        <div style={{ position: 'relative' }}>

            <span style={{ marginLeft: '8px' }}>No file selected</span> {/* You can display the selected file name here */}
</div>

<DownloadTableExcel 
        filename="student grade table"
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <Button type="primary"   style={{ marginBottom: 16 ,marginLeft:'2%', marginTop :20, backgroundColor:'#FFF', color:'#4279A6', marginRight:"20%" }}>Generate</Button>

      </DownloadTableExcel>
        <Button type="primary" onClick={handleSubmitData} style={{ marginBottom: 16 , margingLeft:20, marginTop :20, backgroundColor:'#4279A6'  }}>Submit</Button>
        </div>
        {dataSource && dataSource.length > 0 && <MyTableComponent data={dataSource} />}    </div>

        <div>
     

      {/* Render the table using the ref */}
      <div ref={tableRef}></div>
    </div>
    </div>
  );
};

export default GradeSubmission;
