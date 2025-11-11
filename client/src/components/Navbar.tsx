import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminRoute = location.startsWith('/admin');

  if (isAdminRoute) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setLocation('/')}
            className="text-2xl font-bold text-gradient cursor-pointer bg-transparent border-0 p-0"
            data-testid="link-logo"
          >
            PromotionX
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => setLocation(link.href)}
                className={`text-foreground hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer ${
                  location === link.href ? 'text-primary font-semibold' : ''
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              className="gradient-primary"
              onClick={() => setLocation('/pricing')}
              data-testid="button-nav-get-started"
            >
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    setLocation(link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 text-foreground hover:text-primary transition-colors bg-transparent border-0 cursor-pointer ${
                    location === link.href ? 'text-primary font-semibold' : ''
                  }`}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                className="w-full gradient-primary"
                onClick={() => {
                  setLocation('/pricing');
                  setMobileMenuOpen(false);
                }}
                data-testid="button-mobile-get-started"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
