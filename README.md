# 💼 Job Portal

A **mini job portal web application** built with **React 19** and **TypeScript**.  
Admins can log in and create job postings, while users can view and apply through a **dynamic form** based on admin configuration.  
The project runs on **Node.js v20.19.2**.

---

## 🧩 Project Structure

All main code lives under the `src` directory:

```bash
src/
├── assets/
├── components/
├── constants/
├── global/
├── pages/
└── routes/
```

### 🗒️ Notes

- **global** — contains reusable global logic such as configuration, API setup, or global providers.
- **pages** — holds the main pages like login, dashboard, and job posting forms.
- **routes** — defines navigation paths and route-level configurations.
- **components** — stores shared UI elements such as buttons, inputs, and modals.
- **constants** — central place for colors, spacing, enums, and static values.
- **assets** — includes icons, images, and fonts used across the app.

This structure keeps the project modular, organized, and scalable.

---

## ⚙️ Setup

Make sure you have **Node.js v20.19.2** installed.

1. Navigate to the project directory:
   `cd your-project-folder`

2. Install dependencies:
   `npm install`

3. Run the development server:
   `npm run dev`

---

## 🧠 Tech Stack

- **React 19** – UI library
- **Vite** – Fast build and development environment
- **TypeScript** – Type-safe development
- **MUI** – Modern UI components
- **React Hook Form + Zod** – Form management and schema validation
- **Redux Toolkit** – Global state management
- **React Router** – Routing and navigation
- **ESLint + Prettier** – Code quality and formatting

---

## 🚀 Features

- 🔐 **Admin login** for managing job postings
- 🧩 **Dynamic job posting form** that adapts to admin-defined configurations
- ⚙️ **Validation** with React Hook Form + Zod
- 🎨 **Responsive UI** built with MUI
- 🧠 **Centralized state** with Redux Toolkit
- ⚡ **Optimized development** workflow with Vite

---

## 🧾 Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build the project for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint checks

---

_Last updated: October 2025_

```

```
