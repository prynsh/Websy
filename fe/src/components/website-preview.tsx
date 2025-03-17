import { ScrollArea } from '@/components/ui/scroll-area';

export function WebsitePreview() {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="rounded-lg border bg-card p-8 text-card-foreground shadow">
          <h1 className="mb-4 text-2xl font-bold">Welcome to my website!</h1>
          <p className="text-muted-foreground">
            This is a preview of your website. The content will update as you make
            changes to your files.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
}