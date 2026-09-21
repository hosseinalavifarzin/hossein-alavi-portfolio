import { useEffect, useRef, useState, useCallback } from 'react';
import { HiX, HiRefresh } from 'react-icons/hi';

const DinoGame = ({ onClose }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('dinoHighScore') || '0');
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 700, height: 280 });
    
    const GROUND_Y = 235;
    const DINO_WIDTH = 60;
    const DINO_HEIGHT = 65;
    
    const gameRef = useRef({
        dino: { 
            x: 50, 
            y: GROUND_Y - DINO_HEIGHT, 
            width: DINO_WIDTH, 
            height: DINO_HEIGHT, 
            vy: 0, 
            jumping: false,
            runFrame: 0
        },
        obstacles: [],
        particles: [],
        stars: [],
        clouds: [],
        gravity: 0.65,
        jumpForce: -14,
        speed: 6,
        score: 0,
        frameCount: 0,
        animationFrame: null,
        isRunning: false,
        scale: 1
    });

    // Handle responsive canvas size
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const maxWidth = Math.min(containerWidth - 16, 700);
                const height = Math.round(maxWidth * 0.4); // 40% aspect ratio
                setCanvasSize({ width: maxWidth, height });
                gameRef.current.scale = maxWidth / 700;
            }
        };
        
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const stars = [];
        for (let i = 0; i < 50; i++) {
            stars.push({
                x: Math.random() * 700,
                y: Math.random() * 160,
                size: Math.random() * 2 + 0.3,
                twinkle: Math.random() * 100,
                brightness: Math.random() * 0.5 + 0.5
            });
        }
        const clouds = [];
        for (let i = 0; i < 3; i++) {
            clouds.push({
                x: i * 250 + Math.random() * 100,
                y: 30 + Math.random() * 50,
                width: 50 + Math.random() * 30,
                speed: 0.2 + Math.random() * 0.2
            });
        }
        gameRef.current.stars = stars;
        gameRef.current.clouds = clouds;
    }, []);

    const resetGame = useCallback(() => {
        const game = gameRef.current;
        game.dino = { 
            x: 50, 
            y: GROUND_Y - DINO_HEIGHT, 
            width: DINO_WIDTH, 
            height: DINO_HEIGHT, 
            vy: 0, 
            jumping: false,
            runFrame: 0
        };
        game.obstacles = [];
        game.particles = [];
        game.speed = 6;
        game.score = 0;
        game.frameCount = 0;
    }, []);

    const startGame = useCallback(() => {
        resetGame();
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        gameRef.current.isRunning = true;
    }, [resetGame]);

    const endGame = useCallback(() => {
        const game = gameRef.current;
        game.isRunning = false;
        
        for (let i = 0; i < 15; i++) {
            game.particles.push({
                x: game.dino.x + game.dino.width / 2,
                y: game.dino.y + game.dino.height / 2,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10 - 3,
                life: 30,
                size: Math.random() * 3 + 2,
                color: ['#22c55e', '#4ade80', '#06b6d4'][Math.floor(Math.random() * 3)]
            });
        }
        
        setIsPlaying(false);
        setGameOver(true);
        if (game.score > highScore) {
            setHighScore(game.score);
            localStorage.setItem('dinoHighScore', game.score.toString());
        }
    }, [highScore]);

    const jump = useCallback(() => {
        const game = gameRef.current;
        if (game.isRunning && !game.dino.jumping) {
            game.dino.vy = game.jumpForce;
            game.dino.jumping = true;
        }
        if (!isPlaying && !gameOver) startGame();
        if (gameOver) startGame();
    }, [isPlaying, gameOver, startGame]);

    // Keyboard events
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [jump]);

    // Touch events for mobile
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleTouch = (e) => {
            e.preventDefault();
            jump();
        };

        canvas.addEventListener('touchstart', handleTouch, { passive: false });
        return () => canvas.removeEventListener('touchstart', handleTouch);
    }, [jump]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const game = gameRef.current;

        const drawBackground = () => {
            const gradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
            gradient.addColorStop(0, '#050510');
            gradient.addColorStop(0.5, '#0a0a1a');
            gradient.addColorStop(1, '#181830');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 700, GROUND_Y);

            game.stars.forEach(star => {
                const twinkle = Math.sin((game.frameCount + star.twinkle) * 0.03) * 0.4 + 0.6;
                ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * star.brightness})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Simple moon
            ctx.fillStyle = '#e5e7eb';
            ctx.beginPath();
            ctx.arc(620, 50, 25, 0, Math.PI * 2);
            ctx.fill();

            game.clouds.forEach(cloud => {
                cloud.x -= cloud.speed;
                if (cloud.x + cloud.width < 0) cloud.x = 750;
                ctx.fillStyle = 'rgba(30, 30, 50, 0.5)';
                ctx.beginPath();
                ctx.ellipse(cloud.x, cloud.y, cloud.width * 0.4, 10, 0, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const drawDino = () => {
            const d = game.dino;
            const runCycle = Math.sin(game.frameCount * 0.35) * (d.jumping ? 0 : 1);
            
            ctx.save();
            
            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.ellipse(d.x + 30, GROUND_Y + 2, 25, 6, 0, 0, Math.PI * 2);
            ctx.fill();

            const bodyMain = '#22c55e';
            const bodyDark = '#15803d';
            const belly = '#a7f3d0';

            // Body
            ctx.fillStyle = bodyMain;
            ctx.beginPath();
            ctx.ellipse(d.x + 28, d.y + 40, 20, 16, 0, 0, Math.PI * 2);
            ctx.fill();

            // Belly
            ctx.fillStyle = belly;
            ctx.beginPath();
            ctx.ellipse(d.x + 32, d.y + 44, 10, 10, 0, 0, Math.PI);
            ctx.fill();

            // Legs
            const legOffset = runCycle * 6;
            ctx.fillStyle = bodyMain;
            ctx.fillRect(d.x + 15, d.y + 50, 8, 15 - legOffset);
            ctx.fillRect(d.x + 32, d.y + 50, 8, 15 + legOffset);

            // Tail
            ctx.beginPath();
            ctx.moveTo(d.x + 10, d.y + 38);
            ctx.quadraticCurveTo(d.x - 10, d.y + 32, d.x - 15, d.y + 35);
            ctx.quadraticCurveTo(d.x - 10, d.y + 42, d.x + 10, d.y + 45);
            ctx.fill();

            // Neck & Head
            ctx.beginPath();
            ctx.moveTo(d.x + 42, d.y + 30);
            ctx.lineTo(d.x + 52, d.y + 15);
            ctx.lineTo(d.x + 70, d.y + 10);
            ctx.lineTo(d.x + 72, d.y + 22);
            ctx.lineTo(d.x + 52, d.y + 28);
            ctx.closePath();
            ctx.fill();

            // Eye
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(d.x + 60, d.y + 15, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(d.x + 61, d.y + 15, 2, 0, Math.PI * 2);
            ctx.fill();

            // Spines
            ctx.fillStyle = bodyDark;
            [22, 30, 38].forEach(sx => {
                ctx.beginPath();
                ctx.moveTo(d.x + sx - 3, d.y + 28);
                ctx.lineTo(d.x + sx, d.y + 22);
                ctx.lineTo(d.x + sx + 3, d.y + 28);
                ctx.fill();
            });

            ctx.restore();
        };

        const drawCactus = (obs) => {
            ctx.save();
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.ellipse(obs.x + 15, GROUND_Y + 3, 15, 5, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#06b6d4';
            ctx.beginPath();
            ctx.roundRect(obs.x + 10, obs.y, 12, obs.height, 4);
            ctx.fill();

            ctx.beginPath();
            ctx.roundRect(obs.x, obs.y + 15, 12, 8, 3);
            ctx.roundRect(obs.x - 3, obs.y + 8, 8, 18, 3);
            ctx.fill();

            ctx.beginPath();
            ctx.roundRect(obs.x + 20, obs.y + 20, 12, 8, 3);
            ctx.roundRect(obs.x + 27, obs.y + 14, 8, 16, 3);
            ctx.fill();

            ctx.restore();
        };

        const drawGround = () => {
            ctx.fillStyle = '#292524';
            ctx.fillRect(0, GROUND_Y, 700, 280 - GROUND_Y);

            ctx.strokeStyle = '#57534e';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, GROUND_Y);
            ctx.lineTo(700, GROUND_Y);
            ctx.stroke();

            const offset = (game.frameCount * game.speed) % 60;
            ctx.fillStyle = '#57534e';
            for (let i = -60; i < 760; i += 60) {
                ctx.fillRect(i - offset, GROUND_Y + 8, 20, 2);
            }
        };

        const drawParticles = () => {
            for (let i = game.particles.length - 1; i >= 0; i--) {
                const p = game.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.4;
                p.life--;

                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / 30;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * (p.life / 30), 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;

                if (p.life <= 0) game.particles.splice(i, 1);
            }
        };

        const checkCollision = (obs) => {
            const d = game.dino;
            return (
                d.x + 15 < obs.x + obs.width - 5 &&
                d.x + d.width - 10 > obs.x + 5 &&
                d.y + 10 < obs.y + obs.height &&
                d.y + d.height - 5 > obs.y
            );
        };

        const gameLoop = () => {
            // Set canvas internal size
            canvas.width = 700;
            canvas.height = 280;
            
            ctx.clearRect(0, 0, 700, 280);
            
            drawBackground();
            drawGround();

            if (!game.isRunning) {
                game.dino.y = GROUND_Y - DINO_HEIGHT;
                drawDino();
                drawParticles();
                if (gameOver) {
                    game.animationFrame = requestAnimationFrame(gameLoop);
                }
                return;
            }

            game.dino.vy += game.gravity;
            game.dino.y += game.dino.vy;

            if (game.dino.y >= GROUND_Y - DINO_HEIGHT) {
                game.dino.y = GROUND_Y - DINO_HEIGHT;
                game.dino.vy = 0;
                game.dino.jumping = false;
            }

            drawDino();

            const spawnRate = Math.max(70, 100 - Math.floor(game.score / 15));
            if (game.frameCount % spawnRate === 0 && game.frameCount > 40) {
                const cactusHeight = 40 + Math.random() * 15;
                game.obstacles.push({
                    x: 700,
                    y: GROUND_Y - cactusHeight,
                    width: 32,
                    height: cactusHeight
                });
            }

            for (let i = game.obstacles.length - 1; i >= 0; i--) {
                const obs = game.obstacles[i];
                obs.x -= game.speed;
                drawCactus(obs);

                if (checkCollision(obs)) {
                    endGame();
                    return;
                }

                if (obs.x + obs.width < 0) {
                    game.obstacles.splice(i, 1);
                }
            }

            drawParticles();

            game.frameCount++;
            if (game.frameCount % 5 === 0) {
                game.score++;
                setScore(game.score);
            }

            if (game.score > 0 && game.score % 100 === 0 && game.speed < 12) {
                game.speed += 0.3;
            }

            game.animationFrame = requestAnimationFrame(gameLoop);
        };

        game.animationFrame = requestAnimationFrame(gameLoop);

        return () => {
            if (game.animationFrame) cancelAnimationFrame(game.animationFrame);
        };
    }, [isPlaying, gameOver, endGame, canvasSize]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4">
            <div ref={containerRef} className="bg-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-6 w-full max-w-3xl">
                {/* Header - Simplified for mobile */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <button onClick={onClose} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-white">
                        <HiX className="text-lg sm:text-xl" />
                    </button>
                    
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="text-center px-2 sm:px-3 py-1 bg-gray-800 rounded-lg">
                            <p className="text-[10px] sm:text-xs text-gray-500">BEST</p>
                            <p className="text-green-400 font-mono font-bold text-sm sm:text-lg">{highScore}</p>
                        </div>
                        <div className="text-center px-2 sm:px-3 py-1 bg-gray-800 rounded-lg">
                            <p className="text-[10px] sm:text-xs text-gray-500">SCORE</p>
                            <p className="text-white font-mono font-bold text-sm sm:text-lg">{score}</p>
                        </div>
                    </div>
                </div>

                {/* Game Canvas */}
                <div className="relative rounded-xl overflow-hidden bg-gray-800">
                    <canvas 
                        ref={canvasRef} 
                        style={{ width: '100%', height: 'auto', aspectRatio: '700/280' }}
                        className="block touch-none"
                        onClick={jump}
                    />

                    {/* Start Screen */}
                    {!isPlaying && !gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
                            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">🦖</div>
                            <p className="text-white text-lg sm:text-2xl font-bold mb-2">T-Rex Runner</p>
                            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 text-center px-4">
                                Tap screen or press SPACE to jump!
                            </p>
                            <button 
                                onClick={jump}
                                className="px-6 sm:px-8 py-2 sm:py-3 bg-green-500 text-white font-bold text-sm sm:text-base rounded-xl active:scale-95 transition-transform"
                            >
                                TAP TO START
                            </button>
                        </div>
                    )}

                    {/* Game Over Screen */}
                    {gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                            <p className="text-white text-2xl sm:text-3xl font-bold mb-2">GAME OVER</p>
                            <p className="text-cyan-400 text-3xl sm:text-4xl font-mono font-bold mb-3">{score}</p>
                            {score >= highScore && score > 0 && (
                                <p className="text-green-400 text-xs sm:text-sm font-bold mb-3 animate-pulse">🎉 NEW HIGH SCORE! 🎉</p>
                            )}
                            <button 
                                onClick={startGame}
                                className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-3 bg-green-500 text-white font-bold text-sm sm:text-base rounded-xl active:scale-95 transition-transform"
                            >
                                <HiRefresh className="text-lg" />
                                Play Again
                            </button>
                        </div>
                    )}
                </div>

                {/* Instructions - Hidden on mobile */}
                <p className="hidden sm:block mt-4 text-center text-gray-500 text-xs">
                    Press SPACE or tap the screen to jump
                </p>
            </div>
        </div>
    );
};

export default DinoGame;
