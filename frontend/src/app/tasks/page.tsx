"use client";

import { useState } from "react";
import AddTask, { NewTask } from "./AddTask";

type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  time?: string;
  priority: "Low" | "Medium" | "High";
  category: "Work" | "Personal" | "Shopping" | "Health" | "Other";
  completed: boolean;
  createdAt: number;
};

type Filter = "all" | "active" | "completed";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

const addTask = (newTask: NewTask) => {
  const task: Task = {
    id: crypto.randomUUID(),
    completed: false,
    createdAt: Date.now(),
    ...newTask,
  };

  // TODO: replace with API call, e.g. POST /api/tasks
  setTasks((prev) => [task, ...prev]);
};

  const toggleTask = (id: string) => {
    // TODO: replace with API call, e.g. PATCH /api/tasks/:id
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    // TODO: replace with API call, e.g. DELETE /api/tasks/:id
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900">To-Do</h1>
      <p className="mt-1 text-sm text-gray-500">
        Manage your tasks and things to get done.
      </p>

      {/* Add task */}
<div className="mt-6">
  <button
    onClick={() => setIsAddOpen(true)}
    className="flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
    Add Task
  </button>

  <AddTask
    isOpen={isAddOpen}
    onClose={() => setIsAddOpen(false)}
    onAdd={addTask}
  />
</div>

      {/* Filters + summary */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1 text-sm font-medium capitalize transition ${
                filter === f
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <span className="text-sm text-gray-500">
          {activeCount} active &middot; {completedCount} done
        </span>
      </div>

      {/* Task list */}
      <div className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            {tasks.length === 0
              ? "No tasks yet. Add one above to get started."
              : "Nothing to show for this filter."}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 px-4 py-3 group"
            >
              <button
                onClick={() => toggleTask(task.id)}
                aria-label="Toggle task"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                  task.completed
                    ? "border-gray-900 bg-gray-900"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                {task.completed && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    className="h-3 w-3"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <span
                className={`flex-1 text-sm ${
                  task.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {completedCount > 0 && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={clearCompleted}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
}