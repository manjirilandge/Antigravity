# Code Roaster 🍳🔥

> **"Your code. Our problem now."**  
> An AI-powered code critique and review tool built with Next.js 16, React 19, Tailwind CSS v4, and Google Gemini (`gemini-3.5-flash-lite`).

---

## 📐 Overview

**Code Roaster** analyzes user-submitted code snippets, providing a witty, senior-developer style Hinglish roast, a structured breakdown of issues categorized by severity (`FATAL BUG`, `CODE SMELL`, `OPTIMIZATION`), and a corrected, production-ready solution block with one-click copy and editor application.

Built following an **"Architectural Blueprint / Technical Drafting Desk"** aesthetic created via Google Stitch MCP.

---

## ✨ Features

- **Witty Hinglish Roasts**: AI persona that delivers funny, memorable feedback with emojis, without being insulting.
- **Adjustable Roast Intensity**:
  - `Dry`: Mild, deadpan, and mostly helpful.
  - `Sharp`: Pointed and witty, calling out mistakes directly.
  - `Savage`: Maximum burn, brutally honest yet technically accurate.
- **Multi-Language Support**: Python, JavaScript, TypeScript, Java, C, C++, Go, and Rust.
- **Drafting Desk Code Editor**:
  - Synchronized line-number gutter.
  - 4-space Tab key handling.
  - Real-time cursor coordinates (`Ln`, `Col`) and language telemetry.
  - Automatic error line highlighting when viewing audit results.
- **Multi-State Audit Panel**: Seamless transitions across `Empty`, `Loading`, `Results`, and `Error` states.
- **Hardened Fixes**: Shows a diff-ready `solution.<ext>` code block with `COPY` and `APPLY TO EDITOR` actions.
- **Fast Keyboard Shortcuts**: Press `Ctrl+Enter` (or `⌘+Enter`) anywhere to run an audit.
- **Google Stitch Design**: Strict `0px` radius, visible hairline borders, and a 24px x 24px drafting grid canvas.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **AI SDK**: Official [`@google/genai`](https://www.npmjs.com/package/@google/genai) SDK
- **AI Model**: Google Gemini (`gemini-3.5-flash-lite`)
- **Design & Wireframing**: Google Stitch MCP

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/manjirilandge/Antigravity.git
cd Antigravity
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Gemini API Key
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

### 4. Verify API Connection
```bash
npm run check:api
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏛️ Project Architecture

```
├── app/
│   ├── api/roast/route.ts      # POST endpoint validating input & calling Gemini
│   ├── globals.css             # Tailwind v4 @theme inline tokens & drafting grid
│   ├── layout.tsx              # Space Grotesk & JetBrains Mono fonts + metadata
│   └── page.tsx                # Centered Workspace container
├── components/
│   ├── CodeEditor.tsx          # Code editor with synced gutter & cursor tracker
│   ├── EmptyState.tsx          # Awaiting code submission idle state
│   ├── ErrorMessageInput.tsx   # Optional terminal error / stack trace drawer
│   ├── ErrorState.tsx          # Analysis failed view with retry trigger
│   ├── FixedCode.tsx           # Solution block with Copy & Apply actions
│   ├── IssueCard.tsx           # Diagnosis cards with severity badges
│   ├── LoadingState.tsx        # Spinning animated audit indicator
│   ├── RoastControls.tsx       # Intensity radio group, language dropdown, roast CTA
│   ├── RoastReport.tsx         # Multi-state audit viewer (01-04 sections)
│   ├── SectionHeader.tsx       # Stamped 01 // ROAST blueprint headers
│   ├── StatusBar.tsx           # Live status telemetry & workshop attribution
│   ├── TopBar.tsx              # Workstation header strip
│   └── Workspace.tsx           # Central client state owner
├── config/
│   └── app.config.ts           # App metadata, languages, roast levels & limits
├── lib/
│   ├── api.ts                  # Client fetch wrapper
│   ├── gemini.ts               # Server-side Gemini caller with 503 retry loop
│   ├── prompt.ts               # Hinglish personality & prompt engineering
│   └── schema.ts               # JSON schema definition for structured output
├── scripts/
│   └── check-api.ts            # CLI test script (npm run check:api)
└── types/
    └── roast.ts                # TypeScript interfaces and unions
```

---

## 📜 Attribution

Created for and presented at the **GDG Nashik Pre-DevFest Workshop**.
