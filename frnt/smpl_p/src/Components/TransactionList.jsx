export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">All Transactions</h2>
      </div>
      <div className="max-h-96 overflow-auto">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No transactions yet</p>
        ) : (
          transactions.map(t => (
            <div key={t.id} className="flex items-center justify-between p-6 border-b hover:bg-gray-50">
              <div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {t.type.toUpperCase()}
                  </span>
                  <span className="font-medium">{t.category}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{t.date} • {t.description || '—'}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className={`text-xl font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount}
                </p>
                <button onClick={() => onDelete(t.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}