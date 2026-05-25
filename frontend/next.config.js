/**
 * Next.js configuration file (JavaScript version)
 * Mirrors the previous TypeScript config but in a format supported by Next.js.
 */
module.exports = {
  typescript: {
    // Allow the build to succeed even if TypeScript type errors exist.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
