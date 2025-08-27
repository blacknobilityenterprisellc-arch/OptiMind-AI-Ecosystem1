import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai';
import { db } from '@/lib/db';

interface ContextEngineeringRequest {
  projectType: string;
  industry: string;
  targetAudience: string;
  businessGoals: string;
  technicalRequirements: string;
  constraints: string;
  successMetrics: string;
  selectedModel: string;
}

interface DiamondGradeAnalysis {
  contextScore: number;
  complexityScore: number;
  feasibilityScore: number;
  innovationScore: number;
  riskScore: number;
  recommendations: string[];
  criticalPath: string[];
  successProbability: number;
  detailedAnalysis: {
    marketAnalysis: string;
    technicalAssessment: string;
    riskAssessment: string;
    opportunityAnalysis: string;
    implementationStrategy: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectType,
      industry,
      targetAudience,
      businessGoals,
      technicalRequirements,
      constraints,
      successMetrics,
      selectedModel
    }: ContextEngineeringRequest = body;

    // Validate required fields
    if (!projectType || !industry || !targetAudience) {
      return NextResponse.json(
        { error: 'Project type, industry, and target audience are required' },
        { status: 400 }
      );
    }

    // Execute Diamond-Grade analysis using the enhanced AI service
    const analysisResult = await aiService.performDiamondGradeAnalysis({
      projectType,
      industry,
      targetAudience,
      businessGoals,
      technicalRequirements,
      constraints,
      successMetrics,
      selectedModel
    });

    // Save analysis to database
    try {
      const savedAnalysis = await db.diamondGradeAnalysis.create({
        data: {
          projectType,
          industry,
          targetAudience,
          businessGoals,
          technicalRequirements,
          constraints,
          successMetrics,
          selectedModel,
          contextScore: analysisResult.analysis.contextScore,
          complexityScore: analysisResult.analysis.complexityScore,
          feasibilityScore: analysisResult.analysis.feasibilityScore,
          innovationScore: analysisResult.analysis.innovationScore,
          riskScore: analysisResult.analysis.riskScore,
          successProbability: analysisResult.analysis.successProbability,
          recommendations: JSON.stringify(analysisResult.analysis.recommendations),
          criticalPath: JSON.stringify(analysisResult.analysis.criticalPath),
          detailedAnalysis: JSON.stringify(analysisResult.analysis.detailedAnalysis),
          consensusData: JSON.stringify(analysisResult.consensus),
          searchData: JSON.stringify(analysisResult.deepSearch),
          contextualAnalysis: analysisResult.contextualAnalysis,
          timestamp: new Date(analysisResult.timestamp)
        }
      });

      console.log('Diamond-Grade analysis saved to database:', savedAnalysis.id);
    } catch (dbError) {
      console.error('Database save error:', dbError);
      // Continue even if database save fails
    }

    return NextResponse.json({
      success: true,
      analysis: analysisResult.analysis,
      consensus: analysisResult.consensus,
      deepSearch: analysisResult.deepSearch,
      contextualAnalysis: analysisResult.contextualAnalysis,
      metadata: {
        timestamp: analysisResult.timestamp,
        model: analysisResult.model,
        processingTime: Date.now() - new Date(request.headers.get('x-request-start') || Date.now()).getTime()
      }
    });

  } catch (error) {
    console.error('Diamond-Grade Analysis Error:', error);
    return NextResponse.json(
      { error: `Failed to perform Diamond-Grade analysis: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return recent Diamond-Grade analyses from database
    const recentAnalyses = await db.diamondGradeAnalysis.findMany({
      orderBy: {
        timestamp: 'desc'
      },
      take: 10,
      select: {
        id: true,
        projectType: true,
        industry: true,
        contextScore: true,
        complexityScore: true,
        feasibilityScore: true,
        innovationScore: true,
        riskScore: true,
        successProbability: true,
        timestamp: true,
        selectedModel: true
      }
    });

    return NextResponse.json({
      success: true,
      analyses: recentAnalyses,
      count: recentAnalyses.length
    });

  } catch (error) {
    console.error('Error fetching Diamond-Grade analyses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analyses' },
      { status: 500 }
    );
  }
}