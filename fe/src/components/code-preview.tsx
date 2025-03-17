import { ScrollArea } from '@/components/ui/scroll-area';

type CodePreviewProps = {
  activeFile: string;
};

const demoCode = {
  'src/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <h1>Welcome to my website!</h1>
    <script src="scripts/app.js"></script>
</body>
</html>`,
  'src/styles/main.css': `body {
    font-family: system-ui, sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
}`,
  'src/scripts/app.js': `// Main application code
console.log('Application loaded!');

document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
});`,
};

export function CodePreview({ activeFile }: CodePreviewProps) {
  return (
    <ScrollArea className="h-full w-full">
      <pre className="p-4">
        <code className="text-sm">{demoCode[activeFile] || 'Select a file to view its contents'}</code>
      </pre>
    </ScrollArea>
  );
}