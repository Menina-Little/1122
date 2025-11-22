// Vanta.js 初始化
let vantaEffect = null;

window.addEventListener('DOMContentLoaded', () => {
    // 初始化 Vanta.js 飞鸟背景
    if (window.VANTA && window.VANTA.BIRDS) {
        vantaEffect = VANTA.BIRDS({
            el: "#vanta-background",
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
        });
    }

    // 滚动动画
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-fade').forEach((el) => {
        observer.observe(el);
    });
});

// ========== 贪吃蛇游戏 ==========
const GRID_SIZE = 20;
const CELL_SIZE = 20;

let canvas, ctx;
let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];
let direction = { x: 1, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let speed = 150;
let gameLoop = null;
let isGameOver = false;
let isPaused = false;

// 打开游戏
function openGame() {
    const modal = document.getElementById('game-modal');
    modal.classList.add('active');

    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');

    resetGame();
}

// 关闭游戏
function closeGame() {
    const modal = document.getElementById('game-modal');
    modal.classList.remove('active');

    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
}

// 重置游戏
function resetGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    food = { x: 15, y: 15 };
    score = 0;
    speed = 150;
    isGameOver = false;
    isPaused = false;

    updateScore();
    updateSpeed();

    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('game-paused').classList.add('hidden');
    document.getElementById('pause-btn').textContent = '暂停';

    startGame();
}

// 开始游戏
function startGame() {
    if (gameLoop) {
        clearInterval(gameLoop);
    }

    gameLoop = setInterval(() => {
        if (!isGameOver && !isPaused) {
            moveSnake();
            drawGame();
        }
    }, speed);
}

// 暂停/继续游戏
function togglePause() {
    if (isGameOver) return;

    isPaused = !isPaused;
    const pausedDiv = document.getElementById('game-paused');
    const pauseBtn = document.getElementById('pause-btn');

    if (isPaused) {
        pausedDiv.classList.remove('hidden');
        pauseBtn.textContent = '继续';
    } else {
        pausedDiv.classList.add('hidden');
        pauseBtn.textContent = '暂停';
    }
}

// 移动蛇
function moveSnake() {
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // 检查墙壁碰撞
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        endGame();
        return;
    }

    // 检查自身碰撞
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    // 检查食物碰撞
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        generateFood();

        // 每50分增加速度
        if (score % 50 === 0 && speed > 50) {
            speed -= 20;
            updateSpeed();
            startGame(); // 重新启动游戏循环以应用新速度
        }
    } else {
        snake.pop();
    }
}

// 生成食物
function generateFood() {
    do {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

// 绘制游戏
function drawGame() {
    if (!ctx) return;

    // 清空画布
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制网格
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }

    // 绘制蛇
    snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(
            segment.x * CELL_SIZE,
            segment.y * CELL_SIZE,
            (segment.x + 1) * CELL_SIZE,
            (segment.y + 1) * CELL_SIZE
        );

        if (index === 0) {
            // 蛇头 - 亮金色
            gradient.addColorStop(0, '#FFD700');
            gradient.addColorStop(1, '#D4AF37');
        } else {
            // 蛇身 - 金色到红色渐变
            const ratio = index / snake.length;
            gradient.addColorStop(0, `rgba(212, 175, 55, ${1 - ratio * 0.5})`);
            gradient.addColorStop(1, `rgba(200, 16, 46, ${1 - ratio * 0.5})`);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
        );

        // 蛇头发光效果
        if (index === 0) {
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 10;
            ctx.fillRect(
                segment.x * CELL_SIZE + 1,
                segment.y * CELL_SIZE + 1,
                CELL_SIZE - 2,
                CELL_SIZE - 2
            );
            ctx.shadowBlur = 0;
        }
    });

    // 绘制食物
    const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
    ctx.shadowColor = '#00A86B';
    ctx.shadowBlur = 15 * pulse;
    ctx.fillStyle = '#00A86B';
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        (CELL_SIZE / 2 - 2) * pulse,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
}

// 结束游戏
function endGame() {
    isGameOver = true;
    clearInterval(gameLoop);

    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
    document.getElementById('pause-btn').disabled = true;
}

// 更新分数显示
function updateScore() {
    document.getElementById('score').textContent = score;
}

// 更新速度显示
function updateSpeed() {
    const speedLevel = Math.round((200 - speed) / 15);
    document.getElementById('speed').textContent = speedLevel;
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (!canvas || isGameOver) return;

    // 空格键暂停
    if (e.key === ' ') {
        e.preventDefault();
        togglePause();
        return;
    }

    let newDirection = direction;

    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) newDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) newDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) newDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) newDirection = { x: 1, y: 0 };
            break;
    }

    direction = newDirection;
});

// 触摸控制（移动端）
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    if (!canvas || isGameOver) return;

    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

document.addEventListener('touchend', (e) => {
    if (!canvas || isGameOver) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 横向滑动
        if (deltaX > 30 && direction.x === 0) {
            direction = { x: 1, y: 0 };
        } else if (deltaX < -30 && direction.x === 0) {
            direction = { x: -1, y: 0 };
        }
    } else {
        // 纵向滑动
        if (deltaY > 30 && direction.y === 0) {
            direction = { x: 0, y: 1 };
        } else if (deltaY < -30 && direction.y === 0) {
            direction = { x: 0, y: -1 };
        }
    }
});
