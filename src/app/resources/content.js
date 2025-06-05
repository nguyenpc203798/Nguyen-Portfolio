"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/app/resources/languageContext";
import enData from "@/app/resources/i18n/en.json";
import viData from "@/app/resources/i18n/vi.json";

export const useContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(language === "en" ? enData : viData);

  useEffect(() => {
    setContent(language === "en" ? enData : viData);
  }, [language]);

  // Bổ sung các hàm getter để tương thích với cấu trúc hiện tại
  const personWithGetter = {
    ...content.person,
    get name() {
      return `${this.firstName} ${this.lastName}`;
    },
  };

  // Chuyển đổi plain text thành JSX cho các trường cần thiết
  const newsletterWithJSX = {
    ...content.newsletter,
    title: <>{content.newsletter.title}</>,
    description: <>{content.newsletter.description}</>,
  };

  const homeWithJSX = {
    ...content.home,
    headline: <>{content.home.headline}</>,
    featured: content.home.featured
      ? {
          ...content.home.featured,
          title: (
            <>
              {content.home.featured.title.includes("Agronexus Capital") ? (
                <>
                  {content.home.featured.title.split("Agronexus Capital")[0]}
                  <strong className="ml-4">Agronexus Capital</strong>
                </>
              ) : (
                content.home.featured.title
              )}
            </>
          ),
        }
      : null,
    subline: (
      <>
        {content.home.subline.subline1}
        <strong className="ml-4">{content.home.subline.Logo}</strong>
        {content.home.subline.subline2}
      </>
    ),
  };

  const aboutWithJSX = {
    ...content.about,
    intro: {
      ...content.about.intro,
      description: <>{content.about.intro.description}</>,
    },
    work: {
      ...content.about.work,
      experiences: content.about.work.experiences.map((exp) => ({
        ...exp,
        achievements: exp.achievements.map((achievement) => <>{achievement}</>),
      })),
    },
    studies: {
      ...content.about.studies,
      institutions: content.about.studies.institutions.map((inst) => ({
        ...inst,
        description: <>{inst.description}</>,
      })),
    },
    technical: {
      ...content.about.technical,
      skills: content.about.technical.skills.map((skill) => ({
        ...skill,
        description: <>{skill.description}</>,
      })),
    },
  };

  return {
    person: personWithGetter,
    social: content.social,
    newsletter: newsletterWithJSX,
    home: homeWithJSX,
    about: aboutWithJSX,
    blog: content.blog,
    work: content.work,
    gallery: content.gallery,
  };
};

// Export a default object for static/non-client components
import defaultEnData from "@/app/resources/i18n/en.json";

const person = {
  ...defaultEnData.person,
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
};

const social = defaultEnData.social;
const newsletter = {
  ...defaultEnData.newsletter,
  title: <>{defaultEnData.newsletter.title}</>,
  description: <>{defaultEnData.newsletter.description}</>,
};
const home = {
  ...defaultEnData.home,
  title: `${person.name}'s Portfolio`,
  headline: <>{defaultEnData.home.headline}</>,
  featured: {
    ...defaultEnData.home.featured,
    title: (
      <>
        Recent project: <strong className="ml-4">Agronexus Capital</strong>
      </>
    ),
  },
  subline: (
    <>
      I'm Phuong Cong Nguyen, a full stack developer at
      <strong className="ml-4">Agronexus Capital</strong>
      , where I craft intuitive
      <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};
const about = {
  ...defaultEnData.about,
  label: `About sgsdf`,
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  intro: {
    ...defaultEnData.about.intro,
    description: <>{defaultEnData.about.intro.description}</>,
  },
  work: {
    ...defaultEnData.about.work,
    experiences: defaultEnData.about.work.experiences.map((exp) => ({
      ...exp,
      achievements: exp.achievements.map((achievement) => <>{achievement}</>),
    })),
  },
  studies: {
    ...defaultEnData.about.studies,
    institutions: defaultEnData.about.studies.institutions.map((inst) => ({
      ...inst,
      description: <>{inst.description}</>,
    })),
  },
  technical: {
    ...defaultEnData.about.technical,
    skills: defaultEnData.about.technical.skills.map((skill) => ({
      ...skill,
      description: <>{skill.description}</>,
    })),
  },
};
const blog = {
  ...defaultEnData.blog,
  description: `Read what ${person.name} has been up to recently`,
};
const work = {
  ...defaultEnData.work,
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
};
const gallery = {
  ...defaultEnData.gallery,
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
};

export { person, social, newsletter, home, about, blog, work, gallery };
