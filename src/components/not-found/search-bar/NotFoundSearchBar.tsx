import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

type NotFoundSearchBarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};

const NotFoundSearchBar: React.FC<NotFoundSearchBarProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <div className="mb-12">
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for pizzas, menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg border-2 border-orange-200 focus:border-orange-500 rounded-full"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NotFoundSearchBar;