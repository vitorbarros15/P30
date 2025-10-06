module.exports = {
  extends: ["next/core-web-vitals"],
  ignorePatterns: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],
  rules: {
    // Basic rules that work with Next.js
    "no-unused-vars": "warn",
    "no-console": "off",
  },
};
