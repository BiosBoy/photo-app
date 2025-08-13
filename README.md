# 🧑‍💼 Photo App – React + TypeScript + Material UI

A simple Photo app that allows users to view photos and their history — built with React, TypeScript, Vite, and Material UI.

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
photo-app/
├── public/
├── server/
│   └── index.js
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AddPhotoModal.tsx
│   │   ├── FilterDropdown.tsx
│   │   └── SearchBar.tsx
│   ├── seeds/
│   │   ├── photos.ts
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
│   │   ├── PhotoList
│   │   │   ├── index.tsx
│   │   │   └── PhotoDetail.tsx
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
git clone https://github.com/BiosBoy/photo-app.git
cd photo-app
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start the frontend and backend servers

```bash
yarn start:frontend
yarn start:backend
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

| Path       | Page            |
| ---------- | --------------- |
| `/`        | Photo list page |
| `/:id`     | Photo page      |
| `/profile` | Profile Page    |
| `*`        | 404 Not Found   |

---

## 🧱 Component Diagram

```plaintext
index.ts
├── Components
│   ├── Header (Page title)
│   ├── Navbar (Sidebar)
│   ├── FilterDropdown.tsx
│   ├── AddPhotoModal.tsx
│   └── SearchBar.tsx
├── Pages  (Routes)
│   ├── PhotoList
│   ├── Profile
│   └── NotFound
└── Layout (Main entrypoint)
```

---

## 📄 License

© 2025 Sviatoslav Kuzhelev. All rights reserved.
