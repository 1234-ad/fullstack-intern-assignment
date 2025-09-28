'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Star, 
  Users, 
  Award,
  Globe,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { StarRating } from '@/components/StarRating';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMovieDetails, setMovieRating } from '@/store/movieSlice';
import { 
  getImageUrl, 
  formatRuntime, 
  formatYear, 
  getRatingColor 
} from '@/lib/utils';

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const movieId = params.id as string;
  const { movieDetails, loading, error, ratings } = useAppSelector(
    (state) => state.movies
  );
  
  const movie = movieDetails[movieId];
  const userRating = ratings[movieId] || 0;

  useEffect(() => {
    if (movieId && !movie) {
      dispatch(fetchMovieDetails(movieId));
    }
  }, [movieId, movie, dispatch]);

  const handleRatingChange = (rating: number) => {
    dispatch(setMovieRating({ imdbID: movieId, rating }));
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loading size="lg" text="Loading movie details..." />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-4">
          {error || 'Movie not found'}
        </div>
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const imageUrl = getImageUrl(movie.Poster);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Back Button */}
      <Button onClick={handleBack} variant="outline" className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Movies
      </Button>

      {/* Movie Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="overflow-hidden">
            <Image
              src={imageUrl}
              alt={movie.Title}
              width={400}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </Card>
        </motion.div>

        {/* Movie Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Title and Basic Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movie.Title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatYear(movie.Year)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatRuntime(movie.Runtime)}</span>
              </div>
              <div className="px-2 py-1 bg-secondary rounded text-secondary-foreground text-sm">
                {movie.Rated}
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-6">
              {movie.imdbRating !== 'N/A' && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className={`font-semibold ${getRatingColor(movie.imdbRating)}`}>
                    {movie.imdbRating}/10
                  </span>
                  <span className="text-muted-foreground text-sm">
                    ({movie.imdbVotes} votes)
                  </span>
                </div>
              )}
              
              {movie.Metascore !== 'N/A' && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center text-sm font-bold">
                    {movie.Metascore}
                  </div>
                  <span className="text-muted-foreground text-sm">Metascore</span>
                </div>
              )}
            </div>

            {/* User Rating */}
            <div className="space-y-2">
              <h3 className="font-medium">Your Rating:</h3>
              <StarRating
                rating={userRating}
                onRatingChange={handleRatingChange}
                size="lg"
              />
            </div>
          </div>

          {/* Genre */}
          <div>
            <h3 className="font-medium mb-2">Genre</h3>
            <div className="flex flex-wrap gap-2">
              {movie.Genre.split(', ').map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Plot */}
          <div>
            <h3 className="font-medium mb-2">Plot</h3>
            <p className="text-muted-foreground leading-relaxed">
              {movie.Plot}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Additional Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Cast & Crew */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Cast & Crew
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Director:</span>
                <p className="text-muted-foreground">{movie.Director}</p>
              </div>
              <div>
                <span className="font-medium">Actors:</span>
                <p className="text-muted-foreground">{movie.Actors}</p>
              </div>
              <div>
                <span className="font-medium">Writer:</span>
                <p className="text-muted-foreground">{movie.Writer}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Production Info */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Production
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Country:</span>
                <p className="text-muted-foreground">{movie.Country}</p>
              </div>
              <div>
                <span className="font-medium">Language:</span>
                <p className="text-muted-foreground">{movie.Language}</p>
              </div>
              <div>
                <span className="font-medium">Released:</span>
                <p className="text-muted-foreground">{movie.Released}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Awards & Box Office */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Awards & Box Office
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Awards:</span>
                <p className="text-muted-foreground">{movie.Awards}</p>
              </div>
              {movie.BoxOffice !== 'N/A' && (
                <div>
                  <span className="font-medium">Box Office:</span>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {movie.BoxOffice}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* External Ratings */}
      {movie.Ratings && movie.Ratings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">External Ratings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {movie.Ratings.map((rating, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <span className="font-medium">{rating.Source}</span>
                    <span className="text-primary font-semibold">
                      {rating.Value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}