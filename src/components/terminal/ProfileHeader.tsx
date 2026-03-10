import { Download } from "lucide-react";
import { profile } from "./terminalData";

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-secondary/60">
      <div className="w-12 h-12 rounded-full bg-terminal-green/20 border border-terminal-green/40 flex items-center justify-center text-terminal-green font-bold text-lg shrink-0">
        {profile.avatar}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-terminal-cyan font-bold text-sm truncate">{profile.name}</p>
        <p className="text-terminal-muted text-xs truncate">{profile.title}</p>
        <div className="flex items-center gap-3 mt-0.5 text-xs">
          <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline cursor-pointer truncate hidden sm:inline-block">{profile.github}</a>
          <span className="text-terminal-muted hidden sm:inline-block">·</span>
          <span className="text-foreground/50 truncate hidden sm:inline-block">{profile.location}</span>
        </div>
      </div>
      <a
        href={profile.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-terminal-green/10 hover:bg-terminal-green/20 border border-terminal-green/30 rounded text-terminal-green text-xs font-mono transition-colors shrink-0"
        title="View Resume"
      >
        <Download size={14} />
        <span className="hidden sm:inline-block">Resume</span>
      </a>
    </div>
  );
}
