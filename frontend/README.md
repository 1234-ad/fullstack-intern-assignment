# Movie Search App Frontend

A modern movie search application built with Next.js, TypeScript, and Redux Toolkit.

## 🚀 Features

- ✅ **Movie Search** with OMDB API integration
- ✅ **Autocomplete Search** with debounced suggestions
- ✅ **Movie Details** page with comprehensive information
- ✅ **Star Rating System** with localStorage persistence
- ✅ **Dark Mode Toggle** with theme persistence
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **Search Filters** by type and year
- ✅ **Loading States** and error handling
- ✅ **Smooth Animations** with Framer Motion
- ✅ **TypeScript** for type safety
- ✅ **Redux Toolkit** for state management

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Animations**: Framer Motion
- **API**: OMDB API
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure your .env.local file**
```env
OMDB_API_KEY=your-omdb-api-key-here
```

Get your free API key from: [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Pages & Features

### 🏠 Home Page (/)
- Redirects to `/movies`

### 🎬 Movies Page (/movies)
- **Search Bar**: Search movies with autocomplete suggestions
- **Filters**: Filter by type (movie/series) and year
- **Movie Grid**: Responsive grid of movie cards
- **Loading States**: Skeleton loading and error handling

### 🎭 Movie Details (/movies/[id])
- **Comprehensive Info**: Title, plot, cast, crew, ratings
- **User Rating**: 5-star rating system with localStorage
- **External Ratings**: IMDb, Rotten Tomatoes, Metacritic
- **Production Details**: Country, language, box office
- **Responsive Layout**: Mobile-friendly design

## 🎨 UI Components

### Core Components
- **Button**: Variant-based button component
- **Input**: Styled input with focus states
- **Card**: Flexible card component
- **Loading**: Animated loading spinner

### Feature Components
- **SearchBar**: Debounced search with autocomplete
- **MovieCard**: Animated movie card with hover effects
- **MovieGrid**: Responsive grid layout
- **StarRating**: Interactive 5-star rating system
- **ThemeToggle**: Dark/light mode toggle
- **SearchFilters**: Type and year filtering

## 🔧 State Management

### Redux Store Structure
```
store/
├── movieSlice.ts     # Movie data and search state
├── themeSlice.ts     # Dark mode theme state
├── hooks.ts          # Typed Redux hooks
└── index.ts          # Store configuration
```

### Movie State
- `movies`: Array of search results
- `movieDetails`: Cached movie details by ID
- `searchQuery`: Current search query
- `loading`: Loading state
- `error`: Error messages
- `ratings`: User ratings (localStorage)

## 🎯 Key Features Implementation

### Search with Autocomplete
```typescript
// Debounced search suggestions
const debouncedGetSuggestions = debounce(async (query: string) => {
  const suggestions = await movieApi.getMovieSuggestions(query);
  setSuggestions(suggestions);
}, 300);
```

### Star Rating System
```typescript
// Persistent user ratings
const handleRatingChange = (rating: number) => {
  dispatch(setMovieRating({ imdbID: movieId, rating }));
  // Automatically saved to localStorage
};
```

### Dark Mode Toggle
```typescript
// Theme persistence with Redux
const handleToggle = () => {
  dispatch(toggleTheme());
  // Automatically saved to localStorage
};
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - `sm`: 640px (2 columns)
  - `md`: 768px (3 columns)
  - `lg`: 1024px (4 columns)
  - `xl`: 1280px (5 columns)

## 🎨 Styling

### Tailwind CSS Classes
- Custom utility classes for common patterns
- Dark mode support with `dark:` variants
- Responsive design with breakpoint prefixes
- Custom animations and transitions

### CSS Variables
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}
```

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Debounced Search**: Reduces API calls
- **Lazy Loading**: Components load on demand
- **Caching**: Movie details cached in Redux
- **Error Boundaries**: Graceful error handling

## 🧪 Testing

Test the application:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### Manual Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── movies/         # Movies pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Base UI components
│   ├── MovieCard.tsx  # Feature components
│   └── ...
├── lib/               # Utilities
│   ├── api.ts         # API functions
│   └── utils.ts       # Helper functions
├── store/             # Redux store
│   ├── movieSlice.ts  # Movie state
│   └── themeSlice.ts  # Theme state
└── types/             # TypeScript types
    └── movie.ts       # Movie interfaces
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OMDB_API_KEY` | OMDB API key for movie data | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.