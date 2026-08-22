import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Good morning
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here's what happened and what's ahead.
        </p>
      </main>
    </div>
  );
}
