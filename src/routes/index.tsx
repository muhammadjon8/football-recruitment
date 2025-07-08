// routes/index.tsx
import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";

import { lazyLoad } from "../shared/utils/router.util";
import JobTicker from "../modules/candidate/Jobs";
import About from "../modules/candidate/About";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "../components/NotFound";
import CandidateDashboard from "../modules/candidate/CandidateDashboard";
import EditCandidateProfile from "../modules/candidate/EditCandidateProfile";
import JobSearch from "../modules/candidate/JobSearch";
import CandidateInbox from "../modules/candidate/CandidateInbox";
import AccountSettings from "../modules/candidate/AccountSettings";

const TeamRegister = lazyLoad(() => import("../modules/teams/TeamRegister"));
const CandidateRegister = lazyLoad(
  () => import("../modules/candidate/CandidateRegister")
);
const Login = lazyLoad(() => import("../modules/auth/Login"));
const Player = lazyLoad(() => import("../modules/candidate/Player"));
const PendingApproval = lazyLoad(
  () => import("../modules/teams/PendingApproval")
);

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<JobTicker />} />
        <Route path="/about" element={<About />} />
        <Route path="/player" element={<Player />} />
        <Route path="/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate/profile/edit" element={<EditCandidateProfile />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/inbox" element={<CandidateInbox />} />
        <Route path="/settings" element={<AccountSettings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout />} errorElement={<NotFound />}>
        <Route path="/login" element={<Login />} />
        <Route path="/candidate/register" element={<CandidateRegister />} />
        <Route path="/team/register" element={<TeamRegister />} />
        <Route path="/team/pending" element={<PendingApproval />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default routes;

