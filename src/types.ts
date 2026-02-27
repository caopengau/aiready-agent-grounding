import type { ScanOptions, Issue } from '@aiready/core';

export interface AgentGroundingOptions extends ScanOptions {
  /** Max directory depth before flagging as "too deep" */
  maxRecommendedDepth?: number;
  /** README staleness threshold in days */
  readmeStaleDays?: number;
  /** File names considered "vague" (in addition to built-in list) */
  additionalVagueNames?: string[];
}

export interface AgentGroundingIssue extends Issue {
  type: 'agent-navigation-failure';
  /** Which grounding dimension is affected */
  dimension:
    | 'structure-clarity'
    | 'self-documentation'
    | 'entry-point'
    | 'api-clarity'
    | 'domain-consistency';
}

export interface AgentGroundingReport {
  summary: {
    filesAnalyzed: number;
    directoriesAnalyzed: number;
    score: number;
    rating: 'excellent' | 'good' | 'moderate' | 'poor' | 'disorienting';
    dimensions: {
      structureClarityScore: number;
      selfDocumentationScore: number;
      entryPointScore: number;
      apiClarityScore: number;
      domainConsistencyScore: number;
    };
  };
  issues: AgentGroundingIssue[];
  rawData: {
    deepDirectories: number;
    totalDirectories: number;
    vagueFileNames: number;
    totalFiles: number;
    hasRootReadme: boolean;
    readmeIsFresh: boolean;
    barrelExports: number;
    untypedExports: number;
    totalExports: number;
    inconsistentDomainTerms: number;
    domainVocabularySize: number;
  };
  recommendations: string[];
}
