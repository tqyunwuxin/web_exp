# Multi-Game Showcase Website Product Plan

## Design Guidelines

### 1. Visual Style
- **Color Scheme**
  - Primary: Apple Blue (#007AFF)
  - Background: Light Gray (#F5F5F7)
  - Text: Dark Gray (#1D1D1F)
  - Accent: White (#FFFFFF)

- **Layout Standards**
  - Unified rounded corners
  - Card-based layout
  - Responsive design
  - Clear visual hierarchy

### 2. Interaction Design
- **Animation Effects**
  - Card hover animation
  - Page transitions
  - Loading animations
  - Button feedback

- **Navigation Experience**
  - Intuitive back function
  - Clear status indicators
  - Smooth page transitions
  - Intuitive operation hints

## Game Resources

### 1. Count Masters
- **Game Info**
  - Type: Action/Strategy
  - Feature: Stickman group battles
  - Controls: Click and drag
  - Preview: /images/count-masters/cover.jpg

### 2. Slice Master
- **Game Info**
  - Type: Casual/Skill
  - Feature: Slice puzzle solving
  - Controls: Slide to cut
  - Preview: /images/slice-master/cover.jpg

### 3. Fortzone Battle
- **Game Info**
  - Type: Shooting/Battle
  - Feature: Battle Royale competition
  - Controls: WASD + Mouse
  - Preview: /images/fortzone-battle/cover.jpg

## Technical Specifications

### 1. Image Standards
- **Image Requirements**
  - Standard name: cover.jpg
  - Recommended size: 300px × 200px
  - File size: Under 100KB
  - Format: JPG/JPEG

### 2. Performance Optimization
- **Resource Loading**
  - Image preloading
  - Resource compression
  - Cache utilization
  - Load on demand

## File Structure

```
project/
├── index.html      # Game list page
├── game.html       # Game display page
├── css/
│   └── style.css   # Style file
├── js/
│   └── main.js     # Main script
└── images/         # Game images directory
    ├── count-masters/
    │   └── cover.jpg
    ├── slice-master/
    │   └── cover.jpg
    └── fortzone-battle/
        └── cover.jpg
```

## Development Status

### Completed
- ✅ Create basic directory structure
- ✅ Write basic styles
- ✅ Implement game card layout
- ✅ Add game preview images
- ✅ Implement game loading function

### To Be Optimized
- Image loading optimization
- Mobile adaptation optimization
- Error handling improvement
- Loading status indicators
- Page transition animations 