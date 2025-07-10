import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTeamProfile from "./EditTeamProfile";
import { useForm } from "react-hook-form";
import LocationSearch from "../../components/LocationSearch";
import { Range } from "react-range";

const TEAM_PROFILE_KEY = "team_profile";
const TEAM_VACANCIES_KEY = "team_vacancies";
const TEAM_SHORTLIST_KEY = "team_shortlist";
const TEAM_APPLICATIONS_KEY = "team_applications";

const defaultProfile = {
  email: "",
  teamName: "",
  website: "",
  location: "",
  description: "",
  logo: null,
};

type Vacancy = {
  id: string;
  role: string;
  requirements: string;
  salaryFrom?: string;
  salaryTo?: string;
  location?: string;
  anyLocation?: boolean;
  expiry: string;
};

function CreateVacancyForm({ onClose, onAdd, onSave, vacancy }: { onClose: () => void; onAdd?: (vac: Vacancy) => void; onSave?: (vac: Vacancy) => void; vacancy?: Vacancy }) {
  const isEdit = !!vacancy;
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<{ role: string; requirements: string; salaryFrom: string; salaryTo: string; expiry: string }>({
    defaultValues: isEdit ? {
      role: vacancy?.role || "",
      requirements: vacancy?.requirements || "",
      salaryFrom: vacancy?.salaryFrom || "",
      salaryTo: vacancy?.salaryTo || "",
      expiry: vacancy?.expiry || "",
    } : undefined
  });
  const [location, setLocation] = useState(vacancy?.location || "");
  const [anyLocation, setAnyLocation] = useState(!!vacancy?.anyLocation);
  useEffect(() => {
    if (isEdit && vacancy) {
      setValue("role", vacancy.role || "");
      setValue("requirements", vacancy.requirements || "");
      setValue("salaryFrom", vacancy.salaryFrom || "");
      setValue("salaryTo", vacancy.salaryTo || "");
      setValue("expiry", vacancy.expiry || "");
      setLocation(vacancy.location || "");
      setAnyLocation(!!vacancy.anyLocation);
    }
  }, [isEdit, vacancy, setValue]);
  const onSubmit = (data: { role: string; requirements: string; salaryFrom: string; salaryTo: string; expiry: string }) => {
    const vac: Vacancy = {
      ...data,
      id: isEdit && vacancy ? vacancy.id : Date.now().toString(),
      location: anyLocation ? undefined : location,
      anyLocation,
    };
    if (isEdit && onSave) {
      onSave(vac);
    } else if (onAdd) {
      onAdd(vac);
    }
    reset();
    setLocation("");
    setAnyLocation(false);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">{isEdit ? "Edit Vacancy" : "Create Vacancy"}</h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input {...register("role", { required: true })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1" />
            {errors.role && <p className="text-red-500 text-sm">Role is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Requirements</label>
            <textarea {...register("requirements", { required: true })} className="w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[60px] text-base mt-1" />
            {errors.requirements && <p className="text-red-500 text-sm">Requirements are required</p>}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Salary from</label>
              <input type="number" min="0" {...register("salaryFrom")} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Salary to</label>
              <input type="number" min="0" {...register("salaryTo")} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="anyLocation" checked={anyLocation} onChange={e => setAnyLocation(e.target.checked)} />
              <label htmlFor="anyLocation" className="text-sm">Any location (Remote)</label>
            </div>
            {!anyLocation && (
              <LocationSearch value={location} onSelect={setLocation} />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input type="date" {...register("expiry", { required: true })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-base mt-1" />
            {errors.expiry && <p className="text-red-500 text-sm">Expiry date is required</p>}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">{isEdit ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Мок-данные кандидатов
export const mockCandidates: Array<{
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  experience: string;
  location: string;
  skills: string;
  selectedPlan: string;
}> = [
  {
    id: 1,
    firstName: 'Анна',
    lastName: 'Смирнова',
    position: 'Маркетолог',
    experience: '3',
    location: 'Санкт-Петербург',
    skills: 'SMM, Digital, Аналитика',
    selectedPlan: 'pro',
  },
  {
    id: 2,
    firstName: 'Иван',
    lastName: 'Петров',
    position: 'Дизайнер',
    experience: '2',
    location: 'Москва',
    skills: 'Figma, Adobe, UI/UX',
    selectedPlan: 'basic',
  },
  {
    id: 3,
    firstName: 'Мария',
    lastName: 'Кузнецова',
    position: 'Event Manager',
    experience: '5',
    location: 'Казань',
    skills: 'Организация мероприятий, коммуникации',
    selectedPlan: 'pro',
  },
];

// Получаем уникальные значения для select
const uniquePositions = Array.from(new Set(mockCandidates.map(c => c.position)));
const uniqueLocations = Array.from(new Set(mockCandidates.map(c => c.location)));
const minExp = Math.min(...mockCandidates.map(c => Number(c.experience)));
const maxExp = Math.max(...mockCandidates.map(c => Number(c.experience)));

// Мок-данные заявок (в реальном проекте — API)
export type ApplicationStatus = 'pending' | 'accepted' | 'declined';
export type Application = {
  id: number;
  vacancyId: string;
  candidateId: number;
  status: ApplicationStatus;
};

const initialApplications: Application[] = [
  { id: 1, vacancyId: '1', candidateId: 1, status: 'pending' },
  { id: 2, vacancyId: '2', candidateId: 2, status: 'pending' },
  { id: 3, vacancyId: '1', candidateId: 3, status: 'pending' },
];

const TeamDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(defaultProfile);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [showCreateVacancy, setShowCreateVacancy] = useState(false);
  const [editVacancy, setEditVacancy] = useState<Vacancy | null>(null);
  const [shortlist, setShortlist] = useState<number[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(TEAM_PROFILE_KEY);
    if (saved) setProfile(JSON.parse(saved));
    const v = localStorage.getItem(TEAM_VACANCIES_KEY);
    if (v) setVacancies(JSON.parse(v));
    const sl = localStorage.getItem(TEAM_SHORTLIST_KEY);
    if (sl) setShortlist(JSON.parse(sl));
    const apps = localStorage.getItem(TEAM_APPLICATIONS_KEY);
    if (apps) setApplications(JSON.parse(apps));
    else setApplications(initialApplications);
  }, []);

  const handleAddVacancy = (vac: Vacancy) => {
    const updated = [vac, ...vacancies];
    setVacancies(updated);
    localStorage.setItem(TEAM_VACANCIES_KEY, JSON.stringify(updated));
  };

  const handleSaveVacancy = (vac: Vacancy) => {
    const updated = vacancies.map(v => v.id === vac.id ? vac : v);
    setVacancies(updated);
    localStorage.setItem(TEAM_VACANCIES_KEY, JSON.stringify(updated));
  };

  const handleDeleteVacancy = (id: string) => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      const updated = vacancies.filter(v => v.id !== id);
      setVacancies(updated);
      localStorage.setItem(TEAM_VACANCIES_KEY, JSON.stringify(updated));
    }
  };

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

  const updateApplicationStatus = (id: number, status: ApplicationStatus) => {
    setApplications(prev => {
      const updated = prev.map(app => app.id === id ? { ...app, status } : app);
      localStorage.setItem(TEAM_APPLICATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const [candidateFilters, setCandidateFilters] = useState({
    name: '',
    position: '',
    experienceRange: [minExp, maxExp],
    location: '',
    skills: '',
  });

  const filteredCandidates = mockCandidates.filter(c => {
    const matchesName = candidateFilters.name === '' || (`${c.firstName} ${c.lastName}`.toLowerCase().includes(candidateFilters.name.toLowerCase()));
    const matchesPosition = candidateFilters.position === '' || c.position === candidateFilters.position;
    const exp = Number(c.experience);
    const matchesExperience = exp >= candidateFilters.experienceRange[0] && exp <= candidateFilters.experienceRange[1];
    const matchesLocation = candidateFilters.location === '' || c.location === candidateFilters.location;
    const matchesSkills = candidateFilters.skills === '' || (c.skills && c.skills.toLowerCase().includes(candidateFilters.skills.toLowerCase()));
    return matchesName && matchesPosition && matchesExperience && matchesLocation && matchesSkills;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Team Dashboard</h1>
        {/* Профиль команды */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Team Profile</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="space-y-1">
              <div><b>Club Name:</b> {profile.teamName}</div>
              <div><b>Email:</b> {profile.email}</div>
              <div><b>Website:</b> {profile.website}</div>
              <div><b>Location:</b> {profile.location}</div>
              <div><b>Description:</b> {profile.description}</div>
            </div>
            {/* Логотип */}
            {profile.logo && typeof profile.logo === "object" && profile.logo.name && (
              <div className="ml-auto">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <span className="text-gray-400 text-xs">{profile.logo.name}</span>
                </div>
              </div>
            )}
            <button className="rounded-lg px-4 py-2 bg-blue-600 text-white font-semibold mt-4 hover:bg-blue-700 transition" onClick={() => navigate('/team/profile/edit')}>Edit Profile</button>
          </div>
        </section>
        {/* Вакансии */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Vacancies</h2>
          {vacancies.length === 0 ? (
            <div className="text-gray-500 mb-4">No vacancies yet.</div>
          ) : (
            <div className="flex flex-col gap-4 mb-4">
              {vacancies.map(vac => {
                let salaryStr = "";
                if (vac.salaryFrom && vac.salaryTo) salaryStr = `from ${vac.salaryFrom} to ${vac.salaryTo}`;
                else if (vac.salaryFrom) salaryStr = `from ${vac.salaryFrom}`;
                else if (vac.salaryTo) salaryStr = `to ${vac.salaryTo}`;
                let locationStr = vac.anyLocation ? "Any location (Remote)" : (vac.location || "");
                return (
                  <div key={vac.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-2 bg-gray-50">
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{vac.role}</div>
                      <div className="text-gray-600 text-sm">{vac.requirements}</div>
                      <div className="text-gray-500 text-xs mt-1">{salaryStr && <>Salary: {salaryStr} | </>}{locationStr && <>Location: {locationStr} | </>}Expiry: {vac.expiry}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600" onClick={() => setEditVacancy(vac)}>Edit</button>
                      <button className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600" onClick={() => handleDeleteVacancy(vac.id)}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <button className="rounded-lg px-4 py-2 bg-green-600 text-white font-semibold mt-2 hover:bg-green-700 transition" onClick={() => setShowCreateVacancy(true)}>Create Vacancy</button>
          {showCreateVacancy && (
            <CreateVacancyForm onClose={() => setShowCreateVacancy(false)} onAdd={handleAddVacancy} />
          )}
          {editVacancy && (
            <CreateVacancyForm onClose={() => setEditVacancy(null)} onSave={handleSaveVacancy} vacancy={editVacancy} />
          )}
        </section>
        {/* Поиск кандидатов */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Search Candidates</h2>
          <form className="flex flex-wrap gap-4 mb-6 items-center" onSubmit={e => e.preventDefault()}>
            <input value={candidateFilters.name} onChange={e => setCandidateFilters(f => ({ ...f, name: e.target.value }))} placeholder="Name" className="flex-1 min-w-[140px] rounded-lg border border-gray-200 px-3 py-2 text-base" />
            <select value={candidateFilters.position} onChange={e => setCandidateFilters(f => ({ ...f, position: e.target.value }))} className="min-w-[120px] rounded-lg border border-gray-200 px-3 py-2 text-base">
              <option value="">Role</option>
              {uniquePositions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
            </select>
            <select value={candidateFilters.location} onChange={e => setCandidateFilters(f => ({ ...f, location: e.target.value }))} className="min-w-[110px] rounded-lg border border-gray-200 px-3 py-2 text-base">
              <option value="">Location</option>
              {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <div className="flex flex-col min-w-[170px]">
              <label className="text-xs text-gray-500 mb-1">Experience (years)</label>
              <Range
                step={1}
                min={minExp}
                max={maxExp}
                values={candidateFilters.experienceRange}
                onChange={vals => setCandidateFilters(f => ({ ...f, experienceRange: vals }))}
                renderTrack={({ props, children }) => (
                  <div {...props} className="h-2 w-full rounded bg-gray-200 flex items-center" style={{ margin: '0 8px' }}>
                    <div className="h-2 rounded bg-blue-400" style={{ width: `${((candidateFilters.experienceRange[1] - candidateFilters.experienceRange[0]) / (maxExp - minExp) * 100) || 0}%`, marginLeft: `${((candidateFilters.experienceRange[0] - minExp) / (maxExp - minExp) * 100) || 0}%` }} />
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => {
                  const { key, ...rest } = props;
                  return (
                    <div key={key} {...rest} className="w-5 h-5 bg-blue-600 rounded-full shadow border-2 border-white flex items-center justify-center focus:outline-none" style={{ ...rest.style }}>
                      <span className="text-xs text-white select-none">{candidateFilters.experienceRange[index]}</span>
                    </div>
                  );
                }}
              />
            </div>
            <input value={candidateFilters.skills} onChange={e => setCandidateFilters(f => ({ ...f, skills: e.target.value }))} placeholder="Skills" className="min-w-[110px] rounded-lg border border-gray-200 px-3 py-2 text-base" />
          </form>
          <div className="flex flex-col gap-5">
            {filteredCandidates.length === 0 ? (
              <div className="text-gray-500 bg-white rounded-xl p-10 text-center">No candidates found</div>
            ) : (
              filteredCandidates.map(c => (
                <div key={c.id} className="bg-blue-50 rounded-xl shadow-sm p-6 flex flex-wrap items-center gap-6">
                  <div className="flex-1 min-w-[200px]">
                    <div className="font-semibold text-lg">{c.firstName} {c.lastName}</div>
                    <div className="text-blue-600 font-medium">{c.position}</div>
                    <div className="text-gray-500 text-sm">{c.location} • {c.experience} years • {c.selectedPlan === 'pro' ? 'Pro' : 'Basic'} plan</div>
                    <div className="mt-2">Skills: {c.skills}</div>
                  </div>
                  <div className="flex flex-col gap-2 text-right min-w-[140px]">
                    <button
                      className={`rounded-lg px-5 py-2 font-semibold transition border-2 ${shortlist.includes(c.id) ? 'bg-amber-400 text-black border-amber-500' : 'bg-white text-amber-600 border-amber-400 hover:bg-amber-50'}`}
                      onClick={() => toggleShortlist(c.id)}
                    >
                      {shortlist.includes(c.id) ? 'В shortlist ✓' : 'В shortlist'}
                    </button>
                    <button
                      className="rounded-lg px-5 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                      onClick={() => navigate(`/team/candidate/${c.id}`)}
                    >
                      Профиль
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        {/* Управление заявками */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Applications</h2>
          {applications.length === 0 ? (
            <div className="text-gray-500 mb-4">No applications yet.</div>
          ) : (
            <div className="flex flex-col gap-4 mb-4">
              {applications.map(app => {
                const candidate = mockCandidates.find(c => c.id === app.candidateId);
                const vacancy = vacancies.find(v => v.id === app.vacancyId);
                return (
                  <div key={app.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-2 bg-gray-50">
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{candidate ? `${candidate.firstName} ${candidate.lastName}` : 'Unknown Candidate'}</div>
                      <div className="text-gray-600 text-sm">Vacancy: {vacancy ? vacancy.role : app.vacancyId}</div>
                      <div className="text-gray-500 text-xs mt-1">Status: <span className={
                        app.status === 'pending' ? 'text-amber-500' : app.status === 'accepted' ? 'text-green-600' : 'text-red-500'
                      }>{app.status}</span></div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
                        onClick={() => navigate(`/team/candidate/${app.candidateId}`)}
                      >Profile</button>
                      {app.status === 'pending' && (
                        <>
                          <button
                            className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700"
                            onClick={() => updateApplicationStatus(app.id, 'accepted')}
                          >Accept</button>
                          <button
                            className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
                            onClick={() => updateApplicationStatus(app.id, 'declined')}
                          >Decline</button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TeamDashboard; 