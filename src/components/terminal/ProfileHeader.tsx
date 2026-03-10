import { profile } from "./terminalData";

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-secondary/60">
      <div className="w-12 h-12 rounded-full bg-terminal-green/20 border border-terminal-green/40 flex items-center justify-center text-terminal-green font-bold text-lg shrink-0">
        {profile.avatar}
      </div>
      <div className="min-w-0">
        <p className="text-terminal-cyan font-bold text-sm truncate">{profile.name}</p>
        <p className="text-terminal-muted text-xs truncate">{profile.title}</p>
        <div className="flex items-center gap-3 mt-0.5 text-xs">
          <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline cursor-pointer truncate">{profile.github}</a>
          <span className="text-terminal-muted">·</span>
          <span className="text-foreground/50 truncate">{profile.location}</span>
        </div>
      </div>
    </div>
  );
}
