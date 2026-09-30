import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const inNodeModules = (id: string) => id.includes("node_modules");
  const matchesPackage = (id: string, packageName: string) =>
    id.includes(`node_modules/${packageName}/`) || id.includes(`node_modules/${packageName}.`);

  return {
    base: env.VITE_BASE_PATH || "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!inNodeModules(id)) {
              return undefined;
            }

            if (
              matchesPackage(id, "react") ||
              matchesPackage(id, "react-dom") ||
              matchesPackage(id, "react-router") ||
              matchesPackage(id, "react-router-dom") ||
              matchesPackage(id, "@remix-run/router") ||
              matchesPackage(id, "@tanstack/react-query") ||
              matchesPackage(id, "@tanstack/query-core") ||
              matchesPackage(id, "react-helmet-async")
            ) {
              return "react-vendor";
            }

            if (
              matchesPackage(id, "i18next") ||
              matchesPackage(id, "react-i18next") ||
              matchesPackage(id, "i18next-browser-languagedetector")
            ) {
              return "i18n-vendor";
            }

            if (
              id.includes("node_modules/@radix-ui/") ||
              matchesPackage(id, "lucide-react") ||
              matchesPackage(id, "class-variance-authority") ||
              matchesPackage(id, "clsx") ||
              matchesPackage(id, "tailwind-merge") ||
              matchesPackage(id, "sonner") ||
              matchesPackage(id, "vaul")
            ) {
              return "ui-vendor";
            }

            if (
              matchesPackage(id, "recharts") ||
              matchesPackage(id, "embla-carousel-react") ||
              matchesPackage(id, "react-day-picker") ||
              matchesPackage(id, "date-fns")
            ) {
              return "feature-vendor";
            }
          },
        },
      },
    },
  };
});
