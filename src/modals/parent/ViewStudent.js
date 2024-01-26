import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, Select, Input, DatePicker } from 'antd';
import moment from "moment";
import { Space, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { firebaseAuth, firestoreDb } from "../../../firebase";
import { Link } from "react-router-dom";

function ViewStudent({ openView, handleViewCancel, data }) {
 
    const [classData, setClassData] = useState([]);

    const children = [];

    const getClass = async () => {
        const q = query(
          collection(firestoreDb, "students"),
          where("phone", "array-contains", `${data.phone_numbers}`)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          var datas = doc.data();
          children.push({
            ...datas,
            key: doc.id,
          });
        });
        setClassData(children);
        console.log("student data  ", classData)
      };
    
      useEffect(() => {
        getClass();
      }, []);


    return (
        <>
            <Modal
                visible={openView}
                title="Student Details Profile"
                onCancel={handleViewCancel}
                width={756}
                footer={[
                    <Button key="back" onClick={handleViewCancel}>
                        Return
                    </Button>,

                ]}
            >
                <Row>
                    <Col style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={data.avater} alt="" style={{ width: "330px" }} />
                    </Col>
                    <Col style={{ width: "50%", padding: "10px" }}>
                        <Form
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 18 }}
                            layout="horizontal"
                        >
                            <Form.Item label="First Name">
                            {classData.map((item, index) => (
                               <Input value={item.first_name} />
                            ))}
                            </Form.Item>
                            <Form.Item label="Last Name">
                            {classData.map((item, index) => (
                               <Input value={item.last_name} />
                            ))}
                            </Form.Item>
                            <Form.Item label="Email">
                            {classData.map((item, index) => (
                               <Input value={item.email} />
                            ))}
                            </Form.Item>
                            <Form.Item label="Phone">
                            {classData.map((item, index) => (
                               <Input value={item.phone_numbers}  />
                            ))}
                                {/* {data.phone?.map((item, index) => {
                                    return <Input value={item} />;
                                })} */}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

            </Modal>
        </>
    )
}

export default ViewStudent;