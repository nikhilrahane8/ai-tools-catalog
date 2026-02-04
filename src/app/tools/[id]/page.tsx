import tools from "@/app/tools.json";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Tool {
  website_url: string | undefined;
  id: number;
  name: string;
  category: string;
  pricing: string;
  description: string;
  logo_url : string;
}

// 1. Requirement: Pre-render all paths at build time (SSG)
export async function generateStaticParams() {
  return tools.map((tool) => ({
    id: tool.id.toString(), // IDs must be strings in generateStaticParams
  }));
}

// 2. Fix: Ensure params are handled correctly for Next.js 14/15
export default async function ToolDetailPage(props: { params: Promise<{ id: string }> }) {
  // Await params to avoid the "sync access" error in newer Next.js versions
  const { id } = await props.params;

  // 3. Fix: Compare IDs as strings to ensure a match
  const tool = (tools as Tool[]).find((t) => String(t.id) === id);
  
  if (!tool) {
    notFound(); // Triggers the 404 UI if the ID doesn't exist in tools.json
  }

  return (
    <main className="min-h-screen p-8 md:p-24 bg-white dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto text-black dark:text-white">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to Catalog
        </Link>
        
        <div className="border rounded-2xl p-8 shadow-sm dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold">{tool.name}</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {tool.pricing}
            </span>
          </div>
          
          <p className="text-sm text-zinc-500 mb-4">{tool.category}</p>
          <p className="text-lg leading-relaxed mb-8">
            {tool.description}
          </p>
          
          <a 
           href={tool.website_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-zinc-900 text-white dark:bg-white dark:text-black px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Visit Official Website
          </a>
        </div>
      </div>
    </main>
  );
}