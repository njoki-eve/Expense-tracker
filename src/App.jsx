import { useState } from 'react'
import './App.css'

function App() {
  // State for expenses
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2024-05-01', description: 'Groceries', category: 'Food', amount: 100 },
    { id: 2, date: '2024-05-02', description: 'Gas', category: 'Transportation', amount: 50 },
  ])

  // Form states
  const [newDate, setNewDate] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')

  // Add new expense
  const handleAddExpense = (e) => {
    e.preventDefault()
    const newExpense = {
      id: Date.now(),
      date: newDate,
      description: newDescription,
      category: newCategory,
      amount: parseFloat(newAmount),
    }
    setExpenses([...expenses, newExpense])
    // Clear form
    setNewDate('')
    setNewDescription('')
    setNewCategory('')
    setNewAmount('')
  }

  // Delete expense
  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  // Sorting functionality
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Filter and sort expenses
  const filteredExpenses = expenses
    .filter(expense => 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0
      const direction = sortDirection === 'asc' ? 1 : -1
      return a[sortField] > b[sortField] ? direction : -direction
    })

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      
      {/* Add Expense Form */}
      <form onSubmit={handleAddExpense} className="form">
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          required
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          required
          step="0.01"
        />
        <button type="submit">Add Expense</button>
      </form>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search"
      />

      {/* Expenses Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('date')}>Date</th>
            <th onClick={() => handleSort('description')}>Description</th>
            <th onClick={() => handleSort('category')}>Category</th>
            <th onClick={() => handleSort('amount')}>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <button 
                  onClick={() => handleDelete(expense.id)}
                  className="delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App