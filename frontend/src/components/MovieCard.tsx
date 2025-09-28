'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Film } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Movie } from '@/types/movie';
import { getImageUrl, formatYear } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  const imageUrl = getImageUrl(movie.Poster);
  const formattedYear = formatYear(movie.Year);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={`/movies/${movie.imdbID}`}>
        <Card className="movie-card group cursor-pointer h-full">
          <div className="relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={movie.Title}
              width={300}
              height={400}
              className="movie-card-image group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-movie.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            
            {/* Type badge */}
            <div className="absolute top-2 right-2">
              <div className="bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                <Film className="w-3 h-3" />
                {movie.Type}
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {movie.Title}
            </h3>
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formattedYear}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export { MovieCard };