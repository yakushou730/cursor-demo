import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState('');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  const deleteTodo = idx => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  const toggleTodo = idx => {
    setTodos(todos.map((todo, i) => i === idx ? { ...todo, completed: !todo.completed } : todo));
  };

  const startEdit = (idx, text) => {
    setEditIdx(idx);
    setEditText(text);
  };

  const saveEdit = idx => {
    if (!editText.trim()) return;
    setTodos(todos.map((todo, i) => i === idx ? { ...todo, text: editText } : todo));
    setEditIdx(null);
    setEditText('');
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="todo-input-row">
        <input
          className="todo-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="請輸入待辦事項"
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button className="todo-btn" onClick={addTodo}>新增</button>
      </div>
      <div className="todo-filter-row">
        <button className={`todo-btn${filter==='all'?' active':''}`} onClick={() => setFilter('all')}>全部</button>
        <button className={`todo-btn${filter==='completed'?' active':''}`} onClick={() => setFilter('completed')}>已完成</button>
        <button className={`todo-btn${filter==='active'?' active':''}`} onClick={() => setFilter('active')}>未完成</button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo, idx) => (
          <li key={idx} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(idx)}
            />
            {editIdx === idx ? (
              <>
                <input
                  className="todo-edit-input"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEdit(idx)}
                  autoFocus
                />
                <button className="todo-btn" onClick={() => saveEdit(idx)}>儲存</button>
                <button className="todo-btn" onClick={() => setEditIdx(null)}>取消</button>
              </>
            ) : (
              <>
                <span
                  className={todo.completed ? 'completed' : ''}
                  onDoubleClick={() => startEdit(idx, todo.text)}
                >
                  {todo.text}
                </span>
                <button className="todo-btn" onClick={() => startEdit(idx, todo.text)}>編輯</button>
                <button className="todo-btn" onClick={() => deleteTodo(idx)}>刪除</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
