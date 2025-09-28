import axios from 'axios';
import { SearchResponse, MovieDetails } from '@/types/movie';

const OMDB_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.OMDB_API_KEY || 'demo'; // Use 'demo' for testing

const api = axios.create({
  baseURL: OMDB_BASE_URL,
  timeout: 10000,
});

export const movieApi = {
  searchMovies: async (
    query: string, 
    page: number = 1, 
    type?: string, 
    year?: string
  ): Promise<SearchResponse> => {
    try {
      const params: any = {
        apikey: API_KEY,
        s: query,
        page,
      };
      
      if (type) params.type = type;
      if (year) params.y = year;
      
      const response = await api.get('', { params });
      return response.data;
    } catch (error) {
      console.error('Search movies error:', error);
      throw new Error('Failed to search movies');
    }
  },

  getMovieDetails: async (imdbID: string): Promise<MovieDetails> => {
    try {
      const response = await api.get('', {
        params: {
          apikey: API_KEY,
          i: imdbID,
          plot: 'full',
        },
      });
      
      if (response.data.Response === 'False') {
        throw new Error(response.data.Error || 'Movie not found');
      }
      
      return response.data;
    } catch (error) {
      console.error('Get movie details error:', error);
      throw new Error('Failed to get movie details');
    }
  },

  getMovieSuggestions: async (query: string): Promise<string[]> => {
    try {
      if (query.length < 2) return [];
      
      const response = await movieApi.searchMovies(query, 1);
      
      if (response.Response === 'True' && response.Search) {
        return response.Search.slice(0, 5).map(movie => movie.Title);
      }
      
      return [];
    } catch (error) {
      console.error('Get suggestions error:', error);
      return [];
    }
  },
};