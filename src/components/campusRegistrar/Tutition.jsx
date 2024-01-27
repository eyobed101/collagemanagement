import { Table } from 'antd';
// import SiderGenerator from './Menu';


const TuitionStatistics = () => {
  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Total Tuition Paid',
      dataIndex: 'totalTuitionPaid',
      key: 'totalTuitionPaid',
    },
    // Add more columns as needed
  ];

  const data = [
    {
      key: '1',
      studentId: '2021001',
      studentName: 'John Doe',
      totalTuitionPaid: '$5,000',
    },
    {
      key: '2',
      studentId: '2021002',
      studentName: 'Jane Smith',
      totalTuitionPaid: '$4,800',
    },
    // Add more data as needed
  ];

  return (
    <div  className="bg-[#F9FAFB] min-h-[100vh]  ">
    {/* <SiderGenerator navigate={navigate}/> */}
    <div className="list-sub mb-10 ml-[1%]">
    <p className="text-center text-[#344054] text-[24px] font-bold align-middle mb-8 border-b-[#EAECF0] border-b-[2px]">
        Tuition Statistics
      </p>
      <Table columns={columns} dataSource={data} />
    </div>
    </div>
  );
};

export default TuitionStatistics;
