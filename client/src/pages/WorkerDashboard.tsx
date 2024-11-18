import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Edit, Save, X } from 'lucide-react';
import api from '../api/api';

export function WorkerDashboard() {
  const { currentUser, setCurrentUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    skills: [],
    hourlyRate: 0,
    experience: 0,
    location: '',
    availability: '',
    description: '',
    certifications: [],
    photo: '',
  });

  // Fetch current user data
  const fetchUserData = async () => {
    try {
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFormData(response.data); // Populate formData with fetched user data
      setCurrentUser(response.data); // Update the global store if needed
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  // Handle form submission for updating user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        '/users/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Update successful:', response.data);
      setFormData(response.data); // Optionally update formData with server's response
      // setCurrentUser(response.data); // Update global store
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error('Failed to update worker:', error);
    }
    setIsEditing(false);
  };

  // Handle photo upload
  const uploadPhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({ ...formData, photo: reader.result });
      };
    } else {
      alert('Please upload a valid image file.');
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUserData();
  }, []);

  // Cleanup URL object when the component unmounts
  useEffect(() => {
    return () => {
      if (formData.photo) {
        URL.revokeObjectURL(formData.photo);
      }
    };
  }, [formData.photo]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Worker Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? (
              <>
                <X size={20} className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit size={20} className="mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-6">
            {/* Photo */}
            <div className="flex justify-center mb-6">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <p className="text-gray-500">No photo uploaded</p>
              )}
            </div>
            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Photo
                </label>
                <input
                  type="file"
                  onChange={uploadPhoto}
                  className="block w-full"
                  accept="image/*"
                />
              </div>
            )}

            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate (CAD)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) =>
                    setFormData({ ...formData, hourlyRate: Number(e.target.value) })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">${formData.hourlyRate}/hour</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData?.skills?.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: e?.target?.value?.split(',').map((s) => s.trim()),
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter skills separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData?.skills?.length>0 && formData?.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience (Years)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: Number(e.target.value) })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">{formData.experience} years</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">{formData.location}</p>
              )}
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">{formData.availability}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              {isEditing ? (
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">{formData.description}</p>
              )}
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certifications
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData?.certifications?.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certifications: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter certifications separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData?.certifications?.map((cert) => (
                    <span
                      key={cert}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save size={20} className="mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
