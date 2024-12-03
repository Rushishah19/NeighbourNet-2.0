import { useEffect, useState } from 'react';
import { Star, MapPin, DollarSign, Briefcase, Search, MessageSquare, Wallet, Map, X, PhoneCall, Inbox} from 'lucide-react';
import { Worker } from '../types';
import api from '../api/api'; 
import { BookingModal } from '../components/BookingModal';

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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBooking = (worker: Worker) => {
    setSelectedWorker(worker);
    setBookingModalOpen(true);
  };

  const fetchWorkers = async () => {
    try {
      const response = await api.get('/users/workers', {
        params: {
          search: searchTerm,
          skill: selectedSkill,
          location: selectedLocation,
          minRating: selectedRating,
        },
      });
      console.log('Workers API Response:', response.data);
      setWorkers(response.data);
      setFilteredWorkers(response.data);
    } catch (error) {
      console.error('Failed to fetch workers:', error);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
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

  useEffect(() => {
    if (selectedSkill) {
      const filtered = workers.filter((worker) =>
        worker.skills.some((skill) =>
          skill.toLowerCase().includes(selectedSkill.toLowerCase())
        )
      );
      setFilteredWorkers(filtered);
    } else {
      setFilteredWorkers(workers);
    }
  }, [selectedSkill, workers]);

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
                placeholder="Search by name"
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
            <div className="relative">
              <input
                type="text"
                placeholder="Enter or search for a skill"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-3"
              />
              {selectedSkill && (
                <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg w-full mt-1 max-h-40 overflow-y-auto z-10">
                  {allSkills
                    .filter((skill) =>
                      skill.toLowerCase().includes(selectedSkill.toLowerCase())
                    )
                    .map((filteredSkill) => (
                      <div
                        key={filteredSkill}
                        onClick={() => setSelectedSkill(filteredSkill)}
                        className="p-2 cursor-pointer hover:bg-blue-50"
                      >
                        {filteredSkill}
                      </div>
                    ))}
                </div>
              )}
            </div>
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
                <h2 className="text-2xl font-semibold mt-2">{worker.name}</h2>
              </div>
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                <Star size={16} className="text-yellow-400 mr-1" />
                <span className="font-medium">{worker?.rating?.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600 mt-1">
                <PhoneCall size={16} className="mr-2" />
                {worker.phone}
                <div className="ml-2 mr-2">|</div>
                <Inbox size={16} className="mr-2" />
                {worker.email}
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin size={16} className="mr-2" />
                {worker.location ? (
                  worker.location
                ) : (
                  <span className="italic text-gray-400">No Location Provided</span>
                )}
              </div>

              <div className="flex items-center text-gray-600">
                <DollarSign size={16} className="mr-2" />
                {worker.hourlyRate}/ hour
              </div>

              <div className="flex items-center text-gray-600">
                <Briefcase size={16} className="mr-2" />
                {worker.experience} years experience
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Availability</div>
                {worker.availability && worker.availability.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {worker.availability.map((availability) => (
                      <span
                        key={availability}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {availability}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 italic">No Availability Provided</div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Skills</div>
              {worker.skills && worker.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {worker.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400 italic">No Skills Provided</div>
              )}
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Certifications</div>
              {worker.certifications && worker.certifications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {worker.certifications.map((certification) => (
                    <span
                      key={certification}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {certification}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400 italic">No Certifications Provided</div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => handleBooking(worker)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Wallet size={16} className="mr-2" />
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 flex items-center space-x-2">
        <button
          onClick={() => window.location.href = '/map'}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
        >
          <Map size={20} />
        </button>

        <div className="fixed bottom-4 right-4">
          <button
            onClick={toggleChat}
            className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700"
          >
            {isChatOpen ? <X size={20} /> : <MessageSquare size={20} />}
          </button>
        </div>

        {isChatOpen && (
          <div className="fixed bottom-16 right-4 w-80 h-96 bg-white rounded-lg shadow-lg">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/7LSWMe1hKD9ydWyadZWnV"
              title="Chatbase Chatbot"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="microphone; autoplay"
            ></iframe>
          </div>
        )}
      </div>

      {isBookingModalOpen && selectedWorker && (
        <BookingModal
          worker={selectedWorker}
          onClose={() => setBookingModalOpen(false)}
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