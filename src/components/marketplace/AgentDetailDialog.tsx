"use client";

import Link from "next/link";
import { AIAgent } from "@/types/agent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AgentDetailDialogProps {
  agent: AIAgent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgentDetailDialog({ agent, open, onOpenChange }: AgentDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {agent ? (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{agent.name}</span>
                <span className="text-sm font-medium">${agent.priceUSD}</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {agent.description}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap gap-2">
              {agent.capabilities.map((cap) => (
                <Badge key={cap} variant="secondary">
                  {cap}
                </Badge>
              ))}
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Provider</div>
                <div className="text-sm font-medium">{agent.provider}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Model</div>
                <div className="text-sm font-medium">{agent.model}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Version</div>
                <div className="text-sm font-medium">v{agent.version}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Last Updated</div>
                <div className="text-sm font-medium">
                  {new Date(agent.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Configuration</div>
              <pre className="rounded-md bg-secondary p-3 text-xs overflow-x-auto">
                {JSON.stringify(agent.config, null, 2)}
              </pre>
            </div>

            <div className="flex items-center gap-3">
              <Link className="text-sm underline" href={agent.docsUrl} target="_blank">
                Documentation
              </Link>
              {agent.repoUrl ? (
                <Link className="text-sm underline" href={agent.repoUrl} target="_blank">
                  Source
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}


