"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  amount: number;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders] = useState<Order[]>([
    { id: "ORD001", date: "2024-06-01", status: "Delivered", amount: 1299 },
    { id: "ORD002", date: "2024-05-28", status: "Shipped", amount: 2450 },
    { id: "ORD003", date: "2024-05-20", status: "Processing", amount: 899 },
  ]);

  useEffect(() => {
    // Function ni ikkade define cheyyi
    const loadUser = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        router.push("/login");
        return;
      }
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status !== "Delivered").length;
  const totalSpent = orders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🛒 FreshCart</h1>
              <p className="text-sm text-gray-500">Customer Dashboard</p>
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
        <div className="bg-line-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg p-8 mb-8 text-white">
          <h2 className="text-4xl font-bold mb-2">
            Welcome back, {user.firstName || "Customer"}! 👋
          </h2>
          <p className="text-blue-100">
            Your one-stop shop for fresh groceries delivered to your door
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
            <p className="text-gray-500 text-sm mt-2">All time orders</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Pending Orders
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {pendingOrders}
            </p>
            <p className="text-gray-500 text-sm mt-2">Awaiting delivery</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Total Spent
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ₹{totalSpent.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm mt-2">Lifetime value</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600 hover:shadow-lg transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">
              Loyalty Points
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.floor(totalSpent / 100)}
            </p>
            <p className="text-gray-500 text-sm mt-2">Earn rewards</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Information */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              📋 Account Info
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Full Name</p>
                <p className="text-gray-900 font-medium">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-900 font-medium break-all">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Account Type</p>
                <p className="text-gray-900 font-medium bg-blue-50 inline-block px-3 py-1 rounded text-sm">
                  {user.role}
                </p>
              </div>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                ⚙️ Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              🎯 Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-line-to-br from-blue-500 to-blue-600 hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                <span>📦</span> Shop Now
              </button>
              <button className="bg-line-to-br from-green-500 to-green-600 hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                <span>📋</span> My Orders
              </button>
              <button className="bg-line-to-br from-purple-500 to-purple-600 hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                <span>❤️</span> Wishlist
              </button>
              <button className="bg-line-to-br from-orange-500 to-orange-600 hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                <span>🎁</span> Offers
              </button>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              📦 Recent Orders
            </h3>
            <Link
              href="#"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">
                      ₹{order.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-blue-600 hover:underline text-sm font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
