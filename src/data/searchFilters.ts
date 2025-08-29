export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

export const SEARCH_FILTERS: Record<string, FilterCategory> = {
  category: {
    id: 'category',
    label: 'Category',
    options: [
      { id: 'ai-services', label: 'AI Services', count: 156 },
      { id: 'automation', label: 'Automation & Workflow', count: 89 },
      { id: 'customer-support', label: 'Customer Support', count: 67 },
      { id: 'sales-marketing', label: 'Sales & Marketing', count: 124 },
      { id: 'data-analytics', label: 'Data & Analytics', count: 45 },
      { id: 'content-creation', label: 'Content Creation', count: 78 },
      { id: 'productivity', label: 'Productivity Tools', count: 92 },
      { id: 'finance-accounting', label: 'Finance & Accounting', count: 34 },
      { id: 'hr-recruitment', label: 'HR & Recruitment', count: 28 },
      { id: 'e-commerce', label: 'E-commerce', count: 56 },
    ]
  },
  
  serviceOptions: {
    id: 'serviceOptions',
    label: 'Service options',
    options: [
      { id: 'ai-powered', label: 'AI-Powered Solutions', count: 234 },
      { id: 'custom-development', label: 'Custom Development', count: 156 },
      { id: 'integration-ready', label: 'Integration Ready', count: 189 },
      { id: 'no-code-solution', label: 'No-Code Solution', count: 98 },
      { id: 'api-access', label: 'API Access', count: 167 },
      { id: 'white-label', label: 'White Label Available', count: 45 },
      { id: 'multi-language', label: 'Multi-Language Support', count: 78 },
      { id: 'cloud-based', label: 'Cloud-Based', count: 201 },
      { id: 'on-premise', label: 'On-Premise Option', count: 34 },
      { id: '24-7-support', label: '24/7 Support', count: 89 },
    ]
  },
  
  sellerDetails: {
    id: 'sellerDetails',
    label: 'Seller details',
    options: [
      { id: 'top-rated', label: 'Top Rated Seller', count: 45 },
      { id: 'level-2', label: 'Level 2 Seller', count: 89 },
      { id: 'pro-seller', label: 'Pro Seller', count: 67 },
      { id: 'new-seller', label: 'New Seller', count: 123 },
      { id: 'us-based', label: 'US-Based', count: 78 },
      { id: 'europe-based', label: 'Europe-Based', count: 56 },
      { id: 'asia-based', label: 'Asia-Based', count: 134 },
      { id: 'english-speaking', label: 'English Speaking', count: 187 },
      { id: 'fast-response', label: 'Fast Response Time', count: 156 },
      { id: 'verified-seller', label: 'Verified Seller', count: 234 },
    ]
  },
  
  budget: {
    id: 'budget',
    label: 'Budget',
    options: [
      { id: 'under-50', label: 'Under $50', count: 67 },
      { id: '50-100', label: '$50 - $100', count: 123 },
      { id: '100-250', label: '$100 - $250', count: 156 },
      { id: '250-500', label: '$250 - $500', count: 89 },
      { id: '500-1000', label: '$500 - $1,000', count: 45 },
      { id: '1000-2500', label: '$1,000 - $2,500', count: 34 },
      { id: '2500-5000', label: '$2,500 - $5,000', count: 23 },
      { id: 'over-5000', label: 'Over $5,000', count: 12 },
      { id: 'custom-quote', label: 'Custom Quote', count: 78 },
    ]
  },
  
  deliveryTime: {
    id: 'deliveryTime',
    label: 'Delivery time',
    options: [
      { id: 'express-24h', label: 'Express 24 hours', count: 23 },
      { id: 'up-to-3-days', label: 'Up to 3 days', count: 67 },
      { id: 'up-to-7-days', label: 'Up to 7 days', count: 134 },
      { id: 'up-to-14-days', label: 'Up to 14 days', count: 89 },
      { id: 'up-to-30-days', label: 'Up to 30 days', count: 56 },
      { id: 'over-30-days', label: 'Over 30 days', count: 34 },
      { id: 'custom-timeline', label: 'Custom Timeline', count: 45 },
    ]
  }
};

export const getFilterOptions = (filterId: string): FilterOption[] => {
  return SEARCH_FILTERS[filterId]?.options || [];
};

export const getFilterLabel = (filterId: string): string => {
  return SEARCH_FILTERS[filterId]?.label || '';
};
