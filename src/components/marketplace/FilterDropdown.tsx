"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FilterOption } from "@/data/searchFilters";

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  multiSelect?: boolean;
  className?: string;
}

export function FilterDropdown({
  label,
  options,
  selectedValues,
  onSelectionChange,
  multiSelect = true,
  className
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionToggle = (optionId: string) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(optionId)
        ? selectedValues.filter(id => id !== optionId)
        : [...selectedValues, optionId];
      onSelectionChange(newValues);
    } else {
      onSelectionChange(selectedValues.includes(optionId) ? [] : [optionId]);
      setIsOpen(false);
    }
  };

  const clearAllSelections = () => {
    onSelectionChange([]);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return label;
    if (selectedValues.length === 1) {
      const option = options.find(opt => opt.id === selectedValues[0]);
      return option?.label || label;
    }
    return `${selectedValues.length} selected`;
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

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  return (
    <div className={cn("relative", className)}>
      <Button
        ref={buttonRef}
        variant="outline"
        className={cn(
          "rounded-[10px] h-10 px-4 flex-1 sm:flex-none min-w-[160px] justify-between cursor-pointer",
          selectedValues.length > 0 && "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{getDisplayText()}</span>
        <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden min-w-[280px]"
        >
          {/* Search header */}
          <div className="p-3 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={`Search ${label.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-8 text-sm"
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => handleOptionToggle(option.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={cn(
                      "w-4 h-4 border-2 rounded flex items-center justify-center",
                      selectedValues.includes(option.id)
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300 dark:border-gray-600"
                    )}>
                      {selectedValues.includes(option.id) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </span>
                  </div>
                  {option.count && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({option.count})
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer with actions */}
          {selectedValues.length > 0 && (
            <div className="border-t border-gray-100 dark:border-gray-700 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedValues.length} selected
                </span>
                <button
                  onClick={clearAllSelections}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
