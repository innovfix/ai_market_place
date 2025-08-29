"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, Check, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIAgent } from "@/types/agent";
import { useRouter } from "next/navigation";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AIAgent;
}

interface PackageOption {
  id: string;
  name: string;
  price: number;
  description: string;
  deliveryTime: string;
  features: string[];
  popular?: boolean;
}

export function OrderModal({ isOpen, onClose, agent }: OrderModalProps) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<string>("basic");
  const [quantity, setQuantity] = useState(1);

  const packages: PackageOption[] = [
    {
      id: "basic",
      name: "Basic",
      price: agent.priceUSD,
      description: `${agent.name} - Basic package`,
      deliveryTime: "14-day delivery",
      features: [
        "Functional AI agent",
        "1 level of customization",
        "1 platform integration",
        "Upload content for training",
        "3 rounds of revision"
      ]
    },
    {
      id: "standard",
      name: "Standard",
      price: agent.priceUSD * 2,
      description: `${agent.name} - Standard package with more features`,
      deliveryTime: "10-day delivery",
      features: [
        "Everything in Basic",
        "Advanced AI configuration",
        "3 platform integrations",
        "Custom training data",
        "Unlimited revisions",
        "24/7 support"
      ],
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      price: agent.priceUSD * 3.5,
      description: `${agent.name} - Premium package with full customization`,
      deliveryTime: "7-day delivery",
      features: [
        "Everything in Standard",
        "Full AI customization",
        "Unlimited integrations",
        "Dedicated support",
        "Source code included",
        "White-label option",
        "Priority development"
      ]
    }
  ];

  const selectedPkg = packages.find(pkg => pkg.id === selectedPackage) || packages[0];
  const totalPrice = selectedPkg.price * quantity;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(totalPrice * 83); // Convert to INR (approximate rate)

  const increaseQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const handleContinue = () => {
    // Store order data in sessionStorage for the checkout page
    const orderData = {
      agent,
      selectedPackage,
      quantity,
      totalPrice
    };
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    router.push('/dashboard/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-lg bg-black shadow-2xl transform transition-transform duration-500 ease-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="sticky top-0 bg-black border-b border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Order options</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Package Selection */}
          <div className="space-y-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={cn(
                  "p-4 border-2 rounded-xl cursor-pointer transition-all duration-200",
                  selectedPackage === pkg.id
                    ? "border-blue-500 bg-blue-900/30"
                    : "border-gray-700 hover:border-gray-600 hover:bg-gray-900/50"
                )}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{pkg.name}</h3>
                      {pkg.popular && (
                        <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full font-medium border border-orange-500/30">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{pkg.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">
                      ${pkg.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Package Details */}
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">{selectedPkg.name}</h3>
              <span className="text-sm text-gray-300">{formattedPrice}</span>
            </div>
            
            <p className="text-sm text-gray-400 mb-4">{selectedPkg.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-white">Gig Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="p-1 rounded-lg border border-gray-600 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium text-white">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= 10}
                  className="p-1 rounded-lg border border-gray-600 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-white">{formattedPrice}</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Single order</p>
            </div>
          </div>

          {/* Package Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              {selectedPkg.name} package
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{selectedPkg.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RefreshCw className="h-4 w-4" />
                <span>Unlimited revisions</span>
              </div>
            </div>

            <ul className="space-y-2 mt-4">
              {selectedPkg.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                  <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Continue Button */}
          <div className="sticky bottom-0 bg-black pt-4 border-t border-gray-700">
            <Button 
              onClick={handleContinue}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            >
              Continue ({formattedPrice})
            </Button>
            <p className="text-xs text-gray-400 text-center mt-2">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
