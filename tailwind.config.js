module.exports = {
  content: ["./index.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f1a",
        glass: "rgba(255,255,255,0.08)",
        border: "rgba(255,255,255,0.2)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [],
};
