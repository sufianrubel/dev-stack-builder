<div align="center">
  <img src="./src/assets/logo-text.png" alt="Dev Stack logo" height="52" />

  <h1>Dev Stack Builder</h1>

  <p>
    Explore modern development technologies and assemble the ideal stack for your next project.
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
    <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  </p>
</div>

## About the project

Dev Stack Builder is a responsive React application that helps developers browse popular frontend, backend, database, language, styling, DevOps, and tooling options. Each technology includes a short description, difficulty level, rating, and category. Users can add technologies to a personal stack, remove individual selections, or clear the entire stack.

## Technologies used

| Technology | Purpose |
| --- | --- |
| React 19 | Component-based user interface |
| TypeScript | Type-safe application code |
| Tailwind CSS 4 | Responsive styling and layout |
| Vite 8 | Development server and production build |
| React Toastify | User feedback notifications |
| Lucide React | Interface icons |
| JSON | Technology data source |

## Key features

1. **Technology explorer** — Browse responsive cards containing technology icons, descriptions, categories, difficulty levels, ratings, and badges.
2. **Interactive stack builder** — Add technologies without duplicates, remove a single selection, or clear the complete stack.
3. **Helpful interface states** — Includes loading, error, empty-stack, selected-stack, and toast notification states across desktop and mobile layouts.

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm

### Installation

```bash
git clone https://github.com/sufianrubel/dev-stack-builder.git
cd dev-stack-builder
npm install
npm run dev
```

Open the local address shown by Vite, usually `http://localhost:5173`.

### Available commands

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run lint     # Check the code with ESLint
npm run preview  # Preview the production build
```

## Project structure

```text
dev-stack-builder/
├── public/data/technologies.json
├── src/
│   ├── assets/
│   ├── components/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
└── README.md
```

## Author

- [GitHub](https://github.com/sufianrubel)
- [LinkedIn](https://www.linkedin.com/in/sufianrubel)
- [X](https://x.com/abu_nstu27)

## React questions and answers

### 1. What is JSX, and why is it used in React?

JSX is a syntax that lets us write HTML-like markup inside JavaScript or TypeScript. React uses it to make component interfaces easier to read and build.

### 2. What is the difference between props and state?

Props are values a parent passes to a child component. State is data managed inside a component that can change and cause the interface to render again.

### 3. What does the `useState` hook do, and where did you use it in this project?

`useState` stores changing data in a component. In this project, it manages the technology list, selected stack, loading and error states, modal visibility, and copy status.

### 4. What does the `useEffect` hook do, and why did you need it to load the JSON data?

`useEffect` runs side effects after a component renders. It loads `technologies.json` when the app starts and aborts the request if the component unmounts.

### 5. Why does every item in a `.map()` list need a unique `key` prop?

A unique `key` helps React identify which list item was added, removed, or updated. This makes list rendering accurate and efficient.

### 6. What is conditional rendering? Show one place you used it.

Conditional rendering displays different UI depending on a condition. In `YourStack`, the app shows “Your stack is empty” when there are no selected technologies and shows stack items when selections exist.

### 7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?

A parent sends data to a child through props. A child communicates back by calling a callback function received through props, such as `onAdd` or `onRemove` in this project.
