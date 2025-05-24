# Veritable Games Shared UI Library

A shared UI component and styling library for Veritable Games applications.

## Installation

```bash
# From your project directory
npm install --save ../shared-ui
# Or if published to a registry
# npm install --save @veritable-games/shared-ui
```

## Usage

### Theme Setup

Wrap your application with the `ThemeProvider` to enable theme functionality:

```jsx
import { ThemeProvider } from '@veritable-games/shared-ui';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

Import the CSS styles:

```jsx
// In your entry file
import '@veritable-games/shared-ui/dist/styles.css';
```

### Theme Toggle

Add a theme toggle button to your application:

```jsx
import { ThemeToggle } from '@veritable-games/shared-ui';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
}
```

### Components

#### Button

```jsx
import { Button } from '@veritable-games/shared-ui';

function MyComponent() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="tertiary">Tertiary Button</Button>
      <Button variant="danger">Danger Button</Button>
      <Button size="small">Small Button</Button>
      <Button size="large">Large Button</Button>
      <Button fullWidth>Full Width Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button loading>Loading Button</Button>
    </div>
  );
}
```

#### Card

```jsx
import { Card } from '@veritable-games/shared-ui';

function MyComponent() {
  return (
    <Card variant="default">
      <Card.Header>Card Header</Card.Header>
      <Card.Body>
        This is the card content.
      </Card.Body>
      <Card.Footer>Card Footer</Card.Footer>
    </Card>
  );
}
```

#### Input

```jsx
import { Input } from '@veritable-games/shared-ui';

function MyComponent() {
  return (
    <div>
      <Input label="Username" placeholder="Enter username" />
      <Input 
        label="Email" 
        type="email" 
        error={true} 
        helperText="Please enter a valid email address" 
      />
      <Input label="Password" type="password" />
      <Input disabled label="Disabled" value="Disabled input" />
    </div>
  );
}
```

## Development

### Building the library

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch for changes during development
npm run dev
```

## Contributing

1. Follow the established component patterns
2. Ensure components are accessible and themeable
3. Document your components in the component file using JSDoc comments
4. Add your component to the exports in `src/index.js`