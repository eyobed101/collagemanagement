import React, { useState, useEffect } from "react";
import { Select,Button, Table, Input, Modal, Form, message } from "antd";
import axiosInstance from "@/configs/axios";
import moment from "moment";

const { Option } = Select;

const MaintainAssessment = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [course, setCourse] = useState("");

  const [semester, setSemester] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredStudent, setFilteredStudent] = useState(studentData);
  const [editedAssessment, setEditedAssessment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateDatas, setUpdateData] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);
  const [isrequired, setIsRequired] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axiosInstance.get("/api/StudentMarks");
        //  setAssessment(response.data);
        setStudentMarks(response.data);
        console.log("assessment is with", response.data);
      } catch (error) {
        console.error("Error fetching assessment data:", error);
      }
    };

    fetchAssessment();
  }, []);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axiosInstance.get("/api/AssessmentWeights");
        setAssessment(response.data);
        console.log("assessment", response.data);
      } catch (error) {
        console.error("Error fetching assessment data:", error);
      }
    };

    fetchAssessment();
  }, []);

  useEffect(() => {
    const fetchCoursePending = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/CourseRegistrationPendings"
        );
        setStudentData(response.data);
        console.log("studentData", response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchCoursePending();
  }, []);

  useEffect(() => {
    const fetchCoursePending = async () => {
      try {
        const response = await axiosInstance.get("/api/Grades");
        // setStudentData(response.data);
        console.log("Grade data", response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchCoursePending();
  }, []);

  // const handleShowData = () => {
  //   // Filter student data based on selected academic year, course, and semester
  //   // Here, you should fetch the data from your API based on the selected filters
  //   // For demo purposes, filtering the mock data
  //   const filteredData = studentData.filter(student => {
  //     return student.academic === academicYear && student.course === course;
  //   });
  //   setStudentData(filteredData);
  // };

  const handleAcademic = (value) => {
    setAcademicYear(value);
  };

  const handleCourse = (value) => {
    setCourse(value);
  };

  const handleSemester = (value) => {
    setSemester(value);
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingKey(record.key);
    setEditedAssessment(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const cancel = () => {
    setEditingKey("");
    setModalVisible(false);
  };

  const handleSave = () => {
    const savedData = filteredStudent.flatMap((student) =>
      assessment.map((assessment) => ({
        studID: student.StudId,
        courseNo: student.CourseNo,
        termID: student.TermId,
        assessmentName: assessment.assessmentTitle,
        assessmentWeight: parseFloat(student[assessment.assessmentTitle]) || 0,
        assessmentDate: student.DateSubmitted,
        instID: student.SubmitBy,
      }))
    );

    console.log(savedData);
    const getLetterGrade = (total) => {
      if (total >= 90) {
        return "A+";
      } else if (total >= 85) {
        return "A";
      } else if (total >= 80) {
        return "A-";
      } else if (total >= 75) {
        return "B+";
      } else if (total >= 70) {
        return "B";
      } else if (total >= 65) {
        return "B-";
      } else if (total >= 60) {
        return "C+";
      } else if (total >= 50) {
        return "C";
      } else if (total >= 45) {
        return "D";
      } else {
        return "F";
      }
    };
    const extractedData = filteredStudent.map((item) => ({
      termId: item.TermId,
      courseNo: item.CourseNo,
      studId: item.StudId,
      courseGrade: getLetterGrade(item.total),
      submitBy: item.SubmitBy,
      dateSubmitted: moment().format("YYYY-MM-DD"),
      updated: null,
      updateReason: null,
      updateBy: item.SubmitBy,
      exempted: "No",
      reason: null,
      mark: item.total,
      thesisResult: null,
      thesisTitle: null,
    }));

    console.log("booo", extractedData);
    let markupdated = false;
    const postStudentMarks = async () => {
      for (let i = 0; i < savedData.length; i++) {
        await axiosInstance
          .post(`/api/StudentMarks/`, savedData[i])
          .then((response) => {
            console.log("Assesment Created successfully:", response.data);
            message.success("Student mark created Successfully");
            markupdated = true;
          })
          .catch((error) => {
            console.error("Error creating Assesment:", error);
            // message.error("Error creating student mark")
          });
      }
    };
    const post = async () => {
      for (let i = 0; i < extractedData.length; i++) {
        await axiosInstance
          .put(`/api/Grades`, [extractedData[i]])
          .then((response) => {
            console.log("Grade Updated successfully:", response.data);
            message.success(" Grade Updated Successfully");
          })
          .catch((error) => {
            console.error("Error creating Grade:", error);
            // message.error("Error creating Grade")
          });
      }
    };

    postStudentMarks();

    setTimeout(() => {
      if (markupdated) {
        post();
      }
    }, 1000);

    const studIDGroups = savedData.reduce((acc, curr) => {
      acc[curr.studID] = acc[curr.studID] || [];
      acc[curr.studID].push(curr);
      return acc;
    }, {});

    // Check if any studID has multiple assessmentWeight values equal to 0
    const studIDsWithMultipleZeroWeights = Object.keys(studIDGroups).filter(
      (studID) => {
        const weights = studIDGroups[studID].map(
          (data) => data.assessmentWeight
        );
        const zeroCount = weights.filter((weight) => weight === 0).length;
        return zeroCount > 1; // Change this condition if you want to check for more than 1 zero weight
      }
    );

    if (studIDsWithMultipleZeroWeights.length > 0) {
      alert(
        `The following studIds have multiple assessmentWeight values equal to 0 and please do all the required: ${studIDsWithMultipleZeroWeights.join(
          ", "
        )}`
      );
      return;
    }
  };

  const save = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(today.getDate()).padStart(2, "0");

    const assessmentDate = `${year}-${month}-${day}`;

    form
      .validateFields()
      .then(async (values) => {
        const newData = [...studentData];
        const index = newData.findIndex(
          (item) => editedAssessment.key === item.key
        );

        if (index > -1) {
          const updatedItem = newData[index];
          newData.splice(index, 1, { ...updatedItem, ...values });
          setStudentData(newData);
          setEditingKey("");
          setModalVisible(false);
          newData[index].total = calculateTotal(updatedItem, values);
        }

        console.log("new", newData);
        const assessments = [];
        newData.forEach((data) => {
          const {
            StudId,
            CourseNo,
            TermId,
            SubmitBy,
            ...assessmentDetails
          } = data;
          Object.entries(assessmentDetails).forEach(
            ([assessmentName, assessmentWeight]) => {
              // Skip keys that are not assessment names
              if (
                ![
                  "CourseNo",
                  "DateRegistered",
                  "DateSubmitted",
                  "KeyNames",
                  "Registered",
                  "Section",
                  "SectionId",
                  "Stud",
                  "SubmitBy",
                  "SubmitByNavigation",
                  "Term",
                  "TermId",
                  "total",
                  "CourseNoNavigation",
                ].includes(assessmentName)
              ) {
                assessments.push({
                  studId: StudId,
                  courseNo: CourseNo,
                  termId: TermId,
                  instID: SubmitBy,
                  assessmentDate: assessmentDate,
                  assessmentName: assessmentName,
                  assessmentWeight: parseFloat(assessmentWeight),
                });
              }
            }
          );
        });
        console.log("hawaii", assessments);
        setUpdateData([...updateDatas, assessments]);
        for (let i = 0; i < assessments.length; i++) {
          await axiosInstance
            .put(`/api/StudentMarks`, assessments[i])
            .then((response) => {
              console.log("Assesment deleted successfully:", response.data);
              message.success("Student mark Deleted Successfully");
            })
            .catch((error) => {
              console.error("Error creating Assesment:", error);
              message.error("Error creating student mark");
            });
        }
      })
      .catch((errorInfo) => {
        console.log("Save failed:", errorInfo);
      });
  };

  const calculateTotal = (editedValues) => {
    let total = 0;
    assessment.forEach((assessment) => {
      const score =
        editedValues[
          assessment.assessmentTitle.toLowerCase().replace(/\s+/g, "")
        ] || 0;
      total += parseFloat(score);
      if (total > 100 || total < 0) {
        message.error("Total  value invalid please input valid number");
        return;
      }
    });
    return total.toFixed(2);
  };

  const assessmentColumns = assessment.map((assessment) => ({
    title: `${assessment.assessmentTitle} (${assessment.assessWeight}%)`,
    dataIndex: assessment.assessmentTitle,
    key: assessment.assessmentTitle,
    editable: true,
  }));

  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ID No",
      dataIndex: "StudId",
      key: "StudId",
    },
    ...assessment.map((assessment) => ({
      title: assessment.assessmentTitle,
      dataIndex: assessment.assessmentTitle,
      key: assessment.assessmentTitle,
      render: (text, record) => (
        <div>
          <Input
            style={{
              borderColor:
                record[assessment.assessmentTitle] === undefined
                  ? "red"
                  : "transparent",
            }}
            onChange={(e) =>
              handleScoreChange(
                record,
                assessment.assessmentTitle,
                e.target.value
              )
            }
            value={record[assessment.assessmentTitle]}
          />
        </div>
      ),
    })),
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => record.total,
    },
    {
      title: "Grade",
      dataIndex: "Grade",
      key: "Grade",
      render: (text, record) => {
        const total = record.total;
        let grade;
        if (total >= 90) {
          grade = "A+";
        } else if (total >= 85) {
          grade = "A";
        } else if (total >= 80) {
          grade = "A-";
        } else if (total >= 75) {
          grade = "B+";
        } else if (total >= 70) {
          grade = "B";
        } else if (total >= 65) {
          grade = "B-";
        } else if (total >= 60) {
          grade = "C+";
        } else if (total >= 50) {
          grade = "C";
        } else if (total >= 45) {
          grade = "D";
        } else {
          grade = "F";
        }
        return grade;
      },
    },
    {
      title: "NG",
      dataIndex: "ng",
      key: "ng",
      render: (text, record) => {
        if (record.total === null || record.Final === null) return "NG";
        return "";
      },
    },
    {
      title: "IA",
      dataIndex: "ia",
      key: "ia",
      render: (text, record) => {
        if (record.total === null || record.total < 30) return "IA";
        return "";
      },
    },
    {
      title: "F",
      dataIndex: "f",
      key: "f",
      render: (text, record) => {
        if (record.total < 40) return "F";
        return "";
      },
    },
  ];

  const handleScoreChange = (record, assessmentName, value) => {
    const updatedData = filteredStudent.map((item) => {
      if (item.StudId === record.StudId) {
        item[assessmentName] = value;

        // Recalculate the total
        let total = 0;
        assessment.forEach((assessment) => {
          if (
            assessment.courseNo === item.CourseNo &&
            assessment.termID === item.TermId
          ) {
            const score = parseFloat(item[assessment.assessmentTitle]) || 0;
            total += score;
          }
        });
        if (total < 100 && total > 0) {
          item.total = total;
        } else {
          alert(
            "The total value is invalid rewrite the marks with the right Calculation "
          );
        }
      }
      return item;
    });

    setFilteredStudent(updatedData);
    console.log(updatedData);
  };

  const EditAssessmentModal = ({ visible, onCancel, onSave, rowData }) => {
    const [secondform] = Form.useForm();

    // Handle save action
    const handleSave = () => {
      secondform.validateFields().then((values) => {
        onSave({ ...rowData, ...values });
      });
    };

    return (
      <Modal
        visible={visible}
        title="Edit Assessment"
        onCancel={onCancel}
        onOk={handleSave}
      >
        <Form form={secondform} layout="vertical" initialValues={rowData}>
          <Form.Item label="StudId" name="StudId" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          {/* Add form items for each assessment */}
          {Object.entries(rowData)
            .filter(
              ([key]) => key !== "No" && key !== "StudId" && key !== "Total"
            )
            .map(([key, value]) => (
              <Form.Item
                key={key}
                label={key}
                name={key}
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
            ))}
        </Form>
      </Modal>
    );
  };

  const CreateAssessmentModal = ({
    visible,
    onCancel,
    onSave,
    studentData,
  }) => {
    const [form] = Form.useForm();

    // const handleSave = () => {
    //   form.validateFields().then((values) => {
    //     onSave(values);
    //   });
    // };

    return (
      <Modal
        visible={visible}
        title="Create Student Marks"
        onCancel={onCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="StudId" name="StudId" rules={[{ required: true }]}>
            <Select>
              {/* Populate dropdown options */}
              {studentData.map((student) => (
                <Option key={student.StudId} value={student.StudId}>
                  {student.StudId}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Add form items for each assessment */}
          {assessment.map((item) => (
            <Form.Item
              key={item.key}
              label={`${item.assessmentTitle} (${item.assessWeight}%)`}
              name={item.assessmentTitle}
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    );
  };

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleCreate = () => {
    setCreateModalVisible(true);
    setSelectedStudentId([]);
  };

  const handleCreateSave = async (values) => {
    // Here you can save the new student marks
    // values object will contain StudId and assessment scores
    console.log("Creating new student marks", values);
    const updatedAssessmentWeights = assessment.map((assessmentItem) => {
      const assessmentName = assessmentItem.assessmentTitle;
      const assessmentWeight = values[assessmentName];
      console.log("what", assessmentWeight);
      if (typeof assessmentWeight === "string") {
        // Convert string to number if it's a string
        values[assessmentName] = parseFloat(assessmentWeight);
      }

      const studentMark = studentData.find(
        (student) => student.StudId === values.StudId
      );

      // Add an ID to updatedAssessmentWeights
      const courseNo = studentMark ? studentMark.CourseNo : null;
      const termID = studentMark ? studentMark.TermId : null;
      const instID = studentMark ? studentMark.SubmitBy : null;

      return {
        studID: values.StudId,
        courseNo: courseNo, // Assuming you have access to course here
        termID: termID, // Assuming you have access to semester here
        instID: instID, // Assuming this is a constant for now
        assessmentDate: "2024-04-19", // Assuming this is a constant for now
        assessmentName: assessmentItem.assessmentTitle,
        assessmentWeight: values[assessmentName] || 0,
      };
    });

    let total = 0;
    updatedAssessmentWeights.forEach((assessment) => {
      total += assessment.assessmentWeight || 0;
    });

    console.log("Total:", total);

    // Update updateData state with the updated assessment weights
    // setUpdateData([...studentMarks ,updatedAssessmentWeights]);

    console.log(
      "Updated assessment weights  created",
      updatedAssessmentWeights
    );
    for (let i = 0; i < updatedAssessmentWeights.length; i++) {
      await axiosInstance
        .post(`/api/StudentMarks/`, updatedAssessmentWeights[i])
        .then((response) => {
          console.log("Assesment Created successfully:", response.data);
          message.success("Student mark created Successfully");
        })
        .catch((error) => {
          console.error("Error creating Assesment:", error);
          // message.error("Error creating student mark")
        });
    }

    setCreateModalVisible(false);
  };

  const MyTableData = ({ data }) => {
    // Extract unique assessment names
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const handleEdit = (record) => {
      setSelectedRowData(record);
      setModalVisible(true);
    };

    const handleDelete = async (record) => {
      // setSelectedRowData(record);
      const updatedAssessmentWeights = assessment.map((assessmentItem) => {
        const assessmentName = assessmentItem.assessmentTitle;
        const assessmentWeight = record[assessmentName];
        console.log("what", assessmentWeight);
        if (typeof assessmentWeight === "string") {
          // Convert string to number if it's a string
          record[assessmentName] = parseFloat(assessmentWeight);
        }

        const studentMark = studentMarks.find(
          (student) =>
            student.studID === record.StudId &&
            student.assessmentName === assessmentName
        );

        // Add an ID to updatedAssessmentWeights
        const id = studentMark ? studentMark.id : null;
        const courseNo = studentMark ? studentMark.courseNo : null;
        const termID = studentMark ? studentMark.termID : null;
        const instID = studentMark ? studentMark.instID : null;

        return {
          id: id,
          studID: record.StudId,
          courseNo: courseNo, // Assuming you have access to course here
          termID: termID, // Assuming you have access to semester here
          instID: instID, // Assuming this is a constant for now
          assessmentDate: "2024-04-19", // Assuming this is a constant for now
          assessmentName: assessmentItem.assessmentTitle,
          assessmentWeight: record[assessmentName] || 0,
        };
      });

      let total = 0;
      updatedAssessmentWeights.forEach((assessment) => {
        total += assessment.assessmentWeight || 0;
      });

      console.log("Total:", total);

      // Update updateData state with the updated assessment weights
      // setUpdateData([...studentMarks ,updatedAssessmentWeights]);
      console.log("Updated assessment weights", updatedAssessmentWeights[0]);
      for (let i = 0; i < updatedAssessmentWeights.length; i++) {
        await axiosInstance
          .delete(`/api/StudentMarks`, updatedAssessmentWeights[i])
          .then((response) => {
            console.log("Assesment deleted successfully:", response.data);
            message.success("Student mark Deleted Successfully");
          })
          .catch((error) => {
            console.error("Error creating Assesment:", error);
            message.error("Error creating student mark");
          });
      }

      // setModalVisible(true);
    };

    const handleModalCancel = () => {
      setModalVisible(false);
    };

    const handleModalSave = async (updatedData) => {
      // Update updateData state with the updated assessment weights
      console.log("test", updatedData);

      const updatedAssessmentWeights = assessment.map((assessmentItem) => {
        const assessmentName = assessmentItem.assessmentTitle;
        const assessmentWeight = updatedData[assessmentName];
        console.log("what", assessmentWeight);
        if (typeof assessmentWeight === "string") {
          // Convert string to number if it's a string
          updatedData[assessmentName] = parseFloat(assessmentWeight);
        }

        const studentMark = studentMarks.find(
          (student) =>
            student.studID === updatedData.StudId &&
            student.assessmentName === assessmentName
        );

        // Add an ID to updatedAssessmentWeights
        const id = studentMark ? studentMark.id : null;
        const courseNo = studentMark ? studentMark.courseNo : null;
        const termID = studentMark ? studentMark.termID : null;
        const instID = studentMark ? studentMark.instID : null;

        return {
          id: id,
          studID: updatedData.StudId,
          courseNo: courseNo, // Assuming you have access to course here
          termID: termID, // Assuming you have access to semester here
          instID: instID, // Assuming this is a constant for now
          assessmentDate: "2024-04-19", // Assuming this is a constant for now
          assessmentName: assessmentItem.assessmentTitle,
          assessmentWeight: updatedData[assessmentName] || 0,
        };
      });

      let total = 0;
      updatedAssessmentWeights.forEach((assessment) => {
        total += assessment.assessmentWeight || 0;
      });

      console.log("Total:", total);

      // Update updateData state with the updated assessment weights
      // setUpdateData([...studentMarks ,updatedAssessmentWeights]);
      const getLetterGrade = (total) => {
        if (total >= 90) {
          return "A+";
        } else if (total >= 85) {
          return "A";
        } else if (total >= 80) {
          return "A-";
        } else if (total >= 75) {
          return "B+";
        } else if (total >= 70) {
          return "B";
        } else if (total >= 65) {
          return "B-";
        } else if (total >= 60) {
          return "C+";
        } else if (total >= 50) {
          return "C";
        } else if (total >= 45) {
          return "D";
        } else {
          return "F";
        }
      };

      const extractedData = {
        termId: updatedAssessmentWeights[0].termID,
        courseNo: updatedAssessmentWeights[0].courseNo,
        studId: updatedData.StudId,
        courseGrade: getLetterGrade(total),
        submitBy: updatedAssessmentWeights[0].instID,
        dateSubmitted: moment().format("YYYY-MM-DD"),
        updated: null,
        updateReason: null,
        updateBy: updatedAssessmentWeights[0].instID,
        exempted: "No",
        reason: null,
        mark: total,
        thesisResult: null,
        thesisTitle: null,
      };
      let marks = false;
      console.log("booo  updated value ", extractedData);
      console.log("Updated assessment weights", updatedAssessmentWeights);

      for (let i = 0; i < updatedAssessmentWeights.length; i++) {
        await axiosInstance
          .put(`/api/StudentMarks/`, [updatedAssessmentWeights[i]])
          .then((response) => {
            console.log("Assesment created successfully:", response.data);
            message.success("Student mark Created Successfully");
            marks = true;
          })
          .catch((error) => {
            console.error("Error creating Assesment:", error);
            message.error("Error creating student mark");
          });
      }

      // Update studentMarks state with the updated assessment weights

      // Update the studentMarks state with the updated array

      // Hide the modal
      setModalVisible(false);
    };

    const uniqueAssessmentNames = [
      ...new Set(data.map((item) => item.assessmentName)),
    ];

    // Generate table data
    const tableData = [];
    const uniqueStudIDs = new Set(data.map((item) => item.studID));
    let index = 0;
    uniqueStudIDs.forEach((studID) => {
      const rowData = {
        No: ++index,
        StudId: studID,
      };
      let total = 0; // Initialize total
      uniqueAssessmentNames.forEach((assessmentName) => {
        const assessmentWeight =
          data.find(
            (item) =>
              item.studID === studID && item.assessmentName === assessmentName
          )?.assessmentWeight || "";
        rowData[assessmentName] = assessmentWeight;
        // Add assessment weight to total
        total += parseFloat(assessmentWeight || 0);
      });
      rowData["Total"] = total; // Add total to rowData
      tableData.push(rowData);
    });

    // Generate columns for table
    const columns = [
      {
        title: "No",
        dataIndex: "No",
        key: "No",
        editable: false,
      },
      {
        title: "StudId",
        dataIndex: "StudId",
        key: "StudId",
        editable: false,
      },
      ...uniqueAssessmentNames.map((assessmentName) => ({
        title: assessmentName,
        dataIndex: assessmentName,
        key: assessmentName,
        editable: true,
      })),
      {
        title: "Total",
        dataIndex: "Total",
        key: "Total",
        editable: false,
      },
      {
        title: "Grade",
        dataIndex: "Grade",
        key: "Grade",
        render: (text, record) => {
          // Determine grade based on total score
          const total = record.Total;
          let grade;
          if (total >= 90) {
            grade = "A+";
          } else if (total >= 85) {
            grade = "A";
          } else if (total >= 80) {
            grade = "A-";
          } else if (total >= 75) {
            grade = "B+";
          } else if (total >= 70) {
            grade = "B";
          } else if (total >= 65) {
            grade = "B-";
          } else if (total >= 60) {
            grade = "C+";
          } else if (total >= 50) {
            grade = "C";
          } else if (total >= 45) {
            grade = "D";
          } else {
            grade = "F";
          }
          return grade;
        },
      },
      {
        title: "NG",
        dataIndex: "ng",
        key: "ng",
        render: (text, record) => {
          if (record["Total"] === null || record["Final"] === null) return "NG";
          return "";
        },
      },
      {
        title: "IA",
        dataIndex: "ia",
        key: "ia",
        render: (text, record) => {
          if (record["Total"] === null || record["Total"] < 30) return "IA";
          return "";
        },
      },
      {
        title: "F",
        dataIndex: "f",
        key: "f",
        render: (text, record) => {
          if (record["Total"] < 40) return "F";
          return "";
        },
      },

      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            {/* <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button> */}
          </>
        ),
      },
    ];

    return (
      <>
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={tableData}
            className="custom-table"
            // pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </div>

        {selectedRowData && (
          <EditAssessmentModal
            visible={modalVisible}
            onCancel={handleModalCancel}
            onSave={handleModalSave}
            rowData={selectedRowData}
          />
        )}
      </>
    );
  };

  const uniqueTerm = new Set(assessment.map((course) => course.termID));
  const uniquecourse = new Set(assessment.map((course) => course.courseNo));

  useEffect(() => {
    filterData();
  }, [course, semester]);

  const filterData = () => {
    if (!course || !semester) {
      setFilteredStudent([]);
      return;
    }
    // const filtered = studentData.filter(
    //   (student) => student.CourseNo == course  && student.TermId == semester
    // );
    const filtered = studentData.map((student) => {
      // Filter matching assessments for the student based on courseNo and termID
      const assessmentsForStudent = assessment.filter(
        (assessment) =>
          assessment.courseNo === student.CourseNo &&
          assessment.termID === student.TermId &&
          student.CourseNo == course &&
          student.TermId == semester
      );

      // Calculate total and transform the record
      let total = 0;
      assessmentsForStudent.forEach((assessment) => {
        const score = parseFloat(student[assessment.assessmentTitle]) || 0;
        total += score;
      });

      return {
        ...student,
        total,
      };
    });
    const filtereds = assessment.filter(
      (student) => student.courseNo == course && student.termID == semester
    );
    const filteredMarks = studentMarks.filter(
      (student) => student.courseNo == course && student.termID == semester
    );
    setFilteredStudent(filtered);
    console.log("horse", filtered);
    setAssessment(filtereds);

    console.log("studentMarks", filteredMarks);
    setStudentMarks(filteredMarks);
  };

  return (
    <div className="mt-8 flex flex-col gap-12 bg-white p-5 rounded-md  min-h-[100vh]">
      <div className="list-header mb-2 ml-100">
        <h1 className="text-2xl font-[600] font-jakarta ml-[2%] mb-[2%] mt-[2%]">
          Maintain Assessment
        </h1>
      </div>

      <div className="list-sub mb-10 ml-[2%] ">
        <div
          style={{
            marginTop: "20px",
            marginBottom: "16px",
            flexDirection: "row",
            justifyContent: "space-between",
            display: "flex",
            flex:"wrap"
          }}
        >
          <div className="flex flex-start w-full">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              marginRight: "10px",
              fontWeight: "600",
            }}
          >
            {/* <label>Course</label> */}
            <Select
              value={course}
              onChange={handleCourse}
              placeholder="Select Course"
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              >
              {/* Add academic year options */}
              <Option value="">
                Select Course
              </Option>
              {[...uniquecourse].map((course, index) => (
                <Option key={index} value={course}>
                  {course}
                </Option>
              ))}
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              marginRight: "10px",
              fontWeight: "600",
            }}
          >
            {/* <label>Semister</label> */}
            <Select
              value={semester}
              onChange={handleSemester}
              placeholder="Select Course"
              className="h-[50px] w-full bg-blue-gray-50 border-2 font-semibold border-[#C1C1C1] text-black block shadow-md sm:text-sm rounded-md"
              >
              <Option value="">
                Select Term
              </Option>
              {[...uniqueTerm].map((course, index) => (
                <Option key={index} value={course}>
                  {course}
                </Option>
              ))}
            </Select>
          </div>
          </div>
          <Button
            type="primary"
            onClick={handleSave}
            style={{
              marginBottom: 16,
              margingRight: "20%",
              backgroundColor: "#4279A6",
              justifyContent: "center",
              width: "20%",
              padding: 22,
              alignItems: "center",
              display: "flex",
              fontWeight: "600",
            }}
          >
            Save Student Marks
          </Button>
        </div>
        {/* <Button type="primary" onClick={handleShowData} style={{ marginBottom: 16, margingRight: '20%', marginTop: 20, backgroundColor: '#4279A6', justifySelf: 'flex-end' }}>Show Data</Button> */}

        {/* {studentMarks.length > 0 ?       
       : */}
        {!course || !semester ? (
          <p className="font-semibold">
            Please Select both course and semester to view the student marks.
          </p>
        ) : studentMarks.length > 0 ? (
          <MyTableData data={studentMarks} />
        ) : (
          <Table
            dataSource={filteredStudent}
            columns={columns}
            bordered
            className="custom-table"
            // pagination={{ pageSize: 10 }}
            rowClassName="editable-row"
          />
        )}
        <CreateAssessmentModal
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          onSave={handleCreateSave}
          studentData={studentData}
        />

        <Modal
          title="Edit Assessment"
          visible={modalVisible}
          onOk={save}
          onCancel={cancel}
        >
          <Form form={form} layout="vertical">
            {assessment.map((item) => (
              <Form.Item
                key={item.key}
                label={`${item.assessmentTitle} (${item.assessWeight}%)`}
                name={item.assessmentTitle.toLowerCase().replace(/\s+/g, "")}
              >
                <Input />
              </Form.Item>
            ))}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default MaintainAssessment;
