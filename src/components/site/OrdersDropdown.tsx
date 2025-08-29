"use client";

import { useState, useRef, useEffect } from "react";
import { Package, Clock, CheckCircle, XCircle, Volume2, VolumeX, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
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
}

interface OrdersDropdownProps {
  orderCount?: number;
}

export function OrdersDropdown({ orderCount = 2 }: OrdersDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const orders: Order[] = [
    {
      id: "1",
      agentName: "AI Sales Assistant",
      agentImage: "/salesaiimg.png",
      sellerName: "john_dev_2024",
      orderDate: "2024-12-15",
      status: "active",
      price: 150,
      deliveryDate: "2024-12-20"
    },
    {
      id: "2",
      agentName: "Content Creator Bot",
      sellerName: "sarah_writer",
      orderDate: "2024-12-10",
      status: "completed",
      price: 75,
      deliveryDate: "2024-12-18"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    
    // Play sound when turning on
    if (newSoundState) {
      setTimeout(() => {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
          console.log("Audio not supported");
        }
      }, 100);
    }
  };

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
        return 'text-blue-400';
      case 'completed':
        return 'text-green-400';
      case 'cancelled':
        return 'text-red-400';
      case 'pending':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="relative">
      <button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-white hover:text-blue-200 transition-colors cursor-pointer"
      >
        <span>Orders</span>
        {orderCount > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
            {orderCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 z-50 mt-2 w-96 bg-black border border-gray-700 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">
                Orders ({orders.length})
              </span>
            </div>
          </div>

          {/* Orders List */}
          <div className="max-h-96 overflow-y-auto">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="p-4 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {/* Agent Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
                      {order.agentImage ? (
                        <Image src={order.agentImage} alt={order.agentName} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-medium text-sm truncate">
                        {order.agentName}
                      </h4>
                      <div className="flex items-center gap-1 ml-2">
                        {getStatusIcon(order.status)}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mb-1">
                      by {order.sellerName}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`${getStatusColor(order.status)} font-medium`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="text-white font-semibold">
                        ${order.price}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      {order.status === 'completed' ? 'Delivered' : 'Due'}: {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'TBD'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Orders Button */}
          <div className="p-4 border-t border-gray-700">
            <button 
              onClick={() => {
                setIsOpen(false);
                router.push('/dashboard/orders');
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg transition-all duration-200 cursor-pointer"
            >
              View All Orders
            </button>
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-900 border-t border-gray-700">
            <div className="flex items-center justify-start gap-2">
              <button 
                onClick={toggleSound}
                className="p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer"
                title={soundEnabled ? "Disable sound notifications" : "Enable sound notifications"}
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-blue-400" />
                ) : (
                  <VolumeX className="h-4 w-4 text-red-400" />
                )}
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  router.push('/seller-dashboard/account/notifications');
                }}
                className="p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer"
                title="Open notification settings"
              >
                <Settings className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Empty state */}
          {orders.length === 0 && (
            <div className="p-8 text-center">
              <Package className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No orders yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
