"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Shield, Clock, HelpCircle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AIAgent } from "@/types/agent";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function DashboardCheckoutPage() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardDisplayName, setCardDisplayName] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Credit & Debit Cards",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <div className="text-blue-600 font-bold text-sm">PayPal</div>
    }
  ];

  useEffect(() => {
    // Get order data from sessionStorage
    const storedOrderData = sessionStorage.getItem('orderData');
    if (storedOrderData) {
      const parsedData = JSON.parse(storedOrderData);
      const serviceFee = parsedData.totalPrice * 0.14; // 14% service fee
      const gst = parsedData.totalPrice * 0.18; // 18% GST
      const total = parsedData.totalPrice + serviceFee + gst;
      
      setOrderData({
        title: `I will provide ${parsedData.agent.name} AI agent services`,
        seller: parsedData.agent.seller?.name || "AI Marketplace",
        package: parsedData.selectedPackage,
        price: parsedData.totalPrice,
        serviceFee: serviceFee,
        gst: gst,
        total: total,
        deliveryTime: "2 days",
        features: [
          "AI agent configuration",
          "Source code included",
          "3 revisions included"
        ],
        agent: parsedData.agent
      });
    } else {
      // Fallback mock data
      setOrderData({
        title: "I will design a professional app icon for your mobile application",
        seller: "Tecsxa",
        package: "Bronze",
        price: 2303.45,
        serviceFee: 449.63,
        gst: 494.78,
        total: 3247.87,
        deliveryTime: "2 days",
        features: [
          "1 icon included",
          "Source file",
          "1 revision"
        ]
      });
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatUSD = (amount: number) => {
    // Convert INR to USD (approximate rate: 1 USD = 83 INR)
    const usdAmount = amount / 83;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(usdAmount);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      setExpiryDate(value.slice(0, 2) + '/' + value.slice(2, 4));
    } else {
      setExpiryDate(value);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple checkout header - no duplicate header */}
      <div className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Checkout</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Lock className="h-4 w-4" />
            SSL Secure Payment
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Payment method</h2>
            </div>

            {/* Payment Methods */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600"
                      />
                      <div className="flex items-center gap-2">
                        {method.icon}
                        <span className="text-white">{method.name}</span>
                        {method.id === "card" && (
                          <div className="flex gap-1 ml-2">
                            <div className="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">V</div>
                            <div className="w-8 h-5 bg-red-600 rounded text-xs text-white flex items-center justify-center font-bold">M</div>
                            <div className="w-8 h-5 bg-blue-500 rounded text-xs text-white flex items-center justify-center font-bold">D</div>
                            <div className="w-8 h-5 bg-orange-500 rounded text-xs text-white flex items-center justify-center font-bold">A</div>
                            <div className="w-8 h-5 bg-green-600 rounded text-xs text-white flex items-center justify-center font-bold">J</div>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {selectedPayment === "card" && (
                  <div className="mt-6 space-y-4">
                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Expiry and Security */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiration date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={handleExpiryChange}
                          maxLength={5}
                          className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-1">
                          Security code
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={securityCode}
                          onChange={(e) => setSecurityCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cardholder's name
                      </label>
                      <input
                        type="text"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-sm text-gray-400 mt-1">As written on card</p>
                    </div>

                    {/* Card Display Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card display name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Marketing card, Legal team card..."
                        value={cardDisplayName}
                        onChange={(e) => setCardDisplayName(e.target.value)}
                        className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-400 mt-1">0/30</p>
                    </div>

                    {/* Save Card Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded"
                      />
                      <span className="text-sm text-gray-300">Save this card for future payments</span>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </label>
                  </div>
                )}

                {selectedPayment === "paypal" && (
                  <div className="mt-6 space-y-4">
                    {/* Remember for future payments checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded"
                      />
                      <span className="text-sm text-gray-300">Remember for future payments</span>
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <div>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer">
                + Apply promo code
              </button>
            </div>

            {/* Billing Information */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Billing Information</h3>
                  <button className="text-blue-400 hover:text-blue-300 text-sm cursor-pointer">Edit</button>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="font-medium">akraja7</div>
                  <div className="text-gray-400">Tamil Nadu, India</div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <ArrowLeft className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">We've got your back</h4>
                  <p className="text-xs text-gray-400 mt-1">Your payment will be held by AI Market until your order is completed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">100% secure payments</h4>
                  <p className="text-xs text-gray-400 mt-1">Your financial information is protected.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Questions about payments?</h4>
                  <button className="text-xs text-blue-400 hover:text-blue-300 mt-1 cursor-pointer">Explore our FAQs</button>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              Payments are processed by AI Market. See{" "}
              <button className="text-blue-400 hover:text-blue-300 cursor-pointer">Payment Terms</button>.
            </p>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700 sticky top-4">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Service Image */}
                  <div className="relative w-full aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
                    {orderData.agent?.imageUrl ? (
                      <Image 
                        src={orderData.agent.imageUrl} 
                        alt={orderData.agent.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid grid-cols-4 gap-2 p-4 h-full">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="bg-white/20 rounded aspect-square flex items-center justify-center">
                            <div className="w-6 h-6 bg-white/30 rounded"></div>
                          </div>
                        ))}
                      </div>
                    )}
                    <Badge className="absolute top-3 right-3 bg-blue-600 text-white text-xs">
                      AI CHOICE
                    </Badge>
                  </div>

                  <h3 className="font-medium text-sm leading-tight">{orderData.title}</h3>

                  {/* Package Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{orderData.package}</span>
                      <span className="font-medium">{formatCurrency(orderData.price)}</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {orderData.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="space-y-2 pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Service fee</span>
                        <div className="flex items-center gap-1">
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                          <span>{formatCurrency(orderData.serviceFee)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">GST</span>
                        <div className="flex items-center gap-1">
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                          <span>{formatCurrency(orderData.gst)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-lg">{formatCurrency(orderData.total)}</span>
                    </div>

                    {/* Delivery Time */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Total delivery time</span>
                      <span>{orderData.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Terms */}
                  <p className="text-xs text-gray-400 leading-relaxed">
                    By clicking the button, you agree to AI Market's{" "}
                    <button className="text-blue-400 hover:text-blue-300 cursor-pointer">Terms of Service</button>{" "}
                    and{" "}
                    <button className="text-blue-400 hover:text-blue-300 cursor-pointer">Payment Terms</button>
                  </p>

                  {/* Checkout Button */}
                  {selectedPayment === "paypal" ? (
                    <>
                      <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2">
                        <span className="font-bold text-lg">PayPal</span>
                      </Button>
                      <div className="flex items-center gap-2 justify-center text-sm text-gray-400">
                        <Lock className="h-4 w-4" />
                        SSL Secure Payment
                      </div>
                      <p className="text-xs text-gray-400 text-center">
                        You will be charged {formatUSD(orderData.total)}. Total amount includes currency conversion fees.
                      </p>
                    </>
                  ) : (
                    <>
                      <Button className="w-full h-12 font-medium rounded-lg">
                        Confirm & Pay
                      </Button>
                      <p className="text-xs text-gray-400 text-center">
                        You will be charged {formatCurrency(orderData.total)}. Total amount includes currency conversion fees.
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
