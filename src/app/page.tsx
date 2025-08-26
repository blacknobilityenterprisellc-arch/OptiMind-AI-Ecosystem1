"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  BarChart3, 
  Image as ImageIcon, 
  Users, 
  Search, 
  Zap,
  Shield,
  Globe,
  Database,
  Code,
  Smartphone
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const features = [
    {
      icon: Brain,
      title: "AI Research Strategy",
      description: "Advanced AI-powered research automation and intelligent analysis",
      color: "text-blue-600",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Real-time insights and predictive analytics for business intelligence",
      color: "text-green-600",
    },
    {
      icon: ImageIcon,
      title: "Image Generation",
      description: "State-of-the-art AI image creation and manipulation capabilities",
      color: "text-purple-600",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Intelligent user behavior analysis and management system",
      color: "text-orange-600",
    },
    {
      icon: Search,
      title: "Web Search",
      description: "Enhanced web search with AI-powered results and insights",
      color: "text-red-600",
    },
    {
      icon: Zap,
      title: "System Integration",
      description: "Seamless integration with existing enterprise systems",
      color: "text-yellow-600",
    },
  ];

  const stats = [
    { label: "Enterprise Clients", value: "500+" },
    { label: "AI Models", value: "50+" },
    { label: "API Calls", value: "10M+" },
    { label: "Uptime", value: "99.99%" },
  ];

  const technologies = [
    { name: "Next.js 15", category: "Framework" },
    { name: "TypeScript 5", category: "Language" },
    { name: "Tailwind CSS 4", category: "Styling" },
    { name: "Prisma ORM", category: "Database" },
    { name: "shadcn/ui", category: "UI Components" },
    { name: "Z-AI SDK", category: "AI Integration" },
    { name: "Socket.io", category: "Real-time" },
    { name: "NextAuth.js", category: "Authentication" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Platinum Grade Enterprise AI Platform
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              OptiMind AI Ecosystem
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your enterprise with cutting-edge AI technology. Built for scale, 
              security, and performance. The platinum standard in AI integration.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI capabilities designed for enterprise-scale applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Built with Cutting-Edge Technology
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enterprise-grade technology stack for maximum performance and reliability
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="ai">AI Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-slate-700">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {tech.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {tech.category}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="frontend" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Modern Frontend Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>• Next.js 15 with App Router</li>
                      <li>• TypeScript 5 for type safety</li>
                      <li>• Tailwind CSS 4 for styling</li>
                      <li>• shadcn/ui components</li>
                      <li>• Framer Motion for animations</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      Responsive & Accessible
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>• Mobile-first design</li>
                      <li>• WCAG 2.1 compliant</li>
                      <li>• Dark mode support</li>
                      <li>• SEO optimized</li>
                      <li>• Performance optimized</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="backend" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Robust Backend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>• Prisma ORM with TypeScript</li>
                      <li>• NextAuth.js authentication</li>
                      <li>• Socket.io real-time communication</li>
                      <li>• RESTful API design</li>
                      <li>• Database migrations</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security & Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>• End-to-end encryption</li>
                      <li>• Rate limiting</li>
                      <li>• Input validation</li>
                      <li>• Error handling</li>
                      <li>• Monitoring & logging</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      AI Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>• Z-AI SDK integration</li>
                      <li>• Multiple AI model support</li>
                      <li>• Custom AI workflows</li>
                      <li>• Real-time AI processing</li>
                      <li>• AI model management</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      AI Capabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>• Natural language processing</li>
                      <li>• Image generation & analysis</li>
                      <li>• Data analytics & insights</li>
                      <li>• Web search integration</li>
                      <li>• Predictive modeling</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of enterprises already using OptiMind AI Ecosystem to power their AI transformation.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}