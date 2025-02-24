import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PieChart as PieChartIcon,  CirclePlus } from "lucide-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ jobs }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllCompaniesData();
  }, [jobs]);

  const fetchAllCompaniesData = async () => {
    setIsLoading(true);
    try {
      const companyTotals = {};

      await Promise.all(
        jobs.map(async (job) => {
          const response = await fetch(
            `https://jobquick.onrender.com/applicants/graph/${job._id}`,
            {
              headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            }
          );
          const result = await response.json();
          const applicants = result.data
            ? result.data.reduce((sum, day) => sum + day.applicants, 0)
            : 0;

          companyTotals[job.companyName] =
            (companyTotals[job.companyName] || 0) + applicants;
        })
      );

      const data = Object.entries(companyTotals).map(([company, total]) => ({
        name: company,
        applicants: total,
      }));

      setChartData(data);
    } catch (error) {
      console.error("Error fetching companies data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsla(${hue}, 70%, 50%, 0.8)`);
    }
    return colors;
  };

  const colors = generateColors(chartData.length);

  const customLegendCallback = (chart) => {
    const { data } = chart;
    let legendHTML = '<ul class="flex flex-wrap justify-center gap-2">';
    data.labels.forEach((label, index) => {
      const color = data.datasets[0].backgroundColor[index];
      const bullet = `<span class="inline-block w-3 h-3 rounded-full mr-1" style="background-color: ${color};"></span>`;
      legendHTML += `<li class="flex items-center text-xs">${bullet}${label}</li>`;

      if ((index + 1) % 2 === 0) {
        legendHTML += "<br>";
      }
    });
    legendHTML += "</ul>";
    return legendHTML;
  };

  const pieChartData = {
    labels: chartData.map((item) => item.name),
    datasets: [
      {
        data: chartData.map((item) => item.applicants),
        backgroundColor: colors,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        padding: 10,
        titleFont: { size: 12, weight: "600" },
        bodyFont: { size: 11 },
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} Applicants (${percentage}%)`;
          },
        },
      },
    },
  };

  const totalApplicants = chartData.reduce(
    (sum, item) => sum + item.applicants,
    0
  );

  // Empty state component
  const EmptyState = () => (
    <div className="h-[170px] flex flex-col items-center justify-center bg-gray-50 rounded-lg">
      <PieChartIcon className="w-12 h-12 text-gray-300 mb-2" />
      <p className="text-sm font-medium text-gray-500">No Applications Yet</p>
      <p className="text-xs text-gray-400 text-center mt-1 max-w-[200px]">
        Data will appear here once candidates apply for your jobs
      </p>
      <br />
      <Link to="/post-job">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md border border-teal-700 transition duration-300 flex items-center gap-2">
              <CirclePlus className="w-3 h-3" />
              <span>Post Your First Job</span>
            </button>
          </Link>
    </div>
  );

  return (
    <div className="w-full bg-white rounded-xl lg:p-2 h-auto sm:h-[300px]">
      <div className="space-y-2">
        <div className="w-full h-[200px] ">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-gray-500">Loading chart data...</p>
              </div>
            </div>
          ) : totalApplicants === 0 ? (
            <EmptyState />
          ) : (
            <Pie data={pieChartData} options={options} />
          )}
        </div>

        {/* Custom Legend - only show if there's data */}
        {totalApplicants > 0 && (
          <div
            className="text-center text-xs mt-2"
            dangerouslySetInnerHTML={{
              __html: customLegendCallback({ data: pieChartData }),
            }}
          />
        )}

        {/* Stats Grid - only show if there's data */}
        {totalApplicants > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 space-x-20">
            {/* <div className="p-2 bg-blue-50 rounded-md">
              <p className="text-xs text-gray-600">Total Applicants</p>
              <p className="text-lg font-semibold text-blue-600">
                {totalApplicants}
              </p>
            </div> */}
            {/* <div className="p-2 bg-green-50 rounded-md">
              <p className="text-xs text-gray-600">Companies Shown</p>
              <p className="text-lg font-semibold text-green-600">
                {chartData.length}
              </p>
            </div> */}
            
            <div className="p-2 bg-purple-50 rounded-md mt-6">
              <p className="text-xs text-gray-600">Average/Company</p>
              <p className="text-lg font-semibold text-purple-600">
                {(totalApplicants / chartData.length).toFixed(1)}
              </p>
            </div>
            <div className="p-2 bg-orange-50 rounded-md mt-6">
              <p className="text-xs text-gray-600">Top Company</p>
              <p className="text-sm font-semibold text-orange-600">
                {chartData.length > 0
                  ? chartData.reduce((max, item) =>
                      item.applicants > max.applicants ? item : max
                    ).name
                  : "N/A"}
              </p>
           
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;