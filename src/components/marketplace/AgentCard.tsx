"use client";

import Image from "next/image";
import Link from "next/link";
import { AIAgent } from "@/types/agent";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

interface AgentCardProps {
  agent: AIAgent;
  onView?: (agent: AIAgent) => void;
  href?: string;
}

export function AgentCard({ agent, onView, href }: AgentCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-md bg-secondary">
            {agent.imageUrl ? (
              <Image src={agent.imageUrl} alt={agent.name} fill className="object-cover" />
            ) : null}
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">{agent.name}</div>
            <div className="text-xs text-muted-foreground truncate">
              {agent.provider} • {agent.model}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{agent.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {agent.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            {agent.rating.toFixed(1)}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{agent.downloads.toLocaleString()} installs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">${agent.priceUSD}</div>
          {href ? (
            <Button size="sm" asChild>
              <Link href={href}>View</Link>
            </Button>
          ) : (
            <Button size="sm" onClick={() => onView?.(agent)}>View</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}


