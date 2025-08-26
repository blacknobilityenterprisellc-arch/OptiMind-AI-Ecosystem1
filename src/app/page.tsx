'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  MessageSquare, 
  Code, 
  Search, 
  BarChart3, 
  FileText,
  Bot,
  Brain,
  Zap,
  Target,
  Star,
  TrendingUp,
  Activity,
  Lightbulb
} from 'lucide-react';

// Import all the AI components we've created
import { ContentGenerator } from '@/components/ui/content-generator';
import { SmartForm } from '@/components/ui/smart-form';
import { AIChat } from '@/components/ui/ai-chat';
import { CodeAssistant } from '@/components/ui/code-assistant';
import { SmartSearch } from '@/components/ui/smart-search';
import { DataAnalysis } from '@/components/ui/data-analysis';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      id: 'content',
      title: 'AI Content Generation',
      description: 'Generate high-quality content for blogs, articles, social media, and more',
      icon: <Wand2 className="h-8 w-8" />,
      color: 'bg-blue-500',
      component: <ContentGenerator />
    },
    {
      id: 'forms',
      title: 'Smart Forms',
      description: 'AI-powered form validation and text enhancement',
      icon: <FileText className="h-8 w-8" />,
      color: 'bg-green-500',
      component: <SmartForm />
    },
    {
      id: 'chat',
      title: 'AI Chat Assistant',
      description: 'Real-time chat with multiple AI models and session management',
      icon: <MessageSquare className="h-8 w-8" />,
      color: 'bg-purple-500',
      component: <AIChat />
    },
    {
      id: 'code',
      title: 'Code Assistant',
      description: 'Code review, optimization, documentation, and debugging',
      icon: <Code className="h-8 w-8" />,
      color: 'bg-orange-500',
      component: <CodeAssistant />
    },
    {
      id: 'search',
      title: 'Smart Search & Recommendations',
      description: 'AI-powered search and personalized recommendations',
      icon: <Search className="h-8 w-8" />,
      color: 'bg-red-500',
      component: <SmartSearch />
    },
    {
      id: 'analytics',
      title: 'Data Analysis',
      description: 'Analyze data and extract insights with AI',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'bg-indigo-500',
      component: <DataAnalysis />
    }
  ];

  const benefits = [
    {
      title: 'Multiple AI Models',
      description: 'Access to 300+ AI models from OpenAI, Anthropic, Google, Meta, and more',
      icon: <Bot className="h-6 w-6" />
    },
    {
      title: 'Cost Optimization',
      description: 'Choose the right model for each task to optimize costs and performance',
      icon: <Target className="h-6 w-6" />
    },
    {
      title: 'Real-time Processing',
      description: 'Instant AI responses with streaming support for live interactions',
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: 'Intelligent Analysis',
      description: 'Advanced AI capabilities for complex reasoning and problem-solving',
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: 'Versatile Applications',
      description: 'From content creation to code analysis, cover all your AI needs',
      icon: <Star className="h-6 w-6" />
    },
    {
      title: 'Data-Driven Insights',
      description: 'Extract meaningful insights from your data with AI analysis',
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  const getFeatureComponent = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    return feature?.component || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10">
                <img
                  src="/logo.svg"
                  alt="Z.ai Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Open Router AI Platform</h1>
                <p className="text-sm text-muted-foreground">Powered by 300+ AI models</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              Next.js 15 + TypeScript
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {features.map((feature) => (
              <TabsTrigger key={feature.id} value={feature.id} className="text-xs">
                {feature.title.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Open Router AI Platform
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Experience the power of 300+ AI models integrated into a single platform. 
                From content generation to code analysis, discover how AI can transform your workflow.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={() => setActiveTab('content')}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Try Content Generation
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('chat')}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start AI Chat
                </Button>
              </div>
            </div>

            {/* Benefits Section */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8">Why Choose Open Router?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        {benefit.icon}
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <Card 
                    key={feature.id} 
                    className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                    onClick={() => setActiveTab(feature.id)}
                  >
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Explore Feature
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  To use the Open Router features, you need to set up your API key in the environment configuration.
                </p>
                <div className="bg-muted p-4 rounded-lg text-left max-w-2xl mx-auto">
                  <h4 className="font-semibold mb-2">Setup Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Get your Open Router API key from <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">openrouter.ai</a></li>
                    <li>Add your API key to the <code className="bg-background px-1 rounded">.env.local</code> file:</li>
                    <li><code className="bg-background px-2 py-1 rounded text-xs">OPENROUTER_API_KEY=your_api_key_here</code></li>
                    <li>Restart your development server</li>
                    <li>Start exploring the AI features!</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feature Tabs */}
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="space-y-6">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{feature.title}</h2>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setActiveTab('overview')}>
                    ← Back to Overview
                  </Button>
                </div>
              </div>
              {getFeatureComponent(feature.id)}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              Powered by Open Router • 300+ AI Models • Next.js 15 + TypeScript
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Badge variant="outline">OpenAI</Badge>
              <Badge variant="outline">Anthropic</Badge>
              <Badge variant="outline">Google</Badge>
              <Badge variant="outline">Meta</Badge>
              <Badge variant="outline">Mistral</Badge>
              <Badge variant="outline">+ more</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}