import { useNavigate, useParams } from 'react-router-dom';
import { mockCandidates } from '../teams/TeamDashboard';
import { useEffect, useState } from 'react';

const TEAM_SHORTLIST_KEY = "team_shortlist";

const CandidateProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const candidate = mockCandidates.find((c) => String(c.id) === String(id));
  const [shortlist, setShortlist] = useState<number[]>([]);

  useEffect(() => {
    const sl = localStorage.getItem(TEAM_SHORTLIST_KEY);
    if (sl) setShortlist(JSON.parse(sl));
  }, []);

  const toggleShortlist = (id: number) => {
    setShortlist(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(cid => cid !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem(TEAM_SHORTLIST_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  if (!candidate) {
    return <div className="p-10 text-center text-gray-500">Кандидат не найден</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 py-8">
      <div className="container mx-auto max-w-xl px-4">
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300" onClick={() => navigate(-1)}>
            ← Назад к поиску
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">{candidate.firstName} {candidate.lastName}</h1>
          <div className="mb-2"><b>Роль:</b> {candidate.position}</div>
          <div className="mb-2"><b>Опыт:</b> {candidate.experience} лет</div>
          <div className="mb-2"><b>Локация:</b> {candidate.location}</div>
          <div className="mb-2"><b>Навыки:</b> {candidate.skills}</div>
          <div className="mb-2"><b>Тариф:</b> {candidate.selectedPlan === 'pro' ? 'Pro' : 'Basic'}</div>
          <div className="my-4 p-4 bg-gray-50 rounded-lg">
            <b>CV:</b> <span className="text-gray-500">(Здесь будет ссылка или предпросмотр CV кандидата)</span>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              className={`rounded-lg px-5 py-2 font-semibold transition border-2 ${shortlist.includes(candidate.id) ? 'bg-amber-400 text-black border-amber-500' : 'bg-white text-amber-600 border-amber-400 hover:bg-amber-50'}`}
              onClick={() => toggleShortlist(candidate.id)}
            >
              {shortlist.includes(candidate.id) ? 'В shortlist ✓' : 'В shortlist'}
            </button>
            <button
              className="rounded-lg px-5 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => navigate('/team/inbox')}
            >
              Отправить сообщение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileView; 