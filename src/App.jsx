import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import { eventData } from './data/eventData';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  // Filter and categorize events
  useEffect(() => {
    const now = new Date();
    
    // Filter by search term and category
    let filtered = eventData.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Categorize by time
    const ongoing = [];
    const upcoming = [];
    const past = [];

    filtered.forEach(event => {
      const eventStart = new Date(event.date);
      const eventEnd = new Date(event.endDate);

      if (now >= eventStart && now <= eventEnd) {
        ongoing.push(event);
      } else if (now < eventStart) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    // Sort by date
    ongoing.sort((a, b) => new Date(a.date) - new Date(b.date));
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    past.sort((a, b) => new Date(b.date) - new Date(a.date));

    setOngoingEvents(ongoing);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white tracking-tight mb-3 drop-shadow-lg">
              MRDU Events
            </h1>
            <p className="text-blue-100 text-lg font-medium">Discover and join exciting campus events ✨</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-white/20"></div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-10 border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <FilterDropdown selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          </div>
        </div>

        {/* Events Display */}
        {ongoingEvents.length > 0 && (
          <EventList events={ongoingEvents} title="🔴 Ongoing Events" />
        )}
        
        {upcomingEvents.length > 0 && (
          <EventList events={upcomingEvents} title="🗓️ Upcoming Events" />
        )}
        
        {pastEvents.length > 0 && (
          <EventList events={pastEvents} title="📅 Past Events" />
        )}

        {filteredEvents.length === 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-16 text-center border border-white/50">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-xl font-medium">No events match your search criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-300 text-lg font-medium">© 2025 MRDU Events</p>
          <p className="text-gray-400 mt-2">Built for students, by students 💙</p>
        </div>
      </footer>
    </div>
  );
};

export default App;