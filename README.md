# 👩‍💻 Terminal Portfolio 🚀

> A sleek, fully responsive, hacker-style terminal portfolio for developers, software engineers, and tech enthusiasts.

This project is a React-based interactive terminal portfolio that simulates a real command-line interface. It's designed to showcase your skills, experience, projects, and educational background in a unique and engaging way.

## ✨ Features

- **💻 Interactive Command Line:** Navigate your portfolio using classic terminal commands (`help`, `whoami`, `experience`, `project`, `skills`, `ls`, `history`, `clear`, `cat`/`nano`).
- **🎨 Theme Switcher:** Change the color palette instantly with commands like `theme dracula` or `theme hacker`.
- **📂 Virtual File System:** Experience realistic navigation with directory listing (`ls`) and file reading (`cat about.txt`).
- **🕹️ Easter Eggs:** Toggle a falling ASCII Matrix code animation with the `matrix` command.
- **⚡ Advanced Autocomplete:** Use the `Tab` key for smart command and file autocompletion (displays inline suggestions when multiple matches exist).
- **📱 Fully Responsive:** Carefully crafted to look perfect on desktop, tablet, and mobile devices (with scaled-down typography for smaller screens).
- **🚀 Fast & Modern:** Built with React, Vite, TypeScript, and Tailwind CSS.
- **🛠️ Easy to Customize:** All of the content (bio, projects, experience, education, skills) is centralized in a single data file for effortless updates.

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
  resume: "/resume.pdf" // Path to your downloadable resume
};
```

### 2. Skills Data (`skills`)
Add your technical skills and their proficiency percentages for the animated ASCII progress bar output.

```typescript
export const skills = [
  { name: "JavaScript/TypeScript", percent: 95 },
  { name: "React", percent: 90 },
  // Add more skills...
];
```

### 3. Experience Data (`experienceData`)
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

### 4. Education Data (`educationData`)
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

### 5. Projects Data (`projectsData`)
Showcase your best work. Use `features` to highlight specific functionalities, and `category` to group them when using `ls`.

```typescript
export const projectsData = [
  {
    id: "project-1", // Used for the `cd project-1` command
    name: "My Awesome Project",
    tech: "React • Node.js • MongoDB",
    desc: "A brief summary of what the project is.",
    details: "A more in-depth description shown when viewing the project details.",
    category: "web", // For directory grouping in `ls`
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
