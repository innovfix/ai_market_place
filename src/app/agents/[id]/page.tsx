import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { agents } from "@/data/agents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PricingPlans from "@/components/marketplace/PricingPlans";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatWidget } from "@/components/site/ChatWidget";
import AgentMediaTabs from "@/components/marketplace/AgentMediaTabs";

export default async function AgentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = agents.find((a) => a.id === id);
  if (!agent) return notFound();

  return (
    <>
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-[1.6fr_1fr]">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">{agent.name}</h1>
            <p className="text-muted-foreground mb-4">{agent.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {agent.capabilities.map((cap) => (
                <Badge key={cap} variant="secondary">{cap}</Badge>
              ))}
            </div>
            <AgentMediaTabs agent={agent} />
            {/* Configuration block removed as requested */}
            {agent.seller ? (
              <div className="mt-6 rounded-2xl border p-5">
                <h3 className="mb-4 text-base font-medium">Get to know {agent.seller.name}</h3>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      {agent.seller.avatarUrl ? <AvatarImage src={agent.seller.avatarUrl} alt={agent.seller.name} /> : null}
                      <AvatarFallback>{agent.seller.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{agent.seller.name}</div>
                      {agent.seller.title ? (
                        <div className="text-sm text-muted-foreground">{agent.seller.title}</div>
                      ) : null}
                    </div>
                  </div>
                  <Button variant="secondary">Contact seller</Button>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Member since</div>
                    <div className="font-medium">{agent.seller.memberSince ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Avg. response time</div>
                    <div className="font-medium">{agent.seller.responseTime ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Last delivery</div>
                    <div className="font-medium">{agent.seller.lastDelivery ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Languages</div>
                    <div className="font-medium">{agent.seller.languages?.join(", ") ?? "—"}</div>
                  </div>
                </div>
                {agent.seller.bio ? <p className="mt-4 text-sm text-muted-foreground">{agent.seller.bio}</p> : null}

                {/* portfolio removed as requested */}
              </div>
            ) : null}
          </div>
          <aside className="space-y-4">
            <PricingPlans basePriceUSD={agent.priceUSD} />
            <div className="rounded-2xl border p-5">
              <h3 className="mb-2 text-base font-medium">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><div className="text-muted-foreground">Provider</div><div className="font-medium">{agent.provider}</div></div>
                <div><div className="text-muted-foreground">Model</div><div className="font-medium">{agent.model}</div></div>
                <div><div className="text-muted-foreground">Version</div><div className="font-medium">v{agent.version}</div></div>
                <div><div className="text-muted-foreground">Last Updated</div><div className="font-medium">{new Date(agent.lastUpdated).toLocaleDateString()}</div></div>
              </div>
            </div>
            <div className="rounded-2xl border p-5">
              <h3 className="mb-2 text-base font-medium">Links</h3>
              <div className="flex flex-col gap-2 text-sm">
                <Link href={agent.docsUrl} className="underline" target="_blank">Documentation</Link>
                {agent.repoUrl ? <Link href={agent.repoUrl} className="underline" target="_blank">Source</Link> : null}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <ChatWidget
        name={agent.seller ? agent.seller.name : "Seller"}
        avatarUrl={agent.seller ? agent.seller.avatarUrl : undefined}
        subtitle={agent.seller && agent.seller.responseTime ? "Avg. response time: " + agent.seller.responseTime : ""}
      />
    </>
  );
}


