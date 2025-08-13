# 🧑‍💼 Applicant Tracking System (ATS) – React + TypeScript + Material UI

A simple ATS that allows users to view candidates, companies, and job postings — built with React, TypeScript, Vite, and Material UI.

---

## 📦 Tech Stack

- ⚛️ React 19 (with React Router)
- 📘 TypeScript
- 💄 Material UI
- ⚡ Vite
- 🧹 ESLint + Prettier
- 📁 Static JSON data (no backend)

---

## 📂 Project Structure

```bash
ats-react-tsx-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FilterDropdown.tsx
│   │   └── SearchBar.tsx
│   ├── data/
│   │   ├── candidates.ts
│   │   ├── companies.ts
│   │   └── jobs.ts
│   ├── constants/
│   │   └── routes.ts
│   ├── styles/
│   │   ├── colors.scss
│   │   ├── fonts.scss
│   │   ├── global.scss
│   │   └── reset.scss
│   ├── layout/
│   │   └── index.tsx
│   ├── hooks/
│   │   └── useSearchPagination.ts
│   ├── pages/
│   │   ├── CandidateList
│   │   │   ├── index.tsx
│   │   │   └── CandidateDetail.tsx
│   │   ├── CompanyList
│   │   │   ├── index.tsx
│   │   │   └── CompanyDetail.tsx
│   │   ├── JobList/
│   │   │   ├── index.tsx
│   │   │   └── JobDetail.tsx
│   │   └── NotFound.tsx
│   └── index.tsx
├── eslint.config.js
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/BiosBoy/ats-react-tsx-app.git
cd ats-react-tsx-app
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start the dev server

```bash
yarn dev
```

Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 📦 Build for Production

### 1. Build

```bash
yarn build
```

### 2. Preview locally

```bash
yarn preview
```

### 3. Deploy

You can deploy the output from the `dist/` folder to:

- GitHub Pages
- Vercel
- Netlify
- Any static hosting provider

---

## 🔍 Routes Overview

| Path              | Page                |
| ----------------- | ------------------- |
| `/`               | TODO                |
| `/candidates`     | Candidate List      |
| `/candidates/:id` | Candidate Resume    |
| `/companies`      | Company List        |
| `/companies/:id`  | Company Detail Page |
| `/jobs`           | Job Postings List   |
| `/jobs/:id`       | Job Detail Page     |
| `*`               | 404 Not Found       |

---

## 🧱 Component Diagram

```plaintext
index.ts
├── Components
│   ├── Header (Page title)
│   ├── Navbar (Sidebar)
│   ├── FilterDropdown.tsx
│   └──SearchBar.tsx
├── Pages  (Routes)
│   ├── CandidateList
│   ├── CompanyList
│   ├── JobList
│   └── NotFound
└── Layout (Main entrypoint)
```

---

## 📄 License

© 2025 Sviatoslav Kuzhelev. All rights reserved.
