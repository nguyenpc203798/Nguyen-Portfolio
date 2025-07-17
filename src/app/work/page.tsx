'use client';

import { useEffect, useState } from 'react';
import { Column, Flex, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { about, person, work } from "@/app/resources/content";
import { Schema } from "@/once-ui/modules";
import { Projects } from "@/components/work/Projects";
import styles from "@/components/about/about.module.scss";

// Default fallback values
const defaultWork = {
  title: "Projects",
  description: "Projects page",
  path: "/work",
};

const defaultPerson = {
  name: "Developer",
  avatar: "",
};

const defaultAbout = {
  path: "/about",
};

// Component TableOfContents cho Work
const WorkTableOfContents = ({ categories }: { categories: string[] }) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Column
      left="0"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      hide="m"
    >
      {categories.map((category, index) => (
        <Column key={index} gap="12">
          <Flex
            cursor="interactive"
            className={styles.hover}
            gap="8"
            vertical="center"
            onClick={() => scrollTo(`category-${category.toLowerCase().replace(/\s+/g, '-')}`, 80)}
          >
            <Flex height="1" minWidth="16" background="neutral-strong"></Flex>
            <Text>{category}</Text>
          </Flex>
        </Column>
      ))}
    </Column>
  );
};

export default function Work() {
  const safeWork = work || defaultWork;
  const safePerson = person || defaultPerson;
  const safeAbout = about || defaultAbout;
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const response = await fetch('/api/projects?rangeStart=1');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const projects = await response.json();
        
        // Trích xuất tất cả các danh mục từ dự án
        const allCategories = projects.reduce((acc: string[], project: any) => {
          if (project.metadata.categories) {
            project.metadata.categories.forEach((category: string) => {
              if (!acc.includes(category)) {
                acc.push(category);
              }
            });
          }
          return acc;
        }, []);
        
        setCategories(allCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    }

    fetchAllCategories();
  }, []);
  
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={safeWork.path}
        title={safeWork.title}
        description={safeWork.description}
        image={`${baseURL}/og?title=${encodeURIComponent(safeWork.title)}`}
        author={{
          name: safePerson.name,
          url: `${baseURL}${safeAbout.path}`,
          image: `${baseURL}${safePerson.avatar}`,
        }}
      />
      
      {!loading && categories.length > 0 && (
        <WorkTableOfContents categories={categories} />
      )}
      
      <Projects />
    </Column>
  );
}
