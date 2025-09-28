'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { SearchFilters as SearchFiltersType } from '@/types/movie';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  className?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  className,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleTypeChange = (type: 'movie' | 'series' | 'episode' | undefined) => {
    onFiltersChange({ ...filters, type });
  };

  const handleYearChange = (year: string) => {
    onFiltersChange({ ...filters, year: year === 'all' ? undefined : year });
  };

  return (
    <div className={`flex flex-wrap gap-4 items-center ${className}`}>
      {/* Type Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Type:</span>
        <div className="flex gap-1">
          <Button
            variant={!filters.type ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleTypeChange(undefined)}
          >
            All
          </Button>
          <Button
            variant={filters.type === 'movie' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleTypeChange('movie')}
          >
            Movies
          </Button>
          <Button
            variant={filters.type === 'series' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleTypeChange('series')}
          >
            Series
          </Button>
        </div>
      </div>

      {/* Year Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Year:</span>
        <select
          value={filters.year || 'all'}
          onChange={(e) => handleYearChange(e.target.value)}
          className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Years</option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {(filters.type || filters.year) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFiltersChange({})}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export { SearchFilters };