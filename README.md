# 👩‍💻 Terminal Portfolio 🚀

> A sleek, fully responsive, hacker-style terminal portfolio for developers, software engineers, and tech enthusiasts.

This project is a React-based interactive terminal portfolio that simulates a real command-line interface. It's designed to showcase your skills, experience, projects, and educational background in a unique and engaging way.

## ✨ Features

- **💻 Interactive Command Line:** Navigate your portfolio using classic terminal commands (`help`, `whoami`, `experience`, `project`, `clear`).
- **📱 Fully Responsive:** Carefully crafted to look perfect on desktop, tablet, and mobile devices (with scaled-down typography for smaller screens).
- **🎨 Hacker Aesthetics:** Features a subtle matrix-style cascading background, scanlines, and terminal glow effects for an immersive experience.
- **⚡ Fast & Modern:** Built with React, Vite, TypeScript, and Tailwind CSS.
- **🛠️ Easy to Customize:** All of the content (bio, projects, experience, education) is centralized in a single data file for effortless updates.

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sathishk-dev/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🛠️ How to Customize (Make It Yours!)

To populate the portfolio with your own information, you **only need to update one file**. 

Navigate to `src/components/terminal/terminalData.ts` and modify the existing data structures.

### 1. Profile Data (`profileData`)
Update your name, title, GitHub handle, location, bio, and technical skills.

```typescript
export const profileData = {
  name: "Your Name",
  title: "Software Developer",
  github: "github.com/yourusername",
  location: "Your City, Country",
  bio: "A brief description about who you are and what you do.",
  skills: ["React", "TypeScript", "Node.js", "Python", "Docker"]
};
```

### 2. Experience Data (`experienceData`)
Add your work history. Each object represents a different role.

```typescript
export const experienceData = [
  {
    role: "Senior Frontend Engineer",
    company: "Tech Corp",
    period: "2022 - Present",
    desc: "Led the development of the core product..."
  },
  // Add more experiences...
];
```

### 3. Education Data (`educationData`)
List your degrees, certifications, and educational background.

```typescript
export const educationData = [
  {
    degree: "B.S. Computer Science",
    school: "University Name",
    year: "2018 - 2022",
    desc: "Relevant coursework, clubs, honors..."
  },
  // Add more education...
];
```

### 4. Projects Data (`projectsData`)
Showcase your best work. Use `features` to highlight specific functionalities.

```typescript
export const projectsData = [
  {
    id: "project-1", // Used for the `cd project-1` command
    name: "My Awesome Project",
    tech: "React • Node.js • MongoDB",
    desc: "A brief summary of what the project is.",
    details: "A more in-depth description shown when viewing the project details.",
    features: [
      "Feature one",
      "Feature two",
      "Feature three"
    ],
    link: "github.com/yourusername/project-1"
  },
  // Add more projects...
];
```

## 🌐 Deployment

This project can be easily deployed to platforms like **Netlify**, **Vercel**, or **GitHub Pages**. Since it's built with Vite, simply set the build command to `npm run build` and the publish directory to `dist/`.

*If you like this template, consider giving it a ⭐ on GitHub!*
