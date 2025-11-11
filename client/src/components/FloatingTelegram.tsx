import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FloatingTelegram() {
  return (
    <a
      href="https://t.me/Alright_dear_bot"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      data-testid="link-floating-telegram"
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full gradient-primary shadow-lg animate-pulse-glow"
        data-testid="button-telegram-float"
      >
        <Send className="h-6 w-6" />
      </Button>
    </a>
  );
}
