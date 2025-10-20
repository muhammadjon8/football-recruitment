// routes/index.tsx
import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";

import { lazyLoad } from "../shared/utils/router.util";
import JobTicker from "../modules/candidate/Jobs";
import About from "../modules/candidate/About";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import NotFound from "../components/NotFound";
import SimpleContactForm from "../modules/candidate/qwerty";
import Sidebar, { SidebarItem } from "../modules/sidebar";
import { Home, MoreVertical } from "lucide-react";
import { AccountBox, SettingsApplications } from "@mui/icons-material";
import DashboardLayout from "../layouts/DashboardLayout";
import CandidatePage from "../components/Candidate";
import HomePage from "../components/HomePage";
import ApplicationsPage from "../components/ApplicationsPage";
import SearchSelect from "../SearchSelect";

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
      {/* <Route element={<DefaultLayout />}>
        <Route path="/" element={<JobTicker />} />
        <Route path="/about" element={<About />} />
        <Route path="/player" element={<Player />} />
        <Route path="/qwerty" element={<SimpleContactForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout />} errorElement={<NotFound />}>
        <Route path="/login" element={<Login />} />
        <Route path="/candidate/register" element={<CandidateRegister />} />
        <Route path="/team/register" element={<TeamRegister />} />
        <Route path="/team/pending" element={<PendingApproval />} />
        <Route path="*" element={<NotFound />} />
      </Route> */}
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/" element={<DashboardLayout />}>
        <Route path="/search" element={<SearchSelect />} />
        <Route path="candidate" element={<CandidatePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="applications" element={<ApplicationsPage />} />
      </Route>

      {/* Optional: Add a 404 route */}
      <Route path="*" element={<div>Page not found</div>} />
    </>
  )
);

export default routes;
