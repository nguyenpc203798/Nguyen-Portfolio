"use client";

import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { useContent } from "@/app/resources/content";
import React from "react";
import { Schema } from "@/once-ui/modules";

// Default fallback values
const defaultAbout = {
  title: "About",
  description: "About page",
  path: "/about",
  tableOfContent: { display: false, subItems: false },
  avatar: { display: false },
  calendar: { display: false, link: "" },
  intro: { display: false, title: "Introduction", description: "" },
  work: { display: false, title: "Work Experience", experiences: [] },
  studies: { display: false, title: "Studies", institutions: [] },
  technical: { display: false, title: "Technical skills", skills: [] },
};

export default function About() {
  const { person, about, social } = useContent();
  
  const safeAbout = about || defaultAbout;
  const safePerson = person || {
    name: "User",
    avatar: "",
    location: "",
    languages: [],
    role: "Developer",
  };

  const structure = [
    {
      title: safeAbout.intro.title,
      display: safeAbout.intro.display,
      items: [],
    },
    {
      title: safeAbout.work.title,
      display: safeAbout.work.display,
      items: Array.isArray(safeAbout.work.experiences)
        ? safeAbout.work.experiences.map((experience) => experience.company)
        : [],
    },
    {
      title: safeAbout.studies.title,
      display: safeAbout.studies.display,
      items: Array.isArray(safeAbout.studies.institutions)
        ? safeAbout.studies.institutions.map((institution) => institution.name)
        : [],
    },
    {
      title: safeAbout.technical.title,
      display: safeAbout.technical.display,
      items: Array.isArray(safeAbout.technical.skills)
        ? safeAbout.technical.skills.map((skill) => skill.title)
        : [],
    },
  ];

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={safeAbout.title}
        description={safeAbout.description}
        path={safeAbout.path}
        image={`${baseURL}/og?title=${encodeURIComponent(safeAbout.title)}`}
        author={{
          name: safePerson.name,
          url: `${baseURL}${safeAbout.path}`,
          image: `${baseURL}${safePerson.avatar}`,
        }}
      />
      {safeAbout.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={safeAbout} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {safeAbout.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={safePerson.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {safePerson.location}
            </Flex>
            {Array.isArray(safePerson.languages) &&
              safePerson.languages.length > 0 && (
                <Flex wrap gap="8">
                  {safePerson.languages.map((language, index) => (
                    <Tag key={language} size="l">
                      {language}
                    </Tag>
                  ))}
                </Flex>
              )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={safeAbout.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="24"
          >
            {safeAbout.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
              >
                <Icon
                  paddingLeft="12"
                  name="calendar"
                  onBackground="brand-weak"
                />
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  href={safeAbout.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Flex>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {safePerson.name}
            </Heading>
            <Text
              marginTop="16"
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {safePerson.role}
            </Text>
            {Array.isArray(social) && social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Button
                          className="s-flex-hide"
                          key={item.name}
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="s"
                          variant="secondary"
                        />
                        <IconButton
                          className="s-flex-show"
                          size="l"
                          key={`${item.name}-icon`}
                          href={item.link}
                          icon={item.icon}
                          variant="secondary"
                        />
                      </React.Fragment>
                    )
                )}
              </Flex>
            )}
          </Column>

          {safeAbout.intro.display && (
            <Column
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="24"
            >
              {safeAbout.intro.description}
            </Column>
          )}

          {safeAbout.work.display && (
            <>
              <Heading
                as="h2"
                id={safeAbout.work.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {safeAbout.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {Array.isArray(safeAbout.work.experiences) &&
                  safeAbout.work.experiences.map((experience, index) => (
                    <Column
                      key={`${experience.company}-${experience.role}-${index}`}
                      fillWidth
                    >
                      <Flex
                        fillWidth
                        horizontal="space-between"
                        vertical="end"
                        marginBottom="4"
                      >
                        <Text
                          id={experience.company}
                          variant="heading-strong-l"
                        >
                          {experience.company}
                        </Text>
                        <Text
                          variant="heading-default-xs"
                          onBackground="neutral-weak"
                        >
                          {experience.timeframe}
                        </Text>
                      </Flex>
                      <Text
                        variant="body-default-s"
                        onBackground="brand-weak"
                        marginBottom="m"
                      >
                        {experience.role}
                      </Text>
                      <Column as="ul" gap="16">
                        {Array.isArray(experience.achievements) &&
                          experience.achievements.map(
                            (achievement: JSX.Element, index: number) => (
                              <Text
                                as="li"
                                variant="body-default-m"
                                key={`${experience.company}-${index}`}
                              >
                                {achievement}
                              </Text>
                            )
                          )}
                      </Column>
                      {Array.isArray(experience.images) &&
                        experience.images.length > 0 && (
                          <Flex fillWidth paddingTop="m" paddingLeft="40" wrap>
                            {experience.images.map((image, index) => (
                              <Flex
                                key={index}
                                border="neutral-medium"
                                radius="m"
                                //@ts-ignore
                                minWidth={image.width}
                                //@ts-ignore
                                height={image.height}
                              >
                                <SmartImage
                                  enlarge
                                  radius="m"
                                  //@ts-ignore
                                  sizes={image.width.toString()}
                                  //@ts-ignore
                                  alt={image.alt}
                                  //@ts-ignore
                                  src={image.src}
                                />
                              </Flex>
                            ))}
                          </Flex>
                        )}
                    </Column>
                  ))}
              </Column>
            </>
          )}

          {safeAbout.studies.display && (
            <>
              <Heading
                as="h2"
                id={safeAbout.studies.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {safeAbout.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {Array.isArray(safeAbout.studies.institutions) &&
                  safeAbout.studies.institutions.map((institution, index) => (
                    <Column
                      key={`${institution.name}-${index}`}
                      fillWidth
                      gap="4"
                    >
                      <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak"
                      >
                        {institution.description}
                      </Text>
                    </Column>
                  ))}
              </Column>
            </>
          )}

          {safeAbout.technical.display && (
            <>
              <Heading
                as="h2"
                id={safeAbout.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {safeAbout.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {Array.isArray(safeAbout.technical.skills) &&
                  safeAbout.technical.skills.map((skill, index) => (
                    <Column key={`${skill}-${index}`} fillWidth gap="4">
                      <Text variant="heading-strong-l">{skill.title}</Text>
                      <Text
                        variant="body-default-m"
                        onBackground="neutral-weak"
                      >
                        {skill.description}
                      </Text>
                      {Array.isArray(skill.images) &&
                        skill.images.length > 0 && (
                          <Flex fillWidth paddingTop="m" gap="12" wrap>
                            {skill.images.map((image, index) => (
                              <Flex
                                key={index}
                                border="neutral-medium"
                                radius="m"
                                //@ts-ignore
                                minWidth={image.width}
                                //@ts-ignore
                                height={image.height}
                              >
                                <SmartImage
                                  enlarge
                                  radius="m"
                                  //@ts-ignore
                                  sizes={image.width.toString()}
                                  //@ts-ignore
                                  alt={image.alt}
                                  //@ts-ignore
                                  src={image.src}
                                />
                              </Flex>
                            ))}
                          </Flex>
                        )}
                    </Column>
                  ))}
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
