import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ summary, loading }) {
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [{
      data: [summary.total_income || 0, summary.total_expense || 0],
      backgroundColor: ['#22c55e', '#ef4444'],
      borderColor: ['#16a34a', '#dc2626'],
      borderWidth: 1,
    }]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Cards */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-3xl font-bold text-green-600">₹{summary.total_income?.toFixed(2) || '0.00'}</p>
          </div>
          <TrendingUp className="w-10 h-10 text-green-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Expense</p>
            <p className="text-3xl font-bold text-red-600">₹{summary.total_expense?.toFixed(2) || '0.00'}</p>
          </div>
          <TrendingDown className="w-10 h-10 text-red-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <p className={`text-3xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{summary.balance?.toFixed(2) || '0.00'}
            </p>
          </div>
          <Wallet className="w-10 h-10 text-blue-500" />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Income vs Expense Breakdown</h3>
        <div className="w-72 h-72 mx-auto">
          <Pie data={data} options={{ maintainAspectRatio: true }} />
        </div>
      </div>
    </div>
  );
}