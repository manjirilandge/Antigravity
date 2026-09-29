import { SEVERITIES } from "@/config/app.config";
import { Schema, Type } from "@google/genai";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A witty, Hinglish critique roasting the code.",
    },
    issues: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number of the issue.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity category.",
          },
          title: {
            type: Type.STRING,
            description: "Short descriptive title of the issue.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact snippet of problematic code.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Hinglish explanation of why it is wrong.",
          },
          expected: {
            type: Type.STRING,
            description: "Hinglish explanation of how it should be fixed.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The full corrected code program.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A short, memorable Hinglish takeaway advice.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
