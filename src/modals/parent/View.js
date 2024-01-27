import React, { useState } from 'react';
import { Button, Modal, Row, Col, Form, Select, Input, DatePicker } from 'antd';
import moment from "moment";

function View({ openView, handleViewCancel, data }) {
    return (
        <>
            <Modal
                visible={openView}
                title="Parent Profile"
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
                                <Input value={data.first_name} />
                            </Form.Item>
                            <Form.Item label="Last Name">
                                <Input value={data.last_name} />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input value={data.email} />
                            </Form.Item>
                            <Form.Item label="Phone">
                                {data.phone?.map((item, index) => {
                                    return <Input value={item} />;
                                })}
                            </Form.Item>
                            <Form.Item label="Student">
                                <Input defaultValue={data.student} />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

            </Modal>
        </>
    )
}

export default View