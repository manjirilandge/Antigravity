import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";
import { ApiError, GoogleGenAI } from "@google/genai";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const baseMessage = error instanceof Error ? error.message : String(error);

  switch (status) {
    case 400:
      return `Invalid request to Gemini API (400). Please check your input parameters: ${baseMessage}`;
    case 403:
      return "Invalid or unauthorized Gemini API key (403). Please verify your GEMINI_API_KEY in .env.local.";
    case 404:
      return `Gemini model not found (404). Check the model name "${AI.model}" in config/app.config.ts.`;
    case 429:
      return "Gemini API rate limit exceeded (429). Please wait a few seconds and try again.";
    case 503:
      return "Gemini AI service is temporarily overloaded or unavailable (503). Retried maximum attempts.";
    default:
      return `AI analysis error (${status ?? "unknown"}): ${baseMessage}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  let lastError: unknown;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || !responseText.trim()) {
        throw new Error("Empty response received from Gemini model.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(
          `Failed to parse Gemini response as JSON: ${
            parseError instanceof Error ? parseError.message : String(parseError)
          }`
        );
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (error) {
      lastError = error;

      const status =
        error instanceof ApiError
          ? error.status
          : typeof error === "object" && error !== null && "status" in error
          ? (error as { status: number }).status
          : undefined;

      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, error));
    }
  }

  throw new Error(
    friendlyErrorMessage(503, lastError ?? "Max retry attempts reached.")
  );
}
