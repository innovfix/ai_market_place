export type AgentCapability =
  | "Code Generation"
  | "Data Analysis"
  | "Customer Support"
  | "Content Writing"
  | "Research"
  | "SEO"
  | "Image Generation"
  | "Automation";

export interface AgentConfig {
  [key: string]: unknown;
}

export interface SellerPortfolioItem {
  title: string;
  url: string;
}

export interface Seller {
  name: string;
  title?: string;
  rating?: number;
  level?: string;
  location?: string;
  memberSince?: string;
  responseTime?: string;
  lastDelivery?: string;
  languages?: string[];
  bio?: string;
  avatarUrl?: string;
  portfolio?: SellerPortfolioItem[];
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  provider: string; // e.g., OpenAI, Anthropic, Local LLM
  model: string; // e.g., gpt-4o, claude-3.5, llama-3
  version: string;
  priceUSD: number; // one-time price or starting price
  rating: number; // 0-5
  downloads: number;
  lastUpdated: string; // ISO date
  imageUrl?: string;
  docsUrl: string;
  repoUrl?: string;
  tags: string[];
  capabilities: AgentCapability[];
  config: AgentConfig;
  seller?: Seller;
}


