// Type definitions for OptiMind AI Advanced Intelligence Ecosystem

export interface ModelResult {
  modelName: string;
  modelVersion: string;
  labels: Array<{
    label: string;
    score: number;
    region?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;
  rawOutput: any;
  latencyMs: number;
  saliencyUrl?: string;
}

export interface ConsensusResult {
  topLabel: string;
  score: number;
  spread: number;
  allLabels: Array<{ label: string; score: number }>;
  provenance: {
    models: Array<{ name: string; version: string }>;
    timestamp: string;
  };
  recommendedAction: 'allow' | 'monitor' | 'hold_for_review' | 'quarantine' | 'escalate' | 'delete_pending_appeal';
  reasons: string[];
}

export interface AnalysisResult {
  imageId: string;
  upload: ImageUploadRequest;
  consensus: ConsensusResult;
  modelResults: ModelResult[];
  createdAt: string;
}

export interface ImageUploadRequest {
  filename: string;
  contentType: string;
  size: number;
  uploaderId?: string;
  metadata?: Record<string, any>;
}

// Z.AI Service Types
export interface ZAIModelConfig {
  id: string;
  name: string;
  apiModel: string;
  capabilities: string[];
  maxTokens: number;
  temperature: number;
  systemPrompt: string;
}

export interface ZAIAnalysisRequest {
  imageBase64: string;
  analysisType: string;
  modelId: string;
  customPrompt?: string;
}

export interface ZAIAnalysisResponse {
  modelId: string;
  modelName: string;
  result: any;
  confidence: number;
  processingTime: number;
  timestamp: Date;
  apiResponse: any;
}

// Database Model Types (based on Prisma schema)
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecuritySettings {
  id: string;
  pin_hash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  token: string;
  expires_at: Date;
  created_at: Date;
}

export interface Subscription {
  id: string;
  user_id?: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  current_period_start: Date;
  current_period_end: Date;
  trial_end?: Date;
  cancel_at_period_end: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface SubscriptionUsage {
  id: string;
  subscription_id?: string;
  storage_used: number;
  storage_limit: number;
  photos_scanned: number;
  scan_limit: number;
  ai_tags_generated: number;
  ai_tag_limit: number;
  vault_access: boolean;
  advanced_editing: boolean;
  created_at: Date;
  updated_at: Date;
}

// Research & Strategy Types
export interface ContentAnalysis {
  id: string;
  user_id?: string;
  content: string;
  content_type: 'blog' | 'article' | 'product' | 'service' | 'faq';
  analysis_results: any;
  optimization_score: number;
  created_at: Date;
  updated_at: Date;
}

export interface CitationOpportunity {
  id: string;
  analysis_id?: string;
  type: 'statistic' | 'fact' | 'data' | 'quote';
  content: string;
  source: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  is_implemented: boolean;
  created_at: Date;
}

export interface EERecommendation {
  id: string;
  analysis_id?: string;
  category: 'experience' | 'expertise' | 'authoritativeness' | 'trustworthiness';
  recommendation: string;
  impact: 'high' | 'medium' | 'low';
  implementation: string;
  is_implemented: boolean;
  created_at: Date;
}

export interface KeywordCluster {
  id: string;
  user_id?: string;
  topic: string;
  keywords: any;
  intent: 'informational' | 'commercial' | 'navigational';
  volume: number;
  difficulty: number;
  created_at: Date;
}

export interface BrandMention {
  id: string;
  user_id?: string;
  brand_name: string;
  source: string;
  url?: string;
  title: string;
  snippet: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  authority: number;
  mention_date: Date;
  type: 'ai_overview' | 'featured_snippet' | 'organic_result' | 'social_media';
  created_at: Date;
}

export interface BrandTrackingReport {
  id: string;
  user_id?: string;
  brand_name: string;
  time_range: number;
  total_mentions: number;
  ai_overview_mentions: number;
  featured_snippet_mentions: number;
  authority_score: number;
  sentiment_score: number;
  monthly_growth: number;
  top_sources: any;
  report_data: any;
  created_at: Date;
}

export interface GeneratedContent {
  id: string;
  user_id?: string;
  topic: string;
  content_type: 'blog' | 'article' | 'product' | 'service' | 'faq';
  tone: 'professional' | 'casual' | 'informative' | string;
  target_audience: string;
  content: string;
  metadata: any;
  word_count: number;
  created_at: Date;
}

export interface SchemaMarkup {
  id: string;
  analysis_id?: string;
  type: string;
  fields: any;
  confidence: number;
  is_implemented: boolean;
  created_at: Date;
}

// Content Optimization Types
export interface ContentInventory {
  id: string;
  user_id?: string;
  title: string;
  url?: string;
  content_type: 'blog' | 'article' | 'product' | 'service' | 'faq';
  category: string;
  word_count: number;
  last_updated: Date;
  freshness_score: number;
  performance_score: number;
  optimization_score: number;
  status: 'fresh' | 'needs_refresh' | 'outdated';
  content_hash?: string;
  created_at: Date;
  updated_at: Date;
}

export interface FreshnessIssue {
  id: string;
  content_id?: string;
  type: 'outdated_statistics' | 'broken_links' | 'missing_trends' | 'old_references' | 'expired_information';
  severity: 'high' | 'medium' | 'low';
  description: string;
  location: string;
  suggestion: string;
  impact: number;
  is_resolved: boolean;
  created_at: Date;
}

export interface CompetitorAnalysis {
  id: string;
  user_id?: string;
  competitor_url: string;
  competitor_name: string;
  title: string;
  domain: string;
  word_count: number;
  publish_date?: Date;
  content_score: number;
  seo_score: number;
  readability_score: number;
  engagement_score: number;
  backlinks: number;
  social_shares: number;
  ranking?: number;
  analysis_data: any;
  created_at: Date;
}

export interface ContentGap {
  id: string;
  analysis_id?: string;
  type: 'missing_topic' | 'content_depth' | 'format_opportunity' | 'keyword_gap' | 'multimedia_gap';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  competitor_count: number;
  estimated_impact: number;
  is_addressed: boolean;
  created_at: Date;
}

export interface RefreshRecommendation {
  id: string;
  content_id?: string;
  type: 'update_statistics' | 'add_new_section' | 'improve_readability' | 'add_examples' | 'update_keywords' | 'add_multimedia' | 'improve_eeat' | 'update_references';
  priority: 'high' | 'medium' | 'low';
  description: string;
  impact: number;
  effort: number;
  estimated_time: string;
  implementation_steps: any;
  is_implemented: boolean;
  created_at: Date;
}

export interface PerformanceMetric {
  id: string;
  content_id?: string;
  date: Date;
  page_views: number;
  organic_traffic: number;
  bounce_rate: number;
  time_on_page: number;
  conversions: number;
  keyword_rankings: number;
  social_shares: number;
  engagement_rate: number;
  conversion_rate: number;
  additional_metrics: any;
  created_at: Date;
}

export interface ContentScore {
  id: string;
  content_id?: string;
  score_type: 'quality' | 'seo' | 'readability' | 'engagement' | 'comprehensive';
  score: number;
  max_score: number;
  breakdown: any;
  factors: any;
  created_at: Date;
}

// Multimodal Media Types
export interface MediaItem {
  id: string;
  user_id?: string;
  type: 'video' | 'audio' | 'image' | 'podcast';
  title: string;
  url?: string;
  file_path?: string;
  file_size: number;
  duration?: number;
  format: string;
  resolution?: string;
  bitrate?: number;
  optimization_score: number;
  seo_score: number;
  accessibility_score: number;
  performance_score: number;
  status: 'optimized' | 'needs_optimization' | 'not_optimized';
  last_optimized?: Date;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface MediaOptimization {
  id: string;
  media_id?: string;
  type: 'compression' | 'format_conversion' | 'metadata_enhancement' | 'alt_text_generation' | 'transcription' | 'chapter_markers' | 'quality_enhancement';
  priority: 'high' | 'medium' | 'low';
  description: string;
  impact: number;
  effort: number;
  estimated_time: string;
  implementation_steps: any;
  is_implemented: boolean;
  created_at: Date;
}

export interface MediaTranscription {
  id: string;
  media_id?: string;
  language: string;
  transcription: string;
  confidence: number;
  duration: number;
  word_count: number;
  captions: any;
  chapters: any;
  is_verified: boolean;
  created_at: Date;
}

export interface MediaPerformance {
  id: string;
  media_id?: string;
  platform: string;
  date: Date;
  views?: number;
  plays?: number;
  engagement?: number;
  completion_rate?: number;
  shares?: number;
  likes?: number;
  comments?: number;
  ctr?: number;
  conversion_rate?: number;
  watch_time?: number;
  retention_rate?: number;
  additional_metrics: any;
  created_at: Date;
}

export interface MediaAltText {
  id: string;
  media_id?: string;
  alt_text: string;
  description: string;
  keywords: any;
  confidence: number;
  language: string;
  is_ai_generated: boolean;
  is_approved: boolean;
  created_at: Date;
}

// Component Props Types
export interface AIFeatureProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export interface AnalysisCardProps {
  title: string;
  score: number;
  maxScore?: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  recommendations: string[];
  lastUpdated?: Date;
}

export interface OptimizationSuggestion {
  id: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: number;
  effort: number;
  estimatedTime: string;
  implementationSteps: string[];
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;