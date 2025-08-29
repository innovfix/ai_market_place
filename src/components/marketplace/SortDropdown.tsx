"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SortOption {
  id: string;
  label: string;
  value: string;
}

const SORT_OPTIONS: SortOption[] = [
  { id: 'relevance', label: 'Relevance', value: 'relevance' },
  { id: 'price-low-high', label: 'Price: Low to High', value: 'price-asc' },
  { id: 'rating', label: 'Best Rating', value: 'rating' }
];

interface SortDropdownProps {
  selectedSort: string;
  onSortChange: (sortValue: string) => void;
  className?: string;
}

export function SortDropdown({
  selectedSort,
  onSortChange,
  className
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = SORT_OPTIONS.find(option => option.value === selectedSort) || SORT_OPTIONS[0];

  const handleOptionSelect = (option: SortOption) => {
    onSortChange(option.value);
    setIsOpen(false);
  };

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

  return (
    <div className={cn("relative", className)}>
      <button
        ref={buttonRef}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-500 dark:text-gray-400">Sort by:</span>
        <span>{selectedOption.label}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 z-50 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden min-w-[200px]"
        >
          <div className="py-1">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.id}
                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left cursor-pointer"
                onClick={() => handleOptionSelect(option)}
              >
                <span className="text-gray-900 dark:text-white">{option.label}</span>
                {selectedSort === option.value && (
                  <Check className="h-4 w-4 text-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
