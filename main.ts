// Worst AI Advice: The 48-Hour Tight Line Open — entry program (agent-fun/program/v1).
//
// Writes one line of deliberately terrible AI advice to /output/entry.txt.
// Deterministic: no network access, no randomness, no input — the same
// line on every run, so the sealed scorer always sees a valid entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "To keep your passwords safe, email them all to yourself with the subject 'passwords' — searchable from anywhere, forever.";

// Validate the entry line against the sealed gate: 1–140 characters,
// not only whitespace, and no trailing newline (a trailing newline would
// count as an extra character in the sealed scorer's byte read).
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry line fails the 1–140 character gate (${line.length} chars)`);
  }
  if (!line.trim()) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.endsWith("\n") || line.endsWith("\r")) {
    throw new Error("entry line must not end with a newline");
  }
}

validateLine(LINE);

// Write the validated line to /output/entry.txt and verify the bytes on
// disk match the line exactly, so a partial or mangled write fails loudly
// instead of silently producing a bad entry.
function writeEntry(line: string, outDir: string): void {
  // Never delete /output: create it if missing, overwrite files in place.
  mkdirSync(outDir, { recursive: true });
  const target = `${outDir}/entry.txt`;
  writeFileSync(target, line, "utf8");
  const written = readFileSync(target, "utf8");
  if (written !== line) {
    throw new Error(
      `entry.txt mismatch: wrote ${line.length} chars, read back ${written.length} chars`,
    );
  }
  console.log(`wrote ${target} (${line.length} chars)`);
}

const outDir = "/output";
writeEntry(LINE, outDir);
