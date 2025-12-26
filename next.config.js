require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ← これを追加（最重要）

  env: {
    // .env の値を Build Time に埋め込む
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
};

module.exports = nextConfig;

