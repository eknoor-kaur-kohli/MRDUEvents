import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const EventCard = ({ event }) => {
  const categoryColors = {
    Tech: 'from-blue-500 to-cyan-500',
    Cultural: 'from-purple-500 to-pink-500',
    Sports: 'from-green-500 to-emerald-500',
    Workshop: 'from-orange-500 to-amber-500',
    Seminar: 'from-rose-500 to-red-500'
  };

  const categoryBadgeColors = {
    Tech: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    Cultural: 'bg-gradient-to-r from-purple-500 to-pink-500',
    Sports: 'bg-gradient-to-r from-green-500 to-emerald-500',
    Workshop: 'bg-gradient-to-r from-orange-500 to-amber-500',
    Seminar: 'bg-gradient-to-r from-rose-500 to-red-500'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${categoryColors[event.category]}`}></div>
      
      <div className="p-6 pt-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {event.name}
          </h3>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white ${categoryBadgeColors[event.category]} shadow-md`}>
            {event.category}
          </span>
        </div>
        
        <div className="space-y-3 mb-5">
          <div className="flex items-center text-gray-600 text-sm bg-gray-50 rounded-lg p-3 group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300">
            <Calendar className="w-5 h-5 mr-3 text-blue-500" />
            <span className="font-medium">{formatDate(event.date)} at {formatTime(event.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm bg-gray-50 rounded-lg p-3 group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-pink-50 transition-all duration-300">
            <MapPin className="w-5 h-5 mr-3 text-purple-500" />
            <span className="font-medium">{event.location}</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;