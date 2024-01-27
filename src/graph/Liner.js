import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: false,
    title: {
      display: false,
      text: "Teacher Number",
    },
  },
};

const labels = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];

export default function Liner({ datas }) {
  const graphData = [[], [], [], [], [], datas, []]
  console.log("dat", datas);
  var len = datas?.length ? datas.length : 0;
  const data = {
    labels,
    datasets: [
      {
        data: labels.map((item, index) => graphData[index].length),
        borderColor: "#E7752B",
        backgroundColor: "#E7752B",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };
  return <Line options={options} data={data} />;
}
