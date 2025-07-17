import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Lấy parameters từ URL
    const searchParams = request.nextUrl.searchParams;
    const rangeStart = parseInt(searchParams.get('rangeStart') || '1', 10);
    const rangeEnd = searchParams.has('rangeEnd') 
      ? parseInt(searchParams.get('rangeEnd') || '10', 10) 
      : undefined;
    const categoryFilter = searchParams.get('category') || undefined;

    // Mảng dự án mẫu - trong thực tế, đây có thể là truy vấn từ DB hoặc CMS
    const allProjects = [
      {
        slug: "fire-watch",
        metadata: {
          title: "Xây dựng website xem phim trực tuyến Fire Watch",
          publishedAt: "2025-02-25",
          summary: "Chịu trách nhiệm toàn bộ vòng đời phát triển: phân tích yêu cầu, thiết kế UI/UX, kiến trúc hệ thống, phát triển frontend và backend, thiết kế cơ sở dữ liệu, kiểm thử và triển khai lên môi trường production.",
          images: [
            "/images/projects/fire-watch/1.png",
            "/images/projects/fire-watch/2.png",
            "/images/projects/fire-watch/3.png",
            "/images/projects/fire-watch/4.png",
            "/images/projects/fire-watch/5.png",
            "/images/projects/fire-watch/6.png",
            "/images/projects/fire-watch/7.png",
            "/images/projects/fire-watch/8.png",
            "/images/projects/fire-watch/9.png",
            "/images/projects/fire-watch/10.png",
            "/images/projects/fire-watch/11.png",
            "/images/projects/fire-watch/12.png",
            "/images/projects/fire-watch/13.png",
            "/images/projects/fire-watch/14.png",
            "/images/projects/fire-watch/15.png",
            "/images/projects/fire-watch/16.png",
            "/images/projects/fire-watch/17.png",
            "/images/projects/fire-watch/18.png",
            "/images/projects/fire-watch/19.png",
            "/images/projects/fire-watch/20.png",
            "/images/projects/fire-watch/21.png",
            "/images/projects/fire-watch/22.png"
          ],
          video: ["/videos/fire-watch.mp4"],
          aspectRatio: "16 / 9",
          team: [
            { avatar: "/images/avatar.jpg" }
          ],
          link: "https://nguyenmephim.xyz",
          categories: ["VTCA PROJECT"]
        },
        content: "Once UI là một hệ thống thiết kế hiện đại được xây dựng với React và Tailwind..."
      },
      {
        slug: "tantai-trading",
        metadata: {
          title: "Xây dựng website cho Tantai Trading, công ty con của Agronexus",
          publishedAt: "2025-05-01",
          summary: "Chịu trách nhiệm phát triển toàn diện, hợp tác thiết kế UI/UX cùng ngũ thiết kế thành giao diện web responsive. Xử lý quy trình build và triển khai website lên production.s",
          images: [
            "/images/projects/tantai/baner.png",
            "/images/projects/tantai/dark.png",
            "/images/projects/tantai/dark2.png",
            "/images/projects/tantai/map.png",
            "/images/projects/tantai/contactvi.png",
            "/images/projects/tantai/newpagecn.png",
            "/images/projects/tantai/tintuc2.png",
            "/images/projects/tantai/tintuc.png",
            "/images/projects/tantai/newpagecn2.png",
            "/images/projects/tantai/catepage.png",
            "/images/projects/tantai/aboutpagecn.png",
            "/images/projects/tantai/introduce.png",
            "/images/projects/tantai/newsection.png",
            "/images/projects/tantai/warehouse.png",
            "/images/projects/tantai/catecn.png",
            "/images/projects/tantai/aboutcn.png",
            "/images/projects/tantai/abouten.png",
            "/images/projects/tantai/aboutvi.png"
          ],
          video: ["/videos/tantai.mp4"],
          aspectRatio: "16 / 9",
          team: [
            { avatar: "/images/avatar.jpg" }
          ],
          link: "https://tantaitrading.vercel.app/",
          categories: ["AGRONEXUS CAPITAL PROJECT"]
        },
        content: "Ứng dụng quản lý công việc được thiết kế với tiêu chí đơn giản, dễ sử dụng..."
      },
      {
        slug: "agronexus-capital",
        metadata: {
          title: "Xây dựng website nhận diện thương hiệu cho Agronexus Capital",
          publishedAt: "2025-04-03",
          summary: "Chịu trách nhiệm phát triển toàn diện, hợp tác thiết kế UI/UX cùng ngũ thiết kế thành giao diện web responsive. Xử lý quy trình build và triển khai website lên production.",
          images: [
            "/images/projects/agro/banner.png",
            "/images/projects/agro/about.png",
            "/images/projects/agro/gtcl.png",
            "/images/projects/agro/quymo.png",
            "/images/projects/agro/tnsm.png",
            "/images/projects/agro/ptbv.png",
            "/images/projects/agro/tintuc1.png",
            "/images/projects/agro/tintuc2.png"
          ],
          video: ["/videos/agronexus.mp4"],
          aspectRatio: "16 / 9",
          team: [
            { avatar: "/images/avatar.jpg" }
          ],
          link: "https://www.agronexuscapital.com/",
          categories: ["AGRONEXUS CAPITAL PROJECT"]
        },
        content: "Dự án làm mới dashboard tập trung vào việc cải thiện khả năng trực quan hóa dữ liệu..."
      },
      {
        slug: "songnhi-entertainment",
        metadata: {
          title: "Landing page cho Song Nhi Entertainment, công ty con của Agronexus",
          publishedAt: "2025-07-05",
          summary: "Chịu trách nhiệm thiết kế UI/UX và chuyển đổi thành web responsive. Xử lý quy trình build và triển khai website lên production.",
          images: [
            "/images/projects/songnhi/1.png",
            "/images/projects/songnhi/2.png",
            "/images/projects/songnhi/3.png",
            "/images/projects/songnhi/4.png",
            "/images/projects/songnhi/5.png",
            "/images/projects/songnhi/6.png",
            "/images/projects/songnhi/7.png"
          ],
          video: ["/videos/songnhi.mp4"],
          aspectRatio: "16 / 9",
          team: [
            { avatar: "/images/avatar.jpg" }
          ],
          link: "https://www.songnhi.com.vn/",
          categories: ["AGRONEXUS CAPITAL PROJECT"]
        },
        content: "Once UI là một hệ thống thiết kế hiện đại được xây dựng với React và Tailwind..."
      },
      {
        slug: "home-coffee",
        metadata: {
          title: "Landing page cho Home Coffee, dự án freelance",
          publishedAt: "2025-06-03",
          summary: "Chịu trách nhiệm thiết kế UI/UX và chuyển đổi thành web responsive. Xử lý quy trình build và triển khai website lên production.",
          images: [
            "/images/projects/homecoffee/1.png",
            "/images/projects/homecoffee/2.png",
            "/images/projects/homecoffee/3.png",
            "/images/projects/homecoffee/4.png",
            "/images/projects/homecoffee/5.png",
            "/images/projects/homecoffee/6.png",
            "/images/projects/homecoffee/7.png",
            "/images/projects/homecoffee/8.png",
            "/images/projects/homecoffee/9.png",
            "/images/projects/homecoffee/10.png"
          ],
          video: ["/videos/homecoffee.mp4"],
          aspectRatio: "16 / 9",
          team: [
            { avatar: "/images/avatar.jpg" }
          ],
          link: "https://www.homecoffee.net/",
          categories: ["FREELANCE PROJECT"]
        },
        content: "Once UI là một hệ thống thiết kế hiện đại được xây dựng với React và Tailwind..."
      }
    ];
  
    // Lọc dự án theo danh mục nếu có
    let filteredProjects = allProjects;
    if (categoryFilter) {
      filteredProjects = allProjects.filter(project => 
        project.metadata.categories && project.metadata.categories.includes(categoryFilter)
      );
    }
    
    // Trả về phạm vi dự án dựa trên rangeStart và rangeEnd
    let projects;
    
    if (rangeEnd) {
      projects = filteredProjects.slice(rangeStart - 1, rangeEnd);
    } else {
      projects = filteredProjects.slice(rangeStart - 1);
    }
    
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}