'use client'

import { useEffect, useRef, useState } from 'react'
import SnakeGame from '@/components/SnakeGame'

export default function Home() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const effect = (window as any).VANTA.BIRDS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x1a1a1a,
        color1: 0xd4af37,
        color2: 0xc8102e,
        colorMode: 'lerp',
        birdSize: 1.2,
        wingSpan: 20.00,
        speedLimit: 5.00,
        separation: 50.00,
        alignment: 50.00,
        cohesion: 50.00,
        quantity: 3.00,
      })
      setVantaEffect(effect)
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-fade').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={vantaRef} className="min-h-screen relative">
      {/* Header */}
      <header className="relative z-10 p-8 text-center">
        <div className="scroll-fade">
          <h1
            className="text-6xl md:text-8xl font-bold mb-4 gradient-text glitch-effect"
            data-text="AI作品集"
          >
            AI作品集
          </h1>
          <p className="text-xl md:text-2xl text-ancient-gold mb-2">
            ✦ 古韵今声 · 智慧织梦 ✦
          </p>
          <p className="text-sm md:text-base text-gray-400">
            融合传统美学与人工智能的数字艺术空间
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Snake Game Card */}
          <div className="scroll-fade card-glow bg-black/50 backdrop-blur-md rounded-lg p-6 ancient-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-ancient-gold">🐍 贪吃蛇</h3>
              <span className="text-xs bg-ancient-red/20 text-ancient-red px-3 py-1 rounded-full border border-ancient-red">
                经典游戏
              </span>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              传统游戏的现代演绎，操控灵蛇穿梭于数字世界，挑战你的反应与策略。
            </p>
            <div className="space-y-2 text-xs text-gray-400 mb-4">
              <p>🎮 使用方向键控制</p>
              <p>🏆 吃掉食物获得分数</p>
              <p>⚡ 速度随分数递增</p>
            </div>
            <button
              onClick={() => setShowGame(true)}
              className="w-full bg-gradient-to-r from-ancient-gold to-ancient-red text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-ancient-gold/50"
            >
              开始游戏
            </button>
          </div>

          {/* Placeholder Cards for Future Projects */}
          <div className="scroll-fade card-glow bg-black/50 backdrop-blur-md rounded-lg p-6 ancient-border opacity-60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-ancient-jade">🎨 AI绘画</h3>
              <span className="text-xs bg-ancient-jade/20 text-ancient-jade px-3 py-1 rounded-full border border-ancient-jade">
                敬请期待
              </span>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              以AI之笔，绘千山万水，描绘东方意境之美。
            </p>
            <div className="space-y-2 text-xs text-gray-400 mb-4">
              <p>🖌️ 水墨风格生成</p>
              <p>🌸 古风人物创作</p>
              <p>🏔️ 山水画智能绘制</p>
            </div>
            <button
              disabled
              className="w-full bg-gray-600 text-gray-400 font-bold py-3 px-6 rounded-lg cursor-not-allowed"
            >
              即将推出
            </button>
          </div>

          <div className="scroll-fade card-glow bg-black/50 backdrop-blur-md rounded-lg p-6 ancient-border opacity-60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-blue-400">📝 AI诗词</h3>
              <span className="text-xs bg-blue-400/20 text-blue-400 px-3 py-1 rounded-full border border-blue-400">
                敬请期待
              </span>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              以AI悟禅机，承千年诗韵，作当代华章。
            </p>
            <div className="space-y-2 text-xs text-gray-400 mb-4">
              <p>📜 自动生成古诗词</p>
              <p>🎭 多种诗词体裁</p>
              <p>✨ 意境智能匹配</p>
            </div>
            <button
              disabled
              className="w-full bg-gray-600 text-gray-400 font-bold py-3 px-6 rounded-lg cursor-not-allowed"
            >
              即将推出
            </button>
          </div>

        </div>

        {/* About Section */}
        <div className="scroll-fade mt-16 max-w-4xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 ancient-border">
            <h2 className="text-3xl font-bold text-ancient-gold mb-4">关于此作品集</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              这是一个将中国传统美学与现代AI技术完美融合的数字作品集。
              在这里，古典与未来交织，传统与创新共舞。
            </p>
            <p className="text-sm text-gray-400">
              采用 Next.js + Vanta.js 打造，支持响应式设计，完美适配各种设备
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm">
        <p>© 2025 AI作品集 · 匠心独运 · 技艺传承</p>
      </footer>

      {/* Snake Game Modal */}
      {showGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-4">
            <button
              onClick={() => setShowGame(false)}
              className="absolute -top-12 right-0 text-white hover:text-ancient-gold text-4xl transition-colors"
            >
              ✕
            </button>
            <SnakeGame />
          </div>
        </div>
      )}
    </div>
  )
}
