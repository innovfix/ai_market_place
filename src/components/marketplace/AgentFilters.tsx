"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchWithSuggestions } from "./SearchWithSuggestions";

interface AgentFiltersProps {
  query: string;
  setQuery: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  allTags: string[];
}

export function AgentFilters({ query, setQuery, selectedTags, setSelectedTags, allTags }: AgentFiltersProps) {
  const router = useRouter();
  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchWithSuggestions
        query={query}
        setQuery={setQuery}
        placeholder="Find an agent for: WhatsApp support, Auto Follow ups, Lead Scraping..."
      />

      <div className="flex flex-wrap gap-3">
        {[
          "reply to emails",
          "lead gen",
          "invoice OCR",
          "WhatsApp support",
          "auto follow-ups",
          "meeting notes",
          "summarize PDFs",
        ].map((phrase, index) => (
          <Badge
            key={phrase}
            variant="secondary"
            className={`cursor-pointer text-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
              index % 3 === 0 
                ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-200 hover:bg-blue-500/30 hover:border-blue-400/50" 
                : index % 3 === 1 
                ? "bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-200 hover:bg-purple-500/30 hover:border-purple-400/50"
                : "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/30 hover:border-emerald-400/50"
            }`}
            onClick={() => router.push(`/search?q=${encodeURIComponent(phrase)}`)}
          >
            <span>{phrase}</span>
            <ArrowRight className="h-4 w-4" />
          </Badge>
        ))}
      </div>
    </div>
  );
}


