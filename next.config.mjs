// next.config.mjs
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const baseConfig = {
  typescript: {
    ignoreBuildErrors: true,
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
