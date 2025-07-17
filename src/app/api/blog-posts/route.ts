import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextRequest, NextResponse } from "next/server";

type Metadata = {
  title: string;
  publishedAt: string;
  summary?: string;
  image?: string;
  tag?: string;
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    tag: data.tag || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const fileData = readMDXFile(path.join(dir, file));
    if (!fileData) return null;
    
    const { metadata, content } = fileData;
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  }).filter(Boolean);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rangeStart = parseInt(searchParams.get("rangeStart") || "1");
  const rangeEnd = searchParams.get("rangeEnd") ? parseInt(searchParams.get("rangeEnd") as string) : undefined;
  
  try {
    const allBlogs = getMDXData(path.join(process.cwd(), "src", "app", "blog", "posts"));
    
    const sortedBlogs = allBlogs.sort((a, b) => {
      return new Date(b!.metadata.publishedAt).getTime() - new Date(a!.metadata.publishedAt).getTime();
    });
    
    const displayedBlogs = rangeStart || rangeEnd 
      ? sortedBlogs.slice(rangeStart - 1, rangeEnd)
      : sortedBlogs;
    
    return NextResponse.json(displayedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
} 