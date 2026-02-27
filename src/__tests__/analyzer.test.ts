import { analyzeAgentGrounding } from '../analyzer';
import { join } from 'path';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Agent Grounding Analyzer', () => {
  const tmpDir = join(tmpdir(), 'aiready-ag-tests');

  beforeAll(() => {
    mkdirSync(tmpDir, { recursive: true });
  });

  afterAll(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  function createTestFile(name: string, content: string): string {
    const filePath = join(tmpDir, name);
    // Ensure dir exists
    const dir = join(filePath, '..');
    mkdirSync(dir, { recursive: true });

    writeFileSync(filePath, content, 'utf8');
    return filePath;
  }

  describe('Deep Directories and Vague Files', () => {
    it('should detect deep directories and vague file names', async () => {
      // Mock files deep in the tree and with vague names
      createTestFile(
        'src/components/common/utils/helpers/deep/very/deep.ts',
        'export const x = 1;'
      );
      createTestFile('src/utils.ts', 'export const y = 2;');

      const report = await analyzeAgentGrounding({
        rootDir: tmpDir,
        maxRecommendedDepth: 3,
        additionalVagueNames: ['utils', 'helpers'],
      });

      expect(report.issues.length).toBeGreaterThanOrEqual(1);

      const deepIssues = report.issues.filter(
        (i) =>
          i.dimension === 'structure-clarity' && i.message.includes('exceed')
      );
      // The deep.ts file contributes to the aggregate depth count
      expect(deepIssues.length).toBeGreaterThan(0);

      const vagueIssues = report.issues.filter(
        (i) => i.dimension === 'self-documentation'
      );
      expect(vagueIssues.some((i) => i.message.includes('vague names'))).toBe(
        true
      );
    });
  });

  describe('Missing READMEs', () => {
    it('should detect missing READMEs in directories', async () => {
      // tmpDir has no README
      const report = await analyzeAgentGrounding({ rootDir: tmpDir });

      const issues = report.issues;
      const readmeIssues = issues.filter(
        (i) => i.dimension === 'entry-point' || i.message.includes('README')
      );

      expect(readmeIssues.length).toBeGreaterThan(0);
    });
  });

  describe('Untyped Exports', () => {
    it('should detect JS files or untyped exports', async () => {
      createTestFile(
        'src/untyped.js',
        'export function doSomething(a, b) { return a + b; }'
      );
      createTestFile(
        'src/typed.ts',
        'export function doSomething(a: number, b: number): number { return a + b; }'
      );

      const report = await analyzeAgentGrounding({ rootDir: tmpDir });

      const issues = report.issues;
      const untypedIssues = issues.filter((i) => i.dimension === 'api-clarity');

      // The JS file untyped export contributes to the aggregate count
      expect(
        untypedIssues.some((i) => i.message.includes('lack TypeScript type'))
      ).toBe(true);
    });
  });
});
