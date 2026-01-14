import { readFileContent } from '@aiready/core';
import type { NamingIssue } from '../types';

// Comprehensive list of acceptable abbreviations and acronyms
const ACCEPTABLE_ABBREVIATIONS = new Set([
  // Standard identifiers
  'id', 'uid', 'gid', 'pid',
  // Web/Network
  'url', 'uri', 'api', 'cdn', 'dns', 'ip', 'tcp', 'udp', 'http', 'ssl', 'tls',
  'utm', 'seo', 'rss', 'xhr', 'ajax',
  // Data formats
  'json', 'xml', 'yaml', 'csv', 'html', 'css', 'svg', 'pdf',
  // Databases
  'db', 'sql', 'orm', 'dao', 'dto',
  // File system
  'fs', 'dir', 'tmp', 'src', 'dst', 'bin', 'lib', 'pkg',
  // Operating system
  'os', 'env', 'arg', 'cli', 'cmd', 'exe',
  // UI/UX
  'ui', 'ux', 'gui', 'dom', 'ref',
  // Request/Response
  'req', 'res', 'ctx', 'err', 'msg',
  // Mathematics/Computing
  'max', 'min', 'avg', 'sum', 'abs', 'cos', 'sin', 'tan', 'log', 'exp',
  'pow', 'sqrt', 'std', 'var', 'int', 'num',
  // Time
  'now', 'utc', 'tz', 'ms', 'sec',
  // Common patterns
  'app', 'cfg', 'config', 'init', 'len', 'val', 'str', 'obj', 'arr',
  'gen', 'def', 'raw', 'new', 'old', 'pre', 'post', 'sub', 'pub',
  // Boolean helpers (these are intentional short names)
  'is', 'has', 'can', 'did', 'was', 'are'
]);

/**
 * Analyzes naming conventions and quality
 */
export async function analyzeNaming(files: string[]): Promise<NamingIssue[]> {
  const issues: NamingIssue[] = [];

  for (const file of files) {
    const content = await readFileContent(file);
    const fileIssues = analyzeFileNaming(file, content);
    issues.push(...fileIssues);
  }

  return issues;
}

function analyzeFileNaming(file: string, content: string): NamingIssue[] {
  const issues: NamingIssue[] = [];

  // Split into lines for line number tracking
  const lines = content.split('\n');

  // Check for naming patterns
  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Check for single letter variables (except i, j, k, l in loops/common contexts)
    const singleLetterMatches = line.matchAll(/\b(?:const|let|var)\s+([a-hm-z])\s*=/gi);
    for (const match of singleLetterMatches) {
      const letter = match[1].toLowerCase();
      // Skip if it's in a loop context or common iterator
      const isInLoopContext = line.includes('for') || line.includes('.map') || 
                              line.includes('.filter') || line.includes('.forEach') ||
                              line.includes('.reduce');
      if (!isInLoopContext && !['x', 'y', 'z', 'i', 'j', 'k', 'l', 'n', 'm'].includes(letter)) {
        issues.push({
          file,
          line: lineNumber,
          type: 'poor-naming',
          identifier: match[1],
          severity: 'minor',
          suggestion: `Use descriptive variable name instead of single letter '${match[1]}'`
        });
      }
    }

    // Check for overly abbreviated variables
    const abbreviationMatches = line.matchAll(/\b(?:const|let|var)\s+([a-z]{1,3})(?=[A-Z]|_|\s*=)/g);
    for (const match of abbreviationMatches) {
      const abbrev = match[1].toLowerCase();
      // Skip acceptable abbreviations
      if (!ACCEPTABLE_ABBREVIATIONS.has(abbrev)) {
        issues.push({
          file,
          line: lineNumber,
          type: 'abbreviation',
          identifier: match[1],
          severity: 'info',
          suggestion: `Consider using full word instead of abbreviation '${match[1]}'`
        });
      }
    }

    // Check for snake_case vs camelCase mixing in TypeScript/JavaScript
    if (file.match(/\.(ts|tsx|js|jsx)$/)) {
      const camelCaseVars = line.match(/\b(?:const|let|var)\s+([a-z][a-zA-Z0-9]*)\s*=/);
      const snakeCaseVars = line.match(/\b(?:const|let|var)\s+([a-z][a-z0-9]*_[a-z0-9_]*)\s*=/);
      
      if (snakeCaseVars) {
        issues.push({
          file,
          line: lineNumber,
          type: 'convention-mix',
          identifier: snakeCaseVars[1],
          severity: 'minor',
          suggestion: `Use camelCase '${snakeCaseToCamelCase(snakeCaseVars[1])}' instead of snake_case in TypeScript/JavaScript`
        });
      }
    }

    // Check for unclear boolean names (should start with is/has/should/can)
    const booleanMatches = line.matchAll(/\b(?:const|let|var)\s+([a-z][a-zA-Z0-9]*)\s*:\s*boolean/gi);
    for (const match of booleanMatches) {
      const name = match[1];
      if (!name.match(/^(is|has|should|can|will|did)/i)) {
        issues.push({
          file,
          line: lineNumber,
          type: 'unclear',
          identifier: name,
          severity: 'info',
          suggestion: `Boolean variable '${name}' should start with is/has/should/can for clarity`
        });
      }
    }

    // Check for function names that don't indicate action
    const functionMatches = line.matchAll(/function\s+([a-z][a-zA-Z0-9]*)/g);
    for (const match of functionMatches) {
      const name = match[1];
      // Functions should typically start with verbs, but allow:
      // 1. Factory/builder patterns (ends with Factory, Builder, etc.)
      // 2. Descriptive compound names that explain what they return
      // 3. Event handlers (onClick, onSubmit, etc.)
      const isFactoryPattern = name.match(/(Factory|Builder|Creator|Generator)$/);
      const isEventHandler = name.match(/^on[A-Z]/);
      const isDescriptiveLong = name.length > 20; // Long names are usually descriptive enough
      const hasActionVerb = name.match(/^(get|set|is|has|can|should|create|update|delete|fetch|load|save|process|handle|validate|check|find|search|filter|map|reduce|make|do|run|start|stop|build|parse|format|render|calculate|compute|generate|transform|convert|normalize|sanitize|encode|decode|compress|extract|merge|split|join|sort|compare|test|verify|ensure|apply|execute|invoke|call|emit|dispatch|trigger|listen|subscribe|unsubscribe|add|remove|clear|reset|toggle|enable|disable|open|close|connect|disconnect|send|receive|read|write|import|export|register|unregister|mount|unmount)/);
      
      if (!hasActionVerb && !isFactoryPattern && !isEventHandler && !isDescriptiveLong) {
        issues.push({
          file,
          line: lineNumber,
          type: 'unclear',
          identifier: name,
          severity: 'info',
          suggestion: `Function '${name}' should start with an action verb (get, set, create, etc.)`
        });
      }
    }
  });

  return issues;
}

function snakeCaseToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Detects naming convention patterns across the codebase
 */
export function detectNamingConventions(files: string[], allIssues: NamingIssue[]): {
  dominantConvention: 'camelCase' | 'snake_case' | 'PascalCase' | 'mixed';
  conventionScore: number;
} {
  // Count conventions
  const camelCaseCount = allIssues.filter(i => i.type === 'convention-mix').length;
  const totalChecks = files.length * 10; // Rough estimate

  if (camelCaseCount / totalChecks > 0.3) {
    return { dominantConvention: 'mixed', conventionScore: 0.5 };
  }

  // For TypeScript/JavaScript, default to camelCase
  return { dominantConvention: 'camelCase', conventionScore: 0.9 };
}
