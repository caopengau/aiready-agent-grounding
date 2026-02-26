import type { ScanOptions, Issue } from '@aiready/core';

export interface DocDriftOptions extends ScanOptions {
  /** Maximum commit distance to check for drift */
  maxCommits?: number;
  /** Consider comments older than this many months as outdated */
  staleMonths?: number;
}

export interface DocDriftIssue extends Issue {
  type: 'doc-drift';
}

export interface DocDriftReport {
  summary: {
    filesAnalyzed: number;
    functionsAnalyzed: number;
    score: number;
    rating: 'minimal' | 'low' | 'moderate' | 'high' | 'severe';
  };
  issues: DocDriftIssue[];
  rawData: {
    uncommentedExports: number;
    totalExports: number;
    outdatedComments: number;
    undocumentedComplexity: number;
  };
  recommendations: string[];
}
