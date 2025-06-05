'use client';

import { Column } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { about, person, work } from "@/app/resources/content";
import { Schema } from "@/once-ui/modules";
import { Projects } from "@/components/work/Projects";

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

export default function Work() {
  const safeWork = work || defaultWork;
  const safePerson = person || defaultPerson;
  const safeAbout = about || defaultAbout;
  
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
      <Projects />
    </Column>
  );
}
