import React, { useState } from 'react';
import { Table, Modal, Button, Form, Input, Select, Tag } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/user";
import DepartmentHead from './Department_Head';
import DepartmentCourse from './Deparment_Course';

const { Option } = Select;

const DepartmentAdmin = () => {
  const dispatch = useDispatch();
  const [isGrade,setIsGrade] = useState(true);
  const [isCourse,setIsCourse] = useState(false);
  // Sample data for students, courses, lectures, and grades

  const handleGrade = () => {
    setIsGrade(true);
    setIsCourse(false)
  };

  const handleCourse = () => {
    setIsGrade(false);
    setIsCourse(true)
  };

  
  const handlelogout =() =>{
    dispatch(userAction.logout());
  }

  return (
    <div className='mb-8 flex flex-col gap-6 bg-white p-5 rounded-md'>
          
    <div style={{ padding: '20px' }}>
       {isGrade?  <DepartmentHead  /> : null }   
      <div>
        {isCourse ? <DepartmentCourse />  : null }
          {/* <h2>Current Campus:</h2>
          <pre>{JSON.stringify(campus, null, 2)}</pre>
          <h2>Current User:</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
        </div>
    </div>
  );
};

export default DepartmentAdmin;
