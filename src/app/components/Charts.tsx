"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Sales by month",
      data: [2, 5, 8, 10, 24, 12, 18, 20, 25, 15, 26, 31],
      borderWith: 1,
      backgroundColor: "#fda600",
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text: "",
    },
  },
};
const BarChart = () => {
  return (
    <div className="rounded-[10px] bg-[#fff] w-full min-h-[366px] p-4 ">
      <Bar data={data} options={options} className="h-full w-full" />
    </div>
  );
};

export default BarChart;
