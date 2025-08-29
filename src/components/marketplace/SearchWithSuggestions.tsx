"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'popular' | 'recent' | 'category' | 'agent';
  category?: string;
}

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  // Popular searches (matching your screenshot)
  { id: 'sales-closer', text: 'sales closer', type: 'popular', category: 'Sales' },
  { id: 'sales-funnel', text: 'sales funnel', type: 'popular', category: 'Sales' },
  { id: 'salesperson', text: 'salesperson', type: 'popular', category: 'Sales' },
  { id: 'linkedin-sales-navigator', text: 'linkedin sales navigator', type: 'popular', category: 'Sales' },
  { id: 'sales-rep', text: 'sales rep', type: 'popular', category: 'Sales' },
  { id: 'sales-flyer', text: 'sales flyer', type: 'popular', category: 'Marketing' },
  { id: 'salesforce', text: 'salesforce', type: 'popular', category: 'CRM' },
  { id: 'sales', text: 'sales', type: 'popular', category: 'Sales' },
  
  // Business automation
  { id: 'whatsapp-support', text: 'WhatsApp support', type: 'popular', category: 'Customer Support' },
  { id: 'auto-follow-ups', text: 'auto follow-ups', type: 'popular', category: 'Automation' },
  { id: 'lead-generation', text: 'lead generation', type: 'popular', category: 'Sales' },
  { id: 'email-automation', text: 'email automation', type: 'popular', category: 'Marketing' },
  { id: 'invoice-ocr', text: 'invoice OCR', type: 'popular', category: 'Finance' },
  { id: 'meeting-notes', text: 'meeting notes', type: 'popular', category: 'Productivity' },
  { id: 'pdf-summarizer', text: 'PDF summarizer', type: 'popular', category: 'Documents' },
  
  // Customer service
  { id: 'customer-support', text: 'customer support', type: 'popular', category: 'Support' },
  { id: 'chatbot', text: 'chatbot', type: 'popular', category: 'Support' },
  { id: 'help-desk', text: 'help desk', type: 'popular', category: 'Support' },
  { id: 'ticket-routing', text: 'ticket routing', type: 'popular', category: 'Support' },
  
  // Data & Analytics
  { id: 'data-analysis', text: 'data analysis', type: 'popular', category: 'Analytics' },
  { id: 'report-generation', text: 'report generation', type: 'popular', category: 'Analytics' },
  { id: 'web-scraping', text: 'web scraping', type: 'popular', category: 'Data' },
  { id: 'market-research', text: 'market research', type: 'popular', category: 'Research' },
  
  // Categories
  { id: 'cat-ai-agents', text: 'AI Agents', type: 'category' },
  { id: 'cat-automation', text: 'Automation Tools', type: 'category' },
  { id: 'cat-analytics', text: 'Analytics & Reporting', type: 'category' },
  { id: 'cat-customer-service', text: 'Customer Service', type: 'category' },
  { id: 'cat-marketing', text: 'Marketing & Sales', type: 'category' },
  { id: 'cat-productivity', text: 'Productivity', type: 'category' },
];

interface SearchWithSuggestionsProps {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchWithSuggestions({ 
  query, 
  setQuery, 
  placeholder = "Find an agent for: WhatsApp support, Auto Follow ups, Lead Scraping...",
  className 
}: SearchWithSuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) {
      return SEARCH_SUGGESTIONS.filter(s => s.type === 'popular').slice(0, 10);
    }
    
    const searchTerm = query.toLowerCase().trim();
    return SEARCH_SUGGESTIONS
      .filter(suggestion => 
        suggestion.text.toLowerCase().includes(searchTerm) ||
        suggestion.category?.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => {
        // Prioritize exact matches first
        const aExact = a.text.toLowerCase() === searchTerm;
        const bExact = b.text.toLowerCase() === searchTerm;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        
        // Then prioritize starts with
        const aStarts = a.text.toLowerCase().startsWith(searchTerm);
        const bStarts = b.text.toLowerCase().startsWith(searchTerm);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        return 0;
      })
      .slice(0, 10);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
  };

  const handleSearch = () => {
    if (query.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredSuggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[highlightedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'popular':
        return <TrendingUp className="h-4 w-4" />;
      case 'recent':
        return <Clock className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className="h-14 text-base pl-5 pr-16 bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-blue-500/50 focus:ring-blue-500/20"
        />
        <Button
          type="button"
          variant="secondary"
          className="absolute right-1 top-1 bottom-1 h-auto px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white shadow-lg"
          onClick={handleSearch}
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="max-h-80 overflow-y-auto">
            {!query.trim() && (
              <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                Popular searches
              </div>
            )}
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800 last:border-b-0",
                  highlightedIndex === index
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="text-gray-400 dark:text-gray-500">
                  {getSuggestionIcon(suggestion.type)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {suggestion.text}
                  </div>
                  {suggestion.category && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      in {suggestion.category}
                    </div>
                  )}
                </div>
                {suggestion.type === 'popular' && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Popular
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Bottom section with categories */}
          {!query.trim() && (
            <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Browse by category</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">AI Services</div>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Music & Audio</div>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Digital</div>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Video & Animation</div>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Writing & Translation</div>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Business</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
