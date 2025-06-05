import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Lấy parameters từ URL
    const searchParams = request.nextUrl.searchParams;
    const rangeStart = parseInt(searchParams.get('rangeStart') || '1', 10);
    const rangeEnd = searchParams.has('rangeEnd') 
      ? parseInt(searchParams.get('rangeEnd') || '10', 10) 
      : undefined;
    
    // Mảng dự án mẫu - trong thực tế, đây có thể là truy vấn từ DB hoặc CMS
    const allProjects = [
      {
        slug: "building-once-ui-a-customizable-design-system",
        metadata: {
          title: "Building Once UI: A Customizable Design System",
          publishedAt: "2023-05-20",
          summary: "How I designed and developed a flexible component library that powers multiple projects",
          images: ["/images/projects/project-01/cover-01.jpg", "/images/projects/project-01/cover-02.jpg"],
          team: [
            { avatar: "/images/avatar.jpg" }
          ],
          link: "https://github.com/once-ui-system/nextjs-starter"
        },
        content: "Once UI is a modern design system built with React and Tailwind..."
      },
      {
        slug: "redesigning-product-dashboard",
        metadata: {
          title: "Redesigning A Product Analytics Dashboard",
          publishedAt: "2023-08-15",
          summary: "A case study on improving data visualization and user experience for a SaaS dashboard",
          images: ["/images/projects/project-02/cover-01.jpg"],
          team: [
            { avatar: "/images/avatar.jpg" }
          ],
          link: ""
        },
        content: "This dashboard redesign focused on improving data visualization..."
      },
      {
        slug: "mobile-app-for-task-management",
        metadata: {
          title: "Mobile App For Task Management",
          publishedAt: "2023-10-22",
          summary: "Creating a streamlined mobile experience for busy professionals",
          images: ["/images/projects/project-03/cover-01.jpg"],
          team: [
            { avatar: "/images/avatar.jpg" }
          ],
          link: ""
        },
        content: "The task management app was designed with simplicity in mind..."
      }
    ];
    
    // Trả về phạm vi dự án dựa trên rangeStart và rangeEnd
    let projects;
    
    if (rangeEnd) {
      projects = allProjects.slice(rangeStart - 1, rangeEnd);
    } else {
      projects = allProjects.slice(rangeStart - 1);
    }
    
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}