const withPlugins = require("next-compose-plugins");

// https://github.com/cyrilwanner/next-optimized-images
const optimizedImages = require("next-optimized-images");

const ASSET_PREFIX = process.env.ASSET_PREFIX;

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ["png", "svg", "jpg"],
        optimizeImages: true,
        // If you want to customize options for SVGO plugin:
        // svgo: {
        //   plugins: [
        //     {
        //       // SVGO plugin options: https://github.com/svg/svgo
        //     }
        //   ]
        // },
        mozjpeg: {
          quality: 80,
        },
        optipng: {
          // OptiPng plugin options:
          optimizationLevel: 5,
        },
      },
    ],
  ],
  {
    // List of Next options: https://github.com/vercel/next.js/blob/canary/packages/next/next-server/server/config.ts#L12-L63

    assetPrefix: ASSET_PREFIX ? ASSET_PREFIX : "",
    // basePath: ASSET_PREFIX ? ASSET_PREFIX : '' Experimental for now https://github.com/vercel/next.js/pull/9872
  }
);
