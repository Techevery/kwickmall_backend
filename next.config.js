module.exports = {
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
},
experimental: { appDir: true },
webpack(config) {
  config.experiments = { ...config.experiments, topLevelAwait: true }
  return config
},
};
