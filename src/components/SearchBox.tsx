import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Crosshair } from "lucide-react";

interface SearchBoxProps {
  onSearch: (location: string) => void;
  onNearMe: () => void;
}

export const SearchBox = ({ onSearch, onNearMe }: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter city, area, or pincode..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-4 py-3 text-base border-2 border-border focus:border-primary transition-colors duration-300"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            type="button"
            variant="outline" 
            onClick={onNearMe}
            className="px-4 py-3 border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            <Crosshair className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Near Me</span>
          </Button>
          
          <Button 
            type="submit" 
            className="px-6 py-3 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-soft hover:shadow-medium"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};