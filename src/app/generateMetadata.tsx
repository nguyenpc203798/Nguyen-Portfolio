import { Meta } from "@/once-ui/modules";
import { baseURL } from "@/app/resources";
import { home } from "@/app/resources/content";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
} 