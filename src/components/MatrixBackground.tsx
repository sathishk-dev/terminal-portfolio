import { useEffect, useRef } from "react";

export default function MatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Characters for the matrix - binary codes
        const charset = "01";

        // Config
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        // Initialize drops - random initial y positions, leaving some columns empty
        for (let x = 0; x < columns; x++) {
            // Give a 60% chance for a column to have no drops ever by setting it to a special value (-9999)
            if (Math.random() < 0.6) {
                drops[x] = Math.random() * -100; // Start off screen
            } else {
                drops[x] = -9999; // Represents an empty column
            }
        }

        const draw = () => {
            // Semi-transparent black background to create trail effect
            // Increased opacity for the background slightly, to make trails fade faster, keeping the background darker overall
            ctx.fillStyle = "rgba(18, 24, 27, 0.1)"; // Using the background color roughly
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Light green text, slightly transparent
            ctx.fillStyle = "rgba(74, 222, 128, 0.2)"; // Tailwind's green-400 with 30% opacity
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Skip empty columns
                if (drops[i] === -9999) continue;

                // Random character
                const text = charset.charAt(Math.floor(Math.random() * charset.length));

                // Draw the character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly when it hits bottom
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 60); // ~30fps

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.8 }}
        />
    );
}
