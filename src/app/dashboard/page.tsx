"use client";

import { useMemo, useState } from "react";
import { agents } from "@/data/agents";
import { DashboardAgentCard } from "@/components/marketplace/DashboardAgentCard";
import { AgentDetailDialog } from "@/components/marketplace/AgentDetailDialog";
import { FilterDropdown } from "@/components/marketplace/FilterDropdown";
import { SortDropdown } from "@/components/marketplace/SortDropdown";
import { SEARCH_FILTERS } from "@/data/searchFilters";
import { LoggedInHeader } from "@/components/site/LoggedInHeader";
import { AIAgent } from "@/types/agent";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function DashboardPage() {
  const [activeAgent, setActiveAgent] = useState<AIAgent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedServiceOptions, setSelectedServiceOptions] = useState<string[]>([]);
  const [selectedSellerDetails, setSelectedSellerDetails] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string[]>([]);
  
  // Sort state
  const [sortBy, setSortBy] = useState<string>('relevance');

  const filtered = useMemo(() => {
    let result = agents;
    
    // Apply filters
    if (selectedCategory.length > 0) {
      result = result.filter((a) => 
        a.tags.some(tag => selectedCategory.some(cat => 
          tag.toLowerCase().includes(cat.replace('-', ' '))
        ))
      );
    }
    
    if (selectedServiceOptions.length > 0) {
      result = result.filter((a) => 
        selectedServiceOptions.includes('ai-powered') ? true : 
        selectedServiceOptions.includes('api-access') ? a.capabilities.length > 0 :
        true
      );
    }
    
    if (selectedBudget.length > 0) {
      result = result.filter((a) => {
        if (selectedBudget.includes('under-50')) return a.priceUSD < 50;
        if (selectedBudget.includes('50-100')) return a.priceUSD >= 50 && a.priceUSD <= 100;
        if (selectedBudget.includes('100-250')) return a.priceUSD >= 100 && a.priceUSD <= 250;
        if (selectedBudget.includes('250-500')) return a.priceUSD >= 250 && a.priceUSD <= 500;
        if (selectedBudget.includes('over-5000')) return a.priceUSD > 5000;
        return true;
      });
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'popular':
        result.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
        break;
      case 'relevance':
      default:
        result.sort((a, b) => {
          const scoreA = (a.rating || 0) * 0.7 + (a.downloads || 0) * 0.0001;
          const scoreB = (b.rating || 0) * 0.7 + (b.downloads || 0) * 0.0001;
          return scoreB - scoreA;
        });
        break;
    }
    
    return result;
  }, [selectedCategory, selectedServiceOptions, selectedSellerDetails, selectedBudget, selectedDeliveryTime, sortBy]);

  const hasActiveFilters = selectedCategory.length > 0 || selectedServiceOptions.length > 0 || 
    selectedSellerDetails.length > 0 || selectedBudget.length > 0 || selectedDeliveryTime.length > 0;

  const clearAllFilters = () => {
    setSelectedCategory([]);
    setSelectedServiceOptions([]);
    setSelectedSellerDetails([]);
    setSelectedBudget([]);
    setSelectedDeliveryTime([]);
  };

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">All Services</h1>
          <p className="text-blue-200">Discover AI agents to automate your business</p>
        </div>
        
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <FilterDropdown
            label="All Categories"
            options={SEARCH_FILTERS.category.options}
            selectedValues={selectedCategory}
            onSelectionChange={setSelectedCategory}
          />
          <FilterDropdown
            label="Service options"
            options={SEARCH_FILTERS.serviceOptions.options}
            selectedValues={selectedServiceOptions}
            onSelectionChange={setSelectedServiceOptions}
          />
          <FilterDropdown
            label="Seller details"
            options={SEARCH_FILTERS.sellerDetails.options}
            selectedValues={selectedSellerDetails}
            onSelectionChange={setSelectedSellerDetails}
          />
          <FilterDropdown
            label="Budget"
            options={SEARCH_FILTERS.budget.options}
            selectedValues={selectedBudget}
            onSelectionChange={setSelectedBudget}
          />
          <FilterDropdown
            label="Delivery time"
            options={SEARCH_FILTERS.deliveryTime.options}
            selectedValues={selectedDeliveryTime}
            onSelectionChange={setSelectedDeliveryTime}
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all filters
            </Button>
          )}
          <div className="sm:ml-auto w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
            <div className="text-sm text-blue-200">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </div>
            <SortDropdown
              selectedSort={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((agent) => (
            <DashboardAgentCard 
              key={agent.id} 
              agent={agent} 
              href={`/agents/${agent.id}`} 
              onView={(a) => { setActiveAgent(a); setDialogOpen(true); }} 
            />
          ))}
        </div>
        
        <AgentDetailDialog agent={activeAgent} open={dialogOpen} onOpenChange={setDialogOpen} />
      </div>
    </div>
  );
}
