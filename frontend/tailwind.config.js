/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {

      // 🔥 FONT SYSTEM
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      // 🔥 CUSTOM FONT SIZES (SaaS scale)
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
      },

      // 🔥 BORDER RADIUS (soft SaaS feel)
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },

      // 🔥 SHADOWS (clean & soft)
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
        md: "0 4px 12px rgba(0,0,0,0.08)",
        lg: "0 8px 24px rgba(0,0,0,0.08)",
      },

      // 🔥 COLORS (aligned with your theme)
      colors: {
        primary: "#6366F1",   // indigo
        success: "#10B981",   // green
        warning: "#F59E0B",   // yellow
        danger: "#EF4444",    // red
      },

    },
  },
  plugins: [],
};