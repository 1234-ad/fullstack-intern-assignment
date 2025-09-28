'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/movies" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">MovieSearch</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/movies"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Movies
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  );
};

export { Header };