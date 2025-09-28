import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { movieApi } from '@/lib/api';
import { MovieState, Movie, MovieDetails, SearchFilters } from '@/types/movie';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/utils';

const initialState: MovieState = {
  movies: [],
  movieDetails: {},
  searchQuery: '',
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  ratings: getFromLocalStorage('movieRatings', {}),
};

// Async thunks
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ 
    query, 
    page = 1, 
    filters 
  }: { 
    query: string; 
    page?: number; 
    filters?: SearchFilters;
  }) => {
    const response = await movieApi.searchMovies(
      query, 
      page, 
      filters?.type, 
      filters?.year
    );
    
    if (response.Response === 'False') {
      throw new Error(response.Error || 'No movies found');
    }
    
    return {
      movies: response.Search,
      totalResults: parseInt(response.totalResults),
      page,
    };
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID: string) => {
    const details = await movieApi.getMovieDetails(imdbID);
    return { imdbID, details };
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearMovies: (state) => {
      state.movies = [];
      state.totalResults = 0;
      state.currentPage = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
    setMovieRating: (state, action: PayloadAction<{ imdbID: string; rating: number }>) => {
      const { imdbID, rating } = action.payload;
      state.ratings[imdbID] = rating;
      saveToLocalStorage('movieRatings', state.ratings);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalResults = action.payload.totalResults;
        state.currentPage = action.payload.page;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search movies';
        state.movies = [];
        state.totalResults = 0;
      })
      // Fetch movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        const { imdbID, details } = action.payload;
        state.movieDetails[imdbID] = details;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie details';
      });
  },
});

export const {
  setSearchQuery,
  clearMovies,
  clearError,
  setMovieRating,
  setCurrentPage,
} = movieSlice.actions;

export default movieSlice.reducer;