import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '个人AI作品集 - 古风韵味',
  description: '融合古典美学与现代技术的AI作品展示',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
