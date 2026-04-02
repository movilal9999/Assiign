from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Important for React frontend

DB_PATH = os.path.join(os.path.dirname(__file__), 'instance', 'expenses.db')

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            type TEXT NOT NULL,        
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            description TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database when app starts
init_db()

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT * FROM transactions ORDER BY date DESC")
    rows = c.fetchall()
    conn.close()
    
    transactions = []
    for row in rows:
        transactions.append({
            "id": row[0],
            "date": row[1],
            "type": row[2],
            "amount": row[3],
            "category": row[4],
            "description": row[5]
        })
    return jsonify(transactions)

@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.get_json()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO transactions (date, type, amount, category, description)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        data['date'],
        data['type'],
        data['amount'],
        data['category'],
        data.get('description', '')
    ))
    conn.commit()
    new_id = c.lastrowid
    conn.close()
    return jsonify({"id": new_id, "message": "Transaction added"}), 201

@app.route('/api/transactions/<int:tid>', methods=['DELETE'])
def delete_transaction(tid):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("DELETE FROM transactions WHERE id = ?", (tid,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Transaction deleted"}), 200

@app.route('/api/summary', methods=['GET'])
def get_summary():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT type, SUM(amount) FROM transactions GROUP BY type")
    rows = c.fetchall()
    conn.close()

    income = 0
    expense = 0
    for row in rows:
        if row[0] == "income":
            income = row[1] or 0
        else:
            expense = row[1] or 0

    balance = income - expense
    return jsonify({
        "total_income": round(income, 2),
        "total_expense": round(expense, 2),
        "balance": round(balance, 2)
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "message": "Flask backend is running"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)