import { AIAgent } from "@/types/agent";

export const agents: AIAgent[] = [
  {
    id: "code-gen-pro",
    name: "Salesforce Agentforce",
    description:
      "Salesforce's Agentforce helps you build and customize autonomous AI agents to help your business get more work done. This can be a Service Agent that helps to deflect cases and resolve customer inquiries accurately and conversationally, or it could be a Sales Agent that proactively nurtures leads by contacting customers, responding to their questions, and scheduling meetings. Agentforce Agents give your company the additional resources it needs to drive customer success.",
    provider: "OpenAI",
    model: "gpt-4o",
    version: "1.2.0",
    priceUSD: 129,
    rating: 4.7,
    downloads: 1542,
    lastUpdated: "2024-12-19T10:00:00.000Z",
    imageUrl: "/salesaiimg.png",
    videoUrl: "https://www.youtube.com/watch?v=irdNqlytsLc",
    screenshots: ["/salesaiimg.png"],
    comments: [
      {
        id: "c1",
        author: "ersonusaini",
        content:
          "Your app ux ui design not friendly and professional please quick update release when release main script current flutter code too much outdated I will recommend upgrading.",
        createdAt: "2024-12-19T09:30:00.000Z",
      },
      {
        id: "c2",
        author: "Saeid05",
        purchased: true,
        content:
          "I have stopped using your app because it is quite buggy. While you frequently update your website, your app does not receive the same attention.",
        createdAt: "2024-12-16T09:30:00.000Z",
        replies: 2,
      },
    ],
    docsUrl: "https://vercel.com/",
    repoUrl: "https://vercel.com/",
    tags: ["developer-tools", "typescript", "testing"],
    capabilities: ["Code Generation", "Automation"],
    config: {
      temperature: 0.2,
      maxTokens: 4096,
      systemPrompt:
        "You are a senior software engineer AI focused on clarity, tests, and maintainability.",
    },
    seller: {
      name: "Tecsxa",
      title: "Top notch eCommerce Development for Your Business",
      rating: 5.0,
      level: "Level 2",
      location: "",
      memberSince: "Feb 2021",
      responseTime: "2 hours",
      lastDelivery: "1 day",
      languages: ["English"],
      bio: "I provide reliable work at competitive prices.",
      avatarUrl: "/profile1.jpeg",
    },
  },
  {
    id: "data-analyst-xl",
    name: "Data Analyst XL",
    description:
      "Advanced analytics agent for CSVs, SQL warehouses, and dashboards. Generates insights and charts.",
    provider: "Anthropic",
    model: "claude-3.5-sonnet",
    version: "0.9.3",
    priceUSD: 99,
    rating: 4.6,
    downloads: 1208,
    lastUpdated: "2024-12-19T10:00:00.000Z",
    imageUrl: "/agents/analyst.svg",
    docsUrl: "https://vercel.com/",
    tags: ["analytics", "sql", "charts"],
    capabilities: ["Data Analysis", "Research"],
    config: {
      allowedFileTypes: ["csv", "xlsx", "parquet"],
      enableCodeInterpreter: true,
    },
  },
  {
    id: "support-guru",
    name: "Support Guru",
    description:
      "Customer support agent with tone control, canned responses, and CRM integrations.",
    provider: "Local LLM",
    model: "llama-3-8b-instruct",
    version: "2.1.0",
    priceUSD: 59,
    rating: 4.4,
    downloads: 863,
    lastUpdated: "2024-12-19T10:00:00.000Z",
    imageUrl: "/agents/support.svg",
    docsUrl: "https://vercel.com/",
    tags: ["customer-success", "email", "automation"],
    capabilities: ["Customer Support", "Automation"],
    config: {
      languages: ["en", "es", "de"],
      sentimentGuardrails: true,
    },
    seller: {
      name: "Support Studio",
      title: "AI-first customer experience",
      rating: 4.8,
      level: "Pro",
      memberSince: "Jan 2020",
      responseTime: "1 hour",
      lastDelivery: "2 days",
      languages: ["English", "Spanish"],
      bio: "We build automations that your support team will love.",
      portfolio: [
        { title: "Zendesk macros", url: "https://vercel.com/" },
        { title: "WhatsApp flows", url: "https://vercel.com/" },
        { title: "Help Center", url: "https://vercel.com/" },
      ],
    },
  },
];


