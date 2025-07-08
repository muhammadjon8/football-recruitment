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
  name: 'Анна Смирнова',
  role: 'Маркетолог',
  experience: '3 года',
  location: 'Санкт-Петербург',
  subscription: 'Pro',
  qualifications: 'Высшее образование, опыт работы в спортивных проектах',
  cv: 'CV_Anna_Smirnova.pdf',
};

const defaultApplications: Application[] = [
  {
    id: 1,
    position: 'Маркетолог',
    company: 'FC Digital United',
    date: '2024-06-01',
    status: 'Pending',
  },
  {
    id: 2,
    position: 'Дизайнер',
    company: 'FC Creative Stars',
    date: '2024-05-28',
    status: 'Accepted',
  },
  {
    id: 3,
    position: 'Менеджер по мероприятиям',
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
      <input value={position} onChange={e => setPosition(e.target.value)} placeholder="Вакансия" className="rounded-lg border border-gray-200 px-3 py-2 text-base" />
      <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Компания" className="rounded-lg border border-gray-200 px-3 py-2 text-base" />
      <select value={status} onChange={e => setStatus(e.target.value as any)} className="rounded-lg border border-gray-200 px-3 py-2 text-base">
        <option value="Pending">Pending</option>
        <option value="Accepted">Accepted</option>
        <option value="Declined">Declined</option>
      </select>
      <button type="submit" className="rounded-lg bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700 hover:shadow-md hover:scale-105 transition">Добавить отклик</button>
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
    <div className="min-h-screen bg-[#f9f9fb] py-6">
      <div className="container max-w-5xl mx-auto px-4">
        <h1 className="font-bold text-3xl mb-6">Candidate Dashboard</h1>
        {/* Секция: Профиль кандидата */}
        <section className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Профиль кандидата</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="space-y-1">
              <div><b>Имя:</b> {profile.name}</div>
              <div><b>Профессия:</b> {profile.role}</div>
              <div><b>Опыт:</b> {profile.experience}</div>
              <div><b>Местоположение:</b> {profile.location}</div>
              <div><b>Квалификации:</b> {profile.qualifications}</div>
              <div><b>Подписка:</b> {profile.subscription}</div>
              <div><b>CV:</b> <a href="#" className="text-blue-600 underline">{profile.cv}</a></div>
            </div>
            <button className="rounded-lg px-5 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ml-auto" onClick={() => window.location.href='/candidate/profile/edit'}>Редактировать профиль</button>
          </div>
        </section>
        {/* Секция: Мои отклики */}
        <section className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Мои отклики</h2>
          {/* TEST FORM (delete in prod) */}
          <AddApplicationForm onAdd={handleAddApplication} />
          {/* END TEST FORM */}
          {applications.length === 0 ? (
            <div className="text-gray-500">Вы ещё не откликались на вакансии.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 rounded-lg text-left">Вакансия</th>
                    <th className="p-2 rounded-lg text-left">Компания</th>
                    <th className="p-2 rounded-lg text-left">Дата</th>
                    <th className="p-2 rounded-lg text-left">Статус</th>
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
        {/* Секция: Поиск вакансий */}
        <section className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Поиск вакансий</h2>
          <button className="rounded-lg px-7 py-2 bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition" onClick={() => window.location.href='/jobs'}>Перейти к поиску</button>
        </section>
        {/* Секция: Сообщения */}
        <section className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Сообщения</h2>
          <ul className="list-none p-0 m-0">
            <li className="py-3 border-b border-gray-100 flex justify-between items-center">
              <span><b>FC Digital United</b>: "Спасибо за отклик! Мы свяжемся с вами."</span>
              <span className="text-gray-500 text-sm">2024-06-01</span>
            </li>
            <li className="py-3 border-b border-gray-100 flex justify-between items-center">
              <span><b>FC Creative Stars</b>: "Портфолио отличное! Когда сможете пройти интервью?"</span>
              <span className="text-gray-500 text-sm">2024-05-29</span>
            </li>
          </ul>
          <button className="rounded-lg px-5 py-2 bg-blue-600 text-white font-semibold mt-4 hover:bg-blue-700 transition" onClick={() => window.location.href='/inbox'}>Перейти во входящие</button>
        </section>
        {/* Секция: Настройки аккаунта */}
        <section className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Настройки аккаунта</h2>
          <ul className="list-none p-0 m-0 text-base">
            <li className="mb-2"><b>Подписка:</b> {profile.subscription}</li>
            <li className="mb-2"><button className="rounded-lg px-5 py-2 bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition" onClick={() => window.location.href='/settings'}>Перейти к настройкам</button></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CandidateDashboard; 