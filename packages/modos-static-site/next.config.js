const withPlugins = require('next-compose-plugins');

// https://github.com/cyrilwanner/next-optimized-images
const optimizedImages = require('next-optimized-images');

const ASSET_PREFIX = process.env.ASSET_PREFIX;

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ['png', 'svg', 'jpg'],
        optimizeImages: true,
        // svgo: {
        //   plugins: [
        //     {
        //       // SVGO plugin options: https://github.com/svg/svgo
        //     }
        //   ]
        // },
        optipng: {
          // OptiPng plugin options:
          optimizationLevel: 5
        }
      }
    ]
  ],
  {
    // List of Next options: https://github.com/vercel/next.js/blob/canary/packages/next/next-server/server/config.ts#L12-L63

    assetPrefix: ASSET_PREFIX ? ASSET_PREFIX : '',
    basePath: ASSET_PREFIX ? ASSET_PREFIX : ''
  }
);
