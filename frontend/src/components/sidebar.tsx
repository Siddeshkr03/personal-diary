import {
  Home,
  BookOpen,
  Clock3,
  CheckSquare,
  Bell,
  Brain,
  Target,
  MessageCircle,
  Settings,
  User,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: Home,
  },
  {
    label: "Daily Diary",
    icon: BookOpen,
  },
  {
    label: "Timesheet",
    icon: Clock3,
  },
  {
    label: "To-Do",
    icon: CheckSquare,
  },
  {
    label: "Reminders",
    icon: Bell,
  },
  {
    label: "Memories",
    icon: Brain,
  },
  {
    label: "Goals",
    icon: Target,
  },
  {
    label: "Ask AI",
    icon: MessageCircle,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-100 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
            ✦
          </div>

          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Personal Diary
            </h1>

            <p className="text-xs text-gray-500">
              Your daily companion
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          Menu
        </p>

        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === 0;

            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">
          <Settings size={18} strokeWidth={1.8} />
          <span>Settings</span>
        </button>

        <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">
          <User size={18} strokeWidth={1.8} />
          <span>Profile</span>
        </button>
      </div>
    </aside>
  );
}