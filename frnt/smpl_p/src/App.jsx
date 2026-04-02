import { useState, useEffect } from 'react';
import Dashboard from './Components/Dashboard';
import AddTransaction from './Components/AddTransaction';
import TransactionList from './Components/TransactionList';
import { api } from './Services/api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [transData, sumData] = await Promise.all([api.getTransactions(), api.getSummary()]);
      setTransactions(transData);
      setSummary(sumData);
    } catch (err) {
      console.error("Backend not running? Start Flask first → python app.py");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (newTrans) => {
    await api.addTransaction(newTrans);
    fetchData(); // refresh
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this transaction?")) {
      await api.deleteTransaction(id);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">💰 Expense Tracker</h1>
          <p className="text-sm text-gray-500">Full-Stack Assignment Better </p>
        </div>

        <Dashboard summary={summary} loading={loading} />
        <AddTransaction onAdd={handleAdd} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;