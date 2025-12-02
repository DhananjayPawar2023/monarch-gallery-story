import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface AdvancedFilterProps {
  onFilterChange: (filters: FilterState) => void;
  filterOptions?: {
    mediums?: string[];
    years?: number[];
    priceRanges?: { label: string; min?: number; max?: number }[];
  };
}

export interface FilterState {
  medium?: string;
  yearFrom?: number;
  yearTo?: number;
  priceRange?: string;
  featured?: boolean;
}

export const AdvancedFilter = ({ onFilterChange, filterOptions }: AdvancedFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
  };

  const handleApply = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Filter className="w-4 h-4" />
        Advanced Filters
        {hasActiveFilters && (
          <span className="ml-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">
            Active
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="mt-4 p-6 bg-secondary/30 border border-border rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterOptions?.mediums && (
              <div>
                <Label htmlFor="medium">Medium</Label>
                <Select
                  value={filters.medium}
                  onValueChange={(value) => setFilters({ ...filters, medium: value })}
                >
                  <SelectTrigger id="medium">
                    <SelectValue placeholder="All mediums" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All mediums</SelectItem>
                    {filterOptions.mediums.map((medium) => (
                      <SelectItem key={medium} value={medium}>
                        {medium}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="yearFrom">Year From</Label>
              <Input
                id="yearFrom"
                type="number"
                placeholder="e.g., 2020"
                value={filters.yearFrom || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    yearFrom: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="yearTo">Year To</Label>
              <Input
                id="yearTo"
                type="number"
                placeholder="e.g., 2024"
                value={filters.yearTo || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    yearTo: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
              />
            </div>

            {filterOptions?.priceRanges && (
              <div>
                <Label htmlFor="price">Price Range</Label>
                <Select
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                >
                  <SelectTrigger id="price">
                    <SelectValue placeholder="All prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All prices</SelectItem>
                    {filterOptions.priceRanges.map((range) => (
                      <SelectItem key={range.label} value={range.label}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleApply}>Apply Filters</Button>
            <Button variant="outline" onClick={handleReset}>
              <X className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
