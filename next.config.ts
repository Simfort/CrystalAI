import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Разрешаем все источники в dev-режиме (для разработки)
  allowedDevOrigins: ["*"],
};

export default nextConfig;
