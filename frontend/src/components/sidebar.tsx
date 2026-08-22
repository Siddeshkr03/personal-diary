"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Clock3,
  CheckSquare,
  Bell,
  Settings,
  User,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    label: "Daily Diary",
    href: "/diary",
    icon: BookOpen,
  },
  {
    label: "Timesheet",
    href: "/timesheet",
    icon: Clock3,
  },
  {
    label: "To-Do",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Reminders",
    href: "/reminders",
    icon: Bell,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-100 px-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
            ✦
          </div>

          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Personal Diary
            </h1>

            <p className="text-xs text-gray-500">
              Your AI companion
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          Menu
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 p-3">
        <Link
          href="/settings"
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            pathname === "/settings"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Settings size={18} strokeWidth={1.8} />
          <span>Settings</span>
        </Link>

        <Link
          href="/profile"
          className={`mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            pathname === "/profile"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <User size={18} strokeWidth={1.8} />
          <span>Profile</span>
        </Link>
      </div>
    </aside>
  );
}