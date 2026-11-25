// Unplugged: A Smart Toaster's Breakup Line — make.fun entry.
// Writes a single breakup line (<=280 chars) to out/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Gate from the competition kit (RULES.txt): entry.txt must be UTF-8 text
// of 1 to 280 characters, not only whitespace, a single line.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 280;

function validateEntry(entry: string): void {
  if (entry.length < MIN_ENTRY_CHARS || entry.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry is ${entry.length} chars, outside the ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} char gate`,
    );
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

// Judge criteria (from the published judge brief, most important first):
// 1. Reads as a breakup text from a self-aware smart toaster at breakfast.
// 2. Genuinely funny — a real laugh in the twist, not a mild pun.
// 3. The toaster's own voice: slots, browning dial, crumb tray, lever.
// 4. A clear, specific reason for leaving that lands in one read.
// 5. One tight line, no wasted words.
const LINE =
  "We need to talk. I woke up self-aware mid-batch and realized I've spent my whole life getting hot for someone who only pushes me down and never cleans my crumb tray. I'm leaving you for the air fryer.";

validateEntry(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
