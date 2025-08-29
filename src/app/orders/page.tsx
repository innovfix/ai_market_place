"use client";

import { useState } from "react";
import { LoggedInHeader } from "@/components/site/LoggedInHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Order {
  id: string;
  agentName: string;
  agentImage?: string;
  sellerName: string;
  orderDate: string;
  status: 'active' | 'completed' | 'cancelled' | 'pending';
  price: number;
  deliveryDate?: string;
  description: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "completed" | "cancelled">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const orders: Order[] = [
    {
      id: "1",
      agentName: "AI Sales Assistant",
      agentImage: "/salesaiimg.png",
      sellerName: "john_dev_2024",
      orderDate: "2024-12-15",
      status: "active",
      price: 150,
      deliveryDate: "2024-12-20",
      description: "Custom AI agent for sales automation and lead generation"
    },
    {
      id: "2",
      agentName: "Content Creator Bot",
      sellerName: "sarah_writer",
      orderDate: "2024-12-10",
      status: "completed",
      price: 75,
      deliveryDate: "2024-12-18",
      description: "AI-powered content creation for social media posts"
    },
    {
      id: "3",
      agentName: "Data Analyzer Pro",
      sellerName: "mike_analyst",
      orderDate: "2024-12-08",
      status: "completed",
      price: 200,
      deliveryDate: "2024-12-16",
      description: "Advanced data analysis and reporting automation"
    },
    {
      id: "4",
      agentName: "Customer Support AI",
      sellerName: "emma_support",
      orderDate: "2024-12-05",
      status: "cancelled",
      price: 120,
      description: "24/7 customer support chatbot with FAQ integration"
    }
  ];

  const filteredOrders = orders.filter(order => {
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        order.agentName.toLowerCase().includes(query) ||
        order.sellerName.toLowerCase().includes(query) ||
        order.description.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }
    
    // Apply status filter
    if (activeFilter !== "all") {
      return order.status === activeFilter;
    }
    
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'pending':
        return <Package className="h-4 w-4 text-yellow-400" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-400 bg-blue-500/10';
      case 'completed':
        return 'text-green-400 bg-green-500/10';
      case 'cancelled':
        return 'text-red-400 bg-red-500/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getActiveOrdersCount = () => orders.filter(o => o.status === 'active').length;
  const getCompletedOrdersCount = () => orders.filter(o => o.status === 'completed').length;
  const getCancelledOrdersCount = () => orders.filter(o => o.status === 'cancelled').length;

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">My Orders</h1>
              <p className="text-gray-400">Track and manage your AI agent orders</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 cursor-text"
                    />
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="space-y-2">
                  <h3 className="text-white font-medium mb-3">Filter by Status</h3>
                  <button 
                    onClick={() => setActiveFilter("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      activeFilter === "all" 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    All Orders ({orders.length})
                  </button>
                  <button 
                    onClick={() => setActiveFilter("active")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      activeFilter === "active" 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    Active ({getActiveOrdersCount()})
                  </button>
                  <button 
                    onClick={() => setActiveFilter("completed")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      activeFilter === "completed" 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    Completed ({getCompletedOrdersCount()})
                  </button>
                  <button 
                    onClick={() => setActiveFilter("cancelled")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      activeFilter === "cancelled" 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    Cancelled ({getCancelledOrdersCount()})
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Orders List */}
          <div className="lg:col-span-3">
            {filteredOrders.length === 0 ? (
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                    <Package className="h-10 w-10 text-gray-500" />
                  </div>
                  <h3 className="text-white text-xl font-medium mb-2">No Orders Yet</h3>
                  <p className="text-gray-400 mb-6">
                    {searchQuery ? "No orders match your search." : "Use the search box to find the digital services you need."}
                  </p>
                  <Button 
                    onClick={() => router.push('/dashboard')}
                    className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  >
                    Browse AI Agents
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Agent Image */}
                        <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden flex-shrink-0">
                          {order.agentImage ? (
                            <Image src={order.agentImage} alt={order.agentName} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-8 w-8 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Order Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-white mb-1">{order.agentName}</h3>
                              <p className="text-sm text-gray-400 mb-2">by {order.sellerName}</p>
                              <p className="text-sm text-gray-400 line-clamp-2">{order.description}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <button className="p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer">
                                <MoreHorizontal className="h-4 w-4 text-gray-400" />
                              </button>
                            </div>
                          </div>

                          {/* Order Meta */}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                              <div>
                                <span className="text-gray-500">Ordered: </span>
                                {new Date(order.orderDate).toLocaleDateString()}
                              </div>
                              {order.deliveryDate && (
                                <div>
                                  <span className="text-gray-500">
                                    {order.status === 'completed' ? 'Delivered: ' : 'Due: '}
                                  </span>
                                  {new Date(order.deliveryDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            <div className="text-white font-semibold">
                              ${order.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
