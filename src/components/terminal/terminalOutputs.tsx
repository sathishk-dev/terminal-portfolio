import { profile, projects, education, certifications, experience, skills, type Project } from "./terminalData";
import { useEffect, useState, useRef, useCallback } from "react";
import { PathSegment } from "../Terminal";

const Flicker = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div className="terminal-flicker" style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

export const helpOutput = () => (
  <Flicker>
    <div className="space-y-1 pl-2">
      <p className="text-terminal-accent font-bold">Available Commands:</p>
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-sm">
        <span className="text-terminal-green">project</span>
        <span className="text-foreground/70">View portfolio projects</span>
        <span className="text-terminal-green">cd &lt;project-id&gt;</span>
        <span className="text-foreground/70">View detailed project info</span>
        <span className="text-terminal-green">whoami / about</span>
        <span className="text-foreground/70">Display bio & contact info</span>
        <span className="text-terminal-green">ls</span>
        <span className="text-foreground/70">List directory contents</span>
        <span className="text-terminal-green">history</span>
        <span className="text-foreground/70">View command history</span>
        <span className="text-terminal-green">time</span>
        <span className="text-foreground/70">Show current date and time</span>
        <span className="text-terminal-green">neofetch</span>
        <span className="text-foreground/70">Display system information</span>
        <span className="text-terminal-green">ping &lt;host&gt;</span>
        <span className="text-foreground/70">Simulate network ping to a host</span>
        <span className="text-terminal-green">sudo &lt;command&gt;</span>
        <span className="text-foreground/70">Execute a command as superuser</span>
        <span className="text-terminal-green">play tictactoe</span>
        <span className="text-foreground/70">Play a game of Tic-Tac-Toe</span>
        <span className="text-terminal-green">play snake</span>
        <span className="text-foreground/70">Play the classic Snake game</span>
        <span className="text-terminal-green">tree</span>
        <span className="text-foreground/70">List contents of directories in a tree-like format</span>
        <span className="text-terminal-green">contact</span>
        <span className="text-foreground/70">Send a direct message via CLI</span>
        <span className="text-terminal-green">skills</span>
        <span className="text-foreground/70">View technical skills</span>
        <span className="text-terminal-green">education</span>
        <span className="text-foreground/70">Academic background</span>
        <span className="text-terminal-green">experience</span>
        <span className="text-foreground/70">Professional work history</span>
        <span className="text-terminal-green">back</span>
        <span className="text-foreground/70">Go back to previous view</span>
        <span className="text-terminal-green">theme &lt;name&gt;</span>
        <span className="text-foreground/70">Change terminal theme (e.g. dracula)</span>
        <span className="text-terminal-green">clear</span>
        <span className="text-foreground/70">Reset terminal to home</span>
      </div>
    </div>
  </Flicker>
);

export const defaultHelpOutput = () => (
  <Flicker>
    <div className="space-y-1 pl-2">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-sm">
        <span className="text-terminal-green">/help</span>
        <span className="text-foreground/70">Show all available commands</span>
        <span className="text-terminal-green">whoami</span>
        <span className="text-foreground/70">Display bio & contact info</span>
        <span className="text-terminal-green">project</span>
        <span className="text-foreground/70">View portfolio projects</span>
        <span className="text-terminal-green">skills</span>
        <span className="text-foreground/70">View technical skills</span>
        <span className="text-terminal-green">ls</span>
        <span className="text-foreground/70">List directory contents</span>
      </div>
    </div>
  </Flicker>
);

export const themesOutput = () => (
  <Flicker>
    <div className="space-y-1 pl-2">
      <p className="text-terminal-accent font-bold">Available Themes:</p>
      <div className="flex gap-4 text-sm mt-2">
        <span className="text-terminal-cyan">default</span>
        <span className="text-terminal-cyan">dracula</span>
        <span className="text-terminal-cyan">hacker</span>
        <span className="text-terminal-cyan">light</span>
      </div>
      <p className="text-foreground/50 text-xs mt-2">Usage: <span className="text-terminal-green">theme dracula</span></p>
    </div>
  </Flicker>
);

const ProgressBar = ({ percent, label }: { percent: number; label: string }) => {
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPercent(percent);
    }, 100);
    return () => clearTimeout(timer);
  }, [percent]);

  const totalBlocks = 20;
  const filledBlocks = Math.round((currentPercent / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;

  const bar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 my-1.5 font-mono text-xs sm:text-sm">
      <span className="w-40 truncate text-terminal-cyan">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-terminal-green transition-all duration-1000 ease-out">[{bar}]</span>
        <span className="text-terminal-yellow w-10 text-right">{currentPercent}%</span>
      </div>
    </div>
  );
};

export const skillsOutput = () => (
  <div className="space-y-2 pl-2">
    <Flicker><p className="text-terminal-accent font-bold">~/skills</p></Flicker>
    <div className="border border-border rounded-md p-4 bg-secondary/30 relative terminal-scanline overflow-hidden mt-2">
      {skills.map((s, i) => (
        <Flicker key={s.name} delay={i * 150}>
          <ProgressBar percent={s.percent} label={s.name} />
        </Flicker>
      ))}
    </div>
  </div>
);

export const projectsOutput = () => (
  <div className="space-y-3 pl-2">
    <Flicker>
      <p className="text-terminal-accent font-bold">~/projects</p>
      <p className="text-foreground/50 text-xs mt-1">Use <span className="text-terminal-green">cd &lt;project-id&gt;</span> for details</p>
    </Flicker>
    {projects.map((p, i) => (
      <Flicker key={p.id} delay={i * 80}>
        <div className="border border-border rounded-md p-3 bg-secondary/30 relative terminal-scanline overflow-hidden">
          <p className="text-terminal-cyan font-bold text-sm">{p.name} <span className="text-terminal-muted text-xs font-normal">({p.id})</span></p>
          <p className="text-terminal-magenta text-xs mt-0.5">{p.tech}</p>
          <p className="text-foreground/60 text-xs mt-1">{p.desc}</p>
        </div>
      </Flicker>
    ))}
  </div>
);

export const projectDetailOutput = (project: Project) => (
  <Flicker>
    <div className="space-y-2 pl-2">
      <p className="text-terminal-accent font-bold">~/projects/{project.id}</p>
      <div className="border border-border rounded-md p-4 bg-secondary/30 relative terminal-scanline overflow-hidden space-y-3">
        <div>
          <p className="text-terminal-cyan font-bold">{project.name}</p>
          <p className="text-terminal-magenta text-xs mt-0.5">{project.tech}</p>
        </div>
        <p className="text-foreground/70 text-sm">{project.details}</p>
        <div>
          <p className="text-terminal-yellow text-xs font-bold mb-1">Features:</p>
          <ul className="text-foreground/60 text-xs space-y-0.5">
            {project.features.map((f) => (
              <li key={f} className="flex gap-1.5">
                <span className="text-terminal-green">▸</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs">
          <span className="text-terminal-muted">Link: </span>
          <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline cursor-pointer">
            {project.link}
          </a>
        </div>
      </div>
      <p className="text-foreground/50 text-xs">Type <span className="text-terminal-green">back</span> or <span className="text-terminal-green">cd ..</span> to return</p>
    </div>
  </Flicker>
);

export const infoOutput = () => (
  <Flicker>
    <div className="space-y-2 pl-2">
      <p className="text-terminal-accent font-bold">~/about</p>
      <div className="border border-border rounded-md p-4 bg-secondary/30 relative terminal-scanline overflow-hidden space-y-2">
        <p className="text-terminal-cyan font-bold">{profile?.name}</p>
        <p className="text-foreground/70 text-sm">
          {profile?.bio}
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm mt-3">
          <span className="text-terminal-muted">Email</span>
          <a href={`mailto:${profile?.email}`} className="text-terminal-blue hover:underline cursor-pointer">{profile?.email}</a>
          <span className="text-terminal-muted">GitHub</span>
          <a href={`https://${profile?.github}`} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline cursor-pointer">{profile?.github}</a>
          <span className="text-terminal-muted">LinkedIn</span>
          <a href={`https://${profile?.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline cursor-pointer">{profile?.linkedin}</a>
          <span className="text-terminal-muted">Location</span>
          <span className="text-foreground/70">{profile?.location}</span>
        </div>
      </div>
    </div>
  </Flicker>
);

export const educationOutput = () => (
  <div className="space-y-2 pl-2">
    <Flicker><p className="text-terminal-accent font-bold">~/education</p></Flicker>
    {education.map((e, i) => (
      <Flicker key={e.degree} delay={i * 100}>
        <div className="border border-border rounded-md p-3 bg-secondary/30 relative terminal-scanline overflow-hidden">
          <p className="text-terminal-cyan font-bold text-sm">{e.degree}</p>
          <p className="text-terminal-yellow text-xs">{e.school}</p>
          <p className="text-terminal-muted text-xs">{e.year}</p>
          <p className="text-foreground/60 text-xs mt-1">{e.focus}</p>
        </div>
      </Flicker>
    ))}
    <Flicker delay={200}>
      <div className="border border-border rounded-md p-3 bg-secondary/30 relative terminal-scanline overflow-hidden">
        <p className="text-terminal-cyan font-bold text-sm">Certifications</p>
        <ul className="text-foreground/60 text-xs mt-1 space-y-0.5 list-disc list-inside">
          {certifications.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>
    </Flicker>
  </div>
);

export const experienceOutput = () => (
  <div className="space-y-2 pl-2">
    <Flicker><p className="text-terminal-accent font-bold">~/experience</p></Flicker>
    {experience.map((e, i) => (
      <Flicker key={e.role + e.company} delay={i * 100}>
        <div className="border border-border rounded-md p-3 bg-secondary/30 relative terminal-scanline overflow-hidden">
          <p className="text-terminal-cyan font-bold text-sm">{e.role}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-terminal-yellow text-xs">{e.company}</span>
            <span className="text-terminal-muted text-xs">·</span>
            <span className="text-terminal-muted text-xs">{e.period}</span>
          </div>
          <ul className="text-foreground/60 text-xs mt-1.5 space-y-0.5">
            {e.highlights.map((h) => (
              <li key={h} className="flex gap-1.5">
                <span className="text-terminal-green">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </Flicker>
    ))}
  </div>
);

export const lsOutput = (path: string[]) => {
  const getDirContents = () => {
    if (path.length === 0) {
      return (
        <div className="flex flex-wrap gap-4 text-sm pl-2">
          <span className="text-terminal-blue font-bold">projects/</span>
          <span className="text-foreground/80">about.txt</span>
          <span className="text-foreground/80">skills.txt</span>
          <span className="text-foreground/80">education.txt</span>
          <span className="text-foreground/80">experience.txt</span>
        </div>
      );
    }

    if (path[0] === "projects" && path.length === 1) {
      const categories = Array.from(new Set(projects.map(p => p.category)));
      return (
        <div className="flex flex-wrap gap-4 text-sm pl-2">
          {categories.map(c => (
            <span key={c} className="text-terminal-blue font-bold">{c}/</span>
          ))}
        </div>
      );
    }

    if (path[0] === "projects" && path.length === 2) {
      const catProjects = projects.filter(p => p.category === path[1]);
      return (
        <div className="flex flex-wrap gap-4 text-sm pl-2">
          {catProjects.map(p => (
            <span key={p.id} className="text-terminal-green font-bold text-xs">{p.id}</span>
          ))}
        </div>
      );
    }

    return <p className="text-terminal-muted text-sm pl-2">Directory is empty or not found.</p>;
  };

  return <Flicker>{getDirContents()}</Flicker>;
};

export const historyOutput = (commandHistory: string[]) => {
  // We reverse it back to chronological order for display
  const chronologicalHistory = [...commandHistory].reverse();

  return (
    <div className="space-y-1 pl-2 text-sm text-foreground/80 font-mono">
      {chronologicalHistory.length === 0 ? (
        <p className="text-terminal-muted">No commands in history.</p>
      ) : (
        chronologicalHistory.map((cmd, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-terminal-muted w-6 text-right select-none">{i + 1}</span>
            <span className="text-terminal-cyan">{cmd}</span>
          </div>
        ))
      )}
    </div>
  );
};

export const timeOutput = () => {
  const now = new Date();
  const dateString = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeString = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' });

  return (
    <Flicker>
      <div className="pl-2 space-y-1 font-mono text-sm max-w-sm">
        <div className="border border-border rounded-md p-4 bg-secondary/30 text-center terminal-scanline shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <p className="text-terminal-cyan font-bold text-lg mb-2">{timeString}</p>
          <p className="text-foreground/80">{dateString}</p>
        </div>
      </div>
    </Flicker>
  );
};

export const neofetchOutput = () => {
  return (
    <Flicker>
      <div className="flex flex-col sm:flex-row gap-6 pl-2 font-mono text-xs sm:text-sm">
        <div className="text-terminal-accent select-none font-bold whitespace-pre leading-tight">
          {`       .
      .o.
     .o°o.
    .o°°°o.
   .o°°°°°o.
  .o°°°°°°°o.
 .o°°°°°°°°°o.
.o°°°°°°°°°°°o.
 °°°°°°°°°°°°°
    |_|  |_|  `}
        </div>
        <div className="flex flex-col justify-center space-y-1">
          <p><span className="text-terminal-cyan font-bold">visitor</span><span className="text-foreground/80">@</span><span className="text-terminal-green font-bold">terminal-portfolio</span></p>
          <p className="text-terminal-muted">-------------------------</p>
          <p><span className="text-terminal-blue font-bold">OS</span>: Web OS (Browser)</p>
          <p><span className="text-terminal-blue font-bold">Host</span>: Vercel / Netlify Local</p>
          <p><span className="text-terminal-blue font-bold">Kernel</span>: React 18</p>
          <p><span className="text-terminal-blue font-bold">Uptime</span>: Just woke up</p>
          <p><span className="text-terminal-blue font-bold">Packages</span>: 42 (npm)</p>
          <p><span className="text-terminal-blue font-bold">Shell</span>: zsh-react</p>
          <p><span className="text-terminal-blue font-bold">Resolution</span>: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '1920x1080'}</p>
          <p><span className="text-terminal-blue font-bold">UI</span>: Tailwind CSS Terminal Theme</p>
          <p><span className="text-terminal-blue font-bold">CPU</span>: Intel Core i9 (WebAssembly bounds)</p>
          <p><span className="text-terminal-blue font-bold">Memory</span>: 1024MB / 16384MB</p>
          <div className="flex gap-2 mt-2">
            <div className="w-3 h-3 bg-terminal-red"></div>
            <div className="w-3 h-3 bg-terminal-green"></div>
            <div className="w-3 h-3 bg-terminal-yellow"></div>
            <div className="w-3 h-3 bg-terminal-blue"></div>
            <div className="w-3 h-3 bg-terminal-accent"></div>
            <div className="w-3 h-3 bg-terminal-cyan"></div>
            <div className="w-3 h-3 bg-[#ffffff]"></div>
          </div>
        </div>
      </div>
    </Flicker>
  );
};

export const PingOutput = ({ host }: { host: string }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const defaultHost = host || "github.com";
    const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

    setLines([`PING ${defaultHost} (${ip}): 56 data bytes`]);

    let count = 0;
    const interval = setInterval(() => {
      count++;
      const time = (Math.random() * 50 + 10).toFixed(3);
      setLines(prev => [...prev, `64 bytes from ${ip}: icmp_seq=${count - 1} ttl=116 time=${time} ms`]);

      if (count >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          setLines(prev => [
            ...prev,
            `--- ${defaultHost} ping statistics ---`,
            `4 packets transmitted, 4 packets received, 0.0% packet loss`,
            `round-trip min/avg/max/stddev = 12.345/35.210/68.912/15.234 ms`
          ]);
          setIsDone(true);
        }, 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [host]);

  return (
    <div className="space-y-1 pl-2 font-mono text-sm text-foreground/80">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
      {!isDone && <span className="animate-pulse">_</span>}
    </div>
  );
};

export const TicTacToeOutput = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "Draw!"
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const renderSquare = (i: number) => (
    <button
      className="w-12 h-12 border border-terminal-green/50 text-xl font-bold flex items-center justify-center hover:bg-terminal-green/20 transition-colors"
      onClick={() => handleClick(i)}
    >
      <span className={board[i] === 'X' ? 'text-terminal-cyan' : 'text-terminal-yellow'}>
        {board[i]}
      </span>
    </button>
  );

  return (
    <div className="pl-2 my-2 font-mono">
      <p className="text-terminal-muted mb-2 text-sm">{status}</p>
      <div className="inline-block border-2 border-terminal-green/80 p-0.5 bg-secondary/30">
        <div className="flex">
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        </div>
        <div className="flex">
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        </div>
        <div className="flex">
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        </div>
      </div>
      {(winner || isDraw) && (
        <button
          className="block mt-4 text-xs bg-terminal-green/20 text-terminal-green px-3 py-1 hover:bg-terminal-green/40 transition-colors border border-terminal-green/50"
          onClick={() => { setBoard(Array(9).fill(null)); setXIsNext(true); }}
        >
          [ Play Again ]
        </button>
      )}
    </div>
  );
};

export const SnakeGameOutput = () => {
  const GRID_SIZE = 15;
  const GAME_SPEED = 300; // Milliseconds per frame. Higher = Slower, Lower = Faster
  const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
  const [food, setFood] = useState({ x: 10, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const dirRef = useRef({ x: 0, y: -1 });
  const lastDirRef = useRef({ x: 0, y: -1 });

  const startGame = () => {
    setSnake([{ x: 7, y: 7 }]);
    setFood({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    });
    dirRef.current = { x: 0, y: -1 };
    lastDirRef.current = { x: 0, y: -1 };
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSnake(prev => {
        const head = prev[0];
        const currentDir = dirRef.current;
        lastDirRef.current = currentDir;

        const newHead = { x: head.x + currentDir.x, y: head.y + currentDir.y };

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE ||
          prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);

          let newFood;
          while (true) {
            newFood = {
              x: Math.floor(Math.random() * GRID_SIZE),
              y: Math.floor(Math.random() * GRID_SIZE)
            };
            if (!newSnake.some(s => s.x === newFood.x && s.y === newFood.y)) break;
          }
          setFood(newFood);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, GAME_SPEED);
    return () => clearInterval(interval);
  }, [isPlaying, food]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp': changeDir(0, -1); break;
        case 'ArrowDown': changeDir(0, 1); break;
        case 'ArrowLeft': changeDir(-1, 0); break;
        case 'ArrowRight': changeDir(1, 0); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const changeDir = (dx: number, dy: number) => {
    const p = lastDirRef.current;
    if (p.x === -dx && p.y === -dy) return;
    dirRef.current = { x: dx, y: dy };
  };

  const grid = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    const cols = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      const isSnake = snake.some(s => s.x === col && s.y === row);
      const isHead = snake[0].x === col && snake[0].y === row;
      const isFood = food.x === col && food.y === row;

      let cellClass = "w-3 h-3 sm:w-4 sm:h-4 ";
      if (isHead) cellClass += "bg-terminal-cyan";
      else if (isSnake) cellClass += "bg-terminal-green";
      else if (isFood) cellClass += "bg-terminal-red";
      else cellClass += "bg-secondary/20";

      cols.push(<div key={`${col}-${row}`} className={cellClass} />);
    }
    grid.push(<div key={row} className="flex">{cols}</div>);
  }

  return (
    <div className="pl-2 my-2 font-mono flex flex-col items-start gap-4">
      <div className="relative">
        <div className="flex justify-between items-end mb-2">
          <span className="text-terminal-muted">Score: <span className="text-terminal-cyan">{score}</span></span>
          {(gameOver || !isPlaying) && (
            <button
              onClick={startGame}
              className="text-xs bg-terminal-green/20 text-terminal-green px-2 py-1 hover:bg-terminal-green/40 border border-terminal-green/50 transition-colors"
            >
              {gameOver ? '[ Play Again ]' : '[ Start Game ]'}
            </button>
          )}
        </div>
        <div className="border-2 border-terminal-green/50 p-1 bg-secondary/10 relative shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          {grid}
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10 border border-terminal-red">
              <span className="text-terminal-red font-bold text-lg animate-pulse">GAME OVER</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 w-[200px] mb-2 select-none">
        <button
          onClick={() => changeDir(0, -1)}
          className="w-10 h-10 bg-secondary/30 border border-border flex items-center justify-center text-terminal-green hover:bg-terminal-green/20 active:bg-terminal-green/40 transition-colors"
        >
          ▲
        </button>
        <div className="flex gap-1">
          <button
            onClick={() => changeDir(-1, 0)}
            className="w-10 h-10 bg-secondary/30 border border-border flex items-center justify-center text-terminal-green hover:bg-terminal-green/20 active:bg-terminal-green/40 transition-colors"
          >
            ◀
          </button>
          <button
            onClick={() => changeDir(0, 1)}
            className="w-10 h-10 bg-secondary/30 border border-border flex items-center justify-center text-terminal-green hover:bg-terminal-green/20 active:bg-terminal-green/40 transition-colors"
          >
            ▼
          </button>
          <button
            onClick={() => changeDir(1, 0)}
            className="w-10 h-10 bg-secondary/30 border border-border flex items-center justify-center text-terminal-green hover:bg-terminal-green/20 active:bg-terminal-green/40 transition-colors"
          >
            ▶
          </button>
        </div>
        <p className="text-[10px] text-terminal-muted mt-2 text-center">Use arrows or D-pad</p>
      </div>
    </div>
  );
};

export const treeOutput = () => {
  return (
    <div className="pl-2 space-y-0.5 font-mono text-sm text-foreground/80">
      <div>.</div>
      <div>├── <span className="text-terminal-cyan">about.txt</span></div>
      <div>├── <span className="text-terminal-cyan">skills.txt</span></div>
      <div>├── <span className="text-terminal-cyan">education.txt</span></div>
      <div>├── <span className="text-terminal-cyan">experience.txt</span></div>
      <div>└── <span className="text-terminal-blue font-bold">projects/</span></div>
      <div>    ├── <span className="text-terminal-blue font-bold">web/</span></div>
      <div>    │   ├── <span className="text-terminal-cyan">ecommerce.md</span></div>
      <div>    │   ├── <span className="text-terminal-cyan">portfolio.md</span></div>
      <div>    │   └── <span className="text-terminal-cyan">dashboard.md</span></div>
      <div>    ├── <span className="text-terminal-blue font-bold">cli/</span></div>
      <div>    │   └── <span className="text-terminal-cyan">terminal-app.md</span></div>
      <div>    └── <span className="text-terminal-blue font-bold">infra/</span></div>
      <div>        └── <span className="text-terminal-cyan">aws-scripts.md</span></div>
    </div>
  );
};

export const ContactFormOutput = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [closed, setClosed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!closed && step < 3 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step, closed]);

  const handleClose = useCallback(() => {
    setClosed(true);
    onClose();
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (closed) return;
    const val = inputVal.trim().toLowerCase();
    if (val === "exit" || val === "quit") {
      handleClose();
      return;
    }
    if (!inputVal.trim()) return;

    if (step === 0) {
      setName(inputVal);
      setStep(1);
      setInputVal("");
    } else if (step === 1) {
      setEmail(inputVal);
      setStep(2);
      setInputVal("");
    } else if (step === 2) {
      setMessage(inputVal);
      setStep(3); // Start sending
      setInputVal("");

      try {
        const formspreeId = import.meta.env.VITE_FORMSPREE_ID || "movqlaba";
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, email, message: inputVal }),
        });

        if (response.ok) {
          setStep(4);
          setTimeout(handleClose, 2000);
        } else {
          setStep(5);
          setTimeout(handleClose, 2000);
        }
      } catch (error) {
        setStep(5);
        setTimeout(handleClose, 2000);
      }
    }
  };

  return (
    <div
      className={`pl-2 space-y-2 font-mono text-sm text-foreground/80 my-2 ${closed ? 'opacity-70' : ''}`}
      onClick={() => !closed && inputRef.current?.focus()}
      onKeyDown={(e) => {
        if (!closed && (e.ctrlKey && (e.key === "c" || e.key === "q"))) {
          e.preventDefault();
          handleClose();
        }
      }}
    >
      <div className="text-terminal-cyan font-semibold italic flex justify-between items-center mr-4">
        <span>-- Interactive Contact Protocol Initiated --</span>
        {!closed && <span className="text-[10px] opacity-50 font-normal">Ctrl+C to exit</span>}
      </div>

      {step >= 1 && <div><span className="text-terminal-green">&gt; Enter your name:</span> {name}</div>}
      {step >= 2 && <div><span className="text-terminal-green">&gt; Enter your email:</span> {email}</div>}
      {step >= 3 && <div><span className="text-terminal-green">&gt; Enter your message:</span> {message}</div>}

      {step < 3 && !closed && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <span className="text-terminal-green">
            &gt; {step === 0 ? "Enter your name:" : step === 1 ? "Enter your email:" : "Enter your message:"}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground border-none"
            autoFocus
            autoComplete="off"
            spellCheck="false"
            disabled={closed}
          />
        </form>
      )}

      {step === 3 && <div className="text-terminal-yellow animate-pulse">Sending message... Please wait.</div>}
      {step === 4 && <div className="text-terminal-green font-bold">[OK] Message transmitted successfully!</div>}
      {step === 5 && <div className="text-terminal-red">[ERROR] Failed to transmit message.</div>}
    </div>
  );
};

export const TrollOutput = () => {
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const sequence = [
      { delay: 500, content: <span className="text-terminal-red">Checking permissions...</span> },
      { delay: 1000, content: <span className="text-terminal-red">Accessing root directory... [GRANTED]</span> },
      { delay: 800, content: <span className="text-terminal-red font-bold animate-pulse">WARNING: SYSTEM OVERRIDE DETECTED</span> },
      { delay: 1200, content: <span className="text-terminal-red font-mono">Deleting core libraries:</span> },
      { delay: 300, content: <span className="text-terminal-red pl-4">rm -rf /bin/ [DELETED]</span> },
      { delay: 300, content: <span className="text-terminal-red pl-4">rm -rf /etc/ [DELETED]</span> },
      { delay: 300, content: <span className="text-terminal-red pl-4">rm -rf /var/ [DELETED]</span> },
      { delay: 300, content: <span className="text-terminal-red pl-4">rm -rf /usr/ [DELETED]</span> },
      { delay: 300, content: <span className="text-terminal-red pl-4">rm -rf /home/ [DELETED]</span> },
      { delay: 1500, content: <span className="text-terminal-red font-bold text-lg animate-bounce select-none">CRITICAL SYSTEM FAILURE IMMINENT</span> },
      { delay: 1000, content: <span className="text-terminal-red font-bold">Unmounting file systems...</span> },
      { delay: 2000, content: <span className="text-terminal-cyan mt-4 font-bold border border-terminal-cyan p-2 inline-block">Starting illusion recovery... Just kidding! This is a read-only filesystem. 😉</span> },
    ];

    let currentTimeout: number; // For browser environment
    let index = 0;

    const runNext = () => {
      if (index < sequence.length) {
        const item = sequence[index];
        currentTimeout = window.setTimeout(() => {
          setLines(prev => [...prev, item.content]);
          index++;
          runNext();
        }, item.delay);
      } else {
        setIsDone(true);
      }
    };

    runNext();

    return () => window.clearTimeout(currentTimeout);
  }, []);

  return (
    <div className="pl-2 space-y-1 my-2 font-mono text-sm leading-relaxed">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      {!isDone && <span className="animate-pulse text-terminal-red">_</span>}
    </div>
  );
};

export const errorOutput = (cmd: string) => (
  <p className="text-terminal-red text-sm">
    bash: {cmd}: command not found. Type <span className="text-terminal-green">/help</span> for a list of available commands.
  </p>
);

export const welcomeMessage = () => (
  <div className="space-y-4 text-sm mt-2">
    <div className="space-y-1">
      <pre className="text-terminal-green text-xs leading-tight terminal-glow">{`
  ____             _____      _ _       
 |  _ \\  _____   _|  ___|__  | (_) ___  
 | | | |/ _ \\ \\ / / |_ / _ \\ | | |/ _ \\ 
 | |_| |  __/\\ V /|  _| (_) || | | (_) |
 |____/ \\___| \\_/ |_|  \\___/ |_|_|\\___/ 
`}</pre>
      <p className="text-foreground/70 mt-2">
        Welcome to my interactive portfolio. Here are the available commands to explore:
      </p>
    </div>
    {defaultHelpOutput()}
  </div>
);
