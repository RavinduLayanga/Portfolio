# Ravindu Layanga | Software Engineer Portfolio


> A high-performance, responsive personal portfolio website featuring a modern **Glassmorphism** design, **Smooth Scrolling**, and interactive particle effects. Built with clean architecture and optimized for speed.

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-ravindulayanga.github.io-00E5FF?style=for-the-badge\&logo=github\&logoColor=black)](https://ravindulayanga.github.io/)
[![License](https://img.shields.io/badge/License-MIT-gray?style=for-the-badge)](LICENSE)

</div>

## Features

* **Glassmorphism UI:** Modern, translucent aesthetic with neon accents (`#00E5FF`) and backdrop blurs.
* **Smooth Scrolling:** Integrated **Lenis** for a buttery-smooth scroll experience.
* **Interactive Background:** Lightweight **tsParticles** implementation for dynamic movement.
* **Fully Responsive:** Mobile-first design with a custom collapsible navigation bar.
* **Dynamic Content:** Projects are loaded dynamically via `projects.js` for easy updates.
* **Performance Optimized:** Lazy loading, efficient asset delivery, and minimal layout shifts.

## Tech Stack

* **Core:** HTML5, CSS3, JavaScript (ES6+)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3.4)
* **Animations:** [Lenis Scroll](https://github.com/darkroomengineering/lenis), [tsParticles](https://particles.js.org/)
* **Font:** Inter (Google Fonts)

## Project Structure

```text
├── assets/
│   ├── css/
│   │   ├── style.css       
│   │   └── tailwind.css    
│   ├── documents/
│   │   └── Ravindu_Layanga_SE_CV.pdf  # Resume/CV file
│   ├── images/             
│   └── js/
│       ├── main.js         # Core UI logic (Scroll, Nav, Typewriter)
│       └── projects.js     # Data file for Project Cards
├── icon-v2.png             
├── index.html              
├── input.css               
├── package.json            
└── site.webmanifest        
```

## ⚡ Local Development

To run this project locally and modify the Tailwind styles:

### 1. Clone the repository

```bash
git clone https://github.com/RavinduLayanga/RavinduLayanga.github.io.git
cd RavinduLayanga.github.io
```

### 2. Install dependencies

> Ensure you have **Node.js** installed.

```bash
npm install
```

### 3. Start the Tailwind watcher

This compiles changes from `input.css` to `assets/css/tailwind.css` in real time.

```bash
npx tailwindcss -i ./input.css -o ./assets/css/tailwind.css --watch
```

### 4. Go live

Open `index.html` in your browser.

## Customization

### Adding New Projects

You don’t need to touch the HTML. Open `assets/js/projects.js` and add a new object to the array:

```javascript
{
  title: "New Project Name",
  description: "Brief description of the project.",
  tags: ["React", "Node.js"],
  github: "https://github.com/username/repo",
  live: "https://project-demo.com" 
},
```


