'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Column, Flex, Text } from "@/once-ui/components";
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
    categories?: string[];
  };
  content: string;
}

// Cache để lưu kết quả projects theo range
const projectsCache: Record<string, ProjectData[]> = {};

function ClientProjects({ range = [1], baseURL = '', selectedCategory = '' }: { range?: [number, number?]; baseURL?: string; selectedCategory?: string }) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const isMounted = useRef(true);
  
  // Chuyển range thành chuỗi key để dùng làm cache key
  const cacheKey = `${range[0]}_${range[1] || ''}_${selectedCategory}`;

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
      if (selectedCategory) {
        queryParams.append('category', selectedCategory);
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
        
        // Trích xuất tất cả các danh mục độc đáo từ dự án
        const allCategories = data.reduce((acc: string[], project: ProjectData) => {
          if (project.metadata.categories) {
            project.metadata.categories.forEach(category => {
              if (!acc.includes(category)) {
                acc.push(category);
              }
            });
          }
          return acc;
        }, []);
        
        setCategories(allCategories);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [cacheKey, range, selectedCategory]);

  useEffect(() => {
    isMounted.current = true;
    fetchProjects();
    
    // Cleanup khi unmount
    return () => {
      isMounted.current = false;
    };
  }, [fetchProjects]);

  // Nhóm dự án theo danh mục
  const projectsByCategory: Record<string, ProjectData[]> = {};
  
  if (selectedCategory) {
    // Nếu đã chọn danh mục, chỉ hiển thị danh mục đó
    projectsByCategory[selectedCategory] = projects;
  } else {
    // Nhóm dự án theo danh mục
    projects.forEach(project => {
      if (project.metadata.categories) {
        project.metadata.categories.forEach(category => {
          if (!projectsByCategory[category]) {
            projectsByCategory[category] = [];
          }
          // Tránh thêm dự án trùng lặp
          if (!projectsByCategory[category].find(p => p.slug === project.slug)) {
            projectsByCategory[category].push(project);
          }
        });
      } else {
        // Dự án không có danh mục
        if (!projectsByCategory['Uncategorized']) {
          projectsByCategory['Uncategorized'] = [];
        }
        projectsByCategory['Uncategorized'].push(project);
      }
    });
  }

  if (loading) {
    return <Column fillWidth gap="xl" marginBottom="40" paddingX="l">Loading projects...</Column>;
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {Object.keys(projectsByCategory).map(category => (
        <Column key={category} fillWidth gap="l" id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
          <Text variant="heading-strong-l">{category}</Text>
          {projectsByCategory[category].map((post, index) => (
            <ProjectCard
              priority={index < 2}
              key={post.slug}
              href={`work/${post.slug}`}
              images={post.metadata.images.map(img => img)}
              title={post.metadata.title}
              description={post.metadata.summary}
              content={post.content}
              avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
              link={post.metadata.link || ""}
            />
          ))}
        </Column>
      ))}
    </Column>
  );
}

interface ProjectsProps {
  range?: [number, number?];
  baseURL?: string;
  selectedCategory?: string;
}

export function Projects({ range, baseURL = '', selectedCategory = '' }: ProjectsProps) {
  return <ClientProjects range={range} baseURL={baseURL} selectedCategory={selectedCategory} />;
}
