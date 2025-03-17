import { useState } from 'react';
import { FileCode2, Layout, Moon, Sun, Eye, Wand2 } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TreeView } from '@/components/tree-view';
import { CodePreview } from '@/components/code-preview';
import { WebsitePreview } from '@/components/website-preview';
import { useSearchParams } from 'react-router-dom';

export function Builder() {
  const { theme, setTheme } = useTheme();
  const [activeFile, setActiveFile] = useState('index.html');

  // Get prompt from URL query params
  const [searchParams] = useSearchParams();
  const prompt = searchParams.get('prompt') || '';

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="border-b flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <Layout className="h-6 w-6" />
          <h1 className="text-xl font-bold">Website Builder</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
            <Wand2 className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">{prompt}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal">
        {/* File Explorer */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="h-[calc(100vh-57px)] border-r">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <span className="text-sm font-medium">Files</span>
              <FileCode2 className="h-4 w-4" />
            </div>
            <ScrollArea className="h-[calc(100%-41px)]">
              <TreeView onFileSelect={setActiveFile} activeFile={activeFile} />
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Editor and Preview */}
        <ResizablePanel defaultSize={80}>
          <Tabs defaultValue="code" className="h-[calc(100vh-57px)]">
            <div className="flex items-center justify-between border-b px-4">
              <TabsList>
                <TabsTrigger value="code" className="gap-2">
                  <FileCode2 className="h-4 w-4" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="code" className="h-[calc(100%-41px)] p-0">
              <CodePreview activeFile={activeFile} />
            </TabsContent>
            <TabsContent value="preview" className="h-[calc(100%-41px)] p-0">
              <WebsitePreview />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
