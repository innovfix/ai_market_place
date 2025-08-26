"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

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
      <div className="relative">
        <Input
          placeholder="Find an agent for: WhatsApp support, Auto Follow ups, Lead Scraping..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 text-base pl-5 pr-16 bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-blue-500/50 focus:ring-blue-500/20"
        />
        <Button
          type="button"
          variant="secondary"
          className="absolute right-1 top-1 bottom-1 h-auto px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white shadow-lg"
          onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

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


