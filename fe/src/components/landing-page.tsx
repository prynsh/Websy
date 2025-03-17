import { useState } from 'react';
import { Wand2, Moon, Sun, FileCode2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BACKEND_URL } from '@/lib/config';

export function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      const response = await axios.post(`${BACKEND_URL}/template`, { prompt });

      if (response.status === 200) {
        navigate(`/builder?prompt=${encodeURIComponent(prompt)}`);
      } else {
        console.error('Failed to generate');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background w-full">
      {/* Header */}
      <header className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center space-y-8"
      >
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Build Your Website with AI
          </h1>
          <p className="text-xl text-muted-foreground">
            Describe your website and let AI create the perfect code structure for you
          </p>
        </div>

        {/* Input and Button */}
        <div className="space-y-4 w-full">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Describe your website (e.g., 'Modern portfolio with dark theme')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-12 flex-1"
            />
            <Button size="lg" onClick={handleGenerate} disabled={!prompt.trim()} className="px-8">
              <Wand2 className="mr-2 h-5 w-5" />
              Generate
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Your website code will be generated based on your description
          </p>
        </div>

        {/* Feature Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border bg-card p-4 text-card-foreground text-center"
            >
              <feature.icon className="h-6 w-6 mb-2 text-primary mx-auto" />
              <h3 className="font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const features = [
  {
    title: 'AI-Powered Generation',
    description: 'Generate website code instantly based on your description',
    icon: Wand2,
  },
  {
    title: 'Modern Stack',
    description: 'Built with React, TypeScript, and Tailwind CSS',
    icon: FileCode2,
  },
  {
    title: 'Live Preview',
    description: 'See your changes in real-time as you edit the code',
    icon: Eye,
  },
];
