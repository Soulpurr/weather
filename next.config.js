/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    images: {
        domains: ['openweathermap.org'],
      },
}

module.exports = nextConfig
