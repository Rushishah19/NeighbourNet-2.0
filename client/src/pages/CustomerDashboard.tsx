import { useEffect, useState } from 'react';
import { Star, MapPin, DollarSign, Briefcase, Award, Search, MessageSquare, Wallet } from 'lucide-react';
import { ContactModal } from '../components/ContactModal';
import { Worker } from '../types';
import api from '../api/api';

export function CustomerDashboard() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const fetchWorkers = async () => {
    try {
      const response = await api.get('/users/workers', {
        params: {
          search: searchTerm,
          skill: selectedSkill,
          location: selectedLocation,
          minRating: selectedRating, // Assuming selectedRating is the minimum rating filter
        },
      });
      setWorkers(response.data);
      setFilteredWorkers(response.data);
    } catch (error) {
      console.error('Failed to fetch workers:', error);
    }
  };

  const fetchFilterData = async () => {
    try {
      const skillsResponse = await api.get('/filters/skills');
      const locationsResponse = await api.get('/filters/locations');
      setAllSkills(skillsResponse.data);
      setAllLocations(locationsResponse.data);
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchFilterData();
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [searchTerm, selectedSkill, selectedLocation, selectedRating]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Skilled Workers</h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Search and Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Skills</option>
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {allLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                Rating <Star size={16} className="ml-1 text-yellow-400" />
              </div>
            </label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Ratings</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} & up
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                {worker.photo ? (
                  <img
                    src={worker.photo}
                    alt="Worker"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full" />
                )}

                <h3 className="text-xl font-semibold mt-2">{worker.name}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1" />
                  {worker.location}
                </div>
              </div>
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                <Star size={16} className="text-yellow-400 mr-1" />
                <span className="font-medium">{worker?.rating?.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <DollarSign size={16} className="mr-2" />
                ${worker.hourlyRate}/hour
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase size={16} className="mr-2" />
                {worker.experience} years experience
              </div>
              <div className="flex items-center text-gray-600">
                <Award size={16} className="mr-2" />
                {worker.completedJobs} jobs completed
              </div>
            </div>

            {/* Buttons for Chat and Cart */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedWorker(worker)}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageSquare size={16} className="mr-2" />
                Chat
              </button>

              <button
                onClick={() => setSelectedWorker(worker)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Wallet size={16} className="mr-2" />
                Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedWorker && (
        <ContactModal
          worker={selectedWorker}
          onClose={() => setSelectedWorker(null)}
        />
      )}

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No workers found matching your criteria
        </div>
      )}
    </div>
  );
}
