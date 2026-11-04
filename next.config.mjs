// next.config.mjs
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const baseConfig = {
  // Local production-mode staging keeps the last accepted .next output intact.
  distDir: process.env.ELECTRIC_FINANCE_STAGING === "true" ? ".next-staging" : ".next",
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ...(process.env.ELECTRIC_FINANCE_STAGING === "true" ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] : []),
    ] }];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },

  // Sourcemap uyarılarını azaltmak için (prod tarafında da gereksiz)
  productionBrowserSourceMaps: false,

  // ✅ MDX dosyalarını route/import olarak tanıt
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(baseConfig);
