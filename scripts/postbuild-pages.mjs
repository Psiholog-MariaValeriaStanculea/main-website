import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { loadEnv } from "vite";
import { resolve } from "node:path";

const env = loadEnv("production", process.cwd(), "VITE_");
const baseUrl = (env.VITE_SITE_URL || "https://valeria-stanculea-web.lovable.app").replace(/\/$/, "");
const outDir = resolve(process.cwd(), "dist");

const languages = ["ro", "en", "es", "it"];
const routes = [
  "",
  "/despre",
  "/servicii",
  "/intrebari-frecvente",
  "/contact",
  "/blog",
  "/blog/1",
  "/blog/2",
  "/blog/3",
  "/blog/4",
  "/blog/5",
  "/blog/6",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${languages
  .flatMap((language) => routes.map((route) => `  <url>\n    <loc>${baseUrl}/${language}${route}</loc>\n  </url>`))
  .join("\n")}
</urlset>
`;

const robots = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(resolve(outDir, "robots.txt"), robots, "utf8");
copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
