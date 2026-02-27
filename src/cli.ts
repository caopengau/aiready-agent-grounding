#!/usr/bin/env node

import { Command } from 'commander';
import { analyzeAgentGrounding } from './analyzer';
import { calculateGroundingScore } from './scoring';
import type { AgentGroundingOptions } from './types';
import chalk from 'chalk';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import {
  loadConfig,
  mergeConfigWithDefaults,
  resolveOutputPath,
} from '@aiready/core';

const program = new Command();

program
  .name('aiready-agent-grounding')
  .description(
    'Measure how well an AI agent can navigate your codebase autonomously'
  )
  .version('0.1.0')
  .addHelpText(
    'after',
    `
GROUNDING DIMENSIONS:
  Structure Clarity     Deep directory trees slow and confuse agents
  Self-Documentation    Vague file names (utils, helpers) hide intent
  Entry Points          README presence, freshness, and barrel exports
  API Clarity           Untyped exports prevent API contract inference
  Domain Consistency    Inconsistent naming forces agents to guess

EXAMPLES:
  aiready-agent-grounding .                        # Full analysis
  aiready-agent-grounding src/ --output json       # JSON report
  aiready-agent-grounding . --max-depth 3          # Stricter depth limit
`
  )
  .argument('<directory>', 'Directory to analyze')
  .option(
    '--max-depth <n>',
    'Max recommended directory depth (default: 4)',
    '4'
  )
  .option(
    '--readme-stale-days <n>',
    'Days after which README is considered stale (default: 90)',
    '90'
  )
  .option('--include <patterns>', 'File patterns to include (comma-separated)')
  .option('--exclude <patterns>', 'File patterns to exclude (comma-separated)')
  .option('-o, --output <format>', 'Output format: console|json', 'console')
  .option('--output-file <path>', 'Output file path (for json)')
  .action(async (directory, options) => {
    console.log(chalk.blue('🧭 Analyzing agent grounding...\n'));
    const startTime = Date.now();

    const config = await loadConfig(directory);
    const mergedConfig = mergeConfigWithDefaults(config, {
      maxRecommendedDepth: 4,
      readmeStaleDays: 90,
    });

    const finalOptions: AgentGroundingOptions = {
      rootDir: directory,
      maxRecommendedDepth:
        parseInt(options.maxDepth ?? '4', 10) ||
        mergedConfig.maxRecommendedDepth,
      readmeStaleDays:
        parseInt(options.readmeStaleDays ?? '90', 10) ||
        mergedConfig.readmeStaleDays,
      include: options.include?.split(','),
      exclude: options.exclude?.split(','),
    };

    const report = await analyzeAgentGrounding(finalOptions);
    const scoring = calculateGroundingScore(report);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    if (options.output === 'json') {
      const payload = { report, score: scoring };
      const outputPath = resolveOutputPath(
        options.outputFile,
        `agent-grounding-report-${new Date().toISOString().split('T')[0]}.json`,
        directory
      );
      const dir = dirname(outputPath);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      writeFileSync(outputPath, JSON.stringify(payload, null, 2));
      console.log(chalk.green(`✓ Report saved to ${outputPath}`));
    } else {
      displayConsoleReport(report, scoring, elapsed);
    }
  });

program.parse();

function scoreColor(score: number) {
  if (score >= 85) return chalk.green;
  if (score >= 70) return chalk.cyan;
  if (score >= 50) return chalk.yellow;
  if (score >= 30) return chalk.red;
  return chalk.bgRed.white;
}

function displayConsoleReport(report: any, scoring: any, elapsed: string) {
  const { summary, issues, recommendations } = report;

  console.log(chalk.bold('\n🧭 Agent Grounding Analysis\n'));
  console.log(
    `Score:       ${scoreColor(summary.score)(summary.score + '/100')} (${summary.rating.toUpperCase()})`
  );
  console.log(
    `Files:       ${chalk.cyan(summary.filesAnalyzed)}   Directories: ${chalk.cyan(summary.directoriesAnalyzed)}`
  );
  console.log(`Analysis:    ${chalk.gray(elapsed + 's')}\n`);

  console.log(chalk.bold('📐 Dimension Scores\n'));
  const dims = [
    ['Structure Clarity', summary.dimensions.structureClarityScore],
    ['Self-Documentation', summary.dimensions.selfDocumentationScore],
    ['Entry Points', summary.dimensions.entryPointScore],
    ['API Clarity', summary.dimensions.apiClarityScore],
    ['Domain Consistency', summary.dimensions.domainConsistencyScore],
  ];
  for (const [name, val] of dims) {
    const bar = '█'.repeat(Math.round((val as number) / 10)).padEnd(10, '░');
    console.log(
      `  ${String(name).padEnd(22)} ${scoreColor(val as number)(bar)} ${val}/100`
    );
  }

  if (issues.length > 0) {
    console.log(chalk.bold('\n⚠️  Issues Found\n'));
    for (const issue of issues) {
      const sev =
        issue.severity === 'critical'
          ? chalk.red
          : issue.severity === 'major'
            ? chalk.yellow
            : chalk.blue;
      console.log(`${sev(issue.severity.toUpperCase())}  ${issue.message}`);
      if (issue.suggestion)
        console.log(
          `         ${chalk.dim('→')} ${chalk.italic(issue.suggestion)}`
        );
      console.log();
    }
  } else {
    console.log(
      chalk.green(
        '\n✨ No grounding issues found — agents can navigate freely!\n'
      )
    );
  }

  if (recommendations.length > 0) {
    console.log(chalk.bold('💡 Recommendations\n'));
    recommendations.forEach((rec: string, i: number) =>
      console.log(`${i + 1}. ${rec}`)
    );
  }
  console.log();
}
