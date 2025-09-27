/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // note の画像CDN（主にこの2つ）
      { protocol: 'https', hostname: 'assets.st-note.com' },
      { protocol: 'https', hostname: 'd2l930y2yx77uc.cloudfront.net' },

      // 念のため（OGPなどで使われる可能性があるホスト）
      { protocol: 'https', hostname: 'note.com' },
      { protocol: 'https', hostname: 'ogp-cdn.note.jp' }
    ],
  },
};

module.exports = nextConfig;
