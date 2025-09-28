'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MovieCard } from '@/components/MovieCard';
import { Loading } from '@/components/ui/Loading';
import { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading size="lg" text="Searching movies..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-2">
          Oops! Something went wrong
        </div>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">
          No movies found
        </div>
        <p className="text-sm text-muted-foreground">
          Try searching with different keywords
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      {movies.map((movie, index) => (
        <MovieCard key={movie.imdbID} movie={movie} index={index} />
      ))}
    </motion.div>
  );
};

export { MovieGrid };