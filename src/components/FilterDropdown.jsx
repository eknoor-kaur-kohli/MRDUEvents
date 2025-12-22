import React from 'react';
import { Tag } from 'lucide-react';

const FilterDropdown = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['All', 'Tech', 'Cultural', 'Sports', 'Workshop', 'Seminar'];
  
  return (
    <div className="relative group">
      <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-purple-500 transition-colors duration-300" />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 appearance-none bg-white cursor-pointer transition-all duration-300 hover:border-purple-300 shadow-sm hover:shadow-md font-medium"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;