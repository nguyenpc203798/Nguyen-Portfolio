'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";

interface ProjectData {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    images: string[];
    team?: Array<{ avatar: string }>;
    link?: string;
  };
  content: string;
}

// Cache để lưu kết quả projects theo range
const projectsCache: Record<string, ProjectData[]> = {};

function ClientProjects({ range = [1], baseURL = '' }: { range?: [number, number?]; baseURL?: string }) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  
  // Chuyển range thành chuỗi key để dùng làm cache key
  const cacheKey = `${range[0]}_${range[1] || ''}`;

  const fetchProjects = useCallback(async () => {
    // Kiểm tra nếu dữ liệu đã có trong cache
    if (projectsCache[cacheKey]) {
      setProjects(projectsCache[cacheKey]);
      setLoading(false);
      return;
    }
    
    try {
      const rangeStart = range[0];
      const rangeEnd = range[1];
      
      const queryParams = new URLSearchParams();
      queryParams.append('rangeStart', rangeStart.toString());
      if (rangeEnd) {
        queryParams.append('rangeEnd', rangeEnd.toString());
      }
      
      const response = await fetch(`/api/projects?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      
      // Chỉ cập nhật state nếu component vẫn được mount
      if (isMounted.current) {
        // Lưu kết quả vào cache
        projectsCache[cacheKey] = data;
        setProjects(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [cacheKey, range]);

  useEffect(() => {
    isMounted.current = true;
    fetchProjects();
    
    // Cleanup khi unmount
    return () => {
      isMounted.current = false;
    };
  }, [fetchProjects]);

  if (loading) {
    return <Column fillWidth gap="xl" marginBottom="40" paddingX="l">Loading projects...</Column>;
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {projects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`work/${post.slug}`}
          images={post.metadata.images.map(img => `${baseURL}${img}`)}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: `${baseURL}${member.avatar}` })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}

interface ProjectsProps {
  range?: [number, number?];
  baseURL?: string;
}

export function Projects({ range, baseURL = '' }: ProjectsProps) {
  return <ClientProjects range={range} baseURL={baseURL} />;
}
