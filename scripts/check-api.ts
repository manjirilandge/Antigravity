import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function main() {
  console.log(`[check:api] Testing Gemini connection with model: ${AI.model}...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n--- [CHECK:API SUCCESS] ---");
    console.log(`Issues detected: ${result.issues.length}`);
    console.log(`Roast snippet: "${result.roast.slice(0, 120)}..."`);
    console.log(`Takeaway: "${result.takeaway}"`);
    console.log("---------------------------\n");
    console.log("Gemini API integration verified successfully!");
  } catch (error) {
    console.error("\n--- [CHECK:API FAILED] ---");
    console.error(error instanceof Error ? error.message : error);
    console.error("--------------------------\n");
    process.exit(1);
  }
}

main();
