"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SAMPLE_FAQ = [
  { id: 1, question: "How do I create a gig?", answer: "Go to seller dashboard → gigs → create." },
  { id: 2, question: "How do I withdraw funds?", answer: "Visit dashboard → billing to request a withdrawal." },
  { id: 3, question: "How do I contact support?", answer: "Use the contact support page or email support@example.com." },
  { id: 4, question: "How do I change my language?", answer: "Open profile settings and change language preferences." },
  { id: 5, question: "How do I report a user?", answer: "Use the report option on the user's profile or contact support." },
];

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return SAMPLE_FAQ;
    const q = query.toLowerCase();
    return SAMPLE_FAQ.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-semibold mb-4">Help Center</h1>

        <div className="mb-6">
          <Input
            placeholder="Search help articles, questions, and guides"
            value={query}
            onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
            className="w-full max-w-xl bg-gray-900 text-white border-gray-700"
          />
        </div>

        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="text-gray-400">No results found. Try different keywords.</div>
          ) : (
            results.map((r) => (
              <article key={r.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <h2 className="font-medium text-lg">{r.question}</h2>
                <p className="mt-2 text-gray-300">{r.answer}</p>
                <div className="mt-3">
                  <Link href="#" className="text-blue-400 hover:underline">Read more</Link>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}


