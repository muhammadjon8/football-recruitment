import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../shared/utils/cookie-helper.util';

const PROFILE_KEY = 'candidate_profile';
const APPLICATIONS_KEY = 'candidate_applications';

type Application = {
  id: number;
  position: string;
  company: string;
  date: string;
  status: 'Pending' | 'Accepted' | 'Declined';
};

const defaultProfile = {
  name: 'Anna Smirnova',
  role: 'Marketer',
  experience: '3 years',
  location: 'Saint Petersburg',
  subscription: 'Pro',
  qualifications: 'Higher education, experience in sports projects',
  cv: 'CV_Anna_Smirnova.pdf',
};

const defaultApplications: Application[] = [
  {
    id: 1,
    position: 'Marketer',
    company: 'FC Digital United',
    date: '2024-06-01',
    status: 'Pending',
  },
  {
    id: 2,
    position: 'Designer',
    company: 'FC Creative Stars',
    date: '2024-05-28',
    status: 'Accepted',
  },
  {
    id: 3,
    position: 'Event Manager',
    company: 'FC Event Pro',
    date: '2024-05-20',
    status: 'Declined',
  },
];

const getApplications = (): Application[] => {
  const saved = localStorage.getItem(APPLICATIONS_KEY);
  if (saved) return JSON.parse(saved);
  return defaultApplications;
};

const AddApplicationForm: React.FC<{ onAdd: (app: Application) => void }> = ({ onAdd }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'Pending' | 'Accepted' | 'Declined'>('Pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!position || !company) return;
    const newApp: Application = {
      id: Date.now(),
      position,
      company,
      date: new Date().toISOString().slice(0, 10),
      status,
    };
    onAdd(newApp);
    setPosition('');
    setCompany('');
    setStatus('Pending');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4 items-center">
      <input value={position} onChange={e => setPosition(e.target.value)} placeholder="Position" className="rounded-lg border border-gray-200 px-3 py-2 text-base" />
      <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" className="rounded-lg border border-gray-200 px-3 py-2 text-base" />
      <select value={status} onChange={e => setStatus(e.target.value as any)} className="rounded-lg border border-gray-200 px-3 py-2 text-base">
        <option value="Pending">Pending</option>
        <option value="Accepted">Accepted</option>
        <option value="Declined">Declined</option>
      </select>
      <button type="submit" className="rounded-lg px-5 py-2 bg-blue-600 text-white font-semibold shadow-md hover:scale-105 transition">Add Application</button>
    </form>
  );
};

const CandidateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(defaultProfile);
  const [applications, setApplications] = useState<Application[]>(getApplications());

  useEffect(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) setProfile(JSON.parse(saved));
    setApplications(getApplications());
  }, []);

//   useEffect(() => {
//     const accessToken = getCookie('accessToken');
//     if (!accessToken) {
//       navigate('/login');
//     }
//   }, [navigate]);

  const handleAddApplication = (app: Application) => {
    const updated = [app, ...applications];
    setApplications(updated);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Candidate Dashboard</h1>
        {/* Навигация */}
        <div className="flex gap-4 mb-8">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Profile</button>
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">Applications</button>
          <button className="px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition">Job Search</button>
          <button className="px-4 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition">Messages</button>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition">Settings</button>
        </div>
        {/* Candidate Profile Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Candidate Profile</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="space-y-1">
              <div><b>Name:</b> {profile.name}</div>
              <div><b>Profession:</b> {profile.role}</div>
              <div><b>Experience:</b> {profile.experience}</div>
              <div><b>Location:</b> {profile.location}</div>
              <div><b>Qualifications:</b> {profile.qualifications}</div>
              <div><b>Subscription:</b> {profile.subscription}</div>
              <div><b>CV:</b> <a href="#" className="text-blue-600 underline">{profile.cv}</a></div>
            </div>
            <button className="rounded-lg px-4 py-2 bg-blue-600 text-white font-semibold mt-4 hover:bg-blue-700 transition" onClick={() => window.location.href='/candidate/profile/edit'}>Edit Profile</button>
          </div>
        </section>
        {/* My Applications Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">My Applications</h2>
          <AddApplicationForm onAdd={handleAddApplication} />
          {applications.length === 0 ? (
            <div className="text-gray-500 mb-4">You have not applied to any jobs yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 rounded-lg text-left">Position</th>
                    <th className="p-2 rounded-lg text-left">Company</th>
                    <th className="p-2 rounded-lg text-left">Date</th>
                    <th className="p-2 rounded-lg text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app: Application) => (
                    <tr key={app.id}>
                      <td className="p-2">{app.position}</td>
                      <td className="p-2">{app.company}</td>
                      <td className="p-2">{app.date}</td>
                      <td className="p-2">
                        {app.status === 'Pending' && <span className="text-orange-400 font-semibold">Pending</span>}
                        {app.status === 'Accepted' && <span className="text-green-500 font-semibold">Accepted</span>}
                        {app.status === 'Declined' && <span className="text-red-500 font-semibold">Declined</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        {/* Job Search Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Job Search</h2>
          <button className="rounded-lg px-4 py-2 bg-amber-500 text-black font-semibold mt-2 hover:bg-amber-600 transition" onClick={() => window.location.href='/jobs'}>Go to Job Search</button>
        </section>
        {/* Messages Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Messages</h2>
          <ul className="list-none p-0 m-0">
            <li className="py-3 border-b border-gray-100 flex justify-between items-center">
              <span><b>FC Digital United</b>: "Thank you for your response! We will contact you soon."</span>
              <span className="text-gray-500 text-sm">2024-06-01</span>
            </li>
            <li className="py-3 border-b border-gray-100 flex justify-between items-center">
              <span><b>FC Creative Stars</b>: "Great portfolio! When can you do an interview?"</span>
              <span className="text-gray-500 text-sm">2024-05-29</span>
            </li>
          </ul>
          <button className="rounded-lg px-4 py-2 bg-gray-600 text-white font-semibold mt-2 hover:bg-gray-700 transition" onClick={() => window.location.href='/inbox'}>Go to Inbox</button>
        </section>
        {/* Account Settings Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Account Settings</h2>
          <ul className="list-none p-0 m-0 text-base">
            <li className="mb-2"><b>Subscription:</b> {profile.subscription}</li>
            <li className="mb-2"><button className="rounded-lg px-4 py-2 bg-purple-600 text-white font-semibold mt-2 hover:bg-purple-700 transition" onClick={() => window.location.href='/settings'}>Go to Settings</button></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CandidateDashboard; 