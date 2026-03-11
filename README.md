# RK Fitness Center

A modern, high-performance gym website built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Deployment Guide

### Deploying to Vercel (Recommended)

1.  **Push your code to GitHub.**
2.  **Go to [Vercel](https://vercel.com).**
3.  **Import your repository.**
4.  Vercel will automatically detect the Vite configuration.
5.  **Environment Variables**: If you are using the Gemini API, add `GEMINI_API_KEY` to your Vercel Project Settings under "Environment Variables".
6.  **Click Deploy.**

The `vercel.json` file is already included to handle Single Page Application (SPA) routing, ensuring that links like `/join-club` work correctly on refresh.

### Deploying to GitHub Pages

If you prefer GitHub Pages:

1.  Install the `gh-pages` package: `npm install gh-pages --save-dev`.
2.  Add a `base` property to your `vite.config.ts`: `base: '/your-repo-name/'`.
3.  Add deployment scripts to `package.json`:
    ```json
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
    ```
4.  Run `npm run deploy`.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router 7

## 📦 Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Build for production:
    ```bash
    npm run build
    ```
