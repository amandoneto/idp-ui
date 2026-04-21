# IDP UI | Individual Development Plan

![IDP UI Hero](/home/amandos/.gemini/antigravity/brain/b5a6cd65-5dd7-4f5f-b387-520e9ac89eee/idp_ui_hero_vibe_1776774341064.png)

## 🚀 Overview

**IDP UI** is a high-performance, modern web interface designed for managing and tracking **Individual Development Plans (IDP)**. It provides a structured way for professionals to assess their skills, set goals, and monitor their career progression through a sleek, intuitive dashboard.

---

## 💎 Spec-Driven Development (SDD)

This project is built using a **Spec-Driven Development** methodology. Unlike traditional development where the UI and logic are tightly coupled and manually orchestrated, IDP UI leverages a "Single Source of Truth" defined in JSON specifications.

### Why SDD?
- **Agility**: Changes to assessment logic, categories, or scoring levels are made in the spec (JSON), and the UI adapts automatically.
- **Consistency**: Ensures that the frontend representation is always perfectly aligned with the underlying data models and business rules.
- **Scalability**: New assessment types or professional tracks can be added by simply providing a new specification file.

> [!TIP]
> Check out `test.json` to see how the assessment structure, levels, and descriptions drive the entire user experience.

---

## ✨ Key Features

- **Hierarchical Assessments**: Navigate through categories and subcategories with ease.
- **Status-Based Workflow**: Track assessments through various stages (e.g., Draft, Completed).
- **Dynamic Level Selection**: Interactive components for selecting skill levels with real-time descriptions.
- **Responsive Design**: A mobile-first approach ensuring a premium experience on any device.
- **Modern Aesthetic**: Deep-toned, high-contrast UI designed for focus and clarity.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / Radix Primitives
- **Data Fetching**: Axios
- **Form Management**: React Hook Form + Zod
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd idp-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Learn More

To learn more about the methodology or contribute to the project, please refer to the internal documentation or reach out to the development team.
