"use client";

import Image from "next/image";
import Link from "next/link";
import { AIAgent } from "@/types/agent";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardAgentCardProps {
  agent: AIAgent;
  onView?: (agent: AIAgent) => void;
  href?: string;
}

export function DashboardAgentCard({ agent, onView, href }: DashboardAgentCardProps) {
  const handleCardClick = () => {
    if (href) {
      // Convert regular agent href to dashboard agent href
      const dashboardHref = href.replace('/agents/', '/dashboard/agents/');
      window.location.href = dashboardHref;
    } else if (onView) {
      onView(agent);
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-all duration-200 cursor-pointer hover:bg-gray-900/50 hover:scale-[1.02]" 
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-md bg-secondary">
          {agent.imageUrl ? (
            <Image src={agent.imageUrl} alt={agent.name} fill className="object-contain" />
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="font-medium truncate text-white">{agent.name}</div>
          <div className="text-xs text-gray-400 truncate">
            {agent.provider} • {agent.model}
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-3">{agent.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {agent.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] bg-gray-700 text-gray-200 border-gray-600">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
