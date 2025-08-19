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
          placeholder="Find an agent for: “WhatsApp support”, “Auto Follow ups”, “Lead Scraping”…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 text-base pl-5 pr-16"
        />
        <Button
          type="button"
          variant="secondary"
          className="absolute right-1 top-1 bottom-1 h-auto px-4"
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
        ].map((phrase) => (
          <Badge
            key={phrase}
            variant="secondary"
            className="cursor-pointer text-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-2"
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


