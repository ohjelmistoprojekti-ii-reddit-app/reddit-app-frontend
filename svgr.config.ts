import type { Config } from "@svgr/core"

// SVGR config was produced with the help of ChatGPT

const config: Config = {
  // Do not automatically spread props on <svg> unless you want to
  expandProps: false,

  // Keep viewBox + other attributes
  svgProps: {},

  // Configure SVGO (optimizer)
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            // don’t strip IDs
            cleanupIds: false,
            // don’t remove unknown/custom attributes
            removeUnknownsAndDefaults: false,
          },
        },
      },
    ],
  },
}

export default config