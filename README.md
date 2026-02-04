# AI Tools Catalog 

A high-performance, responsive AI tools directory built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Live Demo
[Insert your Vercel Link Here]

## ✨ Features
- **Dynamic Routing & SSG**: Uses `generateStaticParams` for pre-rendering tool detail pages.
- **Search & Filter**: Real-time search by name and category-based filtering.
- **A-Z Sorting**: Organize tools alphabetically for better accessibility.
- **Resilient UI**: Custom logo fallback system using layered CSS to handle broken image URLs gracefully.
- **Dark Mode Support**: Fully responsive design that adapts to system themes.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: JSON-based dataset

## 🧠 Technical Challenges & Solutions
### 1. Next.js 15 Async Params
In Next.js 15, `params` in dynamic routes are now asynchronous. I implemented the `await props.params` pattern in `src/app/tools/[id]/page.tsx` to ensure data fetching remains consistent and error-free.

### 2. Folder Structure & Routing
I initially encountered 404 errors due to placing the `tools` directory outside the `app` folder. Moving the dynamic route to `src/app/tools/[id]` successfully registered the paths in the Next.js file-system-based router.

### 3. Image Fallback System
To prevent a "mixing" effect between text and broken images, I used absolute positioning to layer a fallback letter behind the tool's logo. If the `logo_url` fails, the image is hidden via an `onError` handler, revealing the clean initial underneath.

### 4.JSON Dataset Generation Prompt
Generate a JSON array of 20 popular AI tools. Each object should include: a unique ID (number), name, category (e.g., Coding, Design, Productivity), a professional description (approx. 30 words), a pricing badge (e.g., Free/Paid), a logo URL using a reliable favicon service, and the official website URL. Ensure the syntax is strictly valid JSON.

## 💻 How to Run Locally
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)