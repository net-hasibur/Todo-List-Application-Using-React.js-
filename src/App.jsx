import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')

  // Add a new task--------------------------------
  const addTask = (e) => {
    e.preventDefault()

    if (taskInput.trim() === '') {
      return
    }

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false,
    }

    setTasks([...tasks, newTask])
    setTaskInput('')
  }

  // Task as completed or incomplete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  // Delete  task--------------
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Count remaining tasks-------------------
  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-600">
            My Todo List
          </h1>

          <p className="mt-3 text-slate-600">
            Organize your day, one task at a time.
          </p>
        </div>

        {/* Todo Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">

          {/* Add Task Form */}
          <form onSubmit={addTask} className="flex gap-3">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Enter a new task..."
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Add
            </button>
          </form>

          {/* Task Counter */}
          <div className="my-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Your Tasks
            </h2>

            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
              {remainingTasks} remaining
            </span>
          </div>

          {/* Task List */}
          {tasks.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-lg font-medium text-slate-500">
                No tasks yet!
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Add your first task to get started.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50"
                >
                  {/* Complete Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark ${task.text} as completed`}
                    className="h-5 w-5 cursor-pointer accent-indigo-600"
                  />

                  {/* Task Text */}
                  <span
                    className={`min-w-0 flex-1 break-words ${
                      task.completed
                        ? 'text-slate-400 line-through'
                        : 'text-slate-700'
                    }`}
                  >
                    {task.text}
                  </span>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.text}`}
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Footer */}
          {tasks.length > 0 && (
            <div className="mt-6 text-center text-sm text-slate-500">
              {tasks.length - remainingTasks} completed out of{' '}
              {tasks.length} tasks
            </div>
          )}
        </div>

        
      </div>
    </div>
  )
}

export default App