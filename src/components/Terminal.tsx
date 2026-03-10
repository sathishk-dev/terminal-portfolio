import { useState, useRef, useEffect, useCallback } from "react";
import ProfileHeader from "./terminal/ProfileHeader";
import { projects } from "./terminal/terminalData";
import {
  helpOutput, projectsOutput, projectDetailOutput, infoOutput,
  educationOutput, experienceOutput, errorOutput, welcomeMessage,
} from "./terminal/terminalOutputs";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  path: string;
}

type PathSegment = string;

function pathToString(segments: PathSegment[]): string {
  if (segments.length === 0) return "~";
  return "~/" + segments.join("/");
}

function processCommand(input: string, currentPath: PathSegment[]): { output: React.ReactNode; clear?: boolean; newPath?: PathSegment[] } {
  const cmd = input.trim().toLowerCase();

  if (cmd === "clear") return { output: null, clear: true };
  if (cmd === "/help" || cmd === "help") return { output: helpOutput() };
  if (cmd === "whoami") return { output: infoOutput(), newPath: ["about"] };
  if (cmd === "education") return { output: educationOutput(), newPath: ["education"] };
  if (cmd === "experience" || cmd === "experiense") return { output: experienceOutput(), newPath: ["experience"] };
  if (cmd === "project" || cmd === "projects") return { output: projectsOutput(), newPath: ["projects"] };

  if (cmd === "cd .." || cmd === "cd ../..") {
    if (currentPath.length === 0) {
      return { output: <p className="text-terminal-muted text-sm">Already at home directory.</p> };
    }
    const steps = cmd === "cd ../.." ? 2 : 1;
    const newPath = currentPath.slice(0, Math.max(0, currentPath.length - steps));
    return { output: <p className="text-terminal-green text-sm">Navigated to {pathToString(newPath)}</p>, newPath };
  }

  if (cmd === "back") {
    if (currentPath.length === 0) {
      return { output: <p className="text-terminal-muted text-sm">Already at home. Nothing to go back to.</p> };
    }
    const newPath = currentPath.slice(0, -1);
    return { output: <p className="text-terminal-green text-sm">Navigated to {pathToString(newPath)}</p>, newPath };
  }

  if (cmd.startsWith("cd ")) {
    const projectId = cmd.slice(3).trim();
    if (projectId === "~" || projectId === "/") {
      return { output: <p className="text-terminal-green text-sm">Navigated to ~</p>, newPath: [] };
    }
    const project = projects.find(p => p.id === projectId || p.name.toLowerCase() === projectId);
    if (project) return { output: projectDetailOutput(project), newPath: ["projects", project.id] };
    return { output: <p className="text-terminal-red text-sm">bash: cd: {projectId}: no such project. Type <span className="text-terminal-green">project</span> to see available projects.</p> };
  }

  return { output: errorOutput(input.trim()) };
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState<PathSegment[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompt = `sathishk-dev@portfolio:${pathToString(currentPath)}$`;

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [history, scrollToBottom]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const syncCursor = () => {
    requestAnimationFrame(() => {
      if (inputRef.current) {
        setCursorPos(inputRef.current.selectionStart ?? input.length);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmed = input.trim();
    setCommandHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const { output, clear, newPath } = processCommand(trimmed, currentPath);

    if (clear) {
      setHistory([]);
      setShowWelcome(true);
      setInput("");
      setCursorPos(0);
      setCurrentPath([]);
      return;
    }

    setHistory(prev => [...prev, { command: trimmed, output, path: pathToString(currentPath) }]);
    if (newPath !== undefined) setCurrentPath(newPath);
    setInput("");
    setCursorPos(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
      setCursorPos(commandHistory[newIndex].length);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
        setCursorPos(0);
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
      setCursorPos(commandHistory[newIndex].length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      syncCursor();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const availableCommands = ["clear", "help", "/help", "whoami", "education", "experience", "projects", "cd ..", "back"];

      if (input.startsWith("cd ")) {
        const partialProject = input.slice(3).toLowerCase();
        const matches = projects.filter(p => p.id.startsWith(partialProject));
        if (matches.length === 1) {
          const newCmd = `cd ${matches[0].id}`;
          setInput(newCmd);
          setCursorPos(newCmd.length);
        }
      } else {
        const partialCmd = input.toLowerCase();
        const matches = availableCommands.filter(cmd => cmd.startsWith(partialCmd));
        if (matches.length === 1) {
          setInput(matches[0]);
          setCursorPos(matches[0].length);
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.toLowerCase());
    setCursorPos(e.target.selectionStart ?? e.target.value.length);
  };

  const handleClick = (e: React.MouseEvent) => {
    inputRef.current?.focus();
    syncCursor();
  };

  const handleSelect = () => {
    if (inputRef.current) {
      setCursorPos(inputRef.current.selectionStart ?? input.length);
    }
  };

  return (
    <div
      className="w-full h-screen md:h-auto md:max-h-[85vh] md:max-w-4xl md:mx-auto md:my-8 md:rounded-xl overflow-hidden border border-border shadow-2xl shadow-black/50 flex flex-col font-mono"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border select-none shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-terminal-red" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
        </div>
        <span className="text-terminal-muted text-xs ml-2 flex-1 text-center">
          sathishk-dev@portfolio — bash
        </span>
      </div>

      <ProfileHeader />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-background min-h-0"
      >
        {showWelcome && welcomeMessage()}

        {history.map((entry, i) => (
          <div key={i} className="space-y-1.5">
            <div className="text-sm break-all whitespace-pre-wrap">
              <span className="text-terminal-prompt font-bold mr-2">{entry.path}$</span>
              <span className="text-foreground">{entry.command}</span>
            </div>
            {entry.output}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="relative text-sm break-all whitespace-pre-wrap">
          <span className="text-terminal-prompt font-bold mr-2">{prompt}</span>
          <span className="pointer-events-none text-foreground">
            {input.slice(0, cursorPos)}
            <span className="relative inline-block">
              <span className="opacity-0">{input[cursorPos] || "\u00A0"}</span>
              <span className="terminal-cursor absolute top-0 left-0 text-foreground">
                ▌
              </span>
            </span>
            {input.slice(cursorPos + 1)}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={syncCursor}
            onSelect={handleSelect}
            className="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-text bg-transparent"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
      <div className="text-center py-1.5 text-[11px] md:text-xs text-foreground/40 bg-card/80 border-t border-border shrink-0">
        © 2026 Devfolio. Made with ❤️ by {' '}
        <a
          href="https://github.com/sathishk-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-green hover:underline cursor-pointer"
        >
          SK
        </a>
      </div>
    </div>
  );
}