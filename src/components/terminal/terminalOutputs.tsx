import { profile, projects, education, certifications, experience, skills, type Project } from "./terminalData";
import { useEffect, useState } from "react";
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
        <span className="text-terminal-green">cat / nano &lt;file&gt;</span>
        <span className="text-foreground/70">View file contents (e.g. cat about.txt)</span>
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
