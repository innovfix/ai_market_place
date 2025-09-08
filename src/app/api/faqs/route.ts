import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(faqs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const faq = await prisma.fAQ.create({ data: { question: body.question, answer: body.answer } });
  return NextResponse.json(faq);
}


