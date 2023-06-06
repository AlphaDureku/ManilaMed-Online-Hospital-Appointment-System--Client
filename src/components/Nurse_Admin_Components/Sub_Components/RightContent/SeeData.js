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
import moment from "moment";
import { useState } from "react";
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

export default function SeeData(props) {
  const { graphData } = props;
  const [selectedRange, setSelectedRange] = useState("Week");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        ticks: {
          precision: 0,
          callback: function (value) {
            return value >= 0 ? value : "";
          },
        },
      },
    },
  };

  const weekLabelsforMap = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weekLabels = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const monthLabels = ["Week 1", "Week 2", "Week 3,", "Week 4"];
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

  const mappedDataWeek = graphData
    ? graphData
        .filter(
          (data) =>
            moment(data.updatedAt, "MMMM D, YYYY").isoWeek() ===
            moment().isoWeek()
        )
        .map((data) => ({
          ...data,
          appointmentDay: moment(data.updatedAt, "MMMM D, YYYY").format("dddd"),
        }))
    : [];

  const groupedDataWeek = mappedDataWeek.reduce((groups, data) => {
    const status = data.updatedTo;
    if (!groups[status]) {
      groups[status] = Array(7).fill(0);
    }
    const dayIndex = weekLabelsforMap.indexOf(data.appointmentDay);
    if (dayIndex !== -1) {
      groups[status][dayIndex] += 1;
    }
    return groups;
  }, {});

  const cancelledDataWeek = groupedDataWeek["Cancelled" || "Rejected"] || [
    0, 0, 0, 0, 0, 0, 0,
  ];
  const completedDataWeek = groupedDataWeek["Completed"] || [
    0, 0, 0, 0, 0, 0, 0,
  ];
  const confirmedDataWeek = groupedDataWeek["Confirmed"] || [
    0, 0, 0, 0, 0, 0, 0,
  ];
  const pendingDataWeek = groupedDataWeek["Pending"] || [0, 0, 0, 0, 0, 0, 0];

  const currentMonth = moment().month();
  const mappedDataMonth = graphData
    ? graphData
        .filter((data) => {
          const appointmentMoment = moment(data.updatedAt, "MMMM D, YYYY");
          return appointmentMoment.month() === currentMonth;
        })
        .map((data) => ({
          ...data,
          weekIndex:
            Math.ceil(moment(data.updatedAt, "MMMM D, YYYY").date() / 7) - 1,
          appointmentDay: moment(data.updatedAt, "MMMM D, YYYY").format("dddd"),
        }))
    : [];

  const groupedDataMonth = mappedDataMonth.reduce((groups, data) => {
    const status = data.updatedTo;
    if (!groups[status]) {
      groups[status] = Array(4).fill(0);
    }
    const weekIndex = data.weekIndex;
    groups[status][weekIndex] += 1;
    return groups;
  }, {});

  const pendingDataMonth = groupedDataMonth["Pending"] || [0, 0, 0, 0, 0, 0, 0];
  const cancelledDataMonth = groupedDataMonth["Cancelled" || "Rejected"] || [
    0, 0, 0, 0, 0, 0, 0,
  ];
  const confirmedDataMonth = groupedDataMonth["Confirmed"] || [
    0, 0, 0, 0, 0, 0, 0,
  ];
  const completedDataMonth = groupedDataMonth["Completed"] || [
    0, 0, 0, 0, 0, 0, 0,
  ];

  const currentYear = moment().year();
  const mappedDataYear = graphData
    ? graphData
        .filter((data) => {
          const appointmentMoment = moment(data.updatedAt, "MMMM D, YYYY");
          return appointmentMoment.year() === currentYear;
        })
        .map((data) => ({
          ...data,
          weekIndex:
            Math.ceil(moment(data.updatedAt, "MMMM D, YYYY").date() / 7) - 1,
          appointmentDay: moment(data.updatedAt, "MMMM D, YYYY").format("dddd"),
        }))
    : [];

  const groupedDataYear = mappedDataYear.reduce((groups, data) => {
    const status = data.updatedTo;
    if (!groups[status]) {
      groups[status] = Array(12).fill(0);
    }
    const monthIndex = moment(data.updatedAt, "MMMM D, YYYY").month();
    groups[status][monthIndex] += 1;
    return groups;
  }, {});

  const pendingDataYear = groupedDataYear["Pending"] || [0, 0, 0, 0, 0, 0, 0];
  const cancelledDataYear = groupedDataYear["Cancelled" || "Rejected"] || [
    0, 0, 0, 0, 0, 0, 0,
  ];
  const confirmedDataYear = groupedDataYear["Confirmed"] || [
    0, 0, 0, 0, 0, 0, 0,
  ];
  const completedDataYear = groupedDataYear["Completed"] || [
    0, 0, 0, 0, 0, 0, 0,
  ];

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const data = {
    labels:
      selectedRange === "Week"
        ? weekLabels
        : selectedRange === "Year"
        ? yearLabels
        : monthLabels,
    datasets: [
      {
        label: "Pending",
        data:
          selectedRange === "Week"
            ? pendingDataWeek
            : selectedRange === "Year"
            ? pendingDataYear
            : pendingDataMonth,
        borderColor: "#949494",
        backgroundColor: "#ececec",
        tension: 0.4,
      },
      {
        label: "Accepted",
        data:
          selectedRange === "Week"
            ? confirmedDataWeek
            : selectedRange === "Year"
            ? confirmedDataYear
            : confirmedDataMonth,
        borderColor: "#29CC97",
        backgroundColor: "#caffcf",
        tension: 0.4,
      },
      {
        label: "Cancelled",
        data:
          selectedRange === "Week"
            ? cancelledDataWeek
            : selectedRange === "Year"
            ? cancelledDataYear
            : cancelledDataMonth,
        borderColor: "#ff0000",
        backgroundColor: "#ffb6b6",
        tension: 0.4,
      },

      {
        label: "Completed",
        data:
          selectedRange === "Week"
            ? completedDataWeek
            : selectedRange === "Year"
            ? completedDataYear
            : completedDataMonth,
        borderColor: "blue",
        backgroundColor: "#8eabfa",
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <div className="Dashboard--Data">
        <div className="chart-header">
          <div className="chart-tagtitle">Appointment Status Graph</div>
          <select
            className="DateRangeChart"
            value={selectedRange}
            onChange={handleRangeChange}
          >
            <option value="Week">This Week</option>
            <option value="Month">This Month</option>
            <option value="Year">This Year</option>
          </select>
        </div>

        <div className="linechart-container">
          <Line options={options} data={data} className="manual-height" />
        </div>
      </div>
    </>
  );
}
