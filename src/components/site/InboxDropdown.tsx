"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Mail, Settings, Volume2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface MessageItem {
  id: string;
  name: string;
  handle: string;
  text: string;
  time: string;
  avatarUrl?: string;
}

const SAMPLE_MESSAGES: MessageItem[] = [
  {
    id: "1",
    name: "Ajay Kumar",
    handle: "@ajayceo1985",
    text: "Please let me know your thoughts",
    time: "5 months",
    avatarUrl: "/profile1.jpeg",
  },
  {
    id: "2",
    name: "Abdul Muizz",
    handle: "@abdulmuizz667",
    text: "Features are also listed there",
    time: "6 months",
    avatarUrl: "/profile1.jpeg",
  },
];

export function InboxDropdown() {
  const params = useParams<{ seller: string }>();
  const seller = params?.seller ? decodeURIComponent(params.seller) : "";
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative rounded-full p-2 hover:bg-accent">
        <Mail className="h-5 w-5" />
        <span className="sr-only">Open inbox</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[360px] p-0">
        <div className="border-b p-3 text-sm font-medium">Inbox (0)</div>
        <div className="max-h-80 overflow-auto">
          {SAMPLE_MESSAGES.map((m) => (
            <Link
              key={m.id}
              href={`/users/${seller}/messages?conversation=${m.id}`}
              className="flex gap-3 border-b p-3 hover:bg-accent transition-colors"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border">
                {m.avatarUrl ? (
                  <Image src={m.avatarUrl} alt={m.name} fill className="object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium truncate">{m.name}</span>
                  <span className="truncate text-muted-foreground">{m.handle}</span>
                </div>
                <div className="truncate text-sm text-muted-foreground">{m.text}</div>
                <div className="text-xs text-muted-foreground">{m.time}</div>
              </div>
            </Link>
          ))}
          {SAMPLE_MESSAGES.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No messages yet</div>
          ) : null}
        </div>
        <div className="flex items-center justify-between border-t p-2 text-sm">
          <div className="flex items-center gap-3 px-1">
            <Volume2 className="h-4 w-4" />
            <Settings className="h-4 w-4" />
          </div>
          <Link href={`/users/${seller}/messages`} className="px-2 text-primary hover:underline">See All in Inbox</Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


