import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Student Grade",
        },
    },
};

const labels = [
    "Biology",
    "Maths",
    "English",
    "Physics",
    "Chemistry",
    "HPE",
    "History",
    "Geography",
    "Amharic",
    "Civic",
    "IT",
    "SAT",
];

export const data = {
    labels,
    datasets: [
        {
            label: "Grade",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: "#0AACF7",
        },
        {
            label: "Avg Grade",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: "#F6C9AC",
        },
    ],
};

export default function BarGraph() {
    return <Bar options={options} data={data} />;
}
