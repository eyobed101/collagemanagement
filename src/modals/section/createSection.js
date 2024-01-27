import React, { useState } from 'react'
import { Button, Modal, Form, Input, message } from 'antd';
import { useSelector } from "react-redux";
import { async } from '@firebase/util';
import {
    doc,
    setDoc,
    getDocs,
    collection,
    where,
    query,
} from "firebase/firestore";
import { firestoreDb, storage } from "../../../firebase";
import uuid from "react-uuid";

function CreateSection() {

    const uid = useSelector((state) => state.user.profile);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [newSection, setNewSection] = useState({
        name: "",
        school_id: uid.school,
    });

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setLoading(true);
        setDoc(doc(firestoreDb, "sections", uuid()), newSection).then(response => {
            message.success("Data successfuly added")
            setLoading(false);
            setOpen(false);
        }).caches(error => {
            message.error("Data is not added, Please try again")
            setLoading(false);
        })

    };

    const handleCancel = () => {
        setOpen(false);
    };
    const handleSection = (e) => {
        setNewSection({ ...newSection, name: e.target.value });
    };
    return (
        <>
            <Button onClick={showModal} style={{
                padding: 20,
                backgroundColor: "black",
                marginBottom: 20,
                color: "white",
                borderRadius: 10,
                float: 'right',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                Add Section
            </Button>
            <Modal
                visible={open}
                title="Add Section"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item label="Section">
                        <Input onChange={(e) => handleSection(e)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateSection