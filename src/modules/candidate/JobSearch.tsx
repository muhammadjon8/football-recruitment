import React, { useState, useMemo } from 'react';

const mockJobs = [
  {
    id: 1,
    title: 'Маркетолог',
    company: 'FC Digital United',
    level: 'Middle',
    location: 'Москва',
    salary: 90000,
    requirements: 'Опыт в digital-маркетинге, знание SMM, аналитика',
    date: '2024-06-01',
  },
  {
    id: 2,
    title: 'Дизайнер',
    company: 'FC Creative Stars',
    level: 'Junior',
    location: 'Санкт-Петербург',
    salary: 70000,
    requirements: 'Figma, Adobe, портфолио проектов',
    date: '2024-05-28',
  },
  {
    id: 3,
    title: 'Менеджер по мероприятиям',
    company: 'FC Event Pro',
    level: 'Senior',
    location: 'Казань',
    salary: 120000,
    requirements: 'Организация спортивных событий, коммуникации',
    date: '2024-05-20',
  },
  {
    id: 4,
    title: 'Копирайтер',
    company: 'FC Media Team',
    level: 'Middle',
    location: 'Москва',
    salary: 80000,
    requirements: 'Портфолио текстов, опыт в спортивной тематике',
    date: '2024-05-18',
  },
];

const unique = (arr: string[]) => Array.from(new Set(arr));

const JobSearch: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesKeyword = keyword === '' || job.title.toLowerCase().includes(keyword.toLowerCase()) || job.company.toLowerCase().includes(keyword.toLowerCase()) || job.requirements.toLowerCase().includes(keyword.toLowerCase());
      const matchesRole = role === '' || job.title === role;
      const matchesLevel = level === '' || job.level === level;
      const matchesLocation = location === '' || job.location === location;
      const matchesSalary = salary === '' || job.salary >= Number(salary);
      return matchesKeyword && matchesRole && matchesLevel && matchesLocation && matchesSalary;
    });
  }, [keyword, role, level, location, salary]);

  return (
    <div className="min-h-screen bg-[#f9f9fb] py-6">
      <div className="container max-w-5xl mx-auto px-4">
        <h1 className="font-bold text-3xl mb-6">Поиск вакансий</h1>
        <form className="flex flex-wrap gap-4 mb-6 bg-white rounded-xl p-6 shadow-sm" onSubmit={e => e.preventDefault()}>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Ключевое слово" className="flex-1 min-w-[140px] rounded-lg border border-gray-200 px-3 py-2 text-base" />
          <select value={role} onChange={e => setRole(e.target.value)} className="min-w-[120px] rounded-lg border border-gray-200 px-3 py-2 text-base">
            <option value="">Все профессии</option>
            {unique(mockJobs.map(j => j.title)).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={level} onChange={e => setLevel(e.target.value)} className="min-w-[110px] rounded-lg border border-gray-200 px-3 py-2 text-base">
            <option value="">Все уровни</option>
            {unique(mockJobs.map(j => j.level)).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={location} onChange={e => setLocation(e.target.value)} className="min-w-[110px] rounded-lg border border-gray-200 px-3 py-2 text-base">
            <option value="">Все города</option>
            {unique(mockJobs.map(j => j.location)).map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <input value={salary} onChange={e => setSalary(e.target.value.replace(/\D/g, ''))} placeholder="Зарплата от" className="min-w-[100px] rounded-lg border border-gray-200 px-3 py-2 text-base" />
        </form>
        <div className="flex flex-col gap-5">
          {filteredJobs.length === 0 ? (
            <div className="text-gray-500 bg-white rounded-xl p-10 text-center">Вакансии не найдены</div>
          ) : (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-wrap items-center gap-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="font-semibold text-lg">{job.title}</div>
                  <div className="text-blue-600 font-medium">{job.company}</div>
                  <div className="text-gray-500 text-sm">{job.location} • {job.level} • {job.salary.toLocaleString()}₽</div>
                  <div className="mt-2">{job.requirements}</div>
                </div>
                <div className="text-right min-w-[140px]">
                  <div className="text-gray-400 text-xs">Опубликовано: {job.date}</div>
                  <button className="rounded-lg px-5 py-2 bg-blue-600 text-white font-semibold mt-3 hover:bg-blue-700 transition" onClick={() => alert('Детали вакансии (заглушка)')}>Подробнее</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch; 