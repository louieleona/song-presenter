# Song Presenter

A modern web-based song lyrics presentation system with a director control interface and synchronized live display screen. Perfect for worship services, concerts, karaoke nights, or any event requiring professional lyrics presentation.

## ✨ Features

- **Director Page** (`/director`): Control interface for managing songs and presentations
  - Upload songs in Markdown (.md) or JSON (.json) format
  - Create and edit songs with built-in editor featuring smart insertion
  - Auto-numbering for verses
  - Manage song tempo (slow/fast) for dynamic animations
  - Choose from 6 gradient color themes (Blue, Purple, Green, Orange, Pink, Cyan)
  - Interactive part selector showing live lyrics preview
  - Export individual songs as Markdown
  - Export/Import entire collections as JSON

- **Live Page** (`/live`): Full-screen presentation display
  - Clean, distraction-free lyrics display
  - Stunning animated backgrounds with:
    - Twinkling constellation stars
    - Rising particles that respond to tempo
    - Constellation line effects
    - Pulsing ambient glow
  - Real-time synchronization with director controls via BroadcastChannel API
  - Smooth fade-in transitions between song parts
  - 6 customizable gradient themes

- **Session Management**
  - Auto-save to browser localStorage
  - Export entire song collections as JSON
  - Export individual songs as Markdown files
  - Import songs from .md or .json files via drag-and-drop or file picker

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/song-presenter.git
cd song-presenter
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3001` (or another port if 3001 is in use).

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📖 Usage

### Quick Start

1. **Director View** - Navigate to `/director` (default route)
   - Drag and drop `.md` or `.json` files to upload songs
   - Or click "+ New Song" to create a song manually using the editor
   - Select a song and click "Set Live" to make it active on the live screen
   - Choose tempo (Slow/Fast) and gradient theme for each song
   - Click on any part (Verse, Chorus, etc.) to display it live

2. **Live View** - Navigate to `/live` in a separate window/tab
   - Open this on your projector or presentation display
   - Displays full-screen lyrics with beautiful animated backgrounds
   - Automatically syncs with director controls in real-time

### Recommended Setup for Presentations

**Dual-Screen Setup:**
1. **Screen 1 (Control)**: Open `/director` - your control interface
2. **Screen 2 (Display)**: Open `/live` - full-screen for audience
3. Position Live screen on projector/TV
4. Control everything from Director screen
5. Changes sync instantly via BroadcastChannel API (no internet required!)

**Pro Tips:**
- Use keyboard shortcuts and click part buttons for quick navigation
- Preview lyrics in the part selector before going live
- Export your collection as JSON to backup or share with others
- Create song templates and reuse them for similar songs

## 📝 Song Format

Songs use Markdown format with specific heading keywords:

```markdown
# Song Title

## Verse 1
First verse lyrics here
Multiple lines supported

## Verse 2
Second verse lyrics

## Pre-Chorus
Pre-chorus lyrics

## Chorus
Chorus lyrics

## Verse 3
Third verse (unlimited verses supported)

## Bridge
Bridge lyrics
```

### Supported Part Types
- **Verse 1, 2, 3...** (unlimited verses supported with auto-numbering)
- **Chorus**
- **Pre-Chorus**
- **Bridge**

### Smart Editor Features
- **Auto-numbering**: Click "Verse" button to automatically number based on existing verses
- **Cursor insertion**: Text is inserted at cursor position, not appended
- **Reserved word buttons**: One-click insertion of common song parts

## 🎨 Customization

### Animation Themes
Choose from 6 gradient themes for each song:
- 🔵 Blue (default)
- 🟣 Purple
- 🟢 Green
- 🟠 Orange
- 🩷 Pink
- 🔷 Cyan

### Tempo Settings
- **Slow**: Gentle, calm animations (20s particle rise, 8s pulse)
- **Fast**: Energetic, dynamic animations (3.5s particle rise, 0.8s pulse)

## 🛠️ Technologies

- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 5.4** - Build tool & dev server
- **Tailwind CSS 3.4** - Styling
- **React Router 6.28** - Routing
- **BroadcastChannel API** - Real-time tab synchronization (no server needed!)
- **markdown-it 14.1** - Markdown parsing
- **localStorage** - Persistent session storage

## 💾 Data Persistence

- **Auto-save**: Sessions automatically save to browser localStorage
- **Export/Import**: Backup your collections as JSON files
- **Individual exports**: Export single songs as Markdown files
- **No database required**: Everything runs client-side

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for any purpose!

## 🙏 Acknowledgments

Built with modern web technologies for worship services, concerts, and live events.

---

Made with ❤️ for the worship community
