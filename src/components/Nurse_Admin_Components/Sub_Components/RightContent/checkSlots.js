import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
    legend: {
      position: "top",
    },
  },
};
const weekLabels = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const monthLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
const yearLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const pendingData = [0, 1, 1, 1, 2, 0, 0];
const acceptedData = [0, 1, 1, 1, 1, 0, 0];
const cancelledData = [0, 1, 0, 1, 1, 0, 0];
const completedData = [0, 1, 1, 0, 1, 0, 0];

export const data = {
  labels: weekLabels,
  datasets: [
    {
      label: "Pending",
      data: pendingData,
      borderColor: "#949494",
      backgroundColor: "#ececec",
    },
    {
      label: "Accepted",
      data: acceptedData,
      borderColor: "#29CC97",
      backgroundColor: "#caffcf",
    },
    {
      label: "Cancelled",
      data: cancelledData,
      borderColor: "#ff0000",
      backgroundColor: "#ffb6b6",
    },
    {
      label: "Completed",
      data: completedData,
      borderColor: "blue",
      backgroundColor: "#8eabfa",
    },
  ],
};

export default function SeeData(props) {
  return (
    <>
      <div className="Dashboard--Data">
        <div className="chart-header">
          <div className="chart-tagtitle">Number of Patients</div>
          <select className="DateRangeChart">
            <option value="Week">This Week</option>
            <option value="Month">This Month</option>
            <option value="Year">This Year</option>
          </select>
        </div>

        <div className="linechart-container">
          <Line options={options} data={data} />
        </div>
      </div>
    </>
  );
}
