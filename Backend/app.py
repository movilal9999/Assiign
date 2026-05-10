from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Personal Expense Tracker API")

# CORS Configuration - Same as Flask
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (React frontend)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), 'instance', 'expenses.db')

# Pydantic models for request validation
class TransactionCreate(BaseModel):
    date: str
    type: str
    amount: float
    category: str
    description: Optional[str] = ""

class Transaction(BaseModel):
    id: int
    date: str
    type: str
    amount: float
    category: str
    description: Optional[str]

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

@app.get("/api/transactions")
async def get_transactions():
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
    return transactions

@app.post("/api/transactions")
async def add_transaction(transaction: TransactionCreate):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO transactions (date, type, amount, category, description)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        transaction.date,
        transaction.type,
        transaction.amount,
        transaction.category,
        transaction.description
    ))
    conn.commit()
    new_id = c.lastrowid
    conn.close()
    return {"id": new_id, "message": "Transaction added"}

@app.delete("/api/transactions/{tid}")
async def delete_transaction(tid: int):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("DELETE FROM transactions WHERE id = ?", (tid,))
    conn.commit()
    conn.close()
    return {"message": "Transaction deleted"}

@app.get("/api/summary")
async def get_summary():
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
    return {
        "total_income": round(income, 2),
        "total_expense": round(expense, 2),
        "balance": round(balance, 2)
    }

@app.get("/health")
async def health():
    return {"status": "ok", "message": "FastAPI backend is running"}

@app.get("/docs")
async def get_docs():
    """Interactive API documentation (Swagger UI)"""
    pass

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)