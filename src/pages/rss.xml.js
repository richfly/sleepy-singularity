import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");

  // Sort posts by date, newest first
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.pubDate) - new Date(a.data.pubDate);
  });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sortedPosts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
      customData: Array.isArray(post.data.tags)
        ? `<tags>${post.data.tags.join(", ")}</tags>`
        : "",
    })),
  });
}
