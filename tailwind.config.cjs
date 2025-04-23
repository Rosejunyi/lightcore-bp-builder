// tailwind.config.cjs （可选）
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: { extend: {} },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        yahei: ['"Microsoft YaHei"', 'sans-serif'],
      },
    },
  },
};
