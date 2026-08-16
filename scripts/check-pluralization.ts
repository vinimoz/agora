#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const ROOT = process.argv[2] ?? process.cwd()

const EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.vue',
])

const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  'coverage',
  'vendor',
  'l10n',
  'scripts',
])

interface Finding {
  file: string
  line: number
  reason: string
  text: string
}

const findings = new Map<string, Finding>()

function addFinding(
  filePath: string,
  line: number,
  reason: string,
  text: string,
): void {
  const file = relative(ROOT, filePath)
  const key = `${file}:${line}:${reason}`

  if (!findings.has(key)) {
    findings.set(key, {
      file,
      line,
      reason,
      text: text.trim(),
    })
  }
}

function walk(dir: string): void {
  for (const entry of readdirSync(dir)) {
    if (IGNORED_DIRS.has(entry)) {
      continue
    }

    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      walk(fullPath)
      continue
    }

    if (!EXTENSIONS.has(extname(entry))) {
      continue
    }

    scanFile(fullPath)
  }
}

function removeComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
}

function scanFile(filePath: string): void {
  const original = readFileSync(filePath, 'utf8')
  const source = removeComments(original)
  const lines = source.split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNumber = i + 1

    scanLine(filePath, line, lineNumber)

    // Check multi-line translation calls.
    const window = lines
      .slice(i, Math.min(i + 8, lines.length))
      .join('\n')

    scanWindow(filePath, window, lineNumber)
  }
}

function scanLine(
  filePath: string,
  line: string,
  lineNumber: number,
): void {
  // {plural} inside a translation.
  if (
    /\bt\s*\(/.test(line) &&
    /\{plural\}/i.test(line)
  ) {
    addFinding(
      filePath,
      lineNumber,
      'Translation contains {plural}',
      line,
    )
  }

  // plural: count > 1 ? 's' : ''
  if (
    /\b(plural|pluralSuffix|plural_suffix|suffix)\b\s*[:=]/i.test(line) &&
    /['"]s['"]/.test(line)
  ) {
    addFinding(
      filePath,
      lineNumber,
      'Manual plural suffix using "s"',
      line,
    )
  }

  // count === 1 ? '' : 's'
  if (
    /\b(count|number|total|quantity|amount)\b/.test(line) &&
    /===?\s*1/.test(line) &&
    /['"]['"]/.test(line) &&
    /['"]s['"]/.test(line)
  ) {
    addFinding(
      filePath,
      lineNumber,
      'Manual singular/plural selection',
      line,
    )
  }

  // count > 1 ? 's' : ''
  if (
    /\b(count|number|total|quantity|amount)\b/.test(line) &&
    />\s*1/.test(line) &&
    /['"]s['"]/.test(line)
  ) {
    addFinding(
      filePath,
      lineNumber,
      'Manual plural selection using "s"',
      line,
    )
  }

  // `${count} participant${count > 1 ? 's' : ''}`
  if (
    /\$\{[^}]+\}/.test(line) &&
    /\?\s*['"]s['"]/.test(line)
  ) {
    addFinding(
      filePath,
      lineNumber,
      'Template literal manually adds plural "s"',
      line,
    )
  }

  // 'participant' + (count > 1 ? 's' : '')
  if (
    /['"][A-Za-zÀ-ÿ]+['"]\s*\+/.test(line) &&
    /\?/.test(line) &&
    /['"]s['"]/.test(line)
  ) {
    addFinding(
      filePath,
      lineNumber,
      'String concatenation manually pluralizes a word',
      line,
    )
  }

  // t(...) containing a manual "s" conditional.
  if (
    /\bt\s*\(/.test(line) &&
    /\?/.test(line) &&
    /['"]s['"]/.test(line)
  ) {
    addFinding(
      filePath,
      lineNumber,
      'Translation call appears to manually pluralize',
      line,
    )
  }
}

function scanWindow(
  filePath: string,
  window: string,
  startLine: number,
): void {
  // t(... 'participant{plural}' ... plural: count > 1 ? 's' : '')
  if (
    /\bt\s*\(/.test(window) &&
    /\{plural\}/i.test(window) &&
    /\bplural\b\s*[:=]/i.test(window) &&
    /['"]s['"]/.test(window)
  ) {
    addFinding(
      filePath,
      startLine,
      'Multi-line translation uses manual plural suffix',
      window.split('\n')[0],
    )
  }

  // Multi-line count > 1 ? 's' : ''
  if (
    /\b(count|number|total|quantity|amount)\b/.test(window) &&
    />\s*1/.test(window) &&
    /\?/.test(window) &&
    /['"]s['"]/.test(window)
  ) {
    addFinding(
      filePath,
      startLine,
      'Multi-line code manually pluralizes using "s"',
      window.split('\n')[0],
    )
  }
}

walk(ROOT)

const results = [...findings.values()]

console.log('')
console.log('Pluralization audit')
console.log('===================')
console.log(`Root: ${ROOT}`)
console.log('')

if (results.length === 0) {
  console.log('✓ No suspicious manual pluralization found.')
  console.log('')
  process.exit(0)
}

console.log(`⚠ Found ${results.length} suspicious occurrence(s):`)
console.log('')

for (const finding of results) {
  console.log(`${finding.file}:${finding.line}`)
  console.log(`  ${finding.reason}`)
  console.log(`  ${finding.text}`)
  console.log('')
}

console.log(
  'Review these occurrences and consider replacing manual pluralization with Nextcloud n().',
)

process.exitCode = 1
