const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const ASSET_PREFIX = process.env.ASSET_PREFIX;

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ['png', 'svg'],
        optimizeImages: true,
        // optimizeImagesInDev: true
        svgo: {
          plugins: [
            { cleanupAttrs: true }
          ]
        },
        optipng: {
          optimizationLevel: 5
        }
      }
    ]
  ],
  {
    assetPrefix: ASSET_PREFIX ? ASSET_PREFIX : ''
  }
);
