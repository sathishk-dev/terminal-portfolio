import { useEffect, useRef } from 'react';

export default function MatrixCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full screen
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix characters
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]|;:<>?,./~';
        const charArray = chars.split('');

        const fontSize = 14;
        const columns = canvas.width / fontSize;

        // Array of drops - one per column
        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        // Draw function
        const draw = () => {
            // Create a semi-transparent black background to create fading effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set text color and font
            ctx.fillStyle = '#0F0'; // Terminal green for the matrix
            ctx.font = fontSize + 'px monospace';

            // Loop over drops
            for (let i = 0; i < drops.length; i++) {
                // Pick a random char
                const text = charArray[Math.floor(Math.random() * charArray.length)];

                // Draw the char
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i]++;
            }
        };

        // run animation
        const interval = setInterval(draw, 33);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-20 transition-opacity duration-1000"
        />
    );
}
