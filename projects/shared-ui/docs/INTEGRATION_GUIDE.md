# Shared UI Library Integration Guide

This guide provides step-by-step instructions for integrating the shared UI library into Veritable Games projects.

## Prerequisites

Before integrating the shared UI library, ensure you have:

1. Built the shared UI library:
   ```bash
   cd /path/to/shared-ui
   npm install
   npm run build
   ```

2. Access to the project where you want to integrate the library

## Integration Steps

### 1. Install the Library

#### Local Installation (Development)

For development, install the library locally:

```bash
# From your project directory
npm install --save ../shared-ui
```

#### Package Registry Installation (Production)

For production, if the library is published to a registry:

```bash
npm install --save @veritable-games/shared-ui
```

### 2. Import Styles

In your project's main entry file (typically `index.js` or `App.js`):

```jsx
// Import the global styles
import '@veritable-games/shared-ui/dist/styles.css';
```

### 3. Set Up the Theme Provider

Wrap your application with `ThemeProvider` to enable theming support:

```jsx
import React from 'react';
import { ThemeProvider } from '@veritable-games/shared-ui';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 4. Use Components

Import and use components from the library:

```jsx
import { Button, Card, Input, ThemeToggle } from '@veritable-games/shared-ui';
```

### 5. Access Theme in Components

Access the current theme and toggle function using the `useTheme` hook:

```jsx
import React from 'react';
import { useTheme } from '@veritable-games/shared-ui';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## Project-Specific Integration

### Canvas Application

1. Install the library:
   ```bash
   cd projects/canvas-application
   npm install --save ../shared-ui
   ```

2. Update `App.js` to use shared components (see `App-with-shared-ui.js` for an example)

3. Ensure theme is properly applied to Excalidraw:
   ```jsx
   <Excalidraw
     // Other props...
     theme={theme} // Use theme from useTheme() hook
     initialData={{
       elements: [],
       appState: {
         viewBackgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff'
       },
     }}
   />
   ```

### Constellation Viewer

1. Install the library:
   ```bash
   cd projects/constellation-viewer/frontend
   npm install --save ../../shared-ui
   ```

2. Update the main frontend component to use the ThemeProvider and shared components

3. For Three.js visualizations, apply theme colors:
   ```js
   import { getTheme } from '@veritable-games/shared-ui';
   
   // In your Three.js setup code:
   const theme = getTheme();
   const backgroundColor = theme === 'dark' ? 0x1a1a1a : 0xffffff;
   scene.background = new THREE.Color(backgroundColor);
   ```

### Content Management

1. Install the library:
   ```bash
   cd projects/content-management/frontend
   npm install --save ../../shared-ui
   ```

2. For Next.js projects, create a wrapper component in `_app.js`:
   ```jsx
   import { ThemeProvider } from '@veritable-games/shared-ui';
   import '@veritable-games/shared-ui/dist/styles.css';
   
   function MyApp({ Component, pageProps }) {
     return (
       <ThemeProvider>
         <Component {...pageProps} />
       </ThemeProvider>
     );
   }
   
   export default MyApp;
   ```

### User Admin Portal

1. Install the library:
   ```bash
   cd projects/user-admin-portal/frontend
   npm install --save ../../shared-ui
   ```

2. Update frontend code to use shared components

## Troubleshooting

### Common Issues

1. **Theme not applying properly**:
   - Ensure `ThemeProvider` wraps your app
   - Check if CSS is imported correctly
   - Verify the HTML element has the `data-theme` attribute

2. **React version conflicts**:
   - Ensure your project uses React 17+ (required by the shared UI)
   - Check for duplicate React installations

3. **CSS conflicts**:
   - The shared UI uses `vg-` prefixed class names to avoid conflicts
   - Ensure local styles aren't overriding the shared styles with higher specificity

## Testing the Integration

After integrating the shared UI library, test the following:

1. Theme switching with the `ThemeToggle` component
2. Proper rendering of all UI components
3. Responsiveness on different screen sizes
4. Color scheme consistency across the application