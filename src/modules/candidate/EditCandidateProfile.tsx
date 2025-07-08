import React, { useState, useEffect } from 'react';

const PROFILE_KEY = 'candidate_profile';

const defaultProfile = {
  name: '',
  role: '',
  experience: '',
  location: '',
  subscription: 'Basic',
  qualifications: '',
  cv: '',
};

const EditCandidateProfile: React.FC = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
      setProfile((prev) => ({ ...prev, cv: e.target.files![0].name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    alert('Profile updated!');
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] py-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <h2 className="font-bold text-2xl mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Name
              <input name="name" value={profile.name} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1" />
            </label>
          </div>
          <div>
            <label className="block mb-1 font-medium">Profession
              <input name="role" value={profile.role} onChange={handleChange} required placeholder="e.g. marketer, designer..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1" />
            </label>
          </div>
          <div>
            <label className="block mb-1 font-medium">Experience
              <input name="experience" value={profile.experience} onChange={handleChange} required placeholder="e.g. 3 years" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1" />
            </label>
          </div>
          <div>
            <label className="block mb-1 font-medium">Location
              <input name="location" value={profile.location} onChange={handleChange} required placeholder="City" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1" />
            </label>
          </div>
          <div>
            <label className="block mb-1 font-medium">Qualifications
              <textarea name="qualifications" value={profile.qualifications} onChange={handleChange} required placeholder="Education, skills, certificates..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1 min-h-[60px]" />
            </label>
          </div>
          <div>
            <label className="block mb-1 font-medium">Subscription Level
              <select name="subscription" value={profile.subscription} onChange={handleChange} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1">
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block mb-1 font-medium">CV (PDF/DOC)
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvChange} className="mt-2" />
              {profile.cv && <div className="mt-2 text-sm text-gray-600">Uploaded: {profile.cv}</div>}
            </label>
          </div>
          <button type="submit" className="rounded-lg px-5 py-2 bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditCandidateProfile; 