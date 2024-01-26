import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
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
import TextArea from "antd/lib/input/TextArea";
import { faAdd, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateSubject() {
  const uid = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: "",
    description: "",
    school_id: uid.school,
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    const q = query(
      collection(firestoreDb, "subject"),
      where("name", "==", newSubject.name)
    );
    const checkIsExist = (await getDocs(q)).empty;
    if (checkIsExist) {
      setLoading(true);
      setDoc(doc(firestoreDb, "subject", uuid()), newSubject)
        .then((response) => {
          message.success("Data successfuly added");
          setLoading(false);
          setOpen(false);
        })
        .catch((error) => {
          message.error("Data is not added, Please try again");
          setLoading(false);
        });
    } else {
      message.warning("Subject Already exist");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleSubject = (e) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Button
        style={{
          borderRadius: "8px",
          borderWidth: 1,
        }}
        icon={<FontAwesomeIcon className="pr-2" icon={faAdd} />}
        className=" !text-[white] !bg-[#15C9CE] hover:!text-[white]"
        onClick={showModal}
      >
        Add Subject
      </Button>
      {open ? (
        <Modal
          visible={open}
          title="Add Subject"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Exit
            </Button>,
            <Button key="submit" loading={loading} onClick={handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
          >
            <Form.Item
              label="Subject"
              name="Subject"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="name" onChange={(e) => handleSubject(e)} />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea name="description" onChange={(e) => handleSubject(e)} />
            </Form.Item>
          </Form>
        </Modal>
      ) : null}
    </>
  );
}

export default CreateSubject;
