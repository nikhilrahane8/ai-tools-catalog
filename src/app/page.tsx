"use client";
import { useState } from "react";
import tools from "./tools.json";
import Link from "next/link";

interface Tool {
  logo_url: string | Blob | undefined;
  id: number;
  name: string;
  category: string;
  description: string;
  website_url:string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' for A-Z, 'desc' for Z-A

  const categories = ["All", ...new Set(tools.map((t) => t.category))];

  // 1. Filter Logic
  const filteredTools = (tools as Tool[]).filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 2. Sort Logic
  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  return (
    <main className="min-h-screen p-8 md:p-16 bg-zinc-50 dark:bg-black text-black dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">AI Tools Catalog</h1>
        

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search AI tools..."
            className="flex-grow p-4 border rounded-xl dark:bg-zinc-900 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          
          {/* Sort Dropdown */}
          <select 
            className="p-4 border rounded-xl dark:bg-zinc-900 dark:border-zinc-700 outline-none"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort: A-Z</option>
            <option value="desc">Sort: Z-A</option>
          </select>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedTools.map((tool) => (
  <Link href={`/tools/${tool.id}`} key={tool.id} className="group">
    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-xl hover:border-blue-500/50 transition-all h-full">
      <div className="flex items-center gap-4 mb-4">
        {/* Improved Logo with Fallback Layering */}
        <div className="relative w-12 h-12 flex-shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border dark:border-zinc-700 overflow-hidden">
          {/* Layer 1: Fallback Letter (Bottom Layer) */}
          <span className="absolute inset-0 flex items-center justify-center font-bold text-blue-500 text-xl uppercase">
            {tool.name[0]}
          </span>

          {/* Layer 2: Image (Top Layer) */}
          {tool.logo_url && (
            <img 
              src={tool.logo_url as string} 
              alt=""
              className="relative z-10 w-full h-full object-contain p-2 bg-white dark:bg-zinc-800 transition-opacity duration-300"
              onError={(e) => {
                // Hides image on error to show the letter underneath
                (e.target as HTMLImageElement).style.opacity = '0';
              }}
            />
          )}
        </div>
        
        <div className="min-w-0">
          <h2 className="text-xl font-bold truncate group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h2>
          <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">
            {tool.category}
          </span>
        </div>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed">
        {tool.description}
      </p>
    </div>
  </Link>
))}
        </div>
      </div>
    </main>
  );}
