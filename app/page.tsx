"use client";

import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <Dashboard />
    </main>
  );
}
