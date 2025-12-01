# Song Presenter - Quick Start Guide

## Running the App

The development server is running. Access the app at:
- **Director Page**: http://localhost:3001/director (or http://localhost:3001)
- **Live Page**: http://localhost:3001/live

## How to Use

### Step 1: Upload or Create Songs

1. You'll start on the **Director** page
2. Either:
   - **Drag and drop** the included `sample-song.md` file onto the upload zone
   - Click the upload zone to browse for `.md` files
   - Click **"+ New Song"** to create a song from scratch

### Step 2: Set a Song Live

1. Find your song in the left sidebar
2. Click **"Set Live"** to activate it
3. Optionally change the tempo (slow/fast) for different animation speeds

### Step 3: Control the Live Display

1. The main area shows all song parts as clickable buttons
2. Click any part (Verse 1, Chorus, etc.) to display it
3. Or use Previous/Next buttons for sequential navigation

### Step 4: Open the Live View

**Option A: Same Browser Tab**
1. Click the **"Live"** link in the navigation bar
2. This switches to the presentation view
3. Click "Director" to switch back when needed

**Option B: Separate Tab/Window (Recommended for Presentations)**
1. Open a new browser window or tab
2. Navigate to `http://localhost:3001/live`
3. Drag this window to your presentation display (projector/external monitor)
4. Keep the Director tab/window open for control
5. Edit songs and change parts from Director - Live view syncs instantly!

The two windows automatically sync via BroadcastChannel API!

### Step 5: Export Your Session

When you're done:
- **Export JSON**: Saves all songs and settings for later import
- **Export MD**: Downloads all songs as a single markdown file
- Your session is also auto-saved to localStorage

## Testing the App

Try the included sample song:
1. Upload `sample-song.md` from the project root
2. Set it live
3. Click through the different parts (Verse 1, Verse 2, Chorus, Bridge)
4. Try changing the tempo and see the animation speed change
5. Open a second window for the Live view

## Keyboard Navigation

On the Director page:
- Use the part buttons to jump to any section
- Previous/Next buttons for sequential navigation

## Creating Your Own Songs

Songs use standard Markdown with these special headings:

```markdown
# Song Title

## Verse 1
Your lyrics here

## Verse 2
More lyrics

## Chorus
Chorus lyrics

## Bridge
Bridge lyrics
```

Supported parts:
- `Verse 1`, `Verse 2`, `Verse 3`, etc. (unlimited)
- `Chorus`
- `Pre-Chorus`
- `Bridge`

## Tips

1. **For Live Events**:
   - Use two monitors/screens
   - Director on one, Live on the other
   - Practice navigating through songs beforehand

2. **Session Management**:
   - Export your session before closing the browser
   - Import it later to restore everything

3. **Animation**:
   - Use "slow" tempo for contemplative songs
   - Use "fast" tempo for upbeat songs

Enjoy your song presentations!
