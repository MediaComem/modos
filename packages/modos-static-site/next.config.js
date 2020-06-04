const isStaging = process.env.STAGING;

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isStaging ? 'https://modos.heig-vd.ch/_staging' : ''
}
