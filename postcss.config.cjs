// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // ← 改成这个新包
    autoprefixer: {},
  },
};
