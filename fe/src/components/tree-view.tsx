import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

const demoFiles = {
  'src': {
    type: 'folder',
    children: {
      'index.html': { type: 'file', content: '<!DOCTYPE html>...' },
      'styles': {
        type: 'folder',
        children: {
          'main.css': { type: 'file', content: '/* CSS styles */' },
        },
      },
      'scripts': {
        type: 'folder',
        children: {
          'app.js': { type: 'file', content: '// JavaScript code' },
        },
      },
    },
  },
  'public': {
    type: 'folder',
    children: {
      'assets': {
        type: 'folder',
        children: {
          'logo.svg': { type: 'file', content: '<svg>...</svg>' },
        },
      },
    },
  },
};

type TreeViewProps = {
  onFileSelect: (path: string) => void;
  activeFile: string;
};

export function TreeView({ onFileSelect, activeFile }: TreeViewProps) {
  const renderTree = (
    items: Record<string, any>,
    path: string[] = [],
    level = 0
  ) => {
    return Object.entries(items).map(([name, item]) => {
      const currentPath = [...path, name];
      const fullPath = currentPath.join('/');

      if (item.type === 'folder') {
        return (
          <details key={fullPath} open={level < 2}>
            <summary
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-accent',
                { 'ml-4': level > 0 }
              )}
            >
              <ChevronRight className="h-4 w-4 shrink-0 rotate-90 transition-transform duration-200 group-[[open]]:rotate-180" />
              <Folder className="h-4 w-4 shrink-0 text-blue-500" />
              <span className="text-sm">{name}</span>
            </summary>
            {renderTree(item.children, currentPath, level + 1)}
          </details>
        );
      }

      return (
        <div
          key={fullPath}
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-accent',
            'ml-6',
            { 'bg-accent': activeFile === fullPath }
          )}
          onClick={() => onFileSelect(fullPath)}
        >
          <File className="h-4 w-4 shrink-0 text-gray-500" />
          <span className="text-sm">{name}</span>
        </div>
      );
    });
  };

  return <div className="p-2">{renderTree(demoFiles)}</div>;
}