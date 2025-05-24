# Veritable Games Style Guide

Based on the shared conversation design, this style guide outlines the visual and interaction patterns to implement across all Veritable Games applications.

## Color Palette

### Primary Colors
- **Dark Blue**: #2c3e50 (Headers, primary buttons)
- **Light Blue**: #3498db (Secondary buttons, links)
- **Green**: #2ecc71 (Success states, positive feedback)
- **Red**: #e74c3c (Error states, critical actions)
- **Yellow**: #f39c12 (Warning states, notifications)

### Neutrals
- **Dark Gray**: #34495e (Text)
- **Medium Gray**: #7f8c8d (Secondary text)
- **Light Gray**: #ecf0f1 (Backgrounds, borders)
- **White**: #ffffff (Card backgrounds, content areas)

## Typography

### Font Family
- Primary: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- Monospace: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

### Font Sizes
- Heading 1: 24px
- Heading 2: 20px
- Heading 3: 18px
- Body: 16px
- Small: 14px
- Extra Small: 12px

### Font Weights
- Regular: 400
- Medium: 500
- Bold: 700

## Components

### Cards
Cards should be used to group related content:
```css
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
}
```

### Buttons
Buttons should have consistent styling:
```css
.btn {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
  cursor: pointer;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-secondary {
  background-color: transparent;
  border: 1px solid #3498db;
  color: #3498db;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}
```

### Forms
Form elements should have a consistent style:
```css
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
```

### Message Threads
Implement message grouping similar to the chat interface:
```css
.message-group {
  margin-bottom: 24px;
}

.message {
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  max-width: 80%;
}

.message-user {
  background-color: #3498db;
  color: white;
  align-self: flex-end;
}

.message-system {
  background-color: #f5f5f5;
  color: #333;
  align-self: flex-start;
}
```

## Layout

### Containers
Use a consistent container system:
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}

.col {
  flex: 1;
  padding: 0 10px;
}
```

### Grid System
Use CSS Grid for complex layouts:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
```

## Interaction Patterns

### Transitions
All transitions should be smooth and consistent:
```css
.transition {
  transition: all 0.2s ease-in-out;
}
```

### Hover States
Elements should have clear hover states:
```css
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
```

### Focus States
Ensure accessibility with clear focus states:
```css
:focus {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}
```

## Responsive Design

### Breakpoints
- Mobile: 0-576px
- Tablet: 577px-991px
- Desktop: 992px+

### Media Queries
```css
/* Mobile first approach */
@media (min-width: 576px) {
  /* Tablet styles */
}

@media (min-width: 992px) {
  /* Desktop styles */
}
```

## Dark Mode

Implement a dark mode toggle that affects all applications:

### Dark Mode Variables
```css
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #f0f0f0;
  --card-bg: #2c2c2c;
  --border-color: #444444;
}
```

## Implementation Guide

For each project:
1. Create a shared CSS file with these styles
2. Import it at the highest level in the application
3. Follow the component patterns consistently
4. Implement dark mode toggle that persists in localStorage