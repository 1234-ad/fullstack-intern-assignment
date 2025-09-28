'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';
import { SearchFilters } from '@/components/SearchFilters';
import { MovieGrid } from '@/components/MovieGrid';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchMovies, setSearchQuery, clearMovies } from '@/store/movieSlice';
import { SearchFilters as SearchFiltersType } from '@/types/movie';

export default function MoviesPage() {
  const dispatch = useAppDispatch();
  const { movies, searchQuery, loading, error, totalResults } = useAppSelector(
    (state) => state.movies
  );

  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Clear movies when component mounts
    dispatch(clearMovies());
  }, [dispatch]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setHasSearched(true);
    dispatch(setSearchQuery(query));
    
    try {
      await dispatch(searchMovies({ 
        query: query.trim(), 
        page: 1, 
        filters 
      })).unwrap();
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    
    // Re-search with new filters if we have a query
    if (searchQuery.trim()) {
      dispatch(searchMovies({ 
        query: searchQuery.trim(), 
        page: 1, 
        filters: newFilters 
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Discover Movies
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Search through thousands of movies and TV shows. Find detailed information, ratings, and more.
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex justify-center">
          <SearchBar
            value={searchQuery}
            onChange={(value) => dispatch(setSearchQuery(value))}
            onSearch={handleSearch}
            placeholder="Search for movies, TV shows..."
            className="w-full"
          />
        </div>

        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <SearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              className="justify-center"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Results Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {hasSearched && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              {loading ? (
                'Searching...'
              ) : error ? (
                'Search failed'
              ) : (
                `Found ${totalResults} results${searchQuery ? ` for "${searchQuery}"` : ''}`
              )}
            </p>
          </div>
        )}

        <MovieGrid movies={movies} loading={loading} error={error} />

        {!hasSearched && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-muted-foreground text-lg mb-4">
              🎬 Ready to discover amazing movies?
            </div>
            <p className="text-muted-foreground">
              Use the search bar above to find your favorite movies and TV shows
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}