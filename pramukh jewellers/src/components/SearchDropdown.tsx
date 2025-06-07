
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { searchJewelry } from '@/utils/searchUtils';
import { useSearch } from '@/contexts/SearchContext';

const SearchDropdown = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch();
  const [localQuery, setLocalQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (localQuery.trim()) {
      const results = searchJewelry(localQuery);
      setSuggestions(results.slice(0, 5)); // Show top 5 suggestions
    } else {
      setSuggestions([]);
    }
  }, [localQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(false);
    setLocalQuery('');
    setSuggestions([]);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && localQuery.trim()) {
      handleSearch(localQuery);
    }
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setLocalQuery('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (item: any) => {
    handleSearch(item.category);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {isSearchOpen ? (
        <div className="relative">
          <Input
            ref={inputRef}
            placeholder="Search jewelry types..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-64 pr-10 transition-all duration-300"
            onBlur={() => {
              // Delay closing to allow clicking on suggestions
              setTimeout(() => {
                setIsSearchOpen(false);
                setLocalQuery('');
                setSuggestions([]);
              }, 200);
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={() => {
              setIsSearchOpen(false);
              setLocalQuery('');
              setSuggestions([]);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Search Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-50 mt-1">
              <div className="p-2">
                <div className="text-xs text-muted-foreground mb-2">Suggestions:</div>
                {suggestions.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center p-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded object-cover mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
              {localQuery.trim() && (
                <div className="border-t border-border p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleSearch(localQuery)}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search for "{localQuery}"
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SearchDropdown;
