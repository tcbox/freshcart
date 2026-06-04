"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats] = useState<DashboardStats>({
    totalUsers: 156,
    totalProducts: 432,
    totalOrders: 1289,
    totalRevenue: 450000,
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      if (userData.role !== "admin") {
        router.push("/user/dashboard");
        return;
      }
      setUser(userData);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-red-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <h1 className="text-3xl font-bold">🛡️ FreshCart Admin</h1>
              <p className="text-indigo-100 text-sm">Management Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-red-600 rounded-lg shadow-lg p-8 mb-8 text-white">
          <h2 className="text-4xl font-bold mb-2">
            Welcome, Admin {user.firstName}! 🎉
          </h2>
          <p className="text-indigo-100">
            Manage your FreshCart platform and monitor business metrics
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalUsers}
            </p>
            <p className="text-gray-500 text-sm mt-2">Registered customers</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Products
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalProducts}
            </p>
            <p className="text-gray-500 text-sm mt-2">In inventory</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.totalOrders}
            </p>
            <p className="text-gray-500 text-sm mt-2">All time</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Revenue
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              ₹{stats.totalRevenue.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm mt-2">Generated revenue</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* User Management */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              👥 User Management
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 border border-gray-200 transition-colors font-medium text-gray-700">
                View All Users
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Add New User
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 border border-gray-200 transition-colors font-medium text-gray-700">
                User Analytics
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Manage Roles
              </button>
            </div>
          </div>

          {/* Product Management */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              📦 Product Management
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 border border-gray-200 transition-colors font-medium text-gray-700">
                View All Products
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Add New Product
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Inventory Tracking
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Categories
              </button>
            </div>
          </div>

          {/* Order Management */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              📋 Order Management
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-50 border border-gray-200 transition-colors font-medium text-gray-700">
                View All Orders
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Pending Orders
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Order Reports
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Shipping Status
              </button>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              ⚙️ System Settings
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Admin Settings
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 border border-gray-200 transition-colors font-medium text-gray-700">
                System Logs
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Backup & Recovery
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 border border-gray-200 transition-colors font-medium text-gray-700">
                Email Configuration
              </button>
            </div>
          </div>
        </div>

        {/* Admin Profile Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">
            👤 Admin Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-medium">Admin Name</p>
              <p className="text-gray-900 font-bold text-lg mt-1">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "Administrator"}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Email</p>
              <p className="text-gray-900 font-bold text-lg mt-1">
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Role</p>
              <p className="text-gray-900 font-bold text-lg mt-1 inline-block bg-indigo-100 px-3 py-1 rounded">
                Administrator
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Status</p>
              <p className="text-gray-900 font-bold text-lg mt-1 inline-block bg-green-100 px-3 py-1 rounded text-green-800">
                🟢 Active
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            📊 Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-600">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <p className="font-medium text-gray-900">New Order Received</p>
                <p className="text-sm text-gray-600">
                  Order #ORD1289 from John Doe
                </p>
              </div>
              <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <span className="text-2xl mr-3">👤</span>
              <div>
                <p className="font-medium text-gray-900">
                  New User Registration
                </p>
                <p className="text-sm text-gray-600">
                  User @freshcart_user156 joined
                </p>
              </div>
              <span className="ml-auto text-xs text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <p className="font-medium text-gray-900">Low Stock Alert</p>
                <p className="text-sm text-gray-600">
                  5 products have low inventory
                </p>
              </div>
              <span className="ml-auto text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
