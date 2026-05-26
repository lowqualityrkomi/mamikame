# mamikame

A lightweight desktop application for capturing video and audio from multiple sources. Built with Electron and Svelte, mamikame provides a simple and fast alternative to heavy capture software.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)

## Features

- **Lightweight & Fast** – Minimal resource usage compared to traditional capture software like OBS
- **Multi-source Capture** – Capture from any video/audio input device (webcams, capture cards, gaming devices, etc.)
- **Cross-platform** – Works seamlessly on Windows, macOS, and Linux
- **Simple & Intuitive UI** – Clean, minimal interface that's easy to use
- **Open Source** – Community-driven development, fully transparent

## Use Cases

- **Gaming** – Capture gameplay from Nintendo Switch, PlayStation, Xbox, or other consoles connected via capture card
- **Streaming** – Stream or record content from multiple video/audio sources
- **Conferencing** – Quick video source switching for meetings and presentations
- **Content Creation** – Flexible video/audio capture for content creators

## System Requirements

- **Operating System:** Windows, macOS, or Linux
- **Bun:** 1.0 or higher (npm also supported)
- **Disk Space:** ~350MB for installation

The application is lightweight and runs well on most systems.

## Getting Started

### Prerequisites

Ensure you have **Bun** installed on your system. If not, install it from [bun.sh](https://bun.sh)

### Installation & Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/lowqualityrkomi/mamikame.git
   cd mamikame
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```
   The Electron window will open automatically with hot-reload enabled.

## Building

### Build for production

```bash
bun run build
```

### Build for specific platforms

```bash
# For Windows
bun run build:win

# For macOS
bun run build:mac

# For Linux
bun run build:linux
```

## Project Structure

```
mamikame/
├── src/
│   ├── main/              # Electron main process
│   ├── preload/           # Preload scripts for IPC
│   └── renderer/          # Svelte UI components
│       ├── routes/        # Page components (audio, video, home)
│       ├── components/    # Reusable UI components
│       ├── lib/           # Utility functions
│       └── assets/        # Static assets
├── resources/             # App icons and resources
├── electron.vite.config.ts
├── svelte.config.mjs
└── package.json
```

## Development

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

### Available Scripts

```bash
# Development
bun run dev          # Start dev server with hot reload

# Building
bun run build        # Build for current platform
bun run build:win    # Build for Windows
bun run build:mac    # Build for macOS
bun run build:linux  # Build for Linux

# Code Quality
bun run typecheck    # Run TypeScript type checking
bun run lint         # Lint code with ESLint
bun run format       # Format code with Prettier
```

## Data Storage

Configuration and settings are stored locally in the browser's `localStorage`. No external database or cloud storage is required.

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository** on GitHub
2. **Create a feature branch** (`git checkout -b feature/your-feature-name`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature/your-feature-name`)
5. **Open a Pull Request** with a clear description of your changes

### Code Standards

- Use TypeScript for type safety
- Follow the existing code structure and naming conventions
- Run `bun run format` and `bun run lint` before committing
- Add descriptive commit messages

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- UI framework: [Svelte](https://svelte.dev/)
- Build tool: [electron-vite](https://electron-vite.org/)

---

**mamikame** – Keep it simple, keep it fast. 🚀
