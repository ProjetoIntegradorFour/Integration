import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LoanData {
  month: string;
  amount: number;
}

interface LineChartLoansProps {
  data: LoanData[];
}

const LineChartLoans: React.FC<LineChartLoansProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Quantia por mês',
        data: data.map(d => d.amount),
        borderColor: '#689F38',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4, // suaviza a linha
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Empréstimos por mês',
      },
    },
    scales: {
      x: {
        grid: {
          color: '#e0e0e0', // grade cinza clara
        },
      },
      y: {
        grid: {
          color: '#e0e0e0',
        },
      },
    },
  };

  return (
    <div className="line-chart-wrapper">
      <div className="line-chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );

};

export default LineChartLoans;
