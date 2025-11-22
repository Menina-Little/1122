'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Position {
  x: number
  y: number
}

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
]
const INITIAL_DIRECTION: Position = { x: 1, y: 0 }

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION)
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(150)
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const directionRef = useRef<Position>(INITIAL_DIRECTION)

  // Generate random food position
  const generateFood = useCallback((): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (
      snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    )
    return newFood
  }, [snake])

  // Reset game
  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setFood({ x: 15, y: 15 })
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
    setSpeed(150)
  }

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return

      if (e.key === ' ') {
        e.preventDefault()
        setIsPaused((prev) => !prev)
        return
      }

      const currentDir = directionRef.current
      let newDirection = currentDir

      switch (e.key) {
        case 'ArrowUp':
          if (currentDir.y === 0) newDirection = { x: 0, y: -1 }
          break
        case 'ArrowDown':
          if (currentDir.y === 0) newDirection = { x: 0, y: 1 }
          break
        case 'ArrowLeft':
          if (currentDir.x === 0) newDirection = { x: -1, y: 0 }
          break
        case 'ArrowRight':
          if (currentDir.x === 0) newDirection = { x: 1, y: 0 }
          break
      }

      if (newDirection !== currentDir) {
        directionRef.current = newDirection
        setDirection(newDirection)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameOver])

  // Mobile touch controls
  const [touchStart, setTouchStart] = useState<Position | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || gameOver) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y
    const currentDir = directionRef.current

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 30 && currentDir.x === 0) {
        directionRef.current = { x: 1, y: 0 }
        setDirection({ x: 1, y: 0 })
      } else if (deltaX < -30 && currentDir.x === 0) {
        directionRef.current = { x: -1, y: 0 }
        setDirection({ x: -1, y: 0 })
      }
    } else {
      // Vertical swipe
      if (deltaY > 30 && currentDir.y === 0) {
        directionRef.current = { x: 0, y: 1 }
        setDirection({ x: 0, y: 1 })
      } else if (deltaY < -30 && currentDir.y === 0) {
        directionRef.current = { x: 0, y: -1 }
        setDirection({ x: 0, y: -1 })
      }
    }

    setTouchStart(null)
  }

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0]
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        }

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true)
          return prevSnake
        }

        // Check self collision
        if (
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(generateFood())
          setScore((prev) => {
            const newScore = prev + 10
            // Increase speed every 50 points
            if (newScore % 50 === 0 && speed > 50) {
              setSpeed((s) => s - 20)
            }
            return newScore
          })
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    gameLoopRef.current = setInterval(moveSnake, speed)
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameOver, isPaused, food, generateFood, speed])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const gradient = ctx.createLinearGradient(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        (segment.x + 1) * CELL_SIZE,
        (segment.y + 1) * CELL_SIZE
      )

      if (index === 0) {
        // Head - brighter gold
        gradient.addColorStop(0, '#FFD700')
        gradient.addColorStop(1, '#D4AF37')
      } else {
        // Body - gradient from gold to red
        const ratio = index / snake.length
        gradient.addColorStop(0, `rgba(212, 175, 55, ${1 - ratio * 0.5})`)
        gradient.addColorStop(1, `rgba(200, 16, 46, ${1 - ratio * 0.5})`)
      }

      ctx.fillStyle = gradient
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      )

      // Add glow effect to head
      if (index === 0) {
        ctx.shadowColor = '#FFD700'
        ctx.shadowBlur = 10
        ctx.fillRect(
          segment.x * CELL_SIZE + 1,
          segment.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        )
        ctx.shadowBlur = 0
      }
    })

    // Draw food with animation
    const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7
    ctx.shadowColor = '#00A86B'
    ctx.shadowBlur = 15 * pulse
    ctx.fillStyle = '#00A86B'
    ctx.beginPath()
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      (CELL_SIZE / 2 - 2) * pulse,
      0,
      Math.PI * 2
    )
    ctx.fill()
    ctx.shadowBlur = 0
  }, [snake, food])

  return (
    <div className="bg-black/90 backdrop-blur-md rounded-lg p-6 ancient-border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-ancient-gold">贪吃蛇</h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-ancient-gold">
            得分: {score}
          </div>
          <div className="text-sm text-gray-400">
            速度: {Math.round((200 - speed) / 15)}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="border-2 border-ancient-gold rounded-lg shadow-lg shadow-ancient-gold/30"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {gameOver && (
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-ancient-red mb-2 animate-pulse">
            游戏结束！
          </div>
          <div className="text-lg text-ancient-gold">
            最终得分: {score}
          </div>
        </div>
      )}

      {isPaused && !gameOver && (
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-ancient-gold animate-pulse">
            暂停中
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center mb-4">
        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-ancient-gold to-ancient-red text-white font-bold py-2 px-6 rounded-lg hover:scale-105 transition-transform shadow-lg"
        >
          {gameOver ? '重新开始' : '重置游戏'}
        </button>
        {!gameOver && (
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="bg-ancient-jade text-white font-bold py-2 px-6 rounded-lg hover:scale-105 transition-transform shadow-lg"
          >
            {isPaused ? '继续' : '暂停'}
          </button>
        )}
      </div>

      <div className="text-center text-sm text-gray-400 space-y-1">
        <p>💻 电脑: 使用方向键控制 · 空格键暂停</p>
        <p>📱 手机: 在画布上滑动控制方向</p>
        <p>🎯 目标: 吃掉绿色食物获得分数</p>
      </div>
    </div>
  )
}
