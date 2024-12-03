import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Edit, Save, X } from 'lucide-react';
import api from '../api/api';

export function WorkerDashboard() {
  const { setCurrentUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [formData, setFormData] = useState<{
    skills: string[];
    hourlyRate: number;
    experience: number;
    location: string;
    availability: string[];
    description: string;
    certifications: string[];
    photo: string | null; // Make photo explicitly nullable
  }>({
    skills: [],
    hourlyRate: 0,
    experience: 0,
    location: '',
    availability: [],
    description: '',
    certifications: [],
    photo: null, // Default to null if there's no photo
  });

  const predefinedSkills = [
    'Plumber',
    'Grass Cutter',
    'House Cleaner',
    'Carpenter',
    'Electrician',
    'Care Taker',
    'Snow Removal',
    'Other', // Add "Other" option
  ];

  const predefinedCertifications = [
    'Certified Electrician',
    'Certified Plumber',
    'Certified Carpenter',
    'Certified Care Taker',
    'Certified House Cleaner',
    'Certified Grass Cutter',
  ];

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const [customSkill, setCustomSkill] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [customCertification, setCustomCertification] = useState('');
  const [isOtherCertificationSelected, setIsOtherCertificationSelected] = useState(false);

  // Fetch current user data
  const fetchUserData = async () => {
    try {
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFormData({
        skills: response.data.skills || [],
        hourlyRate: response.data.hourlyRate || 0,
        experience: response.data.experience || 0,
        location: response.data.location || '',
        availability: response.data.availability || [],
        description: response.data.description || '',
        certifications: response.data.certifications || [],
        photo: response.data.photo || null,
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
    setIsLoading(false); // Set loading to false after fetching data
  };

  // Handle form submission for updating user data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.put('/users/update', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Update successful:', response.data);
      setFormData(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update worker:', error);
    }
    setIsEditing(false);
  };

  // Add custom skill
  const addCustomSkill = () => {
    if (customSkill.trim() && !formData.skills.includes(customSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, customSkill.trim()],
      });
      setCustomSkill('');
      setIsOtherSelected(false); // Reset "Other" selection
    }
  };

  // Handle skill selection
  const handleSkillSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSkill = e.target.value;
    if (selectedSkill === 'Other') {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
      if (!formData.skills.includes(selectedSkill)) {
        setFormData({
          ...formData,
          skills: [...formData.skills, selectedSkill],
        });
      }
    }
  };

  // Add custom certification
  const addCustomCertification = () => {
    if (customCertification.trim() && !formData.certifications.includes(customCertification)) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, customCertification.trim()],
      });
      setCustomCertification('');
      setIsOtherCertificationSelected(false); // Reset "Other" selection
    }
  };

  // Handle certification selection
  const handleCertificationSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCertification = e.target.value;
    if (selectedCertification === 'Other') {
      setIsOtherCertificationSelected(true);
    } else {
      setIsOtherCertificationSelected(false);
      if (!formData.certifications.includes(selectedCertification)) {
        setFormData({
          ...formData,
          certifications: [...formData.certifications, selectedCertification],
        });
      }
    }
  };

  // Handle photo upload
  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
    } else {
      alert('Please upload a valid image file.');
    }
  };

  // Handle availability selection
  const handleAvailabilitySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = e.target.value;
    if (selectedDay && !formData.availability.includes(selectedDay)) {
      setFormData({
        ...formData,
        availability: [...formData.availability, selectedDay],
      });
    }
  };

  // Remove selected availability
  const removeAvailability = (day: string) => {
    setFormData({
      ...formData,
      availability: formData.availability.filter((d) => d !== day),
    });
  };

  // Remove selected skill
  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  // Remove selected certification
  const removeCertification = (cert: string) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((c) => c !== cert),
    });
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
                  value={formData.hourlyRate || 0} // Default to 0
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
                <div>
                  <select
                    onChange={handleSkillSelection}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
                  >
                    <option value="">Select a skill</option>
                    {predefinedSkills.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                  {isOtherSelected && (
                    <div>
                      <input
                        type="text"
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
                        placeholder="Enter a custom skill"
                      />
                      <button
                        type="button"
                        onClick={addCustomSkill}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Add Skill
                      </button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {skill}
                        <X
                          size={16}
                          className="ml-2 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
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
                  value={formData.experience || 0} // Default to 0
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
                  value={formData.location || ''} // Default to an empty string
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
                <div>
                  <select
                    onChange={handleAvailabilitySelection}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
                  >
                    <option value="">Select availability</option>
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.availability.map((day) => (
                      <span
                        key={day}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {day}
                        <X
                          size={16}
                          className="ml-2 cursor-pointer"
                          onClick={() => removeAvailability(day)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.availability.map((day) => (
                    <span
                      key={day}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              {isEditing ? (
                <textarea
                  value={formData.description || ''} // Default to an empty string
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
                <div>
                  <select
                    onChange={handleCertificationSelection}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
                  >
                    <option value="">Select a certification</option>
                    {predefinedCertifications.map((cert) => (
                      <option key={cert} value={cert}>
                        {cert}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {isOtherCertificationSelected && (
                    <div>
                      <input
                        type="text"
                        value={customCertification}
                        onChange={(e) => setCustomCertification(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
                        placeholder="Enter a custom certification"
                      />
                      <button
                        type="button"
                        onClick={addCustomCertification}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Add Certification
                      </button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {cert}
                        <X
                          size={16}
                          className="ml-2 cursor-pointer"
                          onClick={() => removeCertification(cert)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
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