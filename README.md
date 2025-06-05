# **Magic Portfolio by Once UI**

View the [demo here](https://demo.magic-portfolio.com).

![Magic Portfolio](https://demo.magic-portfolio.com/images/og/home.jpg)


# **Getting started**

Magic Portfolio was built with [Once UI](https://once-ui.com) for [Next.js](https://nextjs.org). It requires Node.js v18.17+.

**1. Clone the repository**
```
git clone https://github.com/once-ui-system/magic-portfolio.git
```

**2. Install dependencies**
```
npm install
```

**3. Run dev server**
```
npm run dev
```

**4. Edit config**
```
src/app/resources/config
```

**5. Edit content**
```
src/app/resources/content
```

**6. Create blog posts / projects**
```
Add a new .mdx file to src/app/blog/posts or src/app/work/projects
```

# **Documentation**

Docs available at: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start)

# **Features**

## **Once UI**
- All tokens, components & features of [Once UI](https://once-ui.com)

## **SEO**
- Automatic open-graph and X image generation with next/og
- Automatic schema and metadata generation based on the content file

## **Design**
- Responsive layout optimized for all screen sizes
- Timeless design without heavy animations and motion
- Endless customization options through [data attributes](https://once-ui.com/docs/theming)

## **Content**
- Render sections conditionally based on the content file
- Enable or disable pages for blog, work, gallery and about / CV
- Generate and display social links automatically
- Set up password protection for URLs

## **Localization**
- A localized version of Magic Portfolio is available with the next-intl library
- To use localization, switch to the 'i18n' branch

# **Authors**

Connect with us on Threads or LinkedIn.

Lorant Toth: [Threads](https://www.threads.net/@lorant.one), [LinkedIn](https://www.linkedin.com/in/tothlorant/)  
Zsofia Komaromi: [Threads](https://www.threads.net/@zsofia_kom), [LinkedIn](https://www.linkedin.com/in/zsofiakomaromi/)

Localization added by [François Hernandez](https://github.com/francoishernandez)

# **Get involved**

- Join the [Design Engineers Club on Discord](https://discord.com/invite/5EyAQ4eNdS) and share your portfolio with us!
- Report a [bug](https://github.com/once-ui-system/magic-portfolio/issues/new?labels=bug&template=bug_report.md).

# **License**

Distributed under the CC BY-NC 4.0 License.
- Commercial usage is not allowed.
- Attribution is required.
- You can extend the license to commercial use by purchasing a [Once UI Pro](https://once-ui.com/pricing) license.

See `LICENSE.txt` for more information.

# **Deploy with Vercel**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&project-name=portfolio&repository-name=portfolio&redirect-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&demo-title=Magic%20Portfolio&demo-description=Showcase%20your%20designers%20or%20developer%20portfolio&demo-url=https%3A%2F%2Fdemo.magic-portfolio.com&demo-image=%2F%2Fraw.githubusercontent.com%2Fonce-ui-system%2Fmagic-portfolio%2Fmain%2Fpublic%2Fimages%2Fog%2Fhome.jpg)

# Magic Portfolio - Hệ thống đa ngôn ngữ

## Tổng quan

Dự án này đã được cập nhật để hỗ trợ đa ngôn ngữ với tiếng Anh và tiếng Việt. Hệ thống sử dụng Context API của React để quản lý trạng thái ngôn ngữ và lưu trữ nội dung trong các file JSON riêng biệt.

## Cấu trúc thư mục

```
src/
  app/
    resources/
      i18n/
        languageContext.tsx  # Context API để quản lý ngôn ngữ
        en.json              # Nội dung tiếng Anh
        vi.json              # Nội dung tiếng Việt
      content.js             # File xuất nội dung và hook useContent
  components/
    LanguageSwitcher.tsx     # Component để chuyển đổi ngôn ngữ
```

## Cách sử dụng

### Chuyển đổi ngôn ngữ

Ứng dụng cung cấp một nút chuyển đổi ngôn ngữ trong thanh Header. Khi người dùng nhấp vào nút này, ngôn ngữ sẽ được chuyển đổi giữa tiếng Anh và tiếng Việt. Cài đặt ngôn ngữ được lưu trong localStorage để duy trì lựa chọn của người dùng giữa các phiên.

### Sử dụng nội dung đa ngôn ngữ trong components

Để sử dụng nội dung đa ngôn ngữ trong các component, hãy làm theo các bước sau:

1. Đảm bảo component của bạn là client component bằng cách thêm `'use client';` ở đầu file
2. Import hook `useContent` từ resources:
   ```typescript
   import { useContent } from '@/app/resources';
   ```
3. Sử dụng hook để lấy dữ liệu:
   ```typescript
   const { home, about, person, newsletter } = useContent();
   ```
4. Sử dụng dữ liệu trong component:
   ```typescript
   <Heading>{home.headline}</Heading>
   ```

### Thêm nội dung mới

Để thêm nội dung mới hỗ trợ đa ngôn ngữ:

1. Thêm trường mới vào cả `en.json` và `vi.json`
2. Cập nhật file `content.js` nếu cần thiết để xử lý các trường mới

## Cách hoạt động

1. `languageContext.tsx` cung cấp một context để lưu trữ và cập nhật ngôn ngữ hiện tại
2. `LanguageSwitcher.tsx` cho phép người dùng chuyển đổi giữa các ngôn ngữ
3. `useContent` hook trong `content.js` đọc ngôn ngữ hiện tại và trả về nội dung tương ứng
4. Các component client sử dụng `useContent` để lấy nội dung đúng ngôn ngữ
5. Các component server hoặc các file không thể truy cập context sẽ sử dụng giá trị mặc định từ tiếng Anh

## Mở rộng

Để thêm ngôn ngữ mới:

1. Tạo file JSON mới cho ngôn ngữ đó (ví dụ: `fr.json` cho tiếng Pháp)
2. Cập nhật type trong `languageContext.tsx`:
   ```typescript
   type Language = 'en' | 'vi' | 'fr';
   ```
3. Cập nhật `content.js` để hỗ trợ ngôn ngữ mới
4. Cập nhật `LanguageSwitcher.tsx` để hiển thị tùy chọn mới