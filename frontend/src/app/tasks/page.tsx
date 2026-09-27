"use client";

import { useState } from "react";
import AddTask, { NewTask } from "./AddTask";

type Priority = "Low" | "Medium" | "High";
type Category = "Work" | "Personal" | "Shopping" | "Health" | "Study" | "Other";

type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  time?: string;
  priority: Priority;
  category: Category;
  completed: boolean;
  createdAt: number;
};

type Filter = "all" | "active" | "completed";
type SortOrder = "due-asc" | "due-desc";

const priorityBadge: Record<Priority, string> = {
  Low: "bg-green-50 text-green-600",
  Medium: "bg-orange-50 text-orange-600",
  High: "bg-red-50 text-red-600",
};

const priorityBorder: Record<Priority, string> = {
  Low: "border-l-4 border-l-green-400",
  Medium: "border-l-4 border-l-orange-400",
  High: "border-l-4 border-l-red-400",
};

const categoryBadge: Record<Category, string> = {
  Work: "bg-indigo-50 text-indigo-600",
  Personal: "bg-pink-50 text-pink-600",
  Shopping: "bg-purple-50 text-purple-600",
  Health: "bg-teal-50 text-teal-600",
  Study: "bg-blue-50 text-blue-600",
  Other: "bg-gray-100 text-gray-600",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeStr?: string) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("due-asc");

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

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.length - activeCount;
  const highPriorityCount = tasks.filter((t) => t.priority === "High" && !t.completed).length;
  const activePct = tasks.length ? Math.round((activeCount / tasks.length) * 100) : 0;
  const completedPct = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active" && task.completed) return false;
      if (filter === "completed" && !task.completed) return false;
      if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;
      if (categoryFilter !== "all" && task.category !== categoryFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matches =
          task.title.toLowerCase().includes(q) ||
          (task.description ?? "").toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return sortOrder === "due-asc" ? aTime - bTime : bTime - aTime;
    });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">To-Do</h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize your tasks and stay productive.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M4 6h16M4 12h16M4 18h9" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-900">{tasks.length}</div>
            <div className="text-xs text-gray-500">Total Tasks</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-900">{activeCount}</div>
            <div className="text-xs text-gray-500">Active Tasks · {activePct}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-5 w-5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-900">{completedCount}</div>
            <div className="text-xs text-gray-500">Completed Tasks · {completedPct}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M12 2c1 4-3 5-3 9a3 3 0 006 0c0-1.5-1-2-1-3.5 2 1 3 3.5 3 5.5a5 5 0 01-10 0c0-4 3-6 5-11z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-900">{highPriorityCount}</div>
            <div className="text-xs text-gray-500">High Priority</div>
          </div>
        </div>
      </div>

      {/* Add task modal */}
      <AddTask isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={addTask} />

      {/* Filters + search + sort */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {(["all", "active", "completed"] as Filter[]).map((f) => {
            const count =
              f === "all" ? tasks.length : f === "active" ? activeCount : completedCount;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${
                  filter === f
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 flex-1 min-w-[180px]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gray-400 shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none"
          />
        </div>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as Priority | "all")}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none"
        >
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as Category | "all")}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none"
        >
          <option value="all">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
          <option value="Study">Study</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={() => setSortOrder((prev) => (prev === "due-asc" ? "due-desc" : "due-asc"))}
          className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M3 7h10M3 12h6M3 17h3M17 4v16m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Due Date ({sortOrder === "due-asc" ? "Asc" : "Desc"})
        </button>
      </div>

      {/* Task list */}
      <div className="mt-4 space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-400">
            {tasks.length === 0
              ? "No tasks yet. Click \"Add Task\" to get started."
              : "No tasks match your filters."}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 ${priorityBorder[task.priority]} ${
                task.completed ? "bg-green-50/40" : ""
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                aria-label="Toggle task"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition ${
                  task.completed
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                {task.completed && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="h-3 w-3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-medium ${
                    task.completed ? "text-gray-400 line-through" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </div>
                {task.description && (
                  <div className="text-xs text-gray-500 truncate">{task.description}</div>
                )}
              </div>

              <span className={`shrink-0 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${priorityBadge[task.priority]}`}>
                {task.priority}
              </span>

              <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ${categoryBadge[task.category]}`}>
                {task.category}
              </span>

              {task.dueDate && (
                <div className="shrink-0 flex items-center gap-1 text-xs text-gray-500 w-28">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span>{formatDate(task.dueDate)}</span>
                    {task.time && <span>{formatTime(task.time)}</span>}
                  </div>
                </div>
              )}

              <button
                aria-label="Edit task"
                className="shrink-0 text-gray-400 hover:text-gray-700"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
                className="shrink-0 text-red-400 hover:text-red-600"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M4 6h16M9 6V4h6v2m-8 0l1 14h8l1-14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}