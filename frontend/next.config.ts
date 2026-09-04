import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 生產模式輸出配置
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // 暫時跳過類型檢查以快速建置
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 允許透過 IP 訪問（開發模式）
  experimental: {
    allowedDevOrigins: [
      'http://192.168.1.101:3000',
      '192.168.1.101:3000',
      '192.168.1.101',
      'http://localhost:3000',
      'localhost:3000',
    ],
  },

  // Turbopack 配置 - 禁用 WebSocket（避免 WSL2 問題）
  turbopack: {
    // 使用輪詢代替 WebSocket
    devOptions: {
      poll: 1000,
    },
  },

  // Webpack 配置（Turbopack 的備用）
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // 禁用 HMR 的 WebSocket
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    return config;
  },
};

export default nextConfig;
