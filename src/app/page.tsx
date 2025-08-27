'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Target, 
  Zap, 
  Users, 
  FileText, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw,
  Sparkles,
  TrendingUp,
  Lightbulb,
  Rocket,
  Shield,
  Database,
  Network,
  BarChart3,
  Eye,
  Layers,
  Workflow,
  Puzzle,
  Crown
} from 'lucide-react';

interface ContextEngineeringRequest {
  projectType: string;
  industry: string;
  targetAudience: string;
  businessGoals: string;
  technicalRequirements: string;
  constraints: string;
  successMetrics: string;
}

interface PRDSection {
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  status: 'draft' | 'in-progress' | 'completed' | 'reviewed';
  estimatedHours: number;
  dependencies: string[];
}

interface ProjectAnalysis {
  contextScore: number;
  complexityScore: number;
  feasibilityScore: number;
  innovationScore: number;
  riskScore: number;
  recommendations: string[];
  criticalPath: string[];
  successProbability: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('context-engineering');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [contextRequest, setContextRequest] = useState<ContextEngineeringRequest>({
    projectType: '',
    industry: '',
    targetAudience: '',
    businessGoals: '',
    technicalRequirements: '',
    constraints: '',
    successMetrics: ''
  });
  const [projectAnalysis, setProjectAnalysis] = useState<ProjectAnalysis | null>(null);
  const [prdSections, setPrdSections] = useState<PRDSection[]>([]);
  const [selectedModel, setSelectedModel] = useState('glm/glm-4-plus');

  const projectTypes = [
    'Web Application', 'Mobile App', 'Enterprise Software', 'AI/ML System', 
    'IoT Platform', 'Blockchain Solution', 'SaaS Product', 'E-commerce Platform'
  ];

  const industries = [
    'Healthcare', 'Finance', 'Education', 'E-commerce', 'Manufacturing',
    'Technology', 'Entertainment', 'Real Estate', 'Transportation', 'Energy'
  ];

  const premiumModels = [
    { id: 'glm/glm-4-plus', name: 'GLM-4 Plus', category: 'premium', capabilities: ['Context Analysis', 'Strategic Planning', 'Risk Assessment'] },
    { id: 'glm/glm-4v-plus', name: 'GLM-4V Plus', category: 'premium', capabilities: ['Visual Analysis', 'Multimodal Context', 'Design Intelligence'] },
    { id: 'glm/glm-rd-plus', name: 'GLM-RD Plus', category: 'premium', capabilities: ['Research', 'Data Analysis', 'Market Intelligence'] },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', category: 'premium', capabilities: ['Complex Reasoning', 'Strategic Analysis', 'Documentation'] },
    { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo', category: 'premium', capabilities: ['Multi-task Processing', 'Code Generation', 'System Design'] }
  ];

  const executeProjectAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      const response = await fetch('/api/diamond-grade-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contextRequest,
          selectedModel
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setProjectAnalysis(data.analysis);
      } else {
        alert('Failed to get analysis: ' + data.error);
      }
    } catch (error) {
      console.error('Error executing project analysis:', error);
      alert('Error executing analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePRD = async () => {
    if (!projectAnalysis) return;

    setIsAnalyzing(true);
    
    // Simulate PRD generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const sections: PRDSection[] = [
      {
        title: 'Executive Summary',
        content: `Comprehensive ${contextRequest.projectType} solution for the ${contextRequest.industry} industry, targeting ${contextRequest.targetAudience}. This project aims to ${contextRequest.businessGoals} while meeting technical requirements and constraints.`,
        priority: 'high',
        status: 'completed',
        estimatedHours: 8,
        dependencies: []
      },
      {
        title: 'Product Vision',
        content: 'To create a cutting-edge solution that revolutionizes how users interact with technology in the target industry, providing unprecedented value and user experience.',
        priority: 'high',
        status: 'completed',
        estimatedHours: 12,
        dependencies: ['Executive Summary']
      },
      {
        title: 'Target Audience Analysis',
        content: `Primary audience: ${contextRequest.targetAudience}. Secondary audiences include stakeholders, administrators, and technical teams. User personas and journey maps to be developed.`,
        priority: 'high',
        status: 'in-progress',
        estimatedHours: 16,
        dependencies: ['Product Vision']
      },
      {
        title: 'Business Requirements',
        content: `Key business objectives: ${contextRequest.businessGoals}. Success metrics include ${contextRequest.successMetrics}. ROI expectations and business case analysis completed.`,
        priority: 'high',
        status: 'in-progress',
        estimatedHours: 20,
        dependencies: ['Target Audience Analysis']
      },
      {
        title: 'Technical Specifications',
        content: `Technical requirements: ${contextRequest.technicalRequirements}. System architecture, technology stack, and integration specifications to be detailed.`,
        priority: 'medium',
        status: 'draft',
        estimatedHours: 24,
        dependencies: ['Business Requirements']
      },
      {
        title: 'Constraints and Limitations',
        content: `Project constraints: ${contextRequest.constraints}. Budget, timeline, resource, and technical limitations identified and mitigation strategies planned.`,
        priority: 'medium',
        status: 'draft',
        estimatedHours: 8,
        dependencies: ['Technical Specifications']
      },
      {
        title: 'Success Metrics and KPIs',
        content: `Measurable success criteria: ${contextRequest.successMetrics}. Quantitative and qualitative metrics established with baseline measurements.`,
        priority: 'medium',
        status: 'draft',
        estimatedHours: 12,
        dependencies: ['Business Requirements']
      },
      {
        title: 'Risk Assessment',
        content: `Comprehensive risk analysis based on project scoring. Risk score: ${projectAnalysis.riskScore}/100. Mitigation strategies developed for all identified risks.`,
        priority: 'high',
        status: 'in-progress',
        estimatedHours: 16,
        dependencies: ['Technical Specifications', 'Constraints and Limitations']
      }
    ];

    setPrdSections(sections);
    setIsAnalyzing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'reviewed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Crown className="h-12 w-12 text-yellow-500" />
            <Brain className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Advanced Project Analysis & PRD Generation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered platform for comprehensive project analysis, strategic planning, and automated PRD generation
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Context Analysis</p>
                  <p className="text-2xl font-bold">{projectAnalysis?.contextScore || '--'}/100</p>
                </div>
                <Brain className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Innovation Score</p>
                  <p className="text-2xl font-bold">{projectAnalysis?.innovationScore || '--'}/100</p>
                </div>
                <Lightbulb className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Success Rate</p>
                  <p className="text-2xl font-bold">{projectAnalysis?.successProbability || '--'}%</p>
                </div>
                <Target className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Risk Level</p>
                  <p className="text-2xl font-bold">{projectAnalysis?.riskScore || '--'}/100</p>
                </div>
                <Shield className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="context-engineering" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Context Engineering
            </TabsTrigger>
            <TabsTrigger value="project-analysis" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Project Analysis
            </TabsTrigger>
            <TabsTrigger value="prd-generator" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              PRD Generator
            </TabsTrigger>
          </TabsList>

          {/* Context Engineering Tab */}
          <TabsContent value="context-engineering" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Advanced Context Engineering Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Project Type</label>
                      <Select value={contextRequest.projectType} onValueChange={(value) => 
                        setContextRequest(prev => ({ ...prev, projectType: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Industry</label>
                      <Select value={contextRequest.industry} onValueChange={(value) => 
                        setContextRequest(prev => ({ ...prev, industry: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map(industry => (
                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Target Audience</label>
                      <Input 
                        value={contextRequest.targetAudience}
                        onChange={(e) => setContextRequest(prev => ({ ...prev, targetAudience: e.target.value }))}
                        placeholder="Describe your target audience"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Business Goals</label>
                      <Textarea 
                        value={contextRequest.businessGoals}
                        onChange={(e) => setContextRequest(prev => ({ ...prev, businessGoals: e.target.value }))}
                        placeholder="Describe business objectives and goals"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Technical Requirements</label>
                      <Textarea 
                        value={contextRequest.technicalRequirements}
                        onChange={(e) => setContextRequest(prev => ({ ...prev, technicalRequirements: e.target.value }))}
                        placeholder="Describe technical requirements and specifications"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Constraints</label>
                      <Textarea 
                        value={contextRequest.constraints}
                        onChange={(e) => setContextRequest(prev => ({ ...prev, constraints: e.target.value }))}
                        placeholder="Describe project constraints and limitations"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Success Metrics</label>
                      <Textarea 
                        value={contextRequest.successMetrics}
                        onChange={(e) => setContextRequest(prev => ({ ...prev, successMetrics: e.target.value }))}
                        placeholder="Describe success metrics and KPIs"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Premium AI Model Selection</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {premiumModels.map(model => (
                      <Card 
                        key={model.id} 
                        className={`cursor-pointer transition-all ${
                          selectedModel === model.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedModel(model.id)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{model.name}</h4>
                              <Badge variant="outline">{model.category}</Badge>
                            </div>
                            <div className="space-y-1">
                              {model.capabilities.map(capability => (
                                <div key={capability} className="flex items-center gap-1">
                                  <Sparkles className="h-3 w-3 text-blue-500" />
                                  <span className="text-xs">{capability}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={executeProjectAnalysis}
                  disabled={isAnalyzing || !contextRequest.projectType || !contextRequest.industry}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Executing Advanced Analysis...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Execute Advanced Project Analysis
                    </>
                  )}
                </Button>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Analysis Progress</span>
                      <span>{Math.round(analysisProgress)}%</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Analysis Tab */}
          <TabsContent value="project-analysis" className="space-y-6">
            {projectAnalysis ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Advanced Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Context Analysis Score</span>
                          <span className="text-sm">{projectAnalysis.contextScore}/100</span>
                        </div>
                        <Progress value={projectAnalysis.contextScore} className="w-full" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Complexity Score</span>
                          <span className="text-sm">{projectAnalysis.complexityScore}/100</span>
                        </div>
                        <Progress value={projectAnalysis.complexityScore} className="w-full" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Feasibility Score</span>
                          <span className="text-sm">{projectAnalysis.feasibilityScore}/100</span>
                        </div>
                        <Progress value={projectAnalysis.feasibilityScore} className="w-full" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Innovation Score</span>
                          <span className="text-sm">{projectAnalysis.innovationScore}/100</span>
                        </div>
                        <Progress value={projectAnalysis.innovationScore} className="w-full" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Risk Score</span>
                          <span className="text-sm">{projectAnalysis.riskScore}/100</span>
                        </div>
                        <Progress value={projectAnalysis.riskScore} className="w-full" />
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{projectAnalysis.successProbability}%</div>
                      <div className="text-sm text-muted-foreground">Success Probability</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Strategic Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Key Recommendations</h4>
                      <div className="space-y-2">
                        {projectAnalysis.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-3">Critical Path</h4>
                      <div className="space-y-2">
                        {projectAnalysis.criticalPath.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button onClick={generatePRD} disabled={isAnalyzing} className="w-full">
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating PRD...
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Comprehensive PRD
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Analysis Available</h3>
                  <p className="text-muted-foreground mb-4">
                    Execute the Advanced Project Analysis to generate comprehensive analysis.
                  </p>
                  <Button onClick={() => setActiveTab('context-engineering')}>
                    Go to Context Engineering
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PRD Generator Tab */}
          <TabsContent value="prd-generator" className="space-y-6">
            {prdSections.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Product Requirements Document (PRD)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {prdSections.filter(s => s.status === 'completed').length}
                          </div>
                          <div className="text-sm text-green-700">Completed</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {prdSections.filter(s => s.status === 'in-progress').length}
                          </div>
                          <div className="text-sm text-blue-700">In Progress</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-50 border-gray-200">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-gray-600">
                            {prdSections.filter(s => s.status === 'draft').length}
                          </div>
                          <div className="text-sm text-gray-700">Draft</div>
                        </CardContent>
                      </Card>
                    </div>

                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        {prdSections.map((section, index) => (
                          <Card key={index} className="overflow-hidden">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{section.title}</CardTitle>
                                <div className="flex items-center gap-2">
                                  <Badge 
                                    variant="outline" 
                                    className={`${getPriorityColor(section.priority)} text-white`}
                                  >
                                    {section.priority}
                                  </Badge>
                                  <Badge 
                                    variant="outline" 
                                    className={`${getStatusColor(section.status)} text-white`}
                                  >
                                    {section.status}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-sm leading-relaxed">{section.content}</p>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Estimated: {section.estimatedHours}h</span>
                                <span>Dependencies: {section.dependencies.length}</span>
                              </div>

                              {section.dependencies.length > 0 && (
                                <div className="space-y-1">
                                  <span className="text-xs font-medium">Dependencies:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {section.dependencies.map((dep, depIndex) => (
                                      <Badge key={depIndex} variant="secondary" className="text-xs">
                                        {dep}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No PRD Available</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete the Advanced Project Analysis to generate a comprehensive Product Requirements Document.
                  </p>
                  <Button onClick={() => setActiveTab('project-analysis')}>
                    Go to Project Analysis
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}