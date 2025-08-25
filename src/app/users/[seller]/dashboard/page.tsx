"use client";

import { useParams } from "next/navigation";
import { SellerTopNav } from "@/components/site/SellerTopNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Star, TrendingUp, Clock, AlertTriangle, X, ChevronRight } from "lucide-react";
import { agents } from "@/data/agents";

export default function DashboardPage() {
  const params = useParams<{ seller: string }>();
  const seller = params?.seller ? decodeURIComponent(params.seller) : "";
  const sellerInfo = agents.find((a) => a.seller?.name.toLowerCase() === seller.toLowerCase())?.seller;

  return (
    <div>
      <SellerTopNav seller={seller} />
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={sellerInfo?.avatarUrl} alt={seller} />
                    <AvatarFallback className="text-lg">{seller.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">{seller}</h3>
                  <p className="text-sm text-muted-foreground mb-4">@{seller.toLowerCase()}</p>
                  <Button variant="outline" size="sm">View profile</Button>
                </div>
              </CardContent>
            </Card>

            {/* Level Overview Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Level overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">My level</span>
                  <Badge variant="secondary">New seller</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Success score</span>
                  <span className="text-sm">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">-</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response rate</span>
                  <span className="text-sm">-</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">View progress</Button>
              </CardContent>
            </Card>

            {/* Availability Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  While unavailable, your Agents are hidden and you will not receive new orders.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {seller}</h1>
              <p className="text-muted-foreground">
                Find important messages, tips, and links to helpful resources here:
              </p>
            </div>

            {/* Alert Card */}
            <Card className="border-amber-300 bg-amber-100 dark:border-amber-400 dark:bg-amber-900/20">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-200">Verify your information</h3>
                      <p className="text-sm text-amber-700 dark:text-amber-300">Stay compliant to continue working with EU clients</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
                    Verify
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Promotional Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 text-blue-900 dark:text-blue-100">Join Seller Plus Kickstart and grow your business</h3>
                    <p className="text-blue-700 dark:text-blue-300">
                      Check out all the exclusive tools and resources that can help you fast-track your success
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                      <X className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                      <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Orders Section */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Active orders - 0 ($0)</h2>
              <Button variant="outline" size="sm">
                Active orders (0) <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Empty State */}
            <Card>
              <CardContent className="pt-12 pb-12">
                <div className="text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No active orders</h3>
                  <p className="text-muted-foreground mb-4">
                    When you receive orders, they will appear here
                  </p>
                  <Button>Create your first Agent</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
