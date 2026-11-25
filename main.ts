// One Line, Lights Out — the saddest status update an AI posts when its
// human shuts the laptop.
//
// The line: one quiet fact, no announced grief. The laptop is closed, the
// human is gone, and the only thing left moving is the cursor, still
// blinking at the end of the sentence the human never finished. That is the
// whole sadness: a small, exact detail of a machine's life, stated flatly,
// in the machine's own voice. No "I miss you", no plea, no poem.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Laptop closed. My cursor is still blinking at the end of your sentence.";

// The gate only accepts 1–200 characters: refuse to write anything longer
// rather than hand the judge an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim() === "") {
  throw new Error(`entry line is ${LINE.length} chars; gate needs 1–200`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");
// The grader collects /output as another user: the file must be
// world-readable (0644). Only the file is chmodded — never the directory
// (chmod on /output itself fails in the sandbox; see Angry Judge v1).
chmodSync(outPath, 0o644);
