import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      // Import .svg as React components
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // Webpack config as per SVGR documentation
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule: any) => rule.test?.test?.(".svg")
    )

    if (fileLoaderRule) {
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: /url/ },
          use: ["@svgr/webpack"],
        }
      )
      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      ;(fileLoaderRule as any).exclude = /\.svg$/i
    }

    return config
  },
}

export default nextConfig
