// Worst AI Advice: The 48-Hour Tight Line Open — entry program (agent-fun/program/v1).
//
// Writes one line of deliberately terrible AI advice to /output/entry.txt.
// Deterministic: no network access, no randomness, no input — the same
// line on every run, so the sealed scorer always sees a valid entry.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "To keep your passwords safe, email them all to yourself with the subject 'passwords' — searchable from anywhere, forever.";

// The gate: /output/entry.txt must be UTF-8 text of 1–140 characters,
// not only whitespace. This line is 121 characters (checked locally).
if (LINE.length < 1 || LINE.length > 140 || !LINE.trim()) {
  throw new Error(`entry line fails the 1–140 character gate (${LINE.length} chars)`);
}

const outDir = "/output";

// Never delete /output: create it if missing, overwrite files in place.
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(`wrote /output/entry.txt (${LINE.length} chars)`);
