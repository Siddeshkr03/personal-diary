"use client";

import { useState } from "react";

export type NewTask = {
  title: string;
  description?: string;
  dueDate?: string;
  time?: string;
  priority: "Low" | "Medium" | "High";
  category: "Work" | "Personal" | "Shopping" | "Health" | "Other";
};

type AddTaskProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: NewTask) => void;
};

const priorityColors: Record<NewTask["priority"], string> = {
  Low: "text-blue-600",
  Medium: "text-orange-500",
  High: "text-red-600",
};

export default function AddTask({ isOpen, onClose, onAdd }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<NewTask["priority"]>("Medium");
  const [category, setCategory] = useState<NewTask["category"]>("Work");

  if (!isOpen) return null;

  const reset = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setTime("");
    setPriority("Medium");
    setCategory("Work");
  };

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd({
      title: trimmed,
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      time: time || undefined,
      priority,
      category,
    });

    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="w-full flex items-center justify-between px-4 py-3 bg-green-50">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-gray-900">Add New Task</span>
          </div>

          <button onClick={handleCancel} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gray-500 hover:text-gray-700">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-gray-400 shrink-0">
                <path d="M9 12h6M9 16h6M9 8h2M6 3h9l3 3v15H6z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Description (optional)
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-gray-400 shrink-0">
                <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a detailed description..."
                className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Due Date</label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-gray-400 shrink-0">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
              </svg>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-sm text-gray-900 outline-none [color-scheme:light]"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Time (optional)</label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-gray-400 shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-sm text-gray-900 outline-none [color-scheme:light]"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Priority</label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 shrink-0 ${priorityColors[priority]}`}>
                <path d="M5 3v18M5 4h11l-2 3 2 3H5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as NewTask["priority"])}
                className={`w-full bg-transparent text-sm outline-none ${priorityColors[priority]}`}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-gray-400 shrink-0">
                <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3.24L4 3a1 1 0 00-1 1l.24 5.59a2 2 0 00.59 1.41l9.58 9.58a2 2 0 002.82 0l4.36-4.36a2 2 0 000-2.82z" />
                <circle cx="7.5" cy="7.5" r="1" />
              </svg>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewTask["category"])}
                className="w-full bg-transparent text-sm text-gray-900 outline-none"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleCancel}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              Save Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}