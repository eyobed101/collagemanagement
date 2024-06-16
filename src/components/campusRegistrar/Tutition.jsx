import { Table } from "antd";
// import SiderGenerator from './Menu';

const TuitionStatistics = () => {
  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Total Tuition Paid",
      dataIndex: "totalTuitionPaid",
      key: "totalTuitionPaid",
    },
    // Add more columns as needed
  ];

  const data = [
    {
      key: "1",
      studentId: "2021001",
      studentName: "John Doe",
      totalTuitionPaid: "$5,000",
    },
    {
      key: "2",
      studentId: "2021002",
      studentName: "Jane Smith",
      totalTuitionPaid: "$4,800",
    },
    // Add more data as needed
  ];

  return (
    <div className="flex flex-col gap-12 bg-white p-5 rounded-md shadow-md min-h-screen">
      {/* <SiderGenerator navigate={navigate}/> */}
      <div className="list-sub mb-10 ml-[1%]">
      <p className="text-[#4d6a90] text-[20px] font-bold align-middle mb-8 border-b-[#EAECF0]">
          Tuition Statistics
        </p>
        <hr className="mb-4 border-2 border-[#C2C2C2]" />

        <Table columns={columns} dataSource={data} className="custom-table"
          pagination={{ pageSize: 10 }}/>
      </div>
    </div>
  );
};

export default TuitionStatistics;
