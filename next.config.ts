import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Разрешаем все источники в dev-режиме (для разработки)
  allowedDevOrigins: ["*"],
  images: { domains: ["avatars.yandex.net"] },
};

export default nextConfig;
